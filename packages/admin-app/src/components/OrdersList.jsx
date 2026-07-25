import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, IndianRupee, Banknote, CheckSquare, X } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (supabase) {
          const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
          if (error) throw error;
          setOrders(data);
        } else {
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
          const res = await fetch(`${apiUrl}/api/orders`);
          const data = await res.json();
          setOrders(data);
        }
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch orders', err);
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => 
    order.id.toString().includes(searchTerm) || 
    (order.table_number && order.table_number.toString().includes(searchTerm))
  );

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto h-full flex flex-col overflow-y-auto md:overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4 flex-shrink-0">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Order History</h1>
          <p className="text-slate-500 text-xs md:text-sm mt-1">View and manage all past and current orders.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search ID or Table..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
            <Filter size={18} />
            <span className="hidden md:inline">Filter</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-slate-400 font-medium">Loading orders...</div>
      ) : filteredOrders.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-slate-400 font-medium">No orders found.</div>
      ) : (
        <>
          {/* Mobile View: Stacked Cards */}
          <div className="md:hidden space-y-4 pb-8">
            {filteredOrders.map(order => {
              const date = new Date(order.created_at || Date.now());
              const itemsSummary = order.items?.map(i => `${i.quantity}x ${i.name}`).join(', ') || 'Unknown items';
              return (
                <div key={order.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-xs font-bold text-slate-400 mb-0.5">#{order.id} • {date.toLocaleDateString()} {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                      <div className="font-black text-lg text-slate-900">Table {order.table_number || order.table_id || 'X'}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-slate-900">₹{Number(order.total_amount).toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-600 mb-4 line-clamp-2">{itemsSummary}</div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      order.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                      order.status === 'delivered' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'cooking' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {order.status === 'paid' && <CheckSquare size={12}/>}
                      {order.status === 'delivered' && <Banknote size={12}/>}
                      <span className="capitalize">{order.status}</span>
                    </span>
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 text-brand-600 rounded-lg text-xs font-bold hover:bg-brand-100 transition-colors"
                    >
                      <Eye size={14} /> View Details
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Desktop View: Data Table */}
          <div className="hidden md:flex bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex-1 flex-col">
            <div className="overflow-y-auto flex-1 custom-scrollbar">
              <table className="w-full text-left text-sm relative">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100 uppercase tracking-wider text-xs sticky top-0 z-10 shadow-sm">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Date & Time</th>
                    <th className="px-6 py-4">Table</th>
                    <th className="px-6 py-4">Items Summary</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map(order => {
                    const date = new Date(order.created_at || Date.now());
                    const itemsSummary = order.items?.map(i => `${i.quantity}x ${i.name}`).join(', ') || 'Unknown items';
                    
                    return (
                      <tr key={order.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-4 font-bold text-slate-900">#{order.id}</td>
                        <td className="px-6 py-4 text-slate-600">
                          <div className="font-medium">{date.toLocaleDateString()}</div>
                          <div className="text-xs text-slate-400">{date.toLocaleTimeString()}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center justify-center bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md">
                            T-{order.table_number || order.table_id || 'X'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600 max-w-[200px] truncate" title={itemsSummary}>
                          {itemsSummary}
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-900">
                          ₹{Number(order.total_amount).toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                            order.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                            order.status === 'delivered' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'cooking' ? 'bg-amber-100 text-amber-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {order.status === 'paid' && <CheckSquare size={12}/>}
                            {order.status === 'delivered' && <Banknote size={12}/>}
                            <span className="capitalize">{order.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => setSelectedOrder(order)}
                            className="p-2 text-slate-400 hover:text-brand-500 hover:bg-brand-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
          <div 
            className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50">
              <div>
                <h2 className="font-bold text-lg text-slate-900">Order #{selectedOrder.id}</h2>
                <p className="text-xs font-semibold text-slate-500">Table {selectedOrder.table_number || selectedOrder.table_id || 'X'}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5">
              <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100 max-h-60 overflow-y-auto custom-scrollbar">
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <div className="flex gap-3 items-center">
                      <span className="font-bold text-slate-600 bg-white px-2 py-0.5 rounded shadow-sm border border-slate-200">{item.quantity}x</span>
                      <div>
                        <span className="font-bold text-slate-800 block">{item.name}</span>
                        {item.variant && item.variant !== 'Full' && (
                          <span className="text-xs text-slate-500 font-semibold">{item.variant}</span>
                        )}
                      </div>
                    </div>
                    <span className="font-bold text-slate-700">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-slate-200 border-dashed">
                <span className="font-bold text-slate-600">Total Amount</span>
                <span className="font-black text-2xl text-slate-900">₹{Number(selectedOrder.total_amount).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3">
              <button 
                className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
                onClick={() => window.print()}
              >
                Print Receipt
              </button>
              <button 
                className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-brand-600 text-white hover:bg-brand-700 shadow-sm shadow-brand-600/20 transition-colors"
                onClick={() => setSelectedOrder(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
