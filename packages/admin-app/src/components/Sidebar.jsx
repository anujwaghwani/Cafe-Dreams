import React from 'react';
import { LayoutDashboard, ShoppingBag, Coffee, Settings, LogOut, X } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'menu', label: 'Menu Items', icon: Coffee },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={`w-64 bg-white border-r border-slate-200 h-screen fixed left-0 top-0 flex flex-col z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-brand-500 text-white p-2 rounded-lg">
            <Coffee size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-admin-900">Cafe Dreams</h1>
            <p className="text-xs text-slate-500 font-medium">Admin Portal</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="md:hidden p-1 text-slate-400 hover:text-slate-600">
          <X size={20} />
        </button>
      </div>

      <div className="p-4 flex-1">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">Management</p>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-brand-50 text-brand-600' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-admin-900'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-brand-500' : 'text-slate-400'} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
