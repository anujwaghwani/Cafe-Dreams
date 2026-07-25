import React, { useState } from 'react';
import { Save, Store, CreditCard, Clock, BellRing } from 'lucide-react';

export default function Settings() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Settings saved successfully!");
    }, 1000);
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto h-full overflow-y-auto custom-scrollbar pb-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Configure your cafe preferences and operational details.</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-bold hover:bg-brand-700 transition-colors shadow-sm shadow-brand-600/20"
        >
          {isSaving ? (
            <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> Saving...</span>
          ) : (
            <><Save size={18} /> Save Changes</>
          )}
        </button>
      </div>

      <div className="space-y-6">
        
        {/* General Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Store size={20} />
            </div>
            <h2 className="font-bold text-slate-800">General Information</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Cafe Name</label>
                <input type="text" defaultValue="Cafe Dreams" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Contact Number</label>
                <input type="tel" defaultValue="+91 9876543210" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Cafe Address</label>
              <textarea rows="2" defaultValue="123 Coffee Street, Food District" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"></textarea>
            </div>
          </div>
        </div>

        {/* Payment Configuration */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
              <CreditCard size={20} />
            </div>
            <h2 className="font-bold text-slate-800">Payment Configuration</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">UPI ID (For QR Scanner)</label>
              <input type="text" defaultValue="cafedreams@upi" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent" />
              <p className="text-xs text-slate-500 mt-2">This UPI ID is used to dynamically generate the payment QR code for customers.</p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <input type="checkbox" id="tax" defaultChecked className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500" />
              <label htmlFor="tax" className="text-sm font-semibold text-slate-700">Apply GST (5%) to all orders</label>
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
              <Clock size={20} />
            </div>
            <h2 className="font-bold text-slate-800">Operating Hours</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 bg-brand-500 rounded-full relative cursor-pointer shadow-inner">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow"></div>
                </div>
                <span className="font-bold text-slate-800">Accepting Orders</span>
              </div>
              <span className="text-sm text-brand-600 font-bold bg-brand-50 px-3 py-1 rounded-full">Open Now</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Opening Time</label>
                <input type="time" defaultValue="09:00" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Closing Time</label>
                <input type="time" defaultValue="23:00" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
