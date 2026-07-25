import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const mockMenu = [
  {
    id: 1,
    name: 'Artisan Espresso',
    description: 'Double shot of our signature house blend with notes of dark chocolate and cherry.',
    price: 4.50,
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    name: 'Vanilla Bean Latte',
    description: 'Espresso with steamed milk and real Madagascar vanilla bean syrup.',
    price: 5.75,
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    name: 'Pour Over',
    description: 'Single-origin Ethiopian beans manually brewed for a clean, bright cup.',
    price: 6.00,
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1495474472201-411a0bb3b378?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    name: 'Almond Croissant',
    description: 'Flaky butter pastry filled with almond frangipane and topped with sliced almonds.',
    price: 4.80,
    category: 'Pastries',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
  },
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', ...new Set(mockMenu.map(item => item.category))];
  
  const filteredMenu = activeCategory === 'All' 
    ? mockMenu 
    : mockMenu.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto animate-fade-in">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-espresso mb-4">Our Menu</h2>
        <p className="text-lg text-espresso/70 max-w-2xl mx-auto">
          Carefully crafted beverages and freshly baked goods, made with love.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeCategory === category 
                ? 'bg-coffee-600 text-white shadow-md' 
                : 'bg-white text-espresso/70 hover:bg-coffee-50 border border-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMenu.map((item, i) => (
          <div 
            key={item.id} 
            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group animate-slide-up border border-gray-100"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="h-64 overflow-hidden relative">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full font-bold text-espresso shadow-sm">
                ${item.price.toFixed(2)}
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-display font-bold text-espresso">{item.name}</h3>
              </div>
              <p className="text-espresso/70 leading-relaxed mb-6">
                {item.description}
              </p>
              
              <button className="w-full flex items-center justify-center gap-2 bg-cream text-espresso hover:bg-coffee-600 hover:text-white py-3 rounded-xl font-medium transition-colors group-hover:shadow-md">
                <Plus size={20} />
                Add to Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
