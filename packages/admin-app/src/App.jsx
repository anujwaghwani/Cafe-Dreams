import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-admin-50 flex font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 min-h-screen">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab !== 'dashboard' && (
          <div className="p-8 max-w-7xl mx-auto flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-2xl font-bold text-admin-900 mb-2 capitalize">{activeTab}</h2>
            <p className="text-slate-500">This module is under construction.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
