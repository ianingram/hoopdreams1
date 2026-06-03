import React, { useState, useEffect } from 'react';
import { 
  Trophy, User, MapPin, PlusCircle, Activity, 
  Wallet, Camera, Video, ChevronRight, Zap, 
  Shield, Star, Flame, Users, ChevronDown, Edit3, Check,
  Crown, Medal, TrendingUp, ThumbsUp, ThumbsDown, X, Info,
  Play, Pause, Clock, FileText, History, MessageSquare, 
  Send, Share2, Target, Crosshair
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
  const [tab, setTab] = useState('standard'); // 'standard' or 'skill'
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
}


// --- VIEWS ---

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
          <div className="flex justify-center mb-4">
            <div className="bg-orange-500/10 p-4 rounded-full">
              <MapPin size={40} className="text-orange-500" />
            </div>
          </div>
          <h2 className="text-2xl font-black italic text-white text-center mb-1">SELECT YOUR ZONE</h2>
          <p className="text-slate-400 text-center text-xs mb-6">Set your region and facility type to find local courts.</p>

          <div className="space-y-4">
            <div className="relative">
              <select 
                className="w-full bg-slate-800 border border-slate-700 text-white text-sm font-semibold p-3.5 rounded-xl appearance-none pr-10 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all cursor-pointer"
                value={selectedState}
                onChange={(e) => { setSelectedState(e.target.value); setSelectedCounty(""); setZipCode(""); }}
              >
                <option value="" disabled>Choose State</option>
                {Object.keys(MOCK_LOCATIONS).map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>

            <div className={`relative transition-all duration-300 ${selectedState ? 'opacity-100 translate-y-0' : 'opacity-50 pointer-events-none'}`}>
              <select 
                className="w-full bg-slate-800 border border-slate-700 text-white text-sm font-semibold p-3.5 rounded-xl appearance-none pr-10 focus:outline-none focus:border-orange-500 transition-all cursor-pointer"
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
              >
                <option value="" disabled>Choose County / City</option>
                {selectedState && MOCK_LOCATIONS[selectedState].map(county => (
                  <option key={county} value={county}>{county}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>

            <div className="flex items-center gap-4 py-1">
              <div className="h-px bg-slate-700 flex-1"></div>
              <span className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Or</span>
              <div className="h-px bg-slate-700 flex-1"></div>
            </div>

            <input
              type="text"
              placeholder="Enter Zip Code"
              maxLength="5"
              className="w-full bg-slate-800 border border-slate-700 text-white text-sm font-semibold p-3.5 rounded-xl focus:outline-none focus:border-orange-500 transition-all"
              value={zipCode}
              onChange={(e) => { setZipCode(e.target.value.replace(/\D/g, '')); setSelectedState(""); setSelectedCounty(""); }}
            />

            <div className="flex items-center gap-4 py-1 mt-2">
              <div className="h-px bg-slate-700 flex-1"></div>
              <span className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Facility Details</span>
              <div className="h-px bg-slate-700 flex-1"></div>
            </div>

            <div className="relative">
              <select 
                className="w-full bg-slate-800 border border-slate-700 text-white text-sm font-semibold p-3.5 rounded-xl appearance-none pr-10 focus:outline-none focus:border-orange-500 transition-all cursor-pointer"
                value={facilityType}
                onChange={(e) => { setFacilityType(e.target.value); setSpecificLocation(""); }}
              >
                <option value="" disabled>Choose Facility Type</option>
                {MOCK_FACILITY_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>

            <div className={`relative transition-all duration-300 ${facilityType ? 'opacity-100 translate-y-0' : 'opacity-50 pointer-events-none'}`}>
              <select 
                className="w-full bg-slate-800 border border-slate-700 text-white text-sm font-semibold p-3.5 rounded-xl appearance-none pr-10 focus:outline-none focus:border-orange-500 transition-all cursor-pointer"
                value={specificLocation}
                onChange={(e) => setSpecificLocation(e.target.value)}
              >
                <option value="" disabled>Choose Specific Location</option>
                {facilityType && MOCK_SPECIFIC_LOCATIONS[facilityType].map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>

            <button 
              onClick={() => setLocationConfirmed(true)}
              disabled={!canSubmit}
              className={`w-full py-4 rounded-xl font-black text-lg transition-all duration-300 shadow-lg mt-4 ${
                canSubmit ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]' : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
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
        <button 
          onClick={() => setLocationConfirmed(false)}
          className="text-xs font-bold text-orange-500 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors border border-slate-700"
        >
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
                    <h4 className="font-bold text-white text-lg flex items-center gap-2">
                      {match.location} 
                    </h4>
                    <p className="text-sm text-slate-400">{match.distance} • {match.type}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* PHASE 4: Court Chat Trigger */}
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
                    {[...Array(match.players)].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-600 flex items-center justify-center text-xs shadow-sm z-10">🏀</div>
                    ))}
                    {match.players < match.maxPlayers && (
                      <div className="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-800/50 flex items-center justify-center text-xs text-slate-500 border-dashed z-0">
                        +{match.maxPlayers - match.players}
                      </div>
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
      
      {/* PHASE 4: Overlay Chat Panel */}
      {activeChat && <CourtChatPanel court={activeChat} onClose={() => setActiveChat(null)} />}
    </div>
  );
};

const MatchesView = ({ user, showToast }) => {
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

      {isCreateModalOpen && <CreateChallengeModal onClose={() => setIsCreateModalOpen(false)} showToast={showToast} />}
    </div>
  );
};

const ProfileView = ({ user, showToast }) => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = () => {
    setIsSharing(true);
    // Simulate image rendering process
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
              <PlayerAvatar config={user.avatar} className="w-24 h-24 border-4 border-slate-800/50" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <span className="bg-gradient-to-r from-orange-500 to-purple-500 text-transparent bg-clip-text font-black text-xl italic mb-1 block">
                    LVL {user.level}
                  </span>
                  
                  {/* PHASE 4: Share to Socials */}
                  <button 
                    onClick={handleShare}
                    disabled={isSharing}
                    className="bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 px-3 py-1.5 rounded-full text-slate-300 hover:text-white transition-colors flex items-center gap-2 shadow-lg"
                  >
                    {isSharing ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <><Share2 size={14} /> <span className="text-xs font-bold">Share</span></>
                    )}
                  </button>

                </div>
                <h2 className="text-2xl font-bold text-white leading-tight mt-1">{user.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-slate-400 font-mono text-xs">{user.handle}</p>
                  <span className="bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-[9px] font-mono text-slate-300">
                    NFT {user.nftId}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-2 relative z-10 text-center">
              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50"><p className="text-xs text-slate-400 font-bold">PPG</p><p className="text-2xl font-black text-white">{user.recentStats.ppg}</p></div>
              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50"><p className="text-xs text-slate-400 font-bold">APG</p><p className="text-2xl font-black text-white">{user.recentStats.apg}</p></div>
              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50"><p className="text-xs text-slate-400 font-bold">RPG</p><p className="text-2xl font-black text-white">{user.recentStats.rpg}</p></div>
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
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(INITIAL_USER);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const renderView = () => {
    switch (currentView) {
      case 'home': return <HomeView showToast={showToast} />;
      case 'matches': return <MatchesView user={user} showToast={showToast} />;
      case 'profile': return <ProfileView user={user} showToast={showToast} />;
      default: return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-orange-500/30 flex overflow-hidden">
      <Navigation currentView={currentView} setView={setCurrentView} />
      
      <div className="flex-1 flex flex-col relative w-full md:ml-64 h-screen">
        <Header user={user} />
        
        <main className="flex-1 overflow-y-auto pb-24 md:pb-8 scrollbar-hide relative">
          {renderView()}
        </main>

        {/* Global Toast Notification System */}
        {toastMessage && (
          <div className="absolute top-6 right-4 md:right-8 bg-slate-800 border border-green-500/50 text-white px-6 py-4 rounded-2xl shadow-[0_10px_40px_rgba(34,197,94,0.3)] animate-in slide-in-from-right-8 fade-in duration-300 z-[100] flex items-center gap-3">
            <div className="bg-green-500/20 p-2 rounded-full">
              <Check className="text-green-400" size={20} />
            </div>
            <p className="font-bold text-sm">{toastMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
