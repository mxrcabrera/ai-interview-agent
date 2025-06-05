import React, { useState, useEffect } from 'react';

const App = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f9fafb'}}>
      <nav className="nav">
        <div className="container">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">🤖 AI Interview Agent</h1>
            <div className="flex space-x-4">
              <button 
                className={`btn ${currentView === 'dashboard' ? 'btn-primary' : ''}`}
                onClick={() => setCurrentView('dashboard')}
              >
                Dashboard
              </button>
              <button 
                className={`btn ${currentView === 'setup' ? 'btn-primary' : ''}`}
                onClick={() => setCurrentView('setup')}
              >
                New Interview
              </button>
              <button 
                className={`btn ${currentView === 'interview' ? 'btn-primary' : ''}`}
                onClick={() => setCurrentView('interview')}
              >
                Interview
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container" style={{padding: '2rem 1rem'}}>
        {currentView === 'dashboard' && (
          <div className="space-y-4">
            <h2 className="text-2xl mb-6">📊 Dashboard</h2>
            <div className="grid grid-3">
              <div className="card text-center">
                <h3>👥 Total Interviews</h3>
                <p className="text-2xl">24</p>
              </div>
              <div className="card text-center">
                <h3>⏱️ Avg Duration</h3>
                <p className="text-2xl">18m</p>
              </div>
              <div className="card text-center">
                <h3>🧠 AI Insights</h3>
                <p className="text-2xl">156</p>
              </div>
            </div>
            
            <div className="card">
              <h3 className="mb-4">Recent Interviews</h3>
              <div className="space-y-4">
                <div style={{padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.5rem'}}>
                  <strong>Sarah Johnson</strong> - Tech Sector Analysis (22m)
                </div>
                <div style={{padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.5rem'}}>
                  <strong>Michael Chen</strong> - ESG Strategy (18m)
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'setup' && (
          <div style={{maxWidth: '600px', margin: '0 auto'}}>
            <div className="card">
              <h2 className="text-2xl mb-6 text-center">🎯 Setup Interview</h2>
              <div className="space-y-4">
                <div>
                  <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>
                    Participant Name
                  </label>
                  <input type="text" placeholder="Enter name..." />
                </div>
                <div>
                  <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>
                    Topic
                  </label>
                  <select>
                    <option>Investment Research</option>
                    <option>ESG Analysis</option>
                    <option>Tech Sector</option>
                  </select>
                </div>
                <button 
                  className="btn btn-primary" 
                  style={{width: '100%', marginTop: '1rem'}}
                  onClick={() => setCurrentView('interview')}
                >
                  ▶️ Start Interview
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'interview' && (
          <div style={{maxWidth: '800px', margin: '0 auto'}}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`avatar ${isActive ? 'speaking' : ''}`}>
                  <span style={{fontSize: '2rem', color: 'white'}}>🤖</span>
                </div>
                <div>
                  <h2 className="text-2xl">AI Interviewer</h2>
                  <p className="text-gray-600">Investment Research Session</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span style={{fontFamily: 'monospace', fontSize: '1.25rem'}}>
                  ⏱️ {formatTime(timer)}
                </span>
                <button 
                  className="btn btn-danger"
                  onClick={() => {
                    setIsActive(false);
                    setTimer(0);
                  }}
                >
                  ⏹️ End
                </button>
              </div>
            </div>

            <div className="card">
              <div style={{borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', marginBottom: '1rem'}}>
                <h3>Question 1 of 5</h3>
                <span style={{backgroundColor: '#f3f4f6', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.875rem'}}>
                  Market Outlook
                </span>
              </div>
              
              <div className="space-y-4">
                <p style={{fontSize: '1.125rem', marginBottom: '1.5rem'}}>
                  "What's your current investment thesis for the technology sector in 2025?"
                </p>
                
                <div className="text-center space-y-4">
                  {!isActive ? (
                    <button 
                      className="btn btn-success"
                      onClick={() => setIsActive(true)}
                    >
                      ▶️ Start Recording
                    </button>
                  ) : (
                    <div>
                      <button 
                        className="btn btn-primary"
                        onClick={() => setIsActive(!isActive)}
                      >
                        🎤 {isActive ? 'Stop Recording' : 'Start Recording'}
                      </button>
                      <p style={{marginTop: '1rem', color: '#6b7280'}}>
                        {isActive ? '🔴 Recording...' : 'Click to record your response'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {isActive && (
              <div className="card mt-4">
                <h3>💡 AI Follow-up Suggestions</h3>
                <div className="space-y-4 mt-4">
                  <div style={{backgroundColor: '#f9fafb', padding: '0.75rem', borderRadius: '0.5rem'}}>
                    Can you elaborate on specific subsectors?
                  </div>
                  <div style={{backgroundColor: '#f9fafb', padding: '0.75rem', borderRadius: '0.5rem'}}>
                    What are the key risks you see?
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;