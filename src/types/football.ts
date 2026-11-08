export type MatchOutcome = 'WON' | 'LOST' | 'PENDING';
export type UserRole = 'free' | 'vip' | 'admin';
export type TipTier = 'FREE' | 'VIP';

export interface Team {
  name: string;
  shortName: string;
  logo: string;
  form: ('W' | 'D' | 'L')[];
  leagueRank: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsScored: number;
  goalsConceded: number;
  cleanSheets: number;
  homeWinPct?: number;
  awayWinPct?: number;
}

export interface Odds {
  homeWin: number;
  draw: number;
  awayWin: number;
  over15: number;
  under15: number;
  over25: number;
  under25: number;
  over35: number;
  under35: number;
  bttsYes: number;
  bttsNo: number;
}

export interface Probabilities {
  homeWin: number;
  draw: number;
  awayWin: number;
  over15: number;
  under15: number;
  over25: number;
  under25: number;
  over35: number;
  under35: number;
  bttsYes: number;
  bttsNo: number;
}

export interface Prediction {
  primaryTip: string;
  tipLabel: string;
  marketType: '1X2' | 'O/U' | 'BTTS' | 'COMBO' | 'DOUBLE_CHANCE';
  odds: number;
  confidence: number; // 1 to 5
  tier: TipTier;
  isBanker?: boolean;
  outcome: MatchOutcome;
  reasoning: string;
  keyFactors: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface MatchAnalysis {
  fixtureId?: string;
  summary: string;
  probabilities: Probabilities;
  primaryTip: string;
  tipLabel: string;
  confidence: number;
  tier: TipTier;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  keyFactors: string[];
  tacticalBreakdown: {
    homeTactics: string;
    awayTactics: string;
    clashDynamics: string;
  };
  missingPlayersNotice?: string;
  disclaimer: string;
  generatedAt?: string;
  isAiGenerated?: boolean;
}

export interface Fixture {
  id: string;
  league: string;
  leagueCode: string;
  country: string;
  round: string;
  kickOff: string;
  dateLabel: 'Today' | 'Tomorrow' | 'Weekend' | 'Finished';
  venue: string;
  status: 'SCHEDULED' | 'LIVE' | 'FINISHED';
  score?: { home: number; away: number };
  homeTeam: Team;
  awayTeam: Team;
  h2h: {
    homeWins: number;
    draws: number;
    awayWins: number;
    lastMatches: string[];
  };
  odds: Odds;
  probabilities: Probabilities;
  prediction: Prediction;
  analysis?: MatchAnalysis;
  isBankerOfDay?: boolean;
  isFeatured?: boolean;
}

export interface AccumulatorLeg {
  fixtureId: string;
  matchTitle: string;
  league: string;
  kickOff: string;
  market: string;
  pick: string;
  odds: number;
  status: MatchOutcome;
  score?: string;
}

export interface Accumulator {
  id: string;
  title: string;
  subtitle: string;
  tier: TipTier;
  tag: string;
  date: string;
  totalOdds: number;
  status: MatchOutcome;
  bookingCode: string;
  reasoning: string;
  legs: AccumulatorLeg[];
}

export interface BetSlipItem {
  id: string;
  fixtureId: string;
  matchTitle: string;
  league: string;
  market: string;
  pick: string;
  odds: number;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isVip: boolean;
  vipExpiry?: string;
  joinedDate: string;
  bookmarkedMatches: string[];
}
