import React, { useState, useEffect } from 'react';
import { 
  Trophy, User, MapPin, PlusCircle, Activity, 
  Wallet, Camera, Video, ChevronRight, Zap, 
  Shield, Star, Flame, Users, ChevronDown, Edit3, Check
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
      {/* Shoulders/Jersey */}
      <path d="M 15 100 C 15 65, 85 65, 85 100" fill={jersey} />
      {/* Neck */}
      <rect x="40" y="60" width="20" height="20" fill={skinTone} />
      <path d="M 40 80 Q 50 90 60 80" fill={skinTone} opacity="0.5" />
      {/* Head */}
      <circle cx="50" cy="45" r="25" fill={skinTone} />
      {/* Hair / Headwear */}
      {hair === 'afro' && <circle cx="50" cy="35" r="28" fill={hairColor} opacity="0.95"/>}
      {hair === 'fade' && (
        <path d="M 25 45 C 25 5, 75 5, 75 45 C 70 20, 30 20, 25 45" fill={hairColor} />
      )}
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
      {/* Face */}
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
  avatar: {
    bg: '#f97316', // Orange
    skinTone: '#b45309', // Medium Brown
    hair: 'dreads',
    hairColor: '#0f172a', // Dark Slate
    jersey: '#3b82f6' // Blue
  },
  homeCourts: [
    { name: "Rucker Park", location: "Harlem, NY" },
    { name: "West 4th Street Courts", location: "Greenwich Village, NY" },
    { name: "Dyckman Park", location: "Washington Heights, NY" }
  ],
  attributes: [
    { name: 'Scoring Ability', value: 91, color: 'bg-red-500' },
    { name: 'Shooting', value: 88, color: 'bg-blue-500' },
    { name: 'Passing', value: 76, color: 'bg-green-500' },
    { name: 'Ball Handling', value: 85, color: 'bg-cyan-500' },
    { name: 'Court Awareness', value: 82, color: 'bg-indigo-500' },
    { name: 'Defense', value: 79, color: 'bg-teal-500' },
    { name: 'Rebounding', value: 65, color: 'bg-emerald-500' },
    { name: 'Speed', value: 94, color: 'bg-yellow-400' },
    { name: 'Strength', value: 72, color: 'bg-orange-500' },
    { name: 'Mental Toughness', value: 89, color: 'bg-stone-500' },
    { name: 'Leadership', value: 85, color: 'bg-purple-500' },
    { name: 'Trash Talking', value: 95, color: 'bg-pink-500' },
    { name: 'Dunking', value: 92, color: 'bg-rose-500' },
  ],
  recentStats: { ppg: 18.5, apg: 6.2, rpg: 4.1 }
};

const MOCK_MATCHES = [
  { id: 1, location: "Rucker Park", distance: "0.8 mi", type: "3v3", stake: "1.5 SOL", status: "Looking for 1", players: 5, maxPlayers: 6 },
  { id: 2, location: "Venice Beach", distance: "2.1 mi", type: "5v5", stake: "500 HD", status: "In Progress", players: 10, maxPlayers: 10 },
  { id: 3, location: "West 4th St", distance: "3.5 mi", type: "1v1", stake: "0.05 ETH", status: "Challenge Open", players: 1, maxPlayers: 2 },
];

const MOCK_LOCATIONS = {
  "New York": ["New York County (Manhattan)", "Kings County (Brooklyn)", "Bronx County", "Queens County", "Richmond County"],
  "California": ["Los Angeles County", "San Diego County", "San Francisco County", "Orange County"],
  "Illinois": ["Cook County", "DuPage County", "Lake County"],
  "Texas": ["Harris County", "Dallas County", "Travis County", "Bexar County"],
  "Florida": ["Miami-Dade County", "Broward County", "Palm Beach County"]
};

// --- AVATAR CONFIG OPTIONS ---
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
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <>
      <div className="md:hidden bg-slate-900 border-t border-slate-800 flex justify-around items-center p-3 fixed bottom-0 left-0 right-0 z-50 pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id || (currentView === 'avatar-creator' && item.id === 'profile');
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                isActive ? 'text-orange-500 scale-110' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
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
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all w-full text-left ${
                  isActive ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
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
        <p className="text-slate-400 mt-4 font-mono text-sm md:text-base tracking-[0.3em] uppercase">
          The Story of the Player
        </p>
      </div>
      <div className="absolute bottom-10">
        <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

const HomeView = () => {
  const [isMapActive, setIsMapActive] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [locationConfirmed, setLocationConfirmed] = useState(false);

  if (!locationConfirmed) {
    return (
      <div className="p-6 md:p-12 animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto w-full">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 w-full shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="bg-orange-500/10 p-4 rounded-full">
              <MapPin size={48} className="text-orange-500" />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-black italic text-white text-center mb-2">SELECT YOUR ZONE</h2>
          <p className="text-slate-400 text-center text-sm md:text-base mb-8">Set your location to find local courts and active matches.</p>

          <div className="space-y-4">
            <div className="relative">
              <select 
                className="w-full bg-slate-800 border border-slate-700 text-white font-semibold p-4 rounded-xl appearance-none pr-10 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all cursor-pointer"
                value={selectedState}
                onChange={(e) => { setSelectedState(e.target.value); setSelectedCounty(""); setZipCode(""); }}
              >
                <option value="" disabled>Choose State</option>
                {Object.keys(MOCK_LOCATIONS).map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
            </div>

            <div className={`relative transition-all duration-300 ${selectedState ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-2 pointer-events-none'}`}>
              <select 
                className="w-full bg-slate-800 border border-slate-700 text-white font-semibold p-4 rounded-xl appearance-none pr-10 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all cursor-pointer"
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                disabled={!selectedState}
              >
                <option value="" disabled>Choose County</option>
                {selectedState && MOCK_LOCATIONS[selectedState].map(county => (
                  <option key={county} value={county}>{county}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
            </div>

            <div className="flex items-center gap-4 py-2">
              <div className="h-px bg-slate-700 flex-1"></div>
              <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">Or</span>
              <div className="h-px bg-slate-700 flex-1"></div>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Enter Zip Code"
                maxLength="5"
                className="w-full bg-slate-800 border border-slate-700 text-white font-semibold p-4 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                value={zipCode}
                onChange={(e) => {
                  setZipCode(e.target.value.replace(/\D/g, ''));
                  setSelectedState("");
                  setSelectedCounty("");
                }}
              />
            </div>

            <button 
              onClick={() => setLocationConfirmed(true)}
              disabled={!(selectedState && selectedCounty) && zipCode.length < 5}
              className={`w-full py-4 rounded-xl font-black text-lg transition-all duration-300 shadow-lg mt-4 ${
                (selectedState && selectedCounty) || zipCode.length === 5
                  ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              ENTER COURTS
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-orange-500/20 p-2 rounded-lg">
            <MapPin size={20} className="text-orange-500" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Current Zone</p>
            <p className="text-white font-semibold text-sm md:text-base">
              {zipCode ? `Zip Code: ${zipCode}` : `${selectedCounty}, ${selectedState}`}
            </p>
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
        <div className="absolute top-0 right-0 transform translate-x-6 -translate-y-2 md:translate-x-4 md:-translate-y-4 opacity-50 md:opacity-80">
          <div className="relative pointer-events-none">
            <HoopLogo className="w-32 h-32 md:w-48 md:h-48 text-orange-200 drop-shadow-2xl" />
          </div>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-black italic mb-2 drop-shadow-md">WEEKEND WARRIORS</h2>
          <p className="text-sm md:text-base text-orange-100 mb-6 max-w-[80%] md:max-w-[60%] drop-shadow-sm">Join the high-stakes tournament this Saturday. Double token payouts & scout visibility.</p>
          <button className="bg-white text-orange-600 font-bold px-6 py-3 rounded-full text-sm md:text-base hover:bg-slate-100 transition-colors shadow-lg">
            Register Team
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
            <Activity size={20} className="text-orange-500" /> {isMapActive ? "Court Map" : "Live Matches"}
          </h3>
          <button 
            onClick={() => setIsMapActive(!isMapActive)}
            className="text-sm text-orange-500 font-semibold bg-slate-800 px-4 py-2 rounded-full hover:bg-slate-700 transition-colors"
          >
            {isMapActive ? "List View" : "Map View"}
          </button>
        </div>
        
        {isMapActive ? (
          <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 flex flex-col shadow-xl">
            <iframe 
              title="court-map"
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(85%)' }}
              src="https://www.openstreetmap.org/export/embed.html?bbox=-74.015,40.71,-73.96,40.75&layer=mapnik&marker=40.73,-73.98" 
            />
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] md:w-auto pointer-events-none">
              <button className="w-full md:w-auto bg-orange-500 text-white px-6 py-4 rounded-xl font-bold shadow-[0_10px_20px_rgba(249,115,22,0.3)] flex justify-center items-center gap-2 hover:bg-orange-600 transition-all pointer-events-auto">
                <MapPin size={20} /> Mark New Court Location
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {MOCK_MATCHES.map(match => (
              <div key={match.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex flex-col gap-4 hover:border-slate-600 transition-colors shadow-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-white text-lg">{match.location}</h4>
                    <p className="text-sm text-slate-400">{match.distance} • {match.type}</p>
                  </div>
                  <div className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-mono text-green-400 font-bold flex items-center gap-1">
                    <Zap size={14} /> {match.stake}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-700/50">
                  <div className="flex -space-x-2">
                    {[...Array(match.players)].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-600 flex items-center justify-center text-xs shadow-sm">
                        🏀
                      </div>
                    ))}
                    {match.players < match.maxPlayers && (
                      <div className="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-800/50 flex items-center justify-center text-xs text-slate-500 border-dashed">
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
    </div>
  );
};

const MatchesView = ({ user }) => (
  <div className="p-4 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
      <button className="bg-slate-800 border border-slate-700 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-slate-700 transition-colors group shadow-lg">
        <PlusCircle size={40} className="text-orange-500 group-hover:scale-110 transition-transform" />
        <span className="font-bold text-white">Create Match</span>
      </button>
      <button className="bg-slate-800 border border-slate-700 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-slate-700 transition-colors group shadow-lg">
        <Shield size={40} className="text-purple-500 group-hover:scale-110 transition-transform" />
        <span className="font-bold text-white">Challenge</span>
      </button>
    </div>

    <h3 className="text-lg md:text-xl font-bold text-white mb-4">My Active Stakes</h3>
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 md:p-6 shadow-lg max-w-2xl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <PlayerAvatar config={user.avatar} className="w-12 h-12" />
          <div>
            <p className="text-white font-bold text-base">vs. @street_king</p>
            <p className="text-sm text-slate-400">1v1 • Venice Beach</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-green-400 font-mono font-bold text-base md:text-lg">2.0 SOL</p>
          <p className="text-xs md:text-sm text-orange-500 mt-1">Starts in 45m</p>
        </div>
      </div>
      <button className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
        Manage Stake
      </button>
    </div>
  </div>
);

const ObserverView = () => (
  <div className="p-4 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-white mb-2">Sideline Observer Mode</h2>
      <p className="text-base text-slate-400">Record stats, manage sub-ins, earn HD tokens</p>
    </div>

    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <span className="bg-red-500/20 text-red-500 px-3 py-1.5 rounded-lg text-xs font-bold animate-pulse flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div> LIVE
        </span>
        <span className="text-slate-400 text-sm md:text-base font-medium">Rucker Park • 3v3</span>
      </div>

      <div className="flex justify-between items-center bg-slate-800 rounded-2xl p-6 mb-6 shadow-inner">
        <div className="text-center w-1/3">
          <p className="text-sm text-slate-400 font-bold mb-2">TEAM A</p>
          <p className="text-5xl md:text-7xl font-black text-white font-mono">14</p>
        </div>
        <div className="text-center px-4 w-1/3 border-x border-slate-700/50">
          <p className="text-sm text-slate-500 mb-2">Q3 • 04:12</p>
          <p className="text-xl md:text-2xl font-bold text-orange-500 bg-orange-500/10 py-1 rounded-lg">VS</p>
        </div>
        <div className="text-center w-1/3">
          <p className="text-sm text-slate-400 font-bold mb-2">TEAM B</p>
          <p className="text-5xl md:text-7xl font-black text-white font-mono">12</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 py-4 md:py-6 rounded-2xl flex flex-col items-center justify-center gap-2 transition-colors text-white shadow-md hover:shadow-lg">
          <Video size={24} className="text-blue-400" />
          <span className="text-sm font-bold">Record Clip</span>
        </button>
        <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 py-4 md:py-6 rounded-2xl flex flex-col items-center justify-center gap-2 transition-colors text-white shadow-md hover:shadow-lg">
          <Activity size={24} className="text-green-400" />
          <span className="text-sm font-bold">Log Stat</span>
        </button>
      </div>

      <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6">
        <h4 className="text-orange-500 font-bold text-base mb-2 flex items-center gap-2">
          <Users size={20} /> Sideline Substitution Available
        </h4>
        <p className="text-sm text-slate-300 mb-4">Player "@mike_j" needs to leave. Slot open for Team A.</p>
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-base transition-colors shadow-lg">
          Sub In & Take Over Stake
        </button>
      </div>
    </div>
  </div>
);

const AvatarCreatorView = ({ user, onSave, onCancel }) => {
  const [config, setConfig] = useState({ ...user.avatar });

  const OptionSection = ({ title, options, type }) => (
    <div className="mb-6">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {options.map(opt => {
          const isSelected = config[type] === opt;
          return (
            <button
              key={opt}
              onClick={() => setConfig({ ...config, [type]: opt })}
              className={`
                ${title.includes('Color') || title.includes('Skin') ? 'w-10 h-10 rounded-full' : 'px-4 py-2 rounded-xl text-sm font-bold capitalize'} 
                ${isSelected ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-slate-900 border-none' : 'border border-slate-700'} 
                transition-all
              `}
              style={title.includes('Color') || title.includes('Skin') ? { backgroundColor: opt } : { 
                backgroundColor: isSelected ? '#ea580c' : '#1e293b',
                color: isSelected ? 'white' : '#cbd5e1'
              }}
            >
              {!(title.includes('Color') || title.includes('Skin')) && opt}
            </button>
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
        <button 
          onClick={() => onSave(config)} 
          className="text-orange-500 hover:text-orange-400 font-bold flex items-center gap-1"
        >
          <Check size={18} /> Save
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <PlayerAvatar config={config} className="w-40 h-40 md:w-48 md:h-48 shadow-[0_0_30px_rgba(0,0,0,0.5)]" />
            <div className="absolute -bottom-4 bg-orange-500 text-white text-xs font-black italic px-4 py-1.5 rounded-full shadow-lg border border-orange-400 left-1/2 transform -translate-x-1/2">
              PREVIEW
            </div>
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

const ProfileView = ({ user, onEditAvatar }) => (
  <div className="p-4 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
    <div className="grid md:grid-cols-12 gap-6 md:gap-8">
      
      {/* Left Column */}
      <div className="md:col-span-5 space-y-6">
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 shadow-2xl overflow-hidden">
          
          <div className="flex items-start gap-5 mb-8 relative z-10">
            {/* Dynamic Avatar Display */}
            <div className="relative group cursor-pointer" onClick={onEditAvatar}>
              <PlayerAvatar config={user.avatar} className="w-24 h-24 border-4 border-slate-800/50" />
              <div className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Edit3 size={20} className="text-white mb-1" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Edit</span>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <span className="bg-gradient-to-r from-orange-500 to-purple-500 text-transparent bg-clip-text font-black text-xl italic mb-1 block">
                  LVL {user.level}
                </span>
                <div className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-[10px] font-mono text-slate-300 shadow-inner">
                  NFT {user.nftId}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white leading-tight">{user.name}</h2>
              <p className="text-slate-400 font-mono text-xs mt-1">{user.handle} • {user.physical.height} • {user.physical.weight}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-2 relative z-10 text-center">
            <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50 backdrop-blur-sm">
              <p className="text-xs text-slate-400 font-bold">PPG</p>
              <p className="text-2xl font-black text-white">{user.recentStats.ppg}</p>
            </div>
            <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50 backdrop-blur-sm">
              <p className="text-xs text-slate-400 font-bold">APG</p>
              <p className="text-2xl font-black text-white">{user.recentStats.apg}</p>
            </div>
            <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50 backdrop-blur-sm">
              <p className="text-xs text-slate-400 font-bold">RPG</p>
              <p className="text-2xl font-black text-white">{user.recentStats.rpg}</p>
            </div>
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

      {/* Right Column */}
      <div className="md:col-span-7 space-y-6">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-5">Attributes Matrix</h3>
          <div className="space-y-3.5 max-h-64 md:max-h-none overflow-y-auto pr-2 scrollbar-hide">
            {user.attributes.map((attr, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="text-sm font-semibold text-slate-400 w-32 text-right truncate">{attr.name}</span>
                <div className="flex-1 h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-700/50 shadow-inner">
                  <div 
                    className={`h-full ${attr.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${attr.value}%` }}
                  />
                </div>
                <span className="text-sm font-mono font-bold text-white w-8">{attr.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MapPin size={18} className="text-orange-500" /> Home Courts (3/3)
            </h3>
            <button className="text-sm text-orange-500 font-semibold hover:text-orange-400 bg-orange-500/10 px-3 py-1.5 rounded-lg">Edit</button>
          </div>
          <div className="space-y-3">
            {user.homeCourts.map((court, idx) => (
              <div key={idx} className="flex justify-between items-center bg-slate-700/50 p-4 rounded-xl border border-slate-600/50">
                <div>
                  <p className="text-base font-bold text-slate-200">{court.name}</p>
                  <p className="text-sm text-slate-400">{court.location}</p>
                </div>
                <div className="text-orange-500 bg-orange-500/10 p-2 rounded-lg">
                  <Star size={20} fill="currentColor" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Wallet size={20} className="text-orange-500" /> Digital Wallet & Assets
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-700 p-5 rounded-xl shadow-inner">
              <p className="text-xs text-slate-400 font-bold mb-1">SOLANA (SOL)</p>
              <p className="text-2xl font-mono font-bold text-white">{user.balances.sol}</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 p-5 rounded-xl shadow-inner">
              <p className="text-xs text-slate-400 font-bold mb-1">ETHEREUM (ETH)</p>
              <p className="text-2xl font-mono font-bold text-white">{user.balances.eth}</p>
            </div>
            <div className="col-span-2 bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 p-5 rounded-xl flex justify-between items-center mt-2 shadow-inner">
              <div>
                <p className="text-xs text-slate-400 font-bold mb-1">HOOP DREAMS TOKENS</p>
                <p className="text-2xl font-mono font-bold text-green-400">{user.balances.hd} HD</p>
              </div>
              <button className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-xl transition-colors shadow-sm">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(INITIAL_USER);

  const handleSaveAvatar = (newAvatarConfig) => {
    setUser({ ...user, avatar: newAvatarConfig });
    setCurrentView('profile');
  };

  const renderView = () => {
    switch (currentView) {
      case 'home': return <HomeView />;
      case 'matches': return <MatchesView user={user} />;
      case 'observer': return <ObserverView />;
      case 'profile': return <ProfileView user={user} onEditAvatar={() => setCurrentView('avatar-creator')} />;
      case 'avatar-creator': return <AvatarCreatorView user={user} onSave={handleSaveAvatar} onCancel={() => setCurrentView('profile')} />;
      default: return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-orange-500/30 flex">
      {showSplash && <SplashView onComplete={() => setShowSplash(false)} />}
      
      <Navigation currentView={currentView} setView={setCurrentView} />
      
      <div className="flex-1 flex flex-col relative w-full md:ml-64 min-h-screen">
        <Header user={user} />
        
        <main className="flex-1 overflow-y-auto pb-24 md:pb-8 scrollbar-hide">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
