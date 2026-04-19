import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  LineChart as LineChartIcon, 
  Map as MapIcon, 
  Route, 
  User, 
  Network, 
  Search,
  Zap,
  ShieldCheck,
  Cloud,
  Lightbulb
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

interface TrendAnalysisProps {
  onNavigate: (screen: string, transition?: string) => void;
}

const salaryData = [
  { year: '2019', ai: 80, arch: 90 },
  { year: '2020', ai: 85, arch: 92 },
  { year: '2021', ai: 95, arch: 94 },
  { year: '2022', ai: 110, arch: 98 },
  { year: '2023', ai: 130, arch: 105 },
  { year: '2024', ai: 155, arch: 112 },
];

const topicData = {
  'NLP Specialist': [
    { year: '2020', demand: 40 },
    { year: '2021', demand: 45 },
    { year: '2022', demand: 60 },
    { year: '2023', demand: 85 },
    { year: '2024', demand: 120 },
  ],
  'Cloud Migration': [
    { year: '2020', demand: 90 },
    { year: '2021', demand: 92 },
    { year: '2022', demand: 88 },
    { year: '2023', demand: 95 },
    { year: '2024', demand: 98 },
  ],
  'Blockchain Security': [
    { year: '2020', demand: 20 },
    { year: '2021', demand: 50 },
    { year: '2022', demand: 75 },
    { year: '2023', demand: 40 },
    { year: '2024', demand: 35 },
  ],
  'Embedded AI': [
    { year: '2020', demand: 30 },
    { year: '2021', demand: 35 },
    { year: '2022', demand: 45 },
    { year: '2023', demand: 65 },
    { year: '2024', demand: 110 },
  ],
  'Vector Databases': [
    { year: '2020', demand: 10 },
    { year: '2021', demand: 20 },
    { year: '2022', demand: 40 },
    { year: '2023', demand: 85 },
    { year: '2024', demand: 140 },
  ],
  'Prompt Engineering': [
    { year: '2020', demand: 5 },
    { year: '2021', demand: 15 },
    { year: '2022', demand: 70 },
    { year: '2023', demand: 130 },
    { year: '2024', demand: 180 },
  ],
  'Quantum Computing': [
    { year: '2020', demand: 15 },
    { year: '2021', demand: 18 },
    { year: '2022', demand: 25 },
    { year: '2023', demand: 35 },
    { year: '2024', demand: 50 },
  ],
  'Agentic AI': [
    { year: '2020', demand: 5 },
    { year: '2021', demand: 10 },
    { year: '2022', demand: 20 },
    { year: '2023', demand: 60 },
    { year: '2024', demand: 150 },
  ],
  'Spatial Computing': [
    { year: '2020', demand: 30 },
    { year: '2021', demand: 35 },
    { year: '2022', demand: 45 },
    { year: '2023', demand: 70 },
    { year: '2024', demand: 120 },
  ],
  'Edge AI': [
    { year: '2020', demand: 25 },
    { year: '2021', demand: 40 },
    { year: '2022', demand: 60 },
    { year: '2023', demand: 90 },
    { year: '2024', demand: 135 },
  ]
};

export default function TrendAnalysis({ onNavigate }: TrendAnalysisProps) {
  const [selectedTopic, setSelectedTopic] = React.useState('NLP Specialist');

  return (
    <div className="min-h-screen bg-bg text-brand-text font-sans selection:bg-brand-accent/20 selection:text-brand-accent pb-32 uppercase-none">
      {/* Top Bar */}
      <header className="fixed top-0 w-full z-50 bg-bg/60 backdrop-blur-xl flex justify-between items-center px-6 h-16 border-b border-brand-border">
        <div className="flex items-center gap-3">
          <Search className="text-brand-accent w-6 h-6" />
          <h1 className="text-2xl font-bold tracking-tight text-brand-accent">Market Insights</h1>
        </div>
        <div className="w-8 h-8 rounded-full overflow-hidden bg-brand-bg border border-brand-border">
          <img 
            src="https://picsum.photos/seed/profile/100/100" 
            alt="User avatar" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </header>

      <main className="pt-24 px-5 space-y-4 max-w-5xl mx-auto">
        {/* Dynamic Layout Container */}
        <div className="grid grid-cols-4 auto-rows-min gap-4">
          
          {/* Header Tile */}
          <div className="col-span-4 bg-brand-bg border border-brand-border rounded-2xl p-6 flex justify-between items-center shadow-sm">
             <div>
                <h2 className="text-xl font-bold tracking-tight text-brand-text">Market Momentum</h2>
                <p className="text-xs text-brand-muted">Animi X real-time sector performance analysis</p>
             </div>
             <div className="flex gap-2">
                <button className="px-5 py-2 rounded-lg bg-brand-accent text-white font-bold text-[10px] uppercase tracking-widest shadow-md shadow-brand-accent/20">Industry View</button>
             </div>
          </div>

          {/* Statistics Bento (Global Market Overview) */}
          <div className="col-span-2 row-span-2 bg-brand-bg border border-brand-border rounded-2xl p-6 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-3xl -mr-16 -mt-16" />
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-brand-muted font-bold text-[9px] uppercase tracking-[0.1em] opacity-60">Global Talent Demand</span>
                <h2 className="text-3xl font-bold mt-1 tracking-tight text-brand-text">Accelerated</h2>
              </div>
              <div className="bg-brand-accent/10 px-3 py-1 rounded-full flex items-center gap-1 border border-brand-accent/20">
                <TrendingUp className="text-brand-accent w-3 h-3" />
                <span className="text-brand-accent text-[10px] font-black">+12.4%</span>
              </div>
            </div>
            <p className="text-brand-muted text-sm leading-relaxed mb-6 font-medium">
              Market volatility has stabilized, favoring high-specialization roles in automated intelligence.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-1">
                {['JD', 'MK', 'LS'].map(initial => (
                  <div key={initial} className="w-6 h-6 rounded-full border border-bg bg-bg flex items-center justify-center text-[8px] font-bold text-brand-text">
                    {initial}
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-bold text-brand-muted/40 uppercase tracking-widest italic">824 experts live</span>
            </div>
          </div>

          {/* Topic Specific Trend Bento */}
          <div className="col-span-2 row-span-2 bg-brand-bg border border-brand-border rounded-2xl p-6 flex flex-col shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-brand-accent">
                <LineChartIcon className="w-4 h-4" />
                {selectedTopic} Momentum
              </h3>
            </div>
            <div className="flex-1 min-h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={topicData[selectedTopic as keyof typeof topicData]}>
                    <defs>
                      <linearGradient id="colorTopic" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={selectedTopic === 'Blockchain Security' ? '#ef4444' : '#3b82f6'} stopOpacity={0.2}/>
                        <stop offset="95%" stopColor={selectedTopic === 'Blockchain Security' ? '#ef4444' : '#3b82f6'} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.6} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                      itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="demand" stroke={selectedTopic === 'Blockchain Security' ? '#ef4444' : '#3b82f6'} fillOpacity={1} fill="url(#colorTopic)" strokeWidth={3} />
                  </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Momentum Tiles */}
          <motion.div 
            whileHover={{ scale: 0.95 }}
            onClick={() => setSelectedTopic('NLP Specialist')}
            className={`col-span-2 row-span-1 border rounded-2xl p-4 flex items-center justify-between group transition-all shadow-sm cursor-pointer ${
              selectedTopic === 'NLP Specialist' ? 'bg-brand-accent/5 border-brand-accent shadow-md shadow-brand-accent/5' : 'bg-brand-bg border-brand-border hover:bg-brand-hover'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                selectedTopic === 'NLP Specialist' ? 'bg-brand-accent text-white' : 'bg-brand-accent/10 text-brand-accent'
              }`}>
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-brand-text">NLP Specialist</p>
                <div className="flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                   <p className="text-[9px] text-brand-muted font-bold uppercase tracking-widest">Growth: High</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-brand-accent font-bold text-sm">+28%</p>
            </div>
          </motion.div>

          {/* Market Velocity Analysis */}
          <div className="col-span-2 row-span-2 bg-brand-bg border border-brand-border rounded-2xl p-6 flex flex-col shadow-sm relative overflow-hidden">
             <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted opacity-60">Market Velocity</span>
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                   <TrendingUp className="w-4 h-4" />
                </div>
             </div>
             <div className="space-y-4 overflow-y-auto no-scrollbar max-h-64 pr-2">
                {Object.keys(topicData).map(key => {
                   const data = topicData[key as keyof typeof topicData];
                   const value = Math.min(100, Math.round((data[data.length - 1].demand / 180) * 100)); // Normalize max 180 to 100%
                   return (
                  <motion.div 
                    key={key}
                    whileHover={{ x: 4 }}
                    onClick={() => setSelectedTopic(key)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedTopic === key ? 'bg-brand-accent/5 border-brand-accent shadow-sm' : 'border-transparent hover:bg-brand-hover'
                    }`}
                  >
                    <div className="flex justify-between text-[11px] font-bold mb-1.5 text-brand-text">
                      <span>{key}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="w-full h-1 bg-brand-border rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        className={`h-full ${selectedTopic === key ? 'bg-brand-accent' : 'bg-brand-muted'}`}
                       />
                    </div>
                  </motion.div>
                )})}
             </div>
             <p className="text-[10px] mt-auto pt-6 text-brand-muted italic opacity-60">Demand index updated 4m ago.</p>
          </div>

          <div className="col-span-2 row-span-1 bg-brand-bg border border-brand-border rounded-2xl p-4 flex items-center justify-between group hover:bg-brand-hover transition-colors shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/10 text-brand-accent flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-brand-text">Cyber Resilience</p>
                <div className="flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-accent group-hover:animate-pulse" />
                   <p className="text-[9px] text-brand-muted font-bold uppercase tracking-widest">Growth: Medium</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-brand-accent font-bold text-sm">+15%</p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="col-span-1 bg-brand-bg border border-brand-border rounded-2xl p-6 shadow-sm">
            <span className="text-[9px] text-brand-muted font-black uppercase tracking-[0.2em]">Stability</span>
            <p className="text-2xl font-bold mt-1 text-brand-text">High</p>
          </div>
          <div className="col-span-1 bg-brand-bg border border-brand-border rounded-2xl p-6 shadow-sm">
            <span className="text-[9px] text-brand-muted font-black uppercase tracking-[0.2em]">Risk Score</span>
            <p className="text-2xl font-bold mt-1 text-brand-text">Low</p>
          </div>
          <div className="col-span-2 bg-brand-accent rounded-2xl p-6 flex justify-between items-center text-white cursor-pointer hover:scale-[0.98] transition-transform shadow-lg shadow-brand-accent/20">
             <div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-80">Next Review</span>
                <p className="text-xl font-bold mt-1">April 24, 2026</p>
             </div>
             <Route className="w-6 h-6 opacity-60" />
          </div>

        </div>
      </main>
      {/* Bottom Nav Bar */}
      <nav className="fixed bottom-0 left-0 w-full bg-bg/80 backdrop-blur-3xl flex justify-around items-center px-4 pb-8 pt-4 z-50 rounded-t-[2.5rem] border-t border-brand-border h-24">
        <div 
          onClick={() => onNavigate('career_chat', 'none')}
          className="flex flex-col items-center justify-center text-brand-muted px-5 py-2 hover:text-brand-accent transition-all cursor-pointer active:scale-90"
        >
          <Route className="w-6 h-6" />
          <span className="text-[8px] font-black uppercase tracking-[0.1em] mt-1.5">Path</span>
        </div>
        <div 
          className="flex flex-col items-center justify-center bg-brand-bg text-brand-accent border border-brand-border rounded-2xl px-6 py-2 transition-all cursor-not-allowed"
        >
          <Lightbulb className="w-6 h-6" />
          <span className="text-[8px] font-black uppercase tracking-[0.1em] mt-1.5">Insights</span>
        </div>
        <div className="flex flex-col items-center justify-center text-brand-muted px-5 py-2 hover:text-brand-accent transition-all cursor-pointer active:scale-90">
          <Network className="w-6 h-6" />
          <span className="text-[8px] font-black uppercase tracking-[0.1em] mt-1.5">Network</span>
        </div>
        <div 
          onClick={() => onNavigate('profile_setup', 'none')}
          className="flex flex-col items-center justify-center text-brand-muted px-5 py-2 hover:text-brand-accent transition-all cursor-pointer active:scale-90"
        >
          <User className="w-6 h-6" />
          <span className="text-[8px] font-black uppercase tracking-[0.1em] mt-1.5">Profile</span>
        </div>
      </nav>
    </div>
  );
}
