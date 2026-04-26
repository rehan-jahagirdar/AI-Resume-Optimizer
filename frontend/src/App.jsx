import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Documentation from './pages/Documentation';
import Result from './pages/Result';

// 1. The invisible helper component that forces the scroll to the top
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      {/* 2. Place it right inside the Router so it listens to all route changes */}
      <ScrollToTop /> 
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;