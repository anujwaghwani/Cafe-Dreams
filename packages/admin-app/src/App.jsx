import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import OrdersList from './components/OrdersList';
import MenuManager from './components/MenuManager';
import Settings from './components/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-admin-50 flex font-sans">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className="flex-1 md:ml-64 min-h-screen flex flex-col">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-admin-900">Cafe Dreams</h1>
          </div>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600">
            <Menu size={24} />
          </button>
        </div>

        <div className="flex-1 h-[calc(100vh-65px)] md:h-screen overflow-y-auto md:overflow-hidden">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'orders' && <OrdersList />}
          {activeTab === 'menu' && <MenuManager />}
          {activeTab === 'settings' && <Settings />}
        </div>
      </main>
    </div>
  );
}

export default App;
