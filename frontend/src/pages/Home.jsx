import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

function Home() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Upgraded word counter: only counts strings that contain at least one letter or number
  const wordCount = jobDescription.trim().split(/\s+/).filter(word => /[a-zA-Z0-9]/.test(word)).length;
  
  // Boolean check: Are both the resume provided AND job description >= 50 valid words?
  const isReady = file !== null && wordCount >= 50;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
    onDrop: acceptedFiles => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
        toast.success("Resume attached.", { 
          position: "top-center",
          style: { background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } 
        });
      } else {
        toast.error("Please upload a valid PDF.", { 
          position: "top-center",
          style: { background: 'rgba(255, 0, 0, 0.2)', backdropFilter: 'blur(10px)', color: '#fff', border: '1px solid rgba(255,0,0,0.2)' } 
        });
      }
    }
  });

  const handleAnalyze = async (e) => {
    e.preventDefault();
    
    if (!file) {
      toast.error("Please upload your resume.", { 
        position: "top-center",
        style: { background: 'rgba(255, 0, 0, 0.2)', backdropFilter: 'blur(10px)', color: '#fff', border: '1px solid rgba(255,0,0,0.2)' } 
      });
      return;
    }
    
    if (wordCount < 50) {
      toast.error(`Job description needs ${50 - wordCount} more words.`, { 
        position: "top-center",
        style: { background: 'rgba(255, 165, 0, 0.2)', backdropFilter: 'blur(10px)', color: '#fff', border: '1px solid rgba(255,165,0,0.2)' } 
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('job_description', jobDescription);

    try {
      const response = await axios.post('http://127.0.0.1:8000/upload-resume/', formData);
      
      toast.success("Analysis complete.", { 
        position: "top-center",
        style: { background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } 
      });
      navigate('/result', { state: { result: response.data.results } });
      
    } catch (err) {
      toast.error(err.response?.data?.detail || "Server error.", { 
        position: "top-center",
        style: { background: 'rgba(255, 0, 0, 0.2)', backdropFilter: 'blur(10px)', color: '#fff', border: '1px solid rgba(255,0,0,0.2)' } 
      });
      setLoading(false);
    }
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
          <Link to="/" className="flex items-center gap-2 text-sm font-medium text-white hover:text-blue-400 transition drop-shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Home
          </Link>
          <Link to="/docs" className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-blue-400 transition drop-shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            Documentation
          </Link>
        </div>

        {/* Right: Spacer */}
        <div className="w-64 pr-2"></div>
      </nav>

      {/* Structural main stays still */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 pt-40 pb-20 w-full relative z-10">
        
        {/* The inner content animates */}
        <div className="w-full max-w-2xl animate-fadeInUp">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 drop-shadow-lg">
              Match your Resume.
            </h1>
            <p className="text-white/60 text-sm md:text-base max-w-lg mx-auto">
              Upload your PDF and paste the job description. Our AI engine will grade your ATS readability and highlight missing requirements.
            </p>
          </div>

          {/* Form Card */}
          <form onSubmit={handleAnalyze} className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/50 relative z-20">
            <div className="space-y-6">
              
              {/* Dropzone */}
              <div>
                <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2 drop-shadow-sm">
                  1. Resume (PDF)
                </label>
                <div 
                  {...getRootProps()} 
                  className={`w-full flex flex-col items-center justify-center p-8 border border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
                    isDragActive ? 'border-blue-400/50 bg-blue-500/10' : 'border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <input {...getInputProps()} />
                  {file ? (
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                      <span className="text-sm font-semibold text-white/90">{file.name}</span>
                    </div>
                  ) : (
                    <p className="text-sm text-white/50">Drag & drop your PDF, or <span className="text-blue-400 hover:text-blue-300 transition">click to browse</span></p>
                  )}
                </div>
              </div>

              {/* Textarea */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="block text-xs font-medium text-white/50 uppercase tracking-wider drop-shadow-sm">
                    2. Job Description
                  </label>
                  {/* Live Word Counter */}
                  <span className={`text-xs font-medium transition-colors ${wordCount >= 50 ? 'text-green-400' : 'text-white/30'}`}>
                    {wordCount} / 50 words min
                  </span>
                </div>
                <textarea 
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the target role requirements here (minimum 50 words)..."
                  className="w-full h-36 p-5 bg-white/5 border border-white/10 rounded-2xl focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition text-sm text-white/90 placeholder-white/30 resize-none shadow-inner"
                ></textarea>
              </div>

              {/* Dynamic Submit Button */}
              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-2xl font-bold text-sm transition-all duration-500 flex justify-center items-center gap-2 backdrop-blur-md disabled:opacity-50 disabled:cursor-not-allowed ${
                    isReady 
                      ? 'bg-white/90 text-black shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:bg-white scale-[1.02] border border-transparent' 
                      : 'bg-white/5 border border-white/10 text-white/40 hover:bg-white/10 shadow-lg'
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Match"
                  )}
                </button>
              </div>

            </div>
          </form>

        </div>
      </main>

    </div>
  );
}

export default Home;