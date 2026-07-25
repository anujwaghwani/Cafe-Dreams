import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, MoreVertical, IndianRupee, Banknote, CheckSquare } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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
    <div className="p-6 md:p-10 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Order History</h1>
          <p className="text-slate-500 text-sm mt-1">View and manage all past and current orders.</p>
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

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100 uppercase tracking-wider text-xs">
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
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-400 font-medium">Loading orders...</td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-400 font-medium">No orders found.</td>
                </tr>
              ) : (
                filteredOrders.map(order => {
                  const isCash = order.payment_method === 'cash';
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
                        <button className="p-2 text-slate-400 hover:text-brand-500 hover:bg-brand-50 rounded-lg transition-colors">
                          <Eye size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors ml-1">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
