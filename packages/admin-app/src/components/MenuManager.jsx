import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Power, Image as ImageIcon, X } from 'lucide-react';

const initialCategories = ["Beverages", "Starters", "Chinese Rice", "Noodles", "Sandwich", "Burger", "Pizza"];
const initialItems = [
  { id: 91, name: 'Coffee', price: 40, category: 'Beverages', status: 'active', img: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=200&q=80' },
  { id: 92, name: 'Tea', price: 30, category: 'Beverages', status: 'active', img: '/chai.png' },
  { id: 1, name: 'Veg Manchurian', price: 110, category: 'Starters', status: 'active' },
  { id: 2, name: 'Chilli Fries', price: 130, category: 'Starters', status: 'inactive' },
  { id: 10, name: 'Veg Noodles', price: 100, category: 'Noodles', status: 'active' },
  { id: 25, name: 'Veg Burger', price: 80, category: 'Burger', status: 'active' },
  { id: 45, name: 'Margherita Pizza', price: 130, category: 'Pizza', status: 'active' },
];

export default function MenuManager() {
  const [categories, setCategories] = useState(initialCategories);
  const [items, setItems] = useState(initialItems);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', price: '', category: 'Beverages', status: 'active' });

  const filteredItems = items.filter(item => 
    (activeCategory === "All" || item.category === activeCategory) &&
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;
    setItems([{
      id: Date.now(),
      name: newItem.name,
      price: Number(newItem.price),
      category: newItem.category,
      status: newItem.status
    }, ...items]);
    setIsModalOpen(false);
    setNewItem({ name: '', price: '', category: categories[0], status: 'active' });
  };

  const toggleStatus = (id) => {
    setItems(items.map(i => i.id === id ? { ...i, status: i.status === 'active' ? 'inactive' : 'active' } : i));
  };

  const deleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setItems(items.filter(i => i.id !== id));
    }
  };

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4 flex-shrink-0">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Menu Manager</h1>
          <p className="text-slate-500 text-xs md:text-sm mt-1">Manage categories, items, pricing, and availability.</p>
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
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-bold hover:bg-brand-700 transition-colors whitespace-nowrap shadow-sm shadow-brand-600/20"
          >
            <Plus size={18} />
            <span className="hidden md:inline">Add Item</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8 flex-1 overflow-hidden pb-8">
        {/* Categories Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs">Categories</h3>
            <button className="text-brand-600 hover:text-brand-700 p-1" title="Add Category"><Plus size={16}/></button>
          </div>
          {/* Mobile horizontal scroll for categories, desktop vertical */}
          <div className="flex md:flex-col gap-2 md:space-y-1 overflow-x-auto md:overflow-y-auto custom-scrollbar flex-shrink-0 md:flex-1 pb-2 md:pb-4">
            <button 
              onClick={() => setActiveCategory("All")}
              className={`flex-shrink-0 md:w-full text-left px-4 md:px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === "All" ? 'bg-slate-800 text-white shadow-sm' : 'bg-white md:bg-transparent border md:border-transparent border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              All Items
            </button>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 md:w-full text-left px-4 md:px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-slate-800 text-white shadow-sm' : 'bg-white md:bg-transparent border md:border-transparent border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 md:pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map(item => (
              <div key={item.id} className={`bg-white border ${item.status === 'active' ? 'border-slate-200' : 'border-slate-200 bg-slate-50 opacity-75'} p-4 rounded-2xl flex items-center gap-4 hover:shadow-md transition-all group relative`}>
                {item.img && (
                  <div className={`w-20 h-20 rounded-xl bg-slate-100 flex-shrink-0 overflow-hidden flex items-center justify-center border border-slate-100 ${item.status === 'inactive' ? 'grayscale' : ''}`}>
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-bold truncate text-sm ${item.status === 'active' ? 'text-slate-900' : 'text-slate-500 line-through'}`}>{item.name}</h4>
                  </div>
                  <div className="text-xs font-semibold text-slate-400 mb-2">{item.category}</div>
                  <div className="flex items-center justify-between">
                    <span className={`font-black ${item.status === 'active' ? 'text-slate-800' : 'text-slate-400'}`}>₹{item.price}</span>
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${item.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* Hover Actions */}
                <div className="absolute right-2 top-2 md:opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                  <button onClick={() => toggleStatus(item.id)} className="p-1.5 bg-white border border-slate-200 text-slate-600 hover:text-brand-600 rounded-lg shadow-sm" title="Toggle Status">
                    <Power size={14} />
                  </button>
                  <button onClick={() => deleteItem(item.id)} className="p-1.5 bg-white border border-slate-200 text-slate-600 hover:text-rose-600 rounded-lg shadow-sm" title="Delete">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
            
            {filteredItems.length === 0 && (
              <div className="col-span-full py-16 text-center text-slate-400 font-medium border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 flex flex-col items-center">
                <p>No items found in this category.</p>
                <button onClick={() => setIsModalOpen(true)} className="mt-4 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-lg hover:bg-slate-50 shadow-sm">Add a new item</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50">
              <h2 className="font-bold text-lg text-slate-900">Add New Item</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddItem} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Item Name</label>
                <input 
                  type="text" 
                  required
                  value={newItem.name}
                  onChange={e => setNewItem({...newItem, name: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="e.g. Garlic Bread"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Price (₹)</label>
                  <input 
                    type="number" 
                    required
                    value={newItem.price}
                    onChange={e => setNewItem({...newItem, price: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="e.g. 150"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Category</label>
                  <select 
                    value={newItem.category}
                    onChange={e => setNewItem({...newItem, category: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Status</label>
                <select 
                  value={newItem.status}
                  onChange={e => setNewItem({...newItem, status: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                >
                  <option value="active">Active (Available)</option>
                  <option value="inactive">Inactive (Out of Stock)</option>
                </select>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-100 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-brand-600 text-white hover:bg-brand-700 shadow-sm shadow-brand-600/20 transition-colors"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
