import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  // If there's a backend error, show it
  if (result?.error) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4 text-red-400">Analysis Failed</h2>
        <p className="mb-6 text-white/70 max-w-lg text-center">{result.error}</p>
        <button onClick={() => navigate('/')} className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition">
          Go back to Upload
        </button>
      </div>
    );
  }

  // If someone navigates to /result without uploading a resume, send them back
  if (!result) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">No Analysis Data Found</h2>
        <button onClick={() => navigate('/')} className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition">
          Go back to Upload
        </button>
      </div>
    );
  }

  // Helper function to color code the Match Score with a glowing drop-shadow
  const getScoreColor = (scoreStr) => {
    const score = parseInt(scoreStr);
    if (isNaN(score)) return 'text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]';
    if (score >= 75) return 'text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]';
    if (score >= 40) return 'text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]';
    return 'text-red-400 drop-shadow-[0_0_15px_rgba(248,113,113,0.5)]';
  };

  // Helper function to color code the ATS Readability
  const getAtsColor = (level) => {
    if (!level) return 'text-white';
    const lower = level.toLowerCase();
    if (lower.includes('excellent') || lower.includes('good')) return 'text-green-400';
    if (lower.includes('average')) return 'text-yellow-400';
    return 'text-red-400';
  };

  // Helper function to safely render suggestions whether it's a string or an object
  const renderSuggestions = (suggestions) => {
    if (!suggestions) return "No suggestions provided.";
    if (typeof suggestions === 'string') return suggestions;
    if (typeof suggestions === 'object') {
      return Object.entries(suggestions)
        .map(([key, value]) => {
          const valStr = Array.isArray(value) ? value.map(v => `• ${v}`).join('\n') : String(value);
          return `${key}\n${valStr}`;
        })
        .join('\n\n');
    }
    return String(suggestions);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col w-full relative overflow-x-hidden">
      
      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none z-0"></div>

      {/* Floating Glass Nav */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-5xl px-4 py-3 flex justify-between items-center border border-white/10 bg-white/5 backdrop-blur-xl rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
        
        {/* Left: Custom Coded Logo */}
        <div className="flex items-center gap-3 pl-2 w-64">
          <div className="w-9 h-9 flex items-center justify-center shrink-0">
            <svg className="w-8 h-8 drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C12 2 12 10 20 12C12 14 12 22 12 22C12 22 12 14 4 12C12 10 12 2 12 2Z" fill="url(#ai-gradient)"/>
              <defs>
                <linearGradient id="ai-gradient" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3B82F6"/>
                  <stop offset="1" stopColor="#9333EA"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="font-bold text-lg tracking-wide text-white drop-shadow-md hidden sm:block whitespace-nowrap">
            <span className="text-blue-400">AI</span> Resume Optimizer
          </span>
        </div>
        
        {/* Center: Links */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-blue-400 transition drop-shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Home
          </Link>
          <Link to="/docs" className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-blue-400 transition drop-shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            Documentation
          </Link>
        </div>
        <div className="w-64 pr-2"></div>
      </nav>

      {/* Structural main stays still */}
      <main className="flex-1 flex flex-col items-center px-4 pt-36 pb-20 w-full relative z-10">
        
        {/* The inner content animates */}
        <div className="w-full max-w-5xl animate-fadeInUp">
          
          {/* Header Action */}
          <div className="flex justify-between items-end mb-8 px-2">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-md">
                {result.is_resume === false ? "Analysis Failed" : "Analysis Complete"}
              </h1>
              <p className="text-white/50 text-sm mt-1">
                {result.is_resume === false ? "We encountered an issue with your submission." : "Here is your detailed AI assessment."}
              </p>
            </div>
            <button onClick={() => navigate('/')} className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition flex items-center gap-2 backdrop-blur-sm shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              New Scan
            </button>
          </div>

          {result.is_resume === false ? (
            <div className="bg-red-500/10 border border-red-500/20 backdrop-blur-xl rounded-3xl p-8 shadow-lg shadow-black/40 flex flex-col items-center justify-center text-center py-20 animate-fadeIn">
              <svg className="w-20 h-20 text-red-400 mb-6 drop-shadow-[0_0_15px_rgba(248,113,113,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Validation Error</h2>
              <p className="text-white/80 max-w-lg text-lg leading-relaxed">
                {(typeof result.suggestions === 'string' ? result.suggestions : '').replace("ERROR: ", "")}
              </p>
              <button onClick={() => navigate('/')} className="mt-10 px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Top Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                
                {/* Match Score Card */}
                <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col justify-center items-center shadow-lg shadow-black/40 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h3 className="text-white/50 uppercase tracking-widest text-xs font-bold mb-4 z-10">Match Score</h3>
                  <span className={`text-7xl font-extrabold z-10 ${getScoreColor(result.match_score)}`}>
                    {result.match_score}
                  </span>
                </div>

                {/* ATS Readability Card */}
                <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col justify-center items-center shadow-lg shadow-black/40 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h3 className="text-white/50 uppercase tracking-widest text-xs font-bold mb-4 z-10">ATS Score & Readability</h3>
                  <div className="flex flex-col items-center z-10">
                    <span className={`text-5xl font-bold drop-shadow-md ${getAtsColor(result.ats_label)}`}>
                      {result.ats_score ?? 0}/100
                    </span>
                    <span className={`text-lg font-semibold mt-2 ${getAtsColor(result.ats_label)} opacity-90`}>
                      {result.ats_label || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Missing Keywords & Suggestions Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                
                {/* Keywords */}
                <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-lg shadow-black/40 lg:col-span-1">
                  <div className="flex items-center gap-2 mb-6">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    <h3 className="text-lg font-semibold text-white drop-shadow-sm">Missing Keywords</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(result.missing_keywords) && result.missing_keywords.length > 0 ? (
                      result.missing_keywords.map((keyword, index) => (
                        <span key={index} className="bg-white/5 border border-white/10 text-white/80 px-3 py-1.5 rounded-lg text-sm shadow-sm backdrop-blur-md">
                          {keyword}
                        </span>
                      ))
                    ) : (
                      <span className="text-green-400 text-sm">✓ All primary keywords detected!</span>
                    )}
                  </div>
                </div>

                {/* AI Suggestions */}
                <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-lg shadow-black/40 lg:col-span-2">
                  <div className="flex items-center gap-2 mb-6">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                    <h3 className="text-lg font-semibold text-white drop-shadow-sm">AI Suggestions</h3>
                  </div>
                  <div className="text-white/70 leading-relaxed text-sm whitespace-pre-wrap">
                    {renderSuggestions(result.suggestions)}
                  </div>
                </div>

              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
}

export default Result;