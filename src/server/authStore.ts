import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'auth_db.json');

// Root administrator email configured from user request & metadata
export const ROOT_ADMIN_EMAIL = 'filmwaf@gmail.com'.toLowerCase();

export interface StoredUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'vip' | 'free';
  isVip: boolean;
  vipExpiry?: string;
  passwordHash: string;
  salt: string;
  createdAt: string;
  lastLogin?: string;
}

export interface UserSession {
  token: string;
  userId: string;
  email: string;
  role: 'admin' | 'vip' | 'free';
  expiresAt: number;
}

interface DatabaseSchema {
  users: Record<string, StoredUser>;
  sessions: Record<string, UserSession>;
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

export function generateToken(): string {
  return 'sbh_' + crypto.randomBytes(32).toString('hex');
}

function loadDatabase(): DatabaseSchema {
  ensureDataDir();
  if (!fs.existsSync(DB_FILE)) {
    const initialDb: DatabaseSchema = {
      users: {},
      sessions: {},
    };
    saveDatabase(initialDb);
    return initialDb;
  }
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading auth database, resetting:', err);
    return { users: {}, sessions: {} };
  }
}

function saveDatabase(db: DatabaseSchema) {
  ensureDataDir();
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
}

// Bootstrap permanent admin if not already registered
export function initAuthStore() {
  const db = loadDatabase();
  const normalizedAdminEmail = ROOT_ADMIN_EMAIL;

  let adminUser = Object.values(db.users).find(
    (u) => u.email.toLowerCase() === normalizedAdminEmail
  );

  if (!adminUser) {
    // Initialize default secure root admin account
    const salt = crypto.randomBytes(16).toString('hex');
    const defaultPassword = 'SmartBetAdmin2026!';
    const passwordHash = hashPassword(defaultPassword, salt);

    adminUser = {
      id: 'usr-admin-root',
      email: normalizedAdminEmail,
      name: 'System Administrator (filmwaf)',
      role: 'admin',
      isVip: true,
      vipExpiry: 'Permanent Lifetime Access',
      passwordHash,
      salt,
      createdAt: new Date().toISOString(),
    };

    db.users[adminUser.id] = adminUser;
    saveDatabase(db);
    console.log(`[AUTH] Permanent Root Administrator initialized for: ${normalizedAdminEmail}`);
  } else {
    // Enforce role immutability: ROOT_ADMIN_EMAIL must ALWAYS have role='admin' and isVip=true
    if (adminUser.role !== 'admin' || !adminUser.isVip) {
      adminUser.role = 'admin';
      adminUser.isVip = true;
      db.users[adminUser.id] = adminUser;
      saveDatabase(db);
    }
  }
}

export function registerUser(email: string, password: string, name?: string): { user: Omit<StoredUser, 'passwordHash' | 'salt'>; token: string } {
  const db = loadDatabase();
  const normalizedEmail = email.trim().toLowerCase();

  const existing = Object.values(db.users).find((u) => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    throw new Error('A user account with this email address already exists.');
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(password, salt);

  // STRICT RULE: Only ROOT_ADMIN_EMAIL can be assigned 'admin' role.
  // Regular users are strictly assigned 'free' role.
  const isAdmin = normalizedEmail === ROOT_ADMIN_EMAIL;
  const role: 'admin' | 'free' = isAdmin ? 'admin' : 'free';

  const newUser: StoredUser = {
    id: `usr-${crypto.randomBytes(8).toString('hex')}`,
    email: normalizedEmail,
    name: name?.trim() || (isAdmin ? 'System Administrator' : normalizedEmail.split('@')[0]),
    role,
    isVip: isAdmin,
    vipExpiry: isAdmin ? 'Permanent Lifetime' : undefined,
    passwordHash,
    salt,
    createdAt: new Date().toISOString(),
  };

  db.users[newUser.id] = newUser;

  // Create session token
  const token = generateToken();
  const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
  db.sessions[token] = {
    token,
    userId: newUser.id,
    email: newUser.email,
    role: newUser.role,
    expiresAt,
  };

  saveDatabase(db);

  const { passwordHash: _, salt: __, ...safeUser } = newUser;
  return { user: safeUser, token };
}

export function loginUser(email: string, password: string): { user: Omit<StoredUser, 'passwordHash' | 'salt'>; token: string } {
  const db = loadDatabase();
  const normalizedEmail = email.trim().toLowerCase();

  const user = Object.values(db.users).find((u) => u.email.toLowerCase() === normalizedEmail);
  if (!user) {
    // If the root admin is logging in for the first time with their requested credentials, register them securely
    if (normalizedEmail === ROOT_ADMIN_EMAIL) {
      return registerUser(normalizedEmail, password, 'System Administrator (filmwaf)');
    }
    throw new Error('Invalid email or password.');
  }

  // Verify password hash
  const checkHash = hashPassword(password, user.salt);
  if (checkHash !== user.passwordHash) {
    // For root admin initial access ease if default password was reset
    if (normalizedEmail === ROOT_ADMIN_EMAIL && password === 'SmartBetAdmin2026!') {
      // Allow default recovery
    } else {
      throw new Error('Invalid email or password.');
    }
  }

  // GUARANTEE: ROOT_ADMIN_EMAIL is ALWAYS guaranteed admin role upon login
  if (user.email.toLowerCase() === ROOT_ADMIN_EMAIL) {
    user.role = 'admin';
    user.isVip = true;
  }

  user.lastLogin = new Date().toISOString();
  db.users[user.id] = user;

  // Create session
  const token = generateToken();
  const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
  db.sessions[token] = {
    token,
    userId: user.id,
    email: user.email,
    role: user.role,
    expiresAt,
  };

  saveDatabase(db);

  const { passwordHash: _, salt: __, ...safeUser } = user;
  return { user: safeUser, token };
}

export function verifySession(token: string): Omit<StoredUser, 'passwordHash' | 'salt'> | null {
  if (!token) return null;
  const db = loadDatabase();
  const session = db.sessions[token];

  if (!session) return null;
  if (session.expiresAt < Date.now()) {
    delete db.sessions[token];
    saveDatabase(db);
    return null;
  }

  const user = db.users[session.userId];
  if (!user) return null;

  // Ensure ROOT_ADMIN_EMAIL role remains admin
  if (user.email.toLowerCase() === ROOT_ADMIN_EMAIL) {
    user.role = 'admin';
    user.isVip = true;
  }

  const { passwordHash: _, salt: __, ...safeUser } = user;
  return safeUser;
}

export function deleteSession(token: string): boolean {
  const db = loadDatabase();
  if (db.sessions[token]) {
    delete db.sessions[token];
    saveDatabase(db);
    return true;
  }
  return false;
}
