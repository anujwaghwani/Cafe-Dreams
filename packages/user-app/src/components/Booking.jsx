import React, { useState } from 'react';
import { Calendar, Users, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

const Booking = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    email: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto animate-fade-in flex flex-col justify-center">
      
      {step < 3 && (
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-espresso mb-4">Reserve a Table</h2>
          <p className="text-lg text-espresso/70 max-w-lg mx-auto">
            Book your perfect spot for work, meetings, or catching up with friends.
          </p>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden border border-gray-100">
        
        {/* Progress Bar */}
        {step < 3 && (
          <div className="flex gap-2 mb-10">
            <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-coffee-500' : 'bg-gray-100'}`} />
            <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-coffee-500' : 'bg-gray-100'}`} />
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleSubmit} className="space-y-8 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-espresso flex items-center gap-2">
                  <Calendar size={18} className="text-coffee-500"/> Date
                </label>
                <input 
                  type="date" 
                  required
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-cream border-none rounded-xl p-4 focus:ring-2 focus:ring-coffee-400 outline-none transition-shadow text-espresso"
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-semibold text-espresso flex items-center gap-2">
                  <Clock size={18} className="text-coffee-500"/> Time
                </label>
                <input 
                  type="time" 
                  required
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                  className="w-full bg-cream border-none rounded-xl p-4 focus:ring-2 focus:ring-coffee-400 outline-none transition-shadow text-espresso"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-espresso flex items-center gap-2">
                <Users size={18} className="text-coffee-500"/> Number of Guests
              </label>
              <select 
                value={formData.guests}
                onChange={e => setFormData({...formData, guests: e.target.value})}
                className="w-full bg-cream border-none rounded-xl p-4 focus:ring-2 focus:ring-coffee-400 outline-none transition-shadow text-espresso"
              >
                {[1,2,3,4,5,6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="w-full bg-coffee-600 hover:bg-coffee-700 text-white p-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-lg shadow-coffee-600/30 transform hover:-translate-y-1 mt-8">
              Continue <ArrowRight size={20} />
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-8 animate-slide-up">
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-espresso">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-cream border-none rounded-xl p-4 focus:ring-2 focus:ring-coffee-400 outline-none transition-shadow text-espresso"
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-semibold text-espresso">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-cream border-none rounded-xl p-4 focus:ring-2 focus:ring-coffee-400 outline-none transition-shadow text-espresso"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="w-1/3 bg-cream text-espresso p-4 rounded-xl font-bold hover:bg-gray-200 transition-colors"
              >
                Back
              </button>
              <button 
                type="submit" 
                className="w-2/3 bg-coffee-600 hover:bg-coffee-700 text-white p-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-lg shadow-coffee-600/30 transform hover:-translate-y-1"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="text-center py-12 animate-slide-up">
            <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-3xl font-display font-bold text-espresso mb-4">Booking Confirmed!</h3>
            <p className="text-lg text-espresso/70 mb-8 max-w-md mx-auto">
              We've saved a beautiful table for {formData.guests} on {new Date(formData.date).toLocaleDateString()} at {formData.time}. See you soon, {formData.name}!
            </p>
            <button 
              onClick={() => {
                setStep(1);
                setFormData({date: '', time: '', guests: '2', name: '', email: ''});
              }}
              className="text-coffee-600 font-semibold hover:text-coffee-700 underline"
            >
              Make another booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
