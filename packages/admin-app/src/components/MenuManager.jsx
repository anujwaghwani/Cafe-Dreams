import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Filter, Image as ImageIcon } from 'lucide-react';

// Hardcoded mock data for the UI
const mockCategories = ["Beverages", "Starters", "Chinese Rice", "Noodles", "Sandwich", "Burger", "Pizza"];
const mockItems = [
  { id: 91, name: 'Coffee', price: 40, category: 'Beverages', status: 'active', img: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=200&q=80' },
  { id: 92, name: 'Tea', price: 30, category: 'Beverages', status: 'active', img: '/chai.png' },
  { id: 1, name: 'Veg Manchurian', price: 110, category: 'Starters', status: 'active' },
  { id: 2, name: 'Chilli Fries', price: 130, category: 'Starters', status: 'inactive' },
  { id: 10, name: 'Veg Noodles', price: 100, category: 'Noodles', status: 'active' },
  { id: 25, name: 'Veg Burger', price: 80, category: 'Burger', status: 'active' },
  { id: 45, name: 'Margherita Pizza', price: 130, category: 'Pizza', status: 'active' },
];

export default function MenuManager() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = mockItems.filter(item => 
    (activeCategory === "All" || item.category === activeCategory) &&
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Menu Manager</h1>
          <p className="text-slate-500 text-sm mt-1">Manage categories, items, pricing, and availability.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search items..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-bold hover:bg-brand-700 transition-colors whitespace-nowrap shadow-sm shadow-brand-600/20">
            <Plus size={18} />
            <span className="hidden md:inline">Add Item</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 flex-1 overflow-hidden">
        {/* Categories Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs">Categories</h3>
            <button className="text-brand-600 hover:text-brand-700 p-1"><Plus size={16}/></button>
          </div>
          <div className="space-y-1 overflow-y-auto custom-scrollbar flex-1 pb-4">
            <button 
              onClick={() => setActiveCategory("All")}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === "All" ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              All Items
            </button>
            {mockCategories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-4 hover:shadow-md transition-shadow group relative">
                {item.img && (
                  <div className="w-20 h-20 rounded-xl bg-slate-100 flex-shrink-0 overflow-hidden flex items-center justify-center border border-slate-100">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-slate-900 truncate text-sm">{item.name}</h4>
                  </div>
                  <div className="text-xs font-semibold text-slate-400 mb-2">{item.category}</div>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-800">₹{item.price}</span>
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${item.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* Hover Actions */}
                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                  <button className="p-1.5 bg-white border border-slate-200 text-slate-600 hover:text-brand-600 rounded-lg shadow-sm">
                    <Edit2 size={14} />
                  </button>
                  <button className="p-1.5 bg-white border border-slate-200 text-slate-600 hover:text-rose-600 rounded-lg shadow-sm">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
            
            {filteredItems.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-400 font-medium border-2 border-dashed border-slate-200 rounded-2xl">
                No items found in this category.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
