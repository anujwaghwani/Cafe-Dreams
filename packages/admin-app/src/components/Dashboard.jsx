import React, { useState, useEffect } from 'react';
import { Clock, ChefHat, CheckCircle2, IndianRupee, CreditCard, Banknote, CheckSquare, Bell } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load initial orders and subscribe to Supabase Real-time Feed
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
    
    if (supabase) {
      // Supabase WebSocket Real-Time Subscription
      const channel = supabase
        .channel('schema-db-changes')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, payload => {
          setOrders(prev => [payload.new, ...prev]);
        })
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, payload => {
          setOrders(prev => prev.map(o => (o.id === payload.new.id ? { ...o, ...payload.new } : o)));
        })
        .subscribe();
        
      return () => {
        supabase.removeChannel(channel);
      };
    } else {
      // Fallback polling if Supabase isn't configured
      const interval = setInterval(fetchOrders, 3000);
      return () => clearInterval(interval);
    }
  }, []);

  const updateOrderStatus = async (id, newStatus) => {
    // Optimistic UI update
    const previousOrders = [...orders];
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    
    try {
      if (supabase) {
        const { error } = await supabase
          .from('orders')
          .update({ status: newStatus, updated_at: new Date().toISOString() })
          .eq('id', id);
        if (error) throw new Error(error.message);
      } else {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const res = await fetch(`${apiUrl}/api/orders/${id}/status`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });
        if (!res.ok) throw new Error('Failed to update');
      }
    } catch (e) {
      alert("Failed to update status. Reverting...");
      setOrders(previousOrders);
    }
  };

  const markCashReceived = (id) => {
    // Treat 'paid' status as completed/cash received.
    updateOrderStatus(id, 'paid');
  };

  const columns = [
    { id: 'pending', title: 'New Orders', icon: Bell, color: 'blue', nextStatus: 'cooking', nextLabel: 'Start Preparing' },
    { id: 'cooking', title: 'Preparing', icon: ChefHat, color: 'amber', nextStatus: 'delivered', nextLabel: 'Mark as Served' },
    { id: 'delivered', title: 'Served', icon: CheckCircle2, color: 'green', nextStatus: 'paid', nextLabel: 'Complete Order' },
  ];

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-slate-50 text-slate-500 font-bold">Loading Live Order Feed...</div>;
  }

  // Filter out paid/completed orders for the active Kanban board
  const activeOrders = orders.filter(o => o.status !== 'paid');
  const completedOrders = orders.filter(o => o.status === 'paid');

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-6">
      
      <header className="mb-8 flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Cafe Dreams Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Live Order Feed & Kitchen Management</p>
        </div>
        <div className="flex items-center gap-4 text-sm font-semibold text-slate-600 bg-slate-100 px-4 py-2 rounded-xl">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          System Live
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(col => {
          const columnOrders = activeOrders.filter(o => o.status === col.id);
          return (
            <div key={col.id} className="flex flex-col h-[75vh]">
              {/* Column Header */}
              <div className={`flex items-center justify-between mb-4 bg-white p-4 rounded-xl border border-${col.color}-100 shadow-sm border-t-4 border-t-${col.color}-500`}>
                <div className="flex items-center gap-2">
                  <col.icon size={20} className={`text-${col.color}-600`} />
                  <h3 className="font-bold text-slate-800">{col.title}</h3>
                </div>
                <div className={`bg-${col.color}-100 text-${col.color}-700 px-3 py-1 rounded-full text-xs font-bold`}>
                  {columnOrders.length}
                </div>
              </div>

              {/* Column Cards */}
              <div className="flex-1 overflow-y-auto space-y-4 pb-4 custom-scrollbar">
                {columnOrders.length === 0 ? (
                  <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-sm font-semibold">
                    No orders here
                  </div>
                ) : (
                  columnOrders.map(order => {
                    const isCash = order.payment_method === 'cash';
                    const paymentLabel = isCash ? 'Cash at Counter - Unpaid' : 'Online - Paid';
                    const timeAgo = new Date(order.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    return (
                      <div key={order.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden">
                        
                        {/* Card Header */}
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="text-xs font-bold text-slate-400 mb-1">#{order.id} • {timeAgo}</div>
                            <div className="font-black text-xl text-slate-900">Table {order.table_number || order.table_id || 'X'}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg text-slate-900">₹{Number(order.total_amount).toFixed(2)}</div>
                          </div>
                        </div>

                        {/* Payment Status Pill */}
                        <div className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg mb-4 w-fit ${isCash ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                          {isCash ? <Banknote size={14}/> : <CheckSquare size={14}/>}
                          {paymentLabel}
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="flex gap-2 text-sm">
                              <span className="font-bold text-slate-600 bg-white px-2 py-0.5 rounded shadow-sm h-fit border border-slate-200">{item.quantity}x</span>
                              <div className="flex-1">
                                <span className="font-bold text-slate-800 block">{item.name}</span>
                                {item.variant && item.variant !== 'Full' && (
                                  <span className="text-xs text-slate-500 font-semibold">{item.variant} Portion</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2">
                          <button 
                            onClick={() => updateOrderStatus(order.id, col.nextStatus)}
                            className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all active:scale-[0.98] ${
                              col.id === 'pending' 
                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20'
                                : col.id === 'cooking'
                                ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-md shadow-amber-500/20'
                                : 'bg-green-600 text-white hover:bg-green-700 shadow-md shadow-green-600/20'
                            }`}
                          >
                            {col.nextLabel} <col.icon size={16} />
                          </button>

                          {/* Cash Collection specific action on Delivered stage (if not already paid online) */}
                          {col.id === 'delivered' && isCash && (
                            <button 
                              onClick={() => markCashReceived(order.id)}
                              className="w-full py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-bold bg-white text-emerald-600 border-2 border-emerald-500 hover:bg-emerald-50 transition-all active:scale-[0.98]"
                            >
                              Mark Cash Received <IndianRupee size={16} />
                            </button>
                          )}
                        </div>

                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Completed Orders Drawer (Simplified) */}
      {completedOrders.length > 0 && (
        <div className="mt-8 pt-8 border-t border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <CheckCircle2 className="text-emerald-500"/>
            Recently Completed Orders
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {completedOrders.slice(0, 10).map(order => (
              <div key={order.id} className="min-w-[200px] bg-white p-4 rounded-xl shadow-sm border border-slate-100 opacity-60 hover:opacity-100 transition-opacity">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-bold text-slate-800">Table {order.table_number || order.table_id || 'X'}</div>
                  <div className="text-emerald-600 font-bold"><CheckSquare size={16}/></div>
                </div>
                <div className="text-sm font-semibold text-slate-500">₹{order.total_amount}</div>
                <div className="text-xs text-slate-400 mt-1">{new Date(order.created_at || Date.now()).toLocaleTimeString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
