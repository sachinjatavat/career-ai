import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Compass, 
  BookOpen, 
  Sparkles, 
  Settings, 
  Plus, 
  Send,
  MoreVertical,
  Target,
  User as UserIcon,
  Check,
  X,
  TrendingUp,
  Map,
  ArrowRight,
  Zap,
  GraduationCap
} from 'lucide-react';
import { courses } from '../data/courses';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';

interface CareerChatProps {
  onNavigate: (screen: string, transition?: string) => void;
  initialTab?: string;
}

const progressData = [
  { name: 'Learned', value: 65, color: '#3b82f6' },
  { name: 'Pending', value: 35, color: '#f3f4f6' },
];

const skillGapData = [
  { skill: 'Python', level: 90 },
  { skill: 'PyTorch', level: 75 },
  { skill: 'Docker', level: 40 },
  { skill: 'AWS Bedrock', level: 25 },
];

export default function CareerChat({ onNavigate, initialTab }: CareerChatProps) {
  const [activeTab, setActiveTab] = React.useState(initialTab || 'dashboard');
  const [activeSettingsTab, setActiveSettingsTab] = React.useState('profile');
  const [showProfileCard, setShowProfileCard] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [chatMessages, setChatMessages] = React.useState<{role: string, text: string, time: string}[]>([
    { role: 'ai', text: "Hello! I've analyzed your recent GitHub commits and LinkedIn updates. Based on the current trend in Generative AI, I recommend focusing on Vector Databases.", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
  ]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [validatedSkills, setValidatedSkills] = React.useState<Record<string, 'confirm' | 'reject'>>({});
  const [expandedSkill, setExpandedSkill] = React.useState<string | null>(null);

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.level.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    const newUserMsg = { role: 'user', text: message, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    setChatMessages(prev => [...prev, newUserMsg]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/nvidia-api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_NVIDIA_API_KEY || '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'}`
        },
        body: JSON.stringify({
          model: 'meta/llama-3.1-70b-instruct',
          messages: [
            { 
              role: 'system', 
              content: "You are Animi AI, a highly specialized Career Guidance AI. Your sole purpose is to provide advice related to jobs, careers, skills, education, and professional development. If a user asks you about topics unrelated to careers, jobs, or courses (e.g., programming tasks, cooking, politics, general chat, etc.), you MUST decline to answer and reply EXACTLY with: 'I'm a career guidance AI, I'm not trained to speak for other things.' Do not provide any other information or apology for out-of-domain questions."
            },
            { role: 'user', content: message }
          ],
          max_tokens: 200
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();
      const aiText = data.choices?.[0]?.message?.content || "I couldn't process that request at this time.";
      setChatMessages(prev => [...prev, { role: 'ai', text: aiText, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
    } catch (error: any) {
      setChatMessages(prev => [...prev, { role: 'ai', text: `Error connecting to Nvidia API: ${error.message}`, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkillValidation = (skill: string, status: 'confirm' | 'reject') => {
    setValidatedSkills(prev => ({ ...prev, [skill]: status }));
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'paths', label: 'Career Paths', icon: <Compass className="w-5 h-5" /> },
    { id: 'skill-lab', label: 'Library & Lab', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'ai-counselor', label: 'AI Counselor', icon: <Sparkles className="w-5 h-5" />, active: true },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-bg text-brand-text font-sans selection:bg-brand-accent/20 selection:text-brand-accent overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-brand-border flex flex-col p-6 h-full relative z-20">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center shadow-lg shadow-brand-accent/20">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-brand-text">Animi X</h1>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              whileHover={{ x: 4, scale: 1.02 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group text-sm font-medium ${
                activeTab === item.id 
                ? 'bg-brand-accent/10 text-brand-accent border border-brand-accent/20 font-bold' 
                : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              <div className={`${activeTab === item.id ? 'text-brand-accent' : 'text-brand-muted group-hover:text-brand-text'}`}>
                {item.icon}
              </div>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8">
          <button 
            onClick={() => onNavigate('profile_setup', 'slide_up')}
            className="w-full py-2 bg-brand-accent text-white rounded-lg font-bold text-sm shadow-lg shadow-brand-accent/20 active:scale-95 transition-all mb-4"
          >
            New Analysis
          </button>
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 px-4 py-3 text-brand-muted hover:text-brand-text transition-colors text-sm font-medium"
          >
            <UserIcon className="w-5 h-5 opacity-40" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative h-full p-8 overflow-y-auto no-scrollbar">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-text">
              {activeTab === 'dashboard' ? 'Career Command Center' : 'AI Career Counselor'}
            </h2>
            <p className="text-brand-muted font-medium">
              {activeTab === 'dashboard' 
                ? 'Your professional growth aggregated in real-time.' 
                : 'Interactive guidance for your next big move.'}
            </p>
          </div>
          <div className="flex items-center gap-4 relative">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">Marcus Chen</p>
              <p className="text-[10px] text-brand-muted uppercase font-black tracking-widest">Premium Tier</p>
            </div>
            <button 
              onClick={() => setShowProfileCard(!showProfileCard)}
              className="w-12 h-12 rounded-full bg-brand-bg border-2 border-brand-border overflow-hidden shadow-sm hover:border-brand-accent transition-all active:scale-95"
            >
              <img 
                src="https://picsum.photos/seed/user/100/100" 
                alt="User" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>

            <AnimatePresence>
              {showProfileCard && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-16 w-80 bg-brand-bg border border-brand-border rounded-2xl shadow-2xl p-6 z-50"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full border-2 border-brand-accent p-1">
                      <img 
                        src="https://picsum.photos/seed/user/100/100" 
                        alt="User" 
                        className="w-full h-full object-cover rounded-full"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">Marcus Chen</h4>
                      <p className="text-xs text-brand-muted">marcus.chen@ai-design.co</p>
                      <div className="mt-1 inline-block px-2 py-0.5 bg-brand-accent/10 rounded text-[9px] font-bold text-brand-accent uppercase tracking-widest">Senior Architect</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-bg border border-brand-border rounded-xl">
                      <p className="text-[10px] text-brand-muted uppercase font-black tracking-widest">Current Focus</p>
                      <p className="text-xs font-bold mt-1 text-brand-text">Generative AI & LLMOps</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-bg border border-brand-border rounded-xl text-center">
                        <p className="text-[10px] text-brand-muted uppercase font-black tracking-widest">Experience</p>
                        <p className="text-sm font-bold mt-1">8.5 Yrs</p>
                      </div>
                      <div className="p-3 bg-bg border border-brand-border rounded-xl text-center">
                        <p className="text-[10px] text-brand-muted uppercase font-black tracking-widest">Sync Level</p>
                        <p className="text-sm font-bold mt-1">Tier 3</p>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setActiveTab('settings'); setShowProfileCard(false); }}
                    className="w-full mt-6 py-3 bg-brand-accent/10 text-brand-accent rounded-xl text-xs font-bold hover:bg-brand-accent/20 transition-all"
                  >
                    Manage Profile
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        <div className="flex-1 min-h-0">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' ? (
            <div className="grid grid-cols-6 gap-6 h-fit">
              {/* Career Goal & Progress Tile */}
              <motion.div 
                whileHover={{ scale: 0.95, y: -4 }}
                className="col-span-3 bg-brand-bg border border-brand-border rounded-[2rem] p-8 flex flex-col shadow-sm"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-1 block">Active Career Goal</span>
                    <h3 className="text-2xl font-bold tracking-tight">Senior AI Architect</h3>
                  </div>
                  <div className="bg-brand-accent/10 p-3 rounded-2xl text-brand-accent">
                    <Target className="w-5 h-5" />
                  </div>
                </div>

                <div className="flex gap-8 items-center">
                  <div className="w-40 h-40 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={progressData}
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {progressData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-black tracking-tighter text-brand-text">65%</span>
                      <span className="text-[8px] font-bold text-brand-muted uppercase tracking-widest">Mastery</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">Learning Velocity</h4>
                      <div className="flex items-end gap-2">
                        <span className="text-2xl font-black text-brand-text">+12</span>
                        <span className="text-xs font-bold text-green-500 mb-1">Skills/mo</span>
                      </div>
                    </div>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      Focus on cloud deployment to reach 100%.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Skill Gap Analysis Tile */}
              <motion.div 
                whileHover={{ scale: 0.95, y: -4 }}
                className="col-span-3 bg-brand-bg border border-brand-border rounded-[2rem] p-8 flex flex-col shadow-sm"
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-brand-muted">Skill Gap Analysis</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-accent" />
                    <span className="text-[10px] font-bold text-brand-accent">Goal Requirements</span>
                  </div>
                </div>
                <div className="flex-1 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={skillGapData} layout="vertical" margin={{ left: 0 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="skill" type="category" width={80} axisLine={false} tickLine={false} style={{ fontSize: '10px', fontWeight: 'bold' }} />
                      <Tooltip 
                        cursor={{ fill: 'transparent' }} 
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px' }}
                      />
                      <Bar dataKey="level" radius={[0, 4, 4, 0]} barSize={16}>
                        {skillGapData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.level > 50 ? '#3b82f6' : '#d1d5db'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Roadmap Tile */}
              <motion.div 
                whileHover={{ scale: 0.95, y: -4 }}
                className="col-span-2 bg-brand-bg border border-brand-border rounded-[2rem] p-8 flex flex-col shadow-sm overflow-hidden"
              >
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-brand-muted mb-8">Personal Roadmap</h3>
                <div className="space-y-6 relative ml-2">
                  <div className="absolute left-[11px] top-2 bottom-2 w-px bg-brand-border" />
                  {[
                    { label: 'Foundational ML', status: 'done', date: 'Completed' },
                    { label: 'RAG Systems', status: 'active', date: 'In Progress' },
                    { label: 'Model Deployment', status: 'todo', date: 'Q3 2026' }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4 items-start relative z-10">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 border-bg ${
                        step.status === 'done' ? 'bg-brand-accent text-white' : 
                        step.status === 'active' ? 'bg-white border-brand-accent text-brand-accent animate-pulse' : 
                        'bg-brand-border text-brand-muted'
                      }`}>
                        {step.status === 'done' ? <Check className="w-3 h-3" /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${step.status === 'todo' ? 'text-brand-muted' : 'text-brand-text'}`}>{step.label}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-brand-muted opacity-60">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Resources Tile */}
              <motion.div 
                whileHover={{ scale: 0.95, y: -4 }}
                className="col-span-2 bg-brand-bg border border-brand-border rounded-[2rem] p-8 flex flex-col shadow-sm"
              >
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-brand-muted mb-6">Curated Resources</h3>
                <div className="space-y-3">
                  {[
                    { title: 'Scaling Transformers', type: 'Video', icon: <BookOpen className="w-4 h-4" /> },
                    { title: 'AI Ethics Framework', type: 'PDF', icon: <Settings className="w-4 h-4" /> }
                  ].map((res, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-4 bg-bg border border-brand-border rounded-xl flex items-center justify-between group hover:border-brand-accent/40 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-brand-accent">{res.icon}</div>
                        <div>
                          <p className="text-xs font-bold text-brand-text">{res.title}</p>
                          <p className="text-[9px] font-bold text-brand-muted uppercase tracking-widest">{res.type}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-brand-muted opacity-0 group-hover:opacity-100 transition-all" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Weekly Insight */}
              <motion.div 
                whileHover={{ scale: 0.95, y: -4 }}
                className="col-span-2 bg-brand-accent rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-lg shadow-brand-accent/20"
              >
                <div>
                  <TrendingUp className="w-10 h-10 opacity-40 mb-4" />
                  <h3 className="text-xl font-bold tracking-tight mb-2">Weekly Review</h3>
                  <p className="text-xs opacity-80 leading-relaxed">
                    Your focus on RAG implementation has increased your score by <span className="font-bold underline">14%</span>.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('ai-counselor')}
                  className="w-full py-3 bg-white text-brand-accent rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all"
                >
                  Discuss Progress
                </button>
              </motion.div>
            </div>
          ) : activeTab === 'skill-lab' ? (
            <div className="space-y-8 overflow-y-auto no-scrollbar h-full pb-20">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-2">Skill Lab & Library</h3>
                  <p className="text-brand-muted text-sm font-medium">Deepen your expertise with curated video pathways.</p>
                </div>
                <div className="relative w-80">
                  <input
                    type="text"
                    placeholder="Search courses (e.g. AI, Fintech)..."
                    className="w-full bg-bg border border-brand-border rounded-lg py-2 px-4 pl-10 text-sm font-medium focus:ring-1 focus:ring-brand-accent outline-none text-brand-text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {filteredCourses.map((course, i) => (
                  <motion.div 
                    key={course.id}
                    whileHover={{ scale: 0.95, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-brand-bg border border-brand-border rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:border-brand-accent/40 transition-all"
                    onClick={() => window.open(course.url, '_blank')}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center shadow-2xl">
                          <Zap className="text-white w-6 h-6 fill-current" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                        {course.duration}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-sm leading-tight text-brand-text group-hover:text-brand-accent transition-colors">{course.title}</h4>
                      </div>
                      <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-4">{course.channel}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-brand-border/10">
                        <span className="text-[9px] font-black text-brand-accent uppercase tracking-[0.2em]">{course.level}</span>
                        <ArrowRight className="w-4 h-4 text-brand-muted group-hover:text-brand-accent group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : activeTab === 'settings' ? (
            <div className="grid grid-cols-12 gap-8 h-full bg-brand-bg border border-brand-border rounded-[2.5rem] p-8 shadow-inner overflow-hidden">
              <div className="col-span-3 border-r border-brand-border pr-8 space-y-2">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted mb-6">System Settings</h3>
                {[
                  { id: 'profile', label: 'Personal Information', icon: <UserIcon className="w-4 h-4" /> },
                  { id: 'security', label: 'Security & Privacy', icon: <Target className="w-4 h-4" /> },
                  { id: 'notifications', label: 'Notifications', icon: <Zap className="w-4 h-4" /> },
                  { id: 'appearance', label: 'Appearance', icon: <Sparkles className="w-4 h-4" /> }
                ].map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveSettingsTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold ${
                      activeSettingsTab === tab.id 
                      ? 'bg-brand-accent text-white shadow-lg shadow-brand-accent/20' 
                      : 'text-brand-muted hover:text-brand-text hover:bg-brand-hover'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
              
              <div className="col-span-9 pl-4 overflow-y-auto no-scrollbar pb-12">
                <AnimatePresence mode="wait">
                  {activeSettingsTab === 'profile' && (
                    <motion.div 
                      key="profile"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div>
                        <h4 className="text-2xl font-bold tracking-tight mb-2">Personal Information</h4>
                        <p className="text-brand-muted text-sm tracking-wide">Update your identity and professional DNA across the system.</p>
                      </div>

                      <div className="flex items-center gap-8 p-6 bg-bg border border-brand-border rounded-2xl">
                        <div className="relative group">
                          <div className="w-24 h-24 rounded-full border-4 border-brand-accent/20 p-1">
                            <img src="https://picsum.photos/seed/user/100/100" className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <button className="absolute bottom-0 right-0 w-8 h-8 bg-brand-accent text-white rounded-full flex items-center justify-center border-4 border-bg hover:scale-110 transition-transform shadow-lg">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-lg mb-1">Profile Photo</h5>
                          <p className="text-xs text-brand-muted mb-4">High-resolution synthesis recommended (PNG or JPG).</p>
                          <div className="flex gap-3">
                            <button className="px-4 py-2 bg-brand-accent/10 text-brand-accent rounded-lg text-xs font-bold hover:bg-brand-accent/20">Change Avatar</button>
                            <button className="px-4 py-2 text-red-500 rounded-lg text-xs font-bold hover:bg-red-50 transition-colors">Delete</button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Full Name</label>
                          <input className="w-full bg-bg border border-brand-border p-4 rounded-xl text-sm font-bold focus:ring-1 focus:ring-brand-accent outline-none" defaultValue="Marcus Chen" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Professional Title</label>
                          <input className="w-full bg-bg border border-brand-border p-4 rounded-xl text-sm font-bold focus:ring-1 focus:ring-brand-accent outline-none" defaultValue="Senior AI Architect" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Age</label>
                          <input type="number" className="w-full bg-bg border border-brand-border p-4 rounded-xl text-sm font-bold focus:ring-1 focus:ring-brand-accent outline-none" defaultValue="28" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Location</label>
                          <input className="w-full bg-bg border border-brand-border p-4 rounded-xl text-sm font-bold focus:ring-1 focus:ring-brand-accent outline-none" defaultValue="San Francisco, CA" />
                        </div>
                        <div className="space-y-2 col-span-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Bio / Personal Mission</label>
                          <textarea className="w-full bg-bg border border-brand-border p-4 rounded-xl text-sm font-bold focus:ring-1 focus:ring-brand-accent outline-none min-h-[120px] resize-none" defaultValue="Architecting ethical scalable AI systems for global sustainability." />
                        </div>
                      </div>

                      <div className="pt-4">
                        <button className="px-8 py-4 bg-brand-accent text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl shadow-brand-accent/20 active:scale-95 transition-all hover:brightness-110">
                          Save Changes
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {activeSettingsTab === 'security' && (
                    <motion.div 
                      key="security"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div>
                        <h4 className="text-2xl font-bold tracking-tight mb-2">Security & Privacy</h4>
                        <p className="text-brand-muted text-sm tracking-wide">Manage your authentication layers and data encryption keys.</p>
                      </div>

                      <div className="space-y-4">
                        {[
                          { title: 'Two-Factor Authentication', desc: 'Secure your account with biometric or SMS verification.', active: true },
                          { title: 'Encrypted Data Sync', desc: 'All resume and professional data is AES-256 encrypted.', active: true },
                          { title: 'Session Monitoring', desc: 'Real-time tracking of active instances of your profile.', active: false }
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-6 bg-bg border border-brand-border rounded-2xl group hover:border-brand-accent/30 transition-all">
                            <div>
                              <p className="font-bold text-brand-text">{item.title}</p>
                              <p className="text-xs text-brand-muted mt-1">{item.desc}</p>
                            </div>
                            <div className={`w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors ${item.active ? 'bg-brand-accent' : 'bg-brand-border'}`}>
                              <div className={`w-4 h-4 bg-white rounded-full transition-all ${item.active ? 'ml-6' : 'ml-0'}`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="h-full grid grid-cols-4 grid-rows-4 gap-4 overflow-hidden">
              {/* Chat Container (Bento Style) */}
              <div className="col-span-2 row-span-4 bg-brand-bg border border-brand-border rounded-2xl flex flex-col p-6 overflow-hidden relative shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">AI Career Chat</span>
              <div className="flex items-center gap-1.5">
                 <div className="w-2 h-2 rounded-full bg-green-500" />
                 <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest">Active session</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 no-scrollbar pb-4 px-1">
              {chatMessages.map((msg, idx) => (
                msg.role === 'ai' ? (
                  <div key={idx} className="flex flex-col gap-2 max-w-[90%]">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-brand-accent/10 flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-brand-accent" />
                      </div>
                      <span className="text-[10px] font-bold text-brand-muted uppercase">Animi AI</span>
                      <span className="text-[9px] text-brand-muted opacity-40 ml-auto">{msg.time}</span>
                    </div>
                    <div className="bg-bg border border-brand-border p-4 rounded-xl rounded-tl-none space-y-4 shadow-sm">
                      <p className="text-sm leading-relaxed text-brand-text">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div key={idx} className="flex flex-col gap-2 max-w-[90%] ml-auto">
                    <div className="flex items-center gap-2 flex-row-reverse">
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-brand-border shadow-sm">
                        <img src="https://picsum.photos/seed/user/100/100" alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <span className="text-[10px] font-bold text-brand-muted uppercase">Marcus</span>
                      <span className="text-[9px] text-brand-muted opacity-40 mr-auto">{msg.time}</span>
                    </div>
                    <div className="bg-brand-accent text-white p-4 rounded-xl rounded-tr-none text-sm leading-relaxed shadow-lg shadow-brand-accent/10">
                      {msg.text}
                    </div>
                  </div>
                )
              ))}
              {isLoading && (
                <div className="flex flex-col gap-2 max-w-[90%]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-brand-accent/10 flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-brand-accent animate-pulse" />
                    </div>
                    <span className="text-[10px] font-bold text-brand-muted uppercase">Animi AI is typing...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 relative group">
              <input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask anything about your career path..."
                className="w-full bg-bg border border-brand-border rounded-lg py-3 px-4 text-sm font-medium focus:ring-1 focus:ring-brand-accent transition-all placeholder:text-brand-muted/50"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-accent p-1 hover:bg-brand-accent/10 rounded disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Trend Area Tile (Bento Style) */}
          <div className="col-span-2 row-span-2 bg-brand-bg border border-brand-border rounded-2xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">Trend Analysis</span>
              <span className="text-[10px] px-2 py-0.5 bg-bg border border-brand-border rounded font-bold text-brand-muted">Market: Bullish</span>
            </div>
            <p className="text-sm font-medium mb-6">Demand for Cloud Architects with AI specialization (2024)</p>
            <div className="flex flex-1 items-end gap-2 pb-2">
              {[40, 55, 45, 70, 85, 60, 75].map((h, i) => (
                <div 
                  key={i} 
                  className={`flex-1 rounded-t-sm transition-all duration-500`} 
                  style={{ 
                    height: `${h}%`, 
                    backgroundColor: i === 4 ? '#3b82f6' : '#3b82f6',
                    opacity: i === 4 ? 1 : 0.6
                  }} 
                />
              ))}
            </div>
            <div className="flex justify-between text-[10px] font-bold text-brand-muted uppercase tracking-widest mt-2 border-t border-brand-border/10 pt-2">
              <span>JAN</span><span>MAR</span><span>MAY</span><span>SEP</span><span>DEC</span>
            </div>
          </div>

          {/* Secondary Bento Tiles */}
          <div className="col-span-1 row-span-2 bg-brand-bg border border-brand-border rounded-2xl p-6 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">Profile Sync</span>
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tighter">88%</p>
              <p className="text-[10px] text-brand-muted mt-1 leading-tight">Data Synchronized from LinkedIn, GitHub, and Dribbble.</p>
            </div>
          </div>

          <div className="col-span-1 row-span-2 bg-brand-bg border border-brand-border rounded-2xl p-6 flex flex-col">
            <span className="text-xs font-bold text-brand-muted uppercase tracking-wider mb-auto">Next Steps</span>
            <div className="space-y-2 mt-4">
              <button 
                onClick={() => onNavigate('trend_analysis')}
                className="w-full py-2 bg-bg border border-brand-border rounded-lg text-[11px] font-bold hover:bg-brand-hover transition-colors"
              >
                View Sample Path
              </button>
              <button 
                onClick={() => onNavigate('profile_setup')}
                className="w-full py-2 bg-bg border border-brand-border rounded-lg text-[11px] font-bold hover:bg-brand-hover transition-colors"
              >
                Profile Setup
              </button>
            </div>
            </div>
          </div>
        )}
      </AnimatePresence>
      </div>
    </main>
  </div>
);
}
