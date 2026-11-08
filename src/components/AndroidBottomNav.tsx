import React from 'react';
import { 
  Home, 
  Calendar, 
  Sparkles, 
  Crown, 
  User 
} from 'lucide-react';

interface AndroidBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: 'en' | 'sw';
}

export const AndroidBottomNav: React.FC<AndroidBottomNavProps> = ({
  activeTab,
  setActiveTab,
  language,
}) => {
  const isSw = language === 'sw';

  const navItems = [
    {
      id: 'dashboard',
      label: isSw ? 'Nyumbani' : 'Home',
      icon: Home,
    },
    {
      id: 'matches',
      label: isSw ? 'Mechi' : 'Matches',
      icon: Calendar,
    },
    {
      id: 'ai_lab',
      label: isSw ? 'Uchambuzi AI' : 'AI Analysis',
      icon: Sparkles,
      highlight: true,
    },
    {
      id: 'vip',
      label: isSw ? 'VIP' : 'VIP',
      icon: Crown,
    },
    {
      id: 'profile',
      label: isSw ? 'Wasifu' : 'Profile',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#080b12]/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1.5 md:hidden shadow-[0_-4px_25px_rgba(0,0,0,0.6)]">
      <div className="grid grid-cols-5 gap-1 items-center max-w-md mx-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
                isActive
                  ? 'text-cyan-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-lg transition-all ${
                isActive 
                  ? 'bg-cyan-500/15 shadow-[0_0_10px_rgba(0,229,255,0.3)]' 
                  : item.highlight 
                  ? 'bg-blue-600/20 text-cyan-400' 
                  : ''
              }`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 font-medium truncate max-w-full">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
