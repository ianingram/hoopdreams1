import React, { useState, useEffect } from 'react';
import { 
  Trophy, User, MapPin, PlusCircle, Activity, 
  Wallet, Camera, Video, ChevronRight, Zap, 
  Shield, Star, Flame, Users, ChevronDown, Edit3, Check,
  Crown, Medal, TrendingUp, ThumbsUp, ThumbsDown, X, Info,
  Play, Pause, Clock, FileText, History, MessageSquare, 
  Send, Share2, Crosshair
} from 'lucide-react';

// --- CUSTOM ICONS & DYNAMIC AVATAR ---
const HoopLogo = ({ className = "" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="15" width="70" height="50" rx="4" stroke="currentColor" strokeWidth="6"/>
    <rect x="35" y="40" width="30" height="25" stroke="currentColor" strokeWidth="4"/>
    <line x1="32" y1="65" x2="68" y2="65" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    <path d="M35 65 L43 95 L57 95 L65 65" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="4 4" opacity="0.8"/>
    <path d="M42 65 L50 95 L58 65" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="4 4" opacity="0.8"/>
    <path d="M38 75 L62 75 M40 85 L60 85" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" opacity="0.8"/>
    <line x1="28" y1="65" x2="72" y2="65" stroke="#ea580c" strokeWidth="8" strokeLinecap="round"/>
  </svg>
);

const PlayerAvatar = ({ config, className = "w-24 h-24" }) => {
  const { skinTone, hair, hairColor, jersey, bg } = config;
  return (
    <svg viewBox="0 0 100 100" className={`rounded-full shadow-inner ${className}`} style={{ backgroundColor: bg }}>
      <path d="M 15 100 C 15 65, 85 65, 85 100" fill={jersey} />
      <rect x="40" y="60" width="20" height="20" fill={skinTone} />
      <path d="M 40 80 Q 50 90 60 80" fill={skinTone} opacity="0.5" />
      <circle cx="50" cy="45" r="25" fill={skinTone} />
      {hair === 'afro' && <circle cx="50" cy="35" r="28" fill={hairColor} opacity="0.95"/>}
      {hair === 'fade' && <path d="M 25 45 C 25 5, 75 5, 75 45 C 70 20, 30 20, 25 45" fill={hairColor} />}
      {hair === 'dreads' && (
        <g stroke={hairColor} strokeWidth="5" fill="none" strokeLinecap="round">
          <path d="M 28 40 Q 15 65 25 80" />
          <path d="M 35 30 Q 25 60 35 75" />
          <path d="M 65 30 Q 75 60 65 75" />
          <path d="M 72 40 Q 85 65 75 80" />
          <path d="M 25 45 C 25 15, 75 15, 75 45" fill={hairColor} stroke="none" />
        </g>
      )}
      {hair === 'headband' && (
        <g>
          <path d="M 25 45 C 25 15, 75 15, 75 45" fill="#1e293b" />
          <rect x="25" y="28" width="50" height="12" fill={hairColor} />
        </g>
      )}
      <circle cx="40" cy="45" r="2.5" fill="#000" opacity="0.6"/>
      <circle cx="60" cy="45" r="2.5" fill="#000" opacity="0.6"/>
      <path d="M 45 55 Q 50 62 55 55" stroke="#000" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round"/>
    </svg>
  );
};

// --- MOCK DATA ---
const INITIAL_USER = {
  name: "Marcus 'Flash' Johnson",
  handle: "@marcus_j",
  level: 24,
  nftId: "#HD-8892",
  balances: { hd: 1250, sol: 4.5, eth: 0.12 },
  physical: { height: "6'2\"", weight: "190 lbs" },
  avatar: { bg: '#f97316', skinTone: '#b45309', hair: 'dreads', hairColor: '#0f172a', jersey: '#3b82f6' },
  homeCourts: [
    { name: "Rucker Park", location: "Harlem, NY" },
    { name: "West 4th Street Courts", location: "Greenwich Village, NY" },
    { name: "Dyckman Park", location: "Washington Heights, NY" }
  ],
  attributes: [
    { name: 'Aura', value: 92, color: 'bg-yellow-300' },
    { name: 'Riz', value: 88, color: 'bg-pink-400' },
    { name: 'Scoring Ability', value: 91, color: 'bg-red-500' },
    { name: 'Shooting', value: 88, color: 'bg-blue-500' },
    { name: 'Ball Handling', value: 85, color: 'bg-cyan-500' },
    { name: 'Defense', value: 79, color: 'bg-teal-500' },
    { name: 'Speed', value: 94, color: 'bg-yellow-400' },
    { name: 'Leadership', value: 85, color: 'bg-purple-500' },
    { name: 'Professionalism', value: 72, color: 'bg-indigo-400' },
    { name: 'Trash Talking', value: 95, color: 'bg-pink-600' },
    { name: 'Dunking', value: 92, color: 'bg-rose-500' },
  ],
  recentStats: { ppg: 18.5, apg: 6.2, rpg: 4.1 }
};

const MOCK_MATCHES = [
  { id: 1, location: "Rucker Park", distance: "0.8 mi", type: "3v3", stake: "1.5 SOL", status: "Looking for 1", players: 5, maxPlayers: 6 },
  { id: 2, location: "Venice Beach", distance: "2.1 mi", type: "5v5", stake: "500 HD", status: "In Progress", players: 10, maxPlayers: 10 },
  { id: 3, location: "West 4th St", distance: "3.5 mi", type: "3-Pt Shootout", stake: "0.05 ETH", status: "Challenge Open", players: 1, maxPlayers: 2 },
];

const MOCK_LEADERBOARD = [
  { id: 1, name: "Marcus 'Flash' Johnson", handle: "@marcus_j", location: "New York County", winPct: 82, tokens: 1250, ppg: 18.5, avatar: INITIAL_USER.avatar },
  { id: 2, name: "Trey 'Buckets' Smith", handle: "@trey_way", location: "Kings County", winPct: 78, tokens: 940, ppg: 22.1, avatar: { bg: '#3b82f6', skinTone: '#78350f', hair: 'fade', hairColor: '#0f172a', jersey: '#ef4444' } },
  { id: 3, name: "Jordan 'Air' Davis", handle: "@jdavis23", location: "New York County", winPct: 75, tokens: 820, ppg: 16.4, avatar: { bg: '#eab308', skinTone: '#d97706', hair: 'afro', hairColor: '#271003', jersey: '#0f172a' } },
  { id: 4, name: "Chris 'Handles' Paulson", handle: "@cp_handles", location: "Bronx County", winPct: 71, tokens: 650, ppg: 12.8, avatar: { bg: '#22c55e', skinTone: '#fca5a5', hair: 'headband', hairColor: '#ef4444', jersey: '#ffffff' } },
  { id: 5, name: "Zion 'Tank' Williams", handle: "@z_tank", location: "Kings County", winPct: 68, tokens: 500, ppg: 24.5, avatar: { bg: '#a855f7', skinTone: '#451a03', hair: 'dreads', hairColor: '#eab308', jersey: '#f97316' } },
];

const MOCK_CHAT_MESSAGES = [
  { id: 1, sender: '@jdavis23', text: "Anyone at Rucker yet? Got a 3v3 looking for one more.", time: "2m ago", isMe: false },
  { id: 2, sender: '@trey_way', text: "On my way, give me 10 mins.", time: "1m ago", isMe: false },
];

const MOCK_LOCATIONS = {
  "New York": ["New York County", "Kings County", "Bronx County", "Queens County", "Richmond County"],
  "California": ["Los Angeles County", "San Diego County", "San Francisco County"],
  "Illinois": ["Cook County", "DuPage County", "Lake County"],
  "Texas": ["Harris County", "Dallas County", "Travis County"],
  "Florida": ["Miami-Dade County", "Broward County", "Palm Beach County"]
};

const MOCK_FACILITY_TYPES = [
  "Public Park", 
  "High School", 
  "Middle School", 
  "Elementary School", 
  "College", 
  "Military Branch"
];

const MOCK_SPECIFIC_LOCATIONS = {
  "Public Park": ["Rucker Park", "Venice Beach", "West 4th St", "Dyckman Park", "Local Rec Center"],
  "High School": ["Lincoln High", "Washington High", "Central High", "Westside High"],
  "Middle School": ["Oak Creek Middle", "Pine Valley Middle", "Riverside Middle"],
  "Elementary School": ["PS 118", "Sunnydale Elementary", "Maplewood Elementary"],
  "College": ["State University", "City College", "Tech Institute"],
  "Military Branch": ["Army Base Gym", "Naval Station Courts", "Air Force Base Rec"]
};

const AVATAR_OPTIONS = {
  skinTones: ['#fecaca', '#fca5a5', '#f87171', '#d97706', '#b45309', '#78350f', '#451a03', '#271003'],
  hairs: ['bald', 'fade', 'afro', 'dreads', 'headband'],
  colors: ['#0f172a', '#64748b', '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#ffffff'],
};


// --- COMPONENTS ---
const Header = ({ user }) => (
  <div className="flex justify-between md:justify-end items-center p-4 bg-slate-900/90 backdrop-blur-md text-white sticky top-0 z-30 border-b border-slate-800">
    <div className="flex items-center gap-2 md:hidden">
      <div className="bg-slate-800 p-1.5 rounded-lg border border-slate-700">
        <HoopLogo className="w-6 h-6 text-slate-200" />
      </div>
      <h1 className="font-black text-xl tracking-wider text-orange-500 italic">HD</h1>
    </div>
    <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-full border border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer shadow-lg shadow-green-500/10">
      <Wallet size={16} className="text-green-400" />
      <span className="font-mono text-sm font-bold">{user.balances.hd} HD</span>
    </div>
  </div>
);

const Navigation = ({ currentView, setView }) => {
  const navItems = [
    { id: 'home', icon: MapPin, label: 'Courts' },
    { id: 'matches', icon: Activity, label: 'Matches' },
    { id: 'observer', icon: Camera, label: 'Record' },
    { id: 'rankings', icon: Trophy, label: 'Rankings' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <>
      <div className="md:hidden bg-slate-900 border-t border-slate-800 flex justify-around items-center p-3 fixed bottom-0 left-0 right-0 z-40 pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id || (currentView === 'avatar-creator' && item.id === 'profile');
          return (
            <button key={item.id} onClick={() => setView(item.id)} className={`flex flex-col items-center p-2 rounded-xl transition-all ${isActive ? 'text-orange-500 scale-110' : 'text-slate-500 hover:text-slate-300'}`}>
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] mt-1 font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 min-h-screen fixed left-0 top-0 bottom-0 z-40">
        <div className="flex items-center gap-3 p-6 border-b border-slate-800">
          <div className="bg-slate-800 p-2 rounded-xl border border-slate-700 shadow-lg">
            <HoopLogo className="w-8 h-8 text-slate-200" />
          </div>
          <h1 className="font-black text-2xl tracking-wider text-orange-500 italic">HOOP<br/>DREAMS</h1>
        </div>
        <div className="flex flex-col gap-2 p-4 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id || (currentView === 'avatar-creator' && item.id === 'profile');
            return (
              <button key={item.id} onClick={() => setView(item.id)} className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all w-full text-left ${isActive ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-sm font-bold tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

// --- PHASE 4 & 5 MODALS ---

const CourtChatPanel = ({ court, onClose }) => {
  const [messages, setMessages] = useState(MOCK_CHAT_MESSAGES);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if(!input.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: '@marcus_j', text: input, time: 'Just now', isMe: true }]);
    setInput("");
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-slate-900 border-l border-slate-800 shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
        <div>
          <h3 className="font-bold text-white flex items-center gap-2"><MessageSquare size={18} className="text-orange-500"/> Court Chat</h3>
          <p className="text-xs text-slate-400">{court.location}</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full text-slate-400"><X size={20}/></button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
            <span className="text-[10px] text-slate-500 mb-1">{msg.sender} • {msg.time}</span>
            <div className={`p-3 rounded-2xl max-w-[85%] text-sm ${msg.isMe ? 'bg-orange-500 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-900">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Talk trash or coordinate..." 
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500"
          />
          <button onClick={handleSend} className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-xl transition-colors">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const CreateChallengeModal = ({ onClose, showToast }) => {
  const [tab, setTab] = useState('standard');
  const [standardType, setStandardType] = useState('3v3');
  const [challengeType, setChallengeType] = useState('3-Point Shootout');
  const [stake, setStake] = useState("500");
  const [currency, setCurrency] = useState("HD");

  const handleSubmit = () => {
    const gameName = tab === 'standard' ? standardType : challengeType;
    showToast(`New ${gameName} match created for ${stake} ${currency}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden transform animate-in zoom-in-95">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
          <h3 className="text-xl font-black italic text-white flex items-center gap-2">
            <PlusCircle size={22} className="text-orange-500" /> CREATE MATCH
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full text-slate-400"><X size={20}/></button>
        </div>

        <div className="p-6">
          <div className="flex bg-slate-800 rounded-xl p-1 mb-6">
            <button onClick={() => setTab('standard')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${tab === 'standard' ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'text-slate-500 hover:text-slate-300'}`}>Standard Match</button>
            <button onClick={() => setTab('skill')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${tab === 'skill' ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'text-slate-500 hover:text-slate-300'}`}>Skill Challenge</button>
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                {tab === 'standard' ? 'Match Format' : 'Challenge Type'}
              </label>
              {tab === 'standard' ? (
                <select 
                  value={standardType} onChange={(e) => setStandardType(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white font-semibold p-3 rounded-xl focus:outline-none focus:border-orange-500"
                >
                  <option>1v1</option>
                  <option>2v2</option>
                  <option>3v3</option>
                  <option>5v5</option>
                  <option>Twenty One</option>
                </select>
              ) : (
                <select 
                  value={challengeType} onChange={(e) => setChallengeType(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white font-semibold p-3 rounded-xl focus:outline-none focus:border-orange-500"
                >
                  <option>3-Point Shootout</option>
                  <option>H.O.R.S.E.</option>
                  <option>Dunk Contest</option>
                  <option>Skills Challenge</option>
                </select>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Stake Wager</label>
              <div className="flex gap-2">
                <input 
                  type="number" value={stake} onChange={(e) => setStake(e.target.value)}
                  className="flex-1 bg-slate-800 border border-slate-700 text-white font-mono font-bold p-3 rounded-xl focus:outline-none focus:border-orange-500"
                />
                <select 
                  value={currency} onChange={(e) => setCurrency(e.target.value)}
                  className="w-24 bg-slate-800 border border-slate-700 text-orange-400 font-bold p-3 rounded-xl focus:outline-none focus:border-orange-500"
                >
                  <option>HD</option>
                  <option>SOL</option>
                  <option>ETH</option>
                </select>
              </div>
              <p className="text-[10px] text-slate-500 mt-2">Winner takes all. Funds are locked in smart contract until observer verification.</p>
            </div>
          </div>

          <button onClick={handleSubmit} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-black text-lg tracking-widest shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all">
            INITIALIZE MATCH
          </button>
        </div>
      </div>
    </div>
  );
};

const PeerRatingModal = ({ opponent, onClose, onSubmit }) => {
  const softSkills = ['Aura', 'Riz', 'Trash Talking', 'Leadership', 'Professionalism'];
  const [ratings, setRatings] = useState(softSkills.reduce((acc, skill) => ({ ...acc, [skill]: 0 }), {}));

  const handleVote = (skill, val) => setRatings(prev => ({ ...prev, [skill]: prev[skill] === val ? 0 : val }));

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden transform animate-in zoom-in-95">
        <div className="p-6 border-b border-slate-800 flex justify-between items-start bg-slate-800/50">
          <div>
            <h3 className="text-xl font-black italic text-white mb-1">RATE OPPONENT</h3>
            <p className="text-slate-400 text-sm font-mono">{opponent.handle}</p>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-400 transition-colors"><X size={20}/></button>
        </div>
        <div className="p-6">
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 mb-6 flex gap-3">
            <Info className="text-orange-500 shrink-0" size={20} />
            <p className="text-xs text-orange-200/80 leading-relaxed">Community governance shapes player identity. Rate your opponent's soft skills based on this match. Ratings directly affect their NFT Attributes Matrix.</p>
          </div>
          <div className="space-y-3 mb-8">
            {softSkills.map(skill => (
              <div key={skill} className="flex justify-between items-center bg-slate-800 border border-slate-700/50 p-3 rounded-xl">
                <span className="text-white font-bold text-sm tracking-wide">{skill}</span>
                <div className="flex gap-2">
                  <button onClick={() => handleVote(skill, -1)} className={`p-2.5 rounded-lg transition-all ${ratings[skill] === -1 ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}><ThumbsDown size={18}/></button>
                  <button onClick={() => handleVote(skill, 1)} className={`p-2.5 rounded-lg transition-all ${ratings[skill] === 1 ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}><ThumbsUp size={18}/></button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => onSubmit(ratings)} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-black text-lg tracking-widest shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all">SUBMIT RATINGS</button>
        </div>
      </div>
    </div>
  );
};


// --- VIEWS ---

const SplashView = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col items-center justify-center">
      <div className="animate-in fade-in zoom-in duration-700 flex flex-col items-center">
        <div className="relative mb-6">
          <HoopLogo className="w-32 h-32 text-slate-200 drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500 italic tracking-widest text-center">
          HOOP DREAMS
        </h1>
        <p className="text-slate-400 mt-4 font-mono text-sm md:text-base tracking-[0.3em] uppercase">Dream On</p>
      </div>
      <div className="absolute bottom-10">
        <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

const HomeView = ({ showToast }) => {
  const [isMapActive, setIsMapActive] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [facilityType, setFacilityType] = useState("");
  const [specificLocation, setSpecificLocation] = useState("");
  const [locationConfirmed, setLocationConfirmed] = useState(false);

  if (!locationConfirmed) {
    const isRegionValid = (selectedState && selectedCounty) || zipCode.length === 5;
    const isFacilityValid = facilityType && specificLocation;
    const canSubmit = isRegionValid && isFacilityValid;

    return (
      <div className="p-4 md:p-8 animate-in fade-in zoom-in-95 duration-500 max-w-md mx-auto min-h-[75vh] flex flex-col justify-center">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex justify-center mb-4"><div className="bg-orange-500/10 p-4 rounded-full"><MapPin size={40} className="text-orange-500" /></div></div>
          <h2 className="text-2xl font-black italic text-white text-center mb-1">SELECT YOUR ZONE</h2>
          <p className="text-slate-400 text-center text-xs mb-6">Set your region and facility type to find local courts.</p>
          <div className="space-y-4">
            <div className="relative">
              <select className="w-full bg-slate-800 border border-slate-700 text-white text-sm font-semibold p-3.5 rounded-xl appearance-none pr-10 focus:outline-none focus:border-orange-500 transition-all cursor-pointer" value={selectedState} onChange={(e) => { setSelectedState(e.target.value); setSelectedCounty(""); setZipCode(""); }}>
                <option value="" disabled>Choose State</option>
                {Object.keys(MOCK_LOCATIONS).map(state => <option key={state} value={state}>{state}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>
            <div className={`relative transition-all duration-300 ${selectedState ? 'opacity-100 translate-y-0' : 'opacity-50 pointer-events-none'}`}>
              <select className="w-full bg-slate-800 border border-slate-700 text-white text-sm font-semibold p-3.5 rounded-xl appearance-none pr-10 focus:outline-none focus:border-orange-500 transition-all cursor-pointer" value={selectedCounty} onChange={(e) => setSelectedCounty(e.target.value)}>
                <option value="" disabled>Choose County / City</option>
                {selectedState && MOCK_LOCATIONS[selectedState].map(county => <option key={county} value={county}>{county}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>
            <div className="flex items-center gap-4 py-1"><div className="h-px bg-slate-700 flex-1"></div><span className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Or</span><div className="h-px bg-slate-700 flex-1"></div></div>
            <input type="text" placeholder="Enter Zip Code" maxLength="5" className="w-full bg-slate-800 border border-slate-700 text-white text-sm font-semibold p-3.5 rounded-xl focus:outline-none focus:border-orange-500 transition-all" value={zipCode} onChange={(e) => { setZipCode(e.target.value.replace(/\D/g, '')); setSelectedState(""); setSelectedCounty(""); }}/>
            <div className="flex items-center gap-4 py-1 mt-2"><div className="h-px bg-slate-700 flex-1"></div><span className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Facility Details</span><div className="h-px bg-slate-700 flex-1"></div></div>
            <div className="relative">
              <select className="w-full bg-slate-800 border border-slate-700 text-white text-sm font-semibold p-3.5 rounded-xl appearance-none pr-10 focus:outline-none focus:border-orange-500 transition-all cursor-pointer" value={facilityType} onChange={(e) => { setFacilityType(e.target.value); setSpecificLocation(""); }}>
                <option value="" disabled>Choose Facility Type</option>
                {MOCK_FACILITY_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>
            <div className={`relative transition-all duration-300 ${facilityType ? 'opacity-100 translate-y-0' : 'opacity-50 pointer-events-none'}`}>
              <select className="w-full bg-slate-800 border border-slate-700 text-white text-sm font-semibold p-3.5 rounded-xl appearance-none pr-10 focus:outline-none focus:border-orange-500 transition-all cursor-pointer" value={specificLocation} onChange={(e) => setSpecificLocation(e.target.value)}>
                <option value="" disabled>Choose Specific Location</option>
                {facilityType && MOCK_SPECIFIC_LOCATIONS[facilityType].map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>
            <button onClick={() => setLocationConfirmed(true)} disabled={!canSubmit} className={`w-full py-4 rounded-xl font-black text-lg transition-all duration-300 shadow-lg mt-4 ${canSubmit ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>
              ENTER COURTS
            </button>
          </div>
        </div>
      </div>
    );
  }

  const displayZone = zipCode ? `Zip: ${zipCode}` : `${selectedCounty}, ${selectedState}`;

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto relative">
      <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-orange-500/20 p-3 rounded-xl"><MapPin size={24} className="text-orange-500" /></div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Current Zone • {facilityType}</p>
            <p className="text-white font-bold text-sm md:text-base leading-tight">{specificLocation}</p>
            <p className="text-xs text-slate-500 font-mono mt-0.5">{displayZone}</p>
          </div>
        </div>
        <button onClick={() => setLocationConfirmed(false)} className="text-xs font-bold text-orange-500 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors border border-slate-700">
          Change Zone
        </button>
      </div>

      <div className="bg-gradient-to-r from-orange-600 to-purple-600 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-6 -translate-y-2 md:translate-x-4 md:-translate-y-4 opacity-50 md:opacity-80 pointer-events-none">
          <HoopLogo className="w-32 h-32 md:w-48 md:h-48 text-orange-200 drop-shadow-2xl" />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-black italic mb-2 drop-shadow-md">HOOP DREAMS WEEKEND WARRIORS</h2>
          <p className="text-sm md:text-base text-orange-100 mb-6 max-w-[80%] md:max-w-[60%] drop-shadow-sm">Join the high-stakes tournament this Saturday. Double token payouts & scout visibility.</p>
          <button className="bg-white text-orange-600 font-bold px-6 py-3 rounded-full text-sm md:text-base hover:bg-slate-100 transition-colors shadow-lg">
            Register Team
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
            <Activity size={20} className="text-orange-500" /> Live Matches
          </h3>
          <button onClick={() => setIsMapActive(!isMapActive)} className="text-sm text-orange-500 font-semibold bg-slate-800 px-4 py-2 rounded-full hover:bg-slate-700 transition-colors">
            {isMapActive ? "List View" : "Map View"}
          </button>
        </div>
        
        {!isMapActive && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {MOCK_MATCHES.map(match => (
              <div key={match.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex flex-col gap-4 hover:border-slate-600 transition-colors shadow-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-white text-lg flex items-center gap-2">{match.location}</h4>
                    <p className="text-sm text-slate-400">{match.distance} • {match.type}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setActiveChat(match)} className="bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white p-2 rounded-lg transition-colors border border-blue-500/20">
                      <MessageSquare size={16} />
                    </button>
                    <div className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-mono text-green-400 font-bold flex items-center gap-1">
                      <Zap size={14} /> {match.stake}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-700/50">
                  <div className="flex -space-x-2">
                    {[...Array(match.players)].map((_, i) => (<div key={i} className="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-600 flex items-center justify-center text-xs shadow-sm z-10">🏀</div>))}
                    {match.players < match.maxPlayers && (
                      <div className="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-800/50 flex items-center justify-center text-xs text-slate-500 border-dashed z-0">+{match.maxPlayers - match.players}</div>
                    )}
                  </div>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 rounded-xl text-sm transition-colors shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                    {match.status === "In Progress" ? "Spectate" : "Join Match"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {activeChat && <CourtChatPanel court={activeChat} onClose={() => setActiveChat(null)} />}
    </div>
  );
};

const MatchesView = ({ user, showToast, onOpenRating, matchRated }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
        <button onClick={() => setIsCreateModalOpen(true)} className="bg-slate-800 border border-slate-700 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-slate-700 transition-colors group shadow-lg">
          <PlusCircle size={40} className="text-orange-500 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-white">Create Match</span>
        </button>
        <button onClick={() => setIsCreateModalOpen(true)} className="bg-slate-800 border border-slate-700 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-slate-700 transition-colors group shadow-lg">
          <Crosshair size={40} className="text-purple-500 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-white">Skill Challenge</span>
        </button>
      </div>

      <h3 className="text-lg md:text-xl font-bold text-white mb-4">My Active Stakes</h3>
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 md:p-6 shadow-lg max-w-2xl mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <PlayerAvatar config={user.avatar} className="w-12 h-12" />
            <div>
              <p className="text-white font-bold text-base">vs. @jdavis23</p>
              <p className="text-sm text-slate-400">3-Pt Shootout • Venice Beach</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-green-400 font-mono font-bold text-base md:text-lg">2.0 SOL</p>
            <p className="text-xs md:text-sm text-orange-500 mt-1">Pending Validation</p>
          </div>
        </div>
        <button className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
          Manage Stake
        </button>
      </div>

      <h3 className="text-lg md:text-xl font-bold text-white mb-4">Recently Completed</h3>
      <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 md:p-6 shadow-lg max-w-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-bl-full pointer-events-none"></div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <PlayerAvatar config={{ bg: '#3b82f6', skinTone: '#78350f', hair: 'fade', hairColor: '#0f172a', jersey: '#ef4444' }} className="w-12 h-12 border-2 border-slate-600" />
            <div>
              <p className="text-white font-bold text-base">vs. @trey_way</p>
              <p className="text-sm text-slate-400">1v1 • Rucker Park</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-green-400 font-black text-xl italic drop-shadow-md">WIN (21-18)</p>
            <p className="text-xs text-slate-400 mt-1">+1.5 SOL Earned</p>
          </div>
        </div>
        {!matchRated ? (
          <button onClick={() => onOpenRating({ handle: '@trey_way', name: 'Trey Smith' })} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3.5 rounded-xl text-sm transition-colors shadow-lg flex items-center justify-center gap-2">
            <Star size={18} fill="currentColor" /> Rate Opponent to Unlock Next Stake
          </button>
        ) : (
          <div className="w-full bg-slate-900 border border-slate-700 text-slate-400 font-semibold py-3 rounded-xl text-sm text-center flex justify-center items-center gap-2">
            <Check size={18} className="text-green-500" /> Ratings Submitted
          </div>
        )}
      </div>

      {isCreateModalOpen && <CreateChallengeModal onClose={() => setIsCreateModalOpen(false)} showToast={showToast} />}
    </div>
  );
};

const ObserverView = () => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  const [score, setScore] = useState({ A: 14, B: 12 });
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [events, setEvents] = useState([
    { id: 1, time: '04:25', text: "@z_tank scored +2 pts" },
    { id: 2, time: '04:40', text: "@marcus_j recorded an Assist" }
  ]);
  const [playerStats, setPlayerStats] = useState({
    '@marcus_j': { name: "Marcus 'Flash'", pts: 6, reb: 2, ast: 4 },
    '@trey_way': { name: "Trey 'Buckets'", pts: 8, reb: 1, ast: 0 },
    '@z_tank': { name: "Zion 'Tank'", pts: 10, reb: 5, ast: 1 },
    '@cp_handles': { name: "Chris 'Handles'", pts: 2, reb: 0, ast: 6 }
  });

  const TEAM_A = [{ handle: '@marcus_j' }, { handle: '@trey_way' }];
  const TEAM_B = [{ handle: '@z_tank' }, { handle: '@cp_handles' }];

  const logStat = (action, points = 0) => {
    if (!selectedPlayer) return;
    const isTeamA = TEAM_A.some(p => p.handle === selectedPlayer);
    if (points > 0) setScore(prev => ({ ...prev, [isTeamA ? 'A' : 'B']: prev[isTeamA ? 'A' : 'B'] + points }));
    setPlayerStats(prev => {
      const pStats = prev[selectedPlayer];
      return { ...prev, [selectedPlayer]: { ...pStats, pts: pStats.pts + points, [action]: (pStats[action] || 0) + 1 } };
    });
    setEvents(prev => [{ id: Date.now(), time: 'Live', text: `${selectedPlayer} - ${action.toUpperCase()} ${points > 0 ? `(+${points})` : ''}` }, ...prev]);
    setSelectedPlayer(null);
  };

  if (isGameOver) {
    return (
      <div className="p-4 md:p-8 space-y-6 animate-in zoom-in-95 duration-500 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block bg-orange-500/10 p-4 rounded-full mb-4"><FileText size={40} className="text-orange-500" /></div>
          <h2 className="text-3xl font-black italic text-white mb-2">OFFICIAL BOX SCORE</h2>
          <p className="text-slate-400 font-mono text-sm tracking-widest uppercase">Long-Term Memory Vault</p>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-16 -top-16 opacity-5 rotate-12"><Activity size={200} /></div>
          <div className="flex justify-between items-center border-b border-slate-800 pb-8 mb-8 relative z-10">
            <div className="text-center w-2/5"><p className="text-slate-400 font-bold mb-2">TEAM A</p><p className={`text-6xl font-black font-mono ${score.A > score.B ? 'text-green-400' : 'text-white'}`}>{score.A}</p></div>
            <div className="text-center w-1/5"><p className="text-2xl font-black text-slate-600">FINAL</p></div>
            <div className="text-center w-2/5"><p className="text-slate-400 font-bold mb-2">TEAM B</p><p className={`text-6xl font-black font-mono ${score.B > score.A ? 'text-green-400' : 'text-white'}`}>{score.B}</p></div>
          </div>
          <div className="relative z-10">
            <table className="w-full text-left border-collapse">
              <thead><tr className="text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-800"><th className="pb-3">Player</th><th className="pb-3 text-right">PTS</th><th className="pb-3 text-right">REB</th><th className="pb-3 text-right">AST</th></tr></thead>
              <tbody className="text-sm font-semibold">
                {Object.entries(playerStats).map(([handle, stats], idx) => (
                  <tr key={handle} className={`border-b border-slate-800/50 ${idx === 1 ? 'border-b-2 border-b-slate-700 mb-2' : ''}`}>
                    <td className="py-4"><p className="text-white">{stats.name}</p><p className="text-slate-500 text-xs font-mono">{handle}</p></td>
                    <td className="py-4 text-right text-white font-mono text-lg">{stats.pts}</td>
                    <td className="py-4 text-right text-slate-300 font-mono text-lg">{stats.reb}</td>
                    <td className="py-4 text-right text-slate-300 font-mono text-lg">{stats.ast}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black italic tracking-widest py-4 rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all">COMMIT TO BLOCKCHAIN</button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-black italic text-white flex items-center gap-2"><Camera className="text-orange-500" /> OBSERVER HUD</h2>
        <button onClick={() => setIsGameOver(true)} className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-500 hover:text-white transition-colors">End Game</button>
      </div>
      <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsGameActive(!isGameActive)} className={`p-3 rounded-full transition-colors ${isGameActive ? 'bg-orange-500/20 text-orange-500' : 'bg-slate-800 text-white'}`}>
              {isGameActive ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
            </button>
            <div><p className="text-sm font-bold text-slate-400 flex items-center gap-1"><Clock size={14}/> {isGameActive ? 'Q3 • 04:12' : 'PAUSED'}</p></div>
          </div>
          <span className="bg-red-500/20 text-red-500 px-3 py-1 rounded-lg text-xs font-black tracking-widest animate-pulse flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div> LIVE
          </span>
        </div>
        <div className="flex justify-between items-center bg-slate-800 rounded-2xl p-6 mb-8 shadow-inner">
          <div className="text-center w-1/3"><p className="text-sm text-blue-400 font-black tracking-widest mb-2">TEAM A</p><p className="text-5xl md:text-7xl font-black text-white font-mono">{score.A}</p></div>
          <div className="text-center px-4 w-1/3"><p className="text-xl font-bold text-slate-600">VS</p></div>
          <div className="text-center w-1/3"><p className="text-sm text-red-400 font-black tracking-widest mb-2">TEAM B</p><p className="text-5xl md:text-7xl font-black text-white font-mono">{score.B}</p></div>
        </div>
        <div className="mb-6">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">1. Select Player on Floor</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              {TEAM_A.map(p => (
                <button key={p.handle} onClick={() => setSelectedPlayer(p.handle)} className={`w-full text-left p-3 rounded-xl border transition-all ${selectedPlayer === p.handle ? 'bg-blue-500/20 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}>
                  <p className="font-bold text-sm">{playerStats[p.handle].name}</p><p className="text-xs font-mono opacity-60">{p.handle}</p>
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {TEAM_B.map(p => (
                <button key={p.handle} onClick={() => setSelectedPlayer(p.handle)} className={`w-full text-left p-3 rounded-xl border transition-all ${selectedPlayer === p.handle ? 'bg-red-500/20 border-red-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}>
                  <p className="font-bold text-sm">{playerStats[p.handle].name}</p><p className="text-xs font-mono opacity-60">{p.handle}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className={`transition-all duration-300 ${selectedPlayer ? 'opacity-100 scale-100 translate-y-0' : 'opacity-50 scale-95 translate-y-2 pointer-events-none'}`}>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">2. Log Action for {selectedPlayer}</h3>
          <div className="grid grid-cols-4 gap-2 md:gap-4 mb-8">
            <button onClick={() => logStat('pts', 2)} className="bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-xl shadow-lg">+2 PTS</button>
            <button onClick={() => logStat('pts', 3)} className="bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-xl shadow-lg">+3 PTS</button>
            <button onClick={() => logStat('reb')} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 rounded-xl">REB</button>
            <button onClick={() => logStat('ast')} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 rounded-xl">AST</button>
          </div>
        </div>
        <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
          <h3 className="text-xs font-bold text-slate-500 flex items-center gap-2 mb-3"><History size={14}/> Event Log</h3>
          <div className="space-y-2 max-h-32 overflow-y-auto scrollbar-hide">
            {events.slice(0, 5).map(event => (
              <div key={event.id} className="flex gap-4 text-sm border-l-2 border-slate-700 pl-3">
                <span className="text-slate-500 font-mono">{event.time}</span><span className="text-slate-300 font-semibold">{event.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const LeaderboardView = () => {
  const [metric, setMetric] = useState('tokens');
  const [zone, setZone] = useState('All Zones');
  const sortedData = [...MOCK_LEADERBOARD].sort((a, b) => b[metric] - a[metric]);

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-black italic text-white tracking-widest flex items-center gap-2">
            <Trophy className="text-orange-500" size={28} /> REGIONAL RANKINGS
          </h2>
          <p className="text-slate-400 text-sm mt-1">Top players establishing their legacy.</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-slate-800 border border-slate-700 text-white text-sm font-semibold py-2 px-3 rounded-lg focus:outline-none" value={zone} onChange={(e) => setZone(e.target.value)}>
            <option>All Zones</option><option>New York County</option>
          </select>
          <select className="bg-slate-800 border border-slate-700 text-orange-400 text-sm font-semibold py-2 px-3 rounded-lg focus:outline-none" value={metric} onChange={(e) => setMetric(e.target.value)}>
            <option value="tokens">HD Tokens Won</option><option value="winPct">Win Percentage</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 items-end">
        <div className="order-2 md:order-1 bg-slate-800/80 border border-slate-700 rounded-2xl p-6 flex flex-col items-center relative transform md:translate-y-4">
          <div className="absolute -top-4 bg-slate-400 text-slate-900 font-black italic px-3 py-1 rounded-full text-xs shadow-lg flex items-center gap-1"><Medal size={14}/> 2ND</div>
          <PlayerAvatar config={sortedData[1].avatar} className="w-20 h-20 mb-3 border-2 border-slate-400" />
          <h3 className="text-white font-bold text-center leading-tight">{sortedData[1].name}</h3>
          <div className="text-lg font-black text-orange-400 mt-2">{sortedData[1][metric]} {metric === 'winPct' ? '%' : 'HD'}</div>
        </div>
        <div className="order-1 md:order-2 bg-gradient-to-t from-slate-800 to-slate-900 border border-orange-500/50 rounded-2xl p-6 flex flex-col items-center relative shadow-[0_0_30px_rgba(249,115,22,0.15)] z-10">
          <div className="absolute -top-5 bg-orange-500 text-white font-black italic px-4 py-1.5 rounded-full text-sm shadow-[0_0_15px_rgba(249,115,22,0.5)] flex items-center gap-1"><Crown size={16}/> 1ST - KING</div>
          <PlayerAvatar config={sortedData[0].avatar} className="w-24 h-24 mb-3 border-4 border-orange-500" />
          <h3 className="text-white font-bold text-lg text-center leading-tight">{sortedData[0].name}</h3>
          <div className="text-2xl font-black text-orange-500 mt-2">{sortedData[0][metric]} {metric === 'winPct' ? '%' : 'HD'}</div>
        </div>
        <div className="order-3 md:order-3 bg-slate-800/80 border border-slate-700 rounded-2xl p-6 flex flex-col items-center relative transform md:translate-y-8">
          <div className="absolute -top-4 bg-amber-700 text-white font-black italic px-3 py-1 rounded-full text-xs shadow-lg flex items-center gap-1"><Medal size={14}/> 3RD</div>
          <PlayerAvatar config={sortedData[2].avatar} className="w-16 h-16 mb-3 border-2 border-amber-700" />
          <h3 className="text-white font-bold text-sm text-center leading-tight">{sortedData[2].name}</h3>
          <div className="text-lg font-black text-orange-400 mt-2">{sortedData[2][metric]} {metric === 'winPct' ? '%' : 'HD'}</div>
        </div>
      </div>
    </div>
  );
};

const AvatarCreatorView = ({ user, onSave, onCancel }) => {
  const [config, setConfig] = useState({ ...user.avatar });

  const OptionSection = ({ title, options, type }) => (
    <div className="mb-6">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {options.map(opt => {
          const isSelected = config[type] === opt;
          return (
            <button key={opt} onClick={() => setConfig({ ...config, [type]: opt })}
              className={`
                ${title.includes('Color') || title.includes('Skin') ? 'w-10 h-10 rounded-full' : 'px-4 py-2 rounded-xl text-sm font-bold capitalize'} 
                ${isSelected ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-slate-900 border-none' : 'border border-slate-700'} transition-all
              `}
              style={title.includes('Color') || title.includes('Skin') ? { backgroundColor: opt } : { backgroundColor: isSelected ? '#ea580c' : '#1e293b', color: isSelected ? 'white' : '#cbd5e1' }}
            >{!(title.includes('Color') || title.includes('Skin')) && opt}</button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onCancel} className="text-slate-400 hover:text-white font-semibold">Cancel</button>
        <h2 className="text-xl font-black italic text-white tracking-widest">AVATAR CREATOR</h2>
        <button onClick={() => onSave(config)} className="text-orange-500 hover:text-orange-400 font-bold flex items-center gap-1"><Check size={18} /> Save</button>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <PlayerAvatar config={config} className="w-40 h-40 md:w-48 md:h-48 shadow-[0_0_30px_rgba(0,0,0,0.5)]" />
            <div className="absolute -bottom-4 bg-orange-500 text-white text-xs font-black italic px-4 py-1.5 rounded-full shadow-lg border border-orange-400 left-1/2 transform -translate-x-1/2">PREVIEW</div>
          </div>
        </div>
        <div className="space-y-2 mt-8">
          <OptionSection title="Hair Style" options={AVATAR_OPTIONS.hairs} type="hair" />
          <OptionSection title="Hair / Accessory Color" options={AVATAR_OPTIONS.colors} type="hairColor" />
          <OptionSection title="Skin Tone" options={AVATAR_OPTIONS.skinTones} type="skinTone" />
          <OptionSection title="Jersey Color" options={AVATAR_OPTIONS.colors} type="jersey" />
          <OptionSection title="Background Color" options={AVATAR_OPTIONS.colors} type="bg" />
        </div>
      </div>
    </div>
  );
};

const ProfileView = ({ user, showToast, onEditAvatar }) => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = () => {
    setIsSharing(true);
    setTimeout(() => {
      setIsSharing(false);
      showToast("Player Card generated and sent to Instagram Stories!");
    }, 1500);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-12 gap-6 md:gap-8">
        <div className="md:col-span-5 space-y-6">
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 shadow-2xl overflow-hidden group">
            <div className="flex items-start gap-5 mb-8 relative z-10">
              <div className="relative group cursor-pointer" onClick={onEditAvatar}>
                <PlayerAvatar config={user.avatar} className="w-24 h-24 border-4 border-slate-800/50" />
                <div className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit3 size={20} className="text-white mb-1" /><span className="text-[10px] font-bold text-white uppercase tracking-wider">Edit</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <span className="bg-gradient-to-r from-orange-500 to-purple-500 text-transparent bg-clip-text font-black text-xl italic mb-1 block">LVL {user.level}</span>
                  <button onClick={handleShare} disabled={isSharing} className="bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 px-3 py-1.5 rounded-full text-slate-300 hover:text-white transition-colors flex items-center gap-2 shadow-lg">
                    {isSharing ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <><Share2 size={14} /> <span className="text-xs font-bold">Share</span></>}
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-white leading-tight mt-1">{user.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-slate-400 font-mono text-xs">{user.handle}</p>
                  <span className="bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-[9px] font-mono text-slate-300">NFT {user.nftId}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-2 relative z-10 text-center">
              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50"><p className="text-xs text-slate-400 font-bold">PPG</p><p className="text-2xl font-black text-white">{user.recentStats.ppg}</p></div>
              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50"><p className="text-xs text-slate-400 font-bold">APG</p><p className="text-2xl font-black text-white">{user.recentStats.apg}</p></div>
              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50"><p className="text-xs text-slate-400 font-bold">RPG</p><p className="text-2xl font-black text-white">{user.recentStats.rpg}</p></div>
            </div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
             <h3 className="text-base font-bold text-white mb-4">Active Plug-ins</h3>
             <div className="flex flex-wrap gap-2">
                <span className="bg-slate-700 text-sm font-medium text-slate-200 px-4 py-2 rounded-xl border border-slate-600 shadow-sm">Mental Toughness Pro</span>
                <span className="bg-slate-700 text-sm font-medium text-slate-200 px-4 py-2 rounded-xl border border-slate-600 shadow-sm">Elite Ball Handling</span>
             </div>
          </div>
        </div>

        <div className="md:col-span-7 space-y-6">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-5">Attributes Matrix</h3>
            <div className="space-y-3.5 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
              {user.attributes.map((attr, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <span className="text-sm font-semibold text-slate-400 w-32 text-right truncate">{attr.name}</span>
                  <div className="flex-1 h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-700/50 shadow-inner">
                    <div className={`h-full ${attr.color} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${attr.value}%` }} />
                  </div>
                  <span className="text-sm font-mono font-bold text-white w-8 transition-transform group-hover:scale-110 group-hover:text-orange-400">{attr.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2"><MapPin size={18} className="text-orange-500" /> Home Courts (3/3)</h3>
              <button className="text-sm text-orange-500 font-semibold hover:text-orange-400 bg-orange-500/10 px-3 py-1.5 rounded-lg">Edit</button>
            </div>
            <div className="space-y-3">
              {user.homeCourts.map((court, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-700/50 p-4 rounded-xl border border-slate-600/50">
                  <div><p className="text-base font-bold text-slate-200">{court.name}</p><p className="text-sm text-slate-400">{court.location}</p></div>
                  <div className="text-orange-500 bg-orange-500/10 p-2 rounded-lg"><Star size={20} fill="currentColor" /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(INITIAL_USER);
  const [ratingModalOpponent, setRatingModalOpponent] = useState(null);
  const [matchRated, setMatchRated] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const handleSaveAvatar = (newAvatarConfig) => {
    setUser({ ...user, avatar: newAvatarConfig });
    setCurrentView('profile');
  };

  const handleRatingSubmit = (ratings) => {
    setRatingModalOpponent(null);
    setMatchRated(true);
    const simulatedPeerFeedback = { 'Aura': ratings['Aura'] > 0 ? 2 : 1, 'Riz': 1, 'Leadership': ratings['Leadership'] > 0 ? 1 : 0 };
    setTimeout(() => {
      setUser(prev => {
        const updatedAttributes = prev.attributes.map(attr => simulatedPeerFeedback[attr.name] ? { ...attr, value: Math.min(99, attr.value + simulatedPeerFeedback[attr.name]) } : attr);
        return { ...prev, attributes: updatedAttributes };
      });
      showToast("@trey_way rated you back! Your Aura & Riz increased.");
      setCurrentView('profile');
    }, 800);
  };

  const renderView = () => {
    switch (currentView) {
      case 'home': return <HomeView showToast={showToast} />;
      case 'matches': return <MatchesView user={user} showToast={showToast} onOpenRating={setRatingModalOpponent} matchRated={matchRated} />;
      case 'observer': return <ObserverView />;
      case 'rankings': return <LeaderboardView />;
      case 'profile': return <ProfileView user={user} showToast={showToast} onEditAvatar={() => setCurrentView('avatar-creator')} />;
      case 'avatar-creator': return <AvatarCreatorView user={user} onSave={handleSaveAvatar} onCancel={() => setCurrentView('profile')} />;
      default: return <HomeView showToast={showToast} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-orange-500/30 flex overflow-hidden">
      {showSplash && <SplashView onComplete={() => setShowSplash(false)} />}
      
      <Navigation currentView={currentView} setView={setCurrentView} />
      
      <div className="flex-1 flex flex-col relative w-full md:ml-64 h-screen">
        <Header user={user} />
        
        <main className="flex-1 overflow-y-auto pb-24 md:pb-8 scrollbar-hide relative">
          {renderView()}
        </main>

        {ratingModalOpponent && <PeerRatingModal opponent={ratingModalOpponent} onClose={() => setRatingModalOpponent(null)} onSubmit={handleRatingSubmit} />}

        {toastMessage && (
          <div className="absolute top-6 right-4 md:right-8 bg-slate-800 border border-green-500/50 text-white px-6 py-4 rounded-2xl shadow-[0_10px_40px_rgba(34,197,94,0.3)] animate-in slide-in-from-right-8 fade-in duration-300 z-[100] flex items-center gap-3">
            <div className="bg-green-500/20 p-2 rounded-full"><Check className="text-green-400" size={20} /></div>
            <p className="font-bold text-sm">{toastMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
