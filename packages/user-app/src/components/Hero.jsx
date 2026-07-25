import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = ({ setActiveTab }) => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=2000)' }}
      >
        <div className="absolute inset-0 bg-espresso/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <div className="inline-block px-4 py-1.5 rounded-full glass-dark text-coffee-200 text-sm font-medium tracking-wide mb-6 animate-fade-in">
          Welcome to your second home
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight animate-slide-up" style={{ animationDelay: '100ms' }}>
          Where every sip <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-coffee-300 to-coffee-500">
            tells a story.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '200ms' }}>
          Experience artisanal coffee, freshly baked pastries, and an atmosphere designed for moments of pure inspiration.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <button 
            onClick={() => setActiveTab('menu')}
            className="group flex items-center justify-center gap-2 bg-coffee-600 hover:bg-coffee-500 text-white px-8 py-4 rounded-full font-medium text-lg transition-all shadow-xl hover:shadow-coffee-500/30 transform hover:-translate-y-1"
          >
            Explore Menu
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => setActiveTab('book')}
            className="glass-dark hover:bg-white/10 text-white px-8 py-4 rounded-full font-medium text-lg transition-all border border-white/20 transform hover:-translate-y-1"
          >
            Book a Table
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
