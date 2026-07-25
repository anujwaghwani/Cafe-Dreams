import React, { useState, useEffect } from 'react';
import { Coffee, Menu as MenuIcon, X } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'book', label: 'Book a Table' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setActiveTab('home')}
        >
          <div className="bg-coffee-600 text-white p-2 rounded-xl group-hover:bg-coffee-700 transition-colors">
            <Coffee size={24} />
          </div>
          <span className={`text-2xl font-display font-bold tracking-tight ${isScrolled ? 'text-espresso' : 'text-white'}`}>
            Cafe Dreams
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`text-sm font-medium transition-all hover:text-coffee-500 relative ${
                activeTab === link.id 
                  ? 'text-coffee-600 font-semibold' 
                  : isScrolled ? 'text-espresso/70' : 'text-white/80'
              }`}
            >
              {link.label}
              {activeTab === link.id && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-coffee-500 rounded-full animate-fade-in" />
              )}
            </button>
          ))}
          <button 
            onClick={() => setActiveTab('book')}
            className="bg-coffee-600 hover:bg-coffee-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Order Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`${isScrolled ? 'text-espresso' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full glass bg-white border-t border-gray-100 shadow-xl py-4 flex flex-col px-6 gap-4 animate-slide-up md:hidden">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActiveTab(link.id);
                setIsMobileMenuOpen(false);
              }}
              className={`text-left text-lg font-medium py-2 ${
                activeTab === link.id ? 'text-coffee-600' : 'text-espresso'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
