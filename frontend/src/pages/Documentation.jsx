import React from 'react';
import { Link } from 'react-router-dom';

function Documentation() {
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
          <Link to="/docs" className="flex items-center gap-2 text-sm font-medium text-white hover:text-blue-400 transition drop-shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            Documentation
          </Link>
        </div>

        {/* Right: Spacer */}
        <div className="w-64 pr-2"></div>
      </nav>

      {/* Structural main stays still */}
      <main className="flex-1 flex flex-col items-center px-4 pt-40 pb-20 w-full relative z-10">
        {/* The inner content animates */}
        <div className="w-full max-w-4xl bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/50 animate-fadeInUp">
          
          <div className="border-b border-white/10 pb-6 mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">System Documentation</h1>
            <p className="text-white/60 text-sm mt-2">A clear guide to how the AI Resume Optimizer processes and evaluates your documents.</p>
          </div>
          
          <div className="space-y-10 text-white/80 text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 drop-shadow-sm">1. How It Works</h2>
              <p className="mb-3">The platform uses a React frontend and a Python backend. When you upload a resume, it is sent securely to our servers for AI analysis.</p>
              <p>To protect your privacy, documents are processed entirely in temporary memory. Once the analysis is complete, your file is immediately deleted. We do not save or store any personal applicant data.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 drop-shadow-sm">2. How We Score Resumes</h2>
              <p className="mb-3">We use advanced AI to compare your resume directly against the job description. The system grades your resume based on three main factors:</p>
              <ul className="list-disc pl-5 space-y-2 text-white/70 marker:text-blue-500">
                <li><strong className="text-white/90">Keyword Match:</strong> Checking if your resume includes the core skills, tools, and terms required for the role.</li>
                <li><strong className="text-white/90">ATS Readability:</strong> Ensuring your resume is formatted in a way that standard hiring software can easily read (e.g., clear headers, simple text flow, and no confusing tables).</li>
                <li><strong className="text-white/90">Missing Skills:</strong> Pointing out any important qualifications mentioned in the job description that are absent from your resume.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4 drop-shadow-sm">3. File Requirements</h2>
              <p>For the most accurate results, please upload a standard `.pdf` file created directly from a word processor like Microsoft Word or Google Docs.</p>
              <p className="mt-2 text-white/60">Note: Avoid using scanned images of physical papers or password-protected files, as the AI cannot read them properly, resulting in a score of zero.</p>
            </section>
          </div>

        </div>
      </main>

    </div>
  );
}

export default Documentation;