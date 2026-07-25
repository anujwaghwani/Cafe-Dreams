import React, { useState, useEffect } from 'react';
import { ShoppingBag, Plus, Minus, X, Coffee, CreditCard, Banknote, ChevronRight, Check, Loader2, ArrowLeft, Clock, Utensils, CheckCircle2 } from 'lucide-react';

import { createClient } from '@supabase/supabase-js';

const mockMenu = [
  { id: 1, name: 'Veg - Manchurian (Gravy/DRY)', price: 110, category: 'Starters' },
  { id: 2, name: 'Chilli Fries', price: 130, category: 'Starters' },
  { id: 3, name: 'Corn Crispy', price: 140, category: 'Starters' },
  { id: 4, name: 'Paneer Chilli', price: 140, category: 'Starters' },
  { id: 5, name: 'Mashroom Chilli', price: 140, category: 'Starters' },
  { id: 6, name: 'Veg-Crispy', price: 140, category: 'Starters' },
  { id: 7, name: 'Veg fried Rice', price: 100, half_price: 60, category: 'Chinese Rice' },
  { id: 8, name: 'Schezwan Fried rice', price: 110, half_price: 70, category: 'Chinese Rice' },
  { id: 9, name: 'Machurian Fried rice', price: 120, half_price: 70, category: 'Chinese Rice' },
  { id: 10, name: 'Paneer Fried rice', price: 120, half_price: 80, category: 'Chinese Rice' },
  { id: 11, name: 'Cocktail Fried rice', price: 120, half_price: 80, category: 'Chinese Rice' },
  { id: 12, name: 'Paneer Schezwan Fried rice', price: 130, half_price: 80, category: 'Chinese Rice' },
  { id: 13, name: 'Manchurian Schezwan Fired rice', price: 130, half_price: 80, category: 'Chinese Rice' },
  { id: 14, name: 'Veg Noodles', price: 100, half_price: 60, category: 'Noodles' },
  { id: 15, name: 'Schezwan Noodles', price: 110, half_price: 70, category: 'Noodles' },
  { id: 16, name: 'Machurian Noodles', price: 110, half_price: 70, category: 'Noodles' },
  { id: 17, name: 'Paneer Noodles', price: 110, half_price: 70, category: 'Noodles' },
  { id: 18, name: 'Manchurian Schezwan Noodles', price: 120, half_price: 80, category: 'Noodles' },
  { id: 19, name: 'Paneer Schezwan Noodles', price: 120, half_price: 80, category: 'Noodles' },
  { id: 20, name: 'Veg Sandwich', price: 60, category: 'Sandwich' },
  { id: 21, name: 'Veg Cheese Sandwich', price: 70, category: 'Sandwich' },
  { id: 22, name: 'Corn Sandwich', price: 70, category: 'Sandwich' },
  { id: 23, name: 'Corn Cheese Sandwich', price: 80, category: 'Sandwich' },
  { id: 24, name: 'Paneer Sandwich', price: 80, category: 'Sandwich' },
  { id: 25, name: 'Paneer cheese Sandwich', price: 90, category: 'Sandwich' },
  { id: 26, name: 'Peri-Peri Sandwich', price: 100, category: 'Sandwich' },
  { id: 27, name: 'Schezwan Sandwich', price: 70, category: 'Sandwich' },
  { id: 28, name: 'Schezwan Corn Sandwich', price: 80, category: 'Sandwich' },
  { id: 29, name: 'Aloo Tikki Burger', price: 60, category: 'Burger' },
  { id: 30, name: 'Aloo Tikki Cheese Burger', price: 80, category: 'Burger' },
  { id: 31, name: 'Paneer Burger', price: 80, category: 'Burger' },
  { id: 32, name: 'Paneer cheese Burger', price: 100, category: 'Burger' },
  { id: 33, name: 'Schezwan Burger', price: 70, category: 'Burger' },
  { id: 34, name: 'Cold Coffee', price: 70, category: 'Shakes' },
  { id: 35, name: 'Strawbeery Shake', price: 80, category: 'Shakes' },
  { id: 36, name: 'Bluebeery Shake', price: 80, category: 'Shakes' },
  { id: 37, name: 'Pineapple Shake', price: 80, category: 'Shakes' },
  { id: 38, name: 'Mango Shake', price: 80, category: 'Shakes' },
  { id: 39, name: 'Butter-Scotch Shake', price: 80, category: 'Shakes' },
  { id: 40, name: 'Vanila Shake', price: 70, category: 'Shakes' },
  { id: 41, name: 'Chocolate Shake', price: 90, category: 'Shakes' },
  { id: 42, name: 'Oreo Shake', price: 100, category: 'Shakes' },
  { id: 43, name: 'Kit-Kat Shake', price: 110, category: 'Shakes' },
  { id: 44, name: 'Kit-Kat Oreo Shake', price: 130, category: 'Shakes' },
  { id: 45, name: 'Brownie Shake', price: 130, category: 'Shakes' },
  { id: 46, name: 'Veg Momo', price: 110, half_price: 80, category: 'Momos' },
  { id: 47, name: 'Paneer Momo', price: 130, half_price: 80, category: 'Momos' },
  { id: 48, name: 'Plain Maggie', price: 40, category: 'Maggie' },
  { id: 49, name: 'Masala Maggie', price: 45, category: 'Maggie' },
  { id: 50, name: 'Vegi-Maggie', price: 55, category: 'Maggie' },
  { id: 51, name: 'Schezwan Maggie', price: 55, category: 'Maggie' },
  { id: 52, name: 'Cheese Maggie', price: 70, category: 'Maggie' },
  { id: 53, name: 'Plain Fries', price: 80, category: 'Fries' },
  { id: 54, name: 'Peri-Peri Fries', price: 100, category: 'Fries' },
  { id: 55, name: 'Cheese Fries', price: 100, category: 'Fries' },
  { id: 56, name: 'Peri-Peri Cheese Fries', price: 120, category: 'Fries' },
  { id: 57, name: 'Veg-Manchow Soup', price: 50, category: 'Soup' },
  { id: 58, name: 'Hot & Sour Soup', price: 50, category: 'Soup' },
  { id: 59, name: 'Tomato Soup', price: 70, category: 'Soup' },
  { id: 60, name: 'Lemon Coriander Soup', price: 60, category: 'Soup' },
  { id: 61, name: 'Sweet Corn Soup', price: 70, category: 'Soup' },
  { id: 62, name: 'Margherita Pizza', price: 130, category: 'Pizza' },
  { id: 63, name: 'Corn Pizza', price: 150, category: 'Pizza' },
  { id: 64, name: 'Paneer Pizza', price: 150, category: 'Pizza' },
  { id: 65, name: 'Peri Peri Paneer Pizza', price: 170, category: 'Pizza' },
  { id: 66, name: 'Farm House Pizza', price: 160, category: 'Pizza' },
  { id: 67, name: 'Vegi-Pizza Extra Cheese', price: 180, category: 'Pizza' },
  { id: 68, name: 'Dal - Fry', price: 110, category: 'Indian Main Course' },
  { id: 69, name: 'Dal Tadka', price: 130, category: 'Indian Main Course' },
  { id: 70, name: 'Mix-Veg', price: 250, category: 'Indian Main Course' },
  { id: 71, name: 'Kadhai Paneer', price: 300, category: 'Indian Main Course' },
  { id: 72, name: 'Paneer Butter Masala', price: 300, category: 'Indian Main Course' },
  { id: 73, name: 'Paneer Tikka Masala', price: 300, category: 'Indian Main Course' },
  { id: 74, name: 'Veg-Kadhai', price: 280, category: 'Indian Main Course' },
  { id: 75, name: 'Paneer Punjabi', price: 320, category: 'Indian Main Course' },
  { id: 76, name: 'Veg Kolhapuri', price: 280, category: 'Indian Main Course' },
  { id: 77, name: 'Paneer Kolhapuri', price: 300, category: 'Indian Main Course' },
  { id: 78, name: 'Veg Kofta', price: 330, category: 'Indian Main Course' },
  { id: 79, name: 'Veg AndaCurry', price: 330, category: 'Indian Main Course' },
  { id: 80, name: 'Rajasthani Kofta', price: 360, category: 'Indian Main Course' },
  { id: 81, name: 'Paneer Angara', price: 340, category: 'Indian Main Course' },
  { id: 82, name: 'Palak Paneer', price: 280, category: 'Indian Main Course' },
  { id: 83, name: 'Veg Angara', price: 250, category: 'Indian Main Course' },
  { id: 84, name: 'Jeera-Rice', price: 110, category: 'Indian Rice' },
  { id: 85, name: 'Garlic-Rice', price: 130, category: 'Indian Rice' },
  { id: 86, name: 'Steam Rice', price: 100, category: 'Indian Rice' },
  { id: 87, name: 'Dal Khichdi Masala', price: 150, category: 'Indian Rice' },
  { id: 88, name: 'Butter Dal Khichdi', price: 160, category: 'Indian Rice' },
  { id: 89, name: 'Veg-Pulao', price: 150, category: 'Indian Rice' },
  { id: 90, name: 'Veg-Biryani', price: 180, category: 'Indian Rice' },

  { id: 91, name: 'Coffee', price: 40, category: 'Beverages', img: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=200&q=80' },
  { id: 92, name: 'Tea', price: 30, category: 'Beverages', img: 'https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?auto=format&fit=crop&w=200&q=80' },];

// Initialize Supabase Client if env vars are present
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const categories = ["Beverages", "Starters", "Chinese Rice", "Noodles", "Sandwich", "Burger", "Shakes", "Momos", "Maggie", "Fries", "Soup", "Pizza", "Indian Main Course", "Indian Rice"];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('menu'); // 'menu' | 'status'
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('orderId');
    if (id) {
      setOrderId(id);
      setCurrentScreen('status');
    }
  }, []);

  return (
    <div className="min-h-screen pb-24 max-w-md mx-auto bg-cafe-50 shadow-2xl relative overflow-hidden font-sans">
      {currentScreen === 'menu' ? <MenuScreen /> : <OrderStatusScreen orderId={orderId} />}
    </div>
  );
}

function MenuScreen() {
  const [tableNo, setTableNo] = useState(null);
  const [activeCat, setActiveCat] = useState(categories[0]);
  const [cart, setCart] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('online'); 
  const [selectedItemForVariant, setSelectedItemForVariant] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTableNo(params.get('table') || '1'); // Default to table 1 if not provided for mockup
  }, []);

  const openVariantSelection = (item) => {
    if (item.half_price) {
      setSelectedItemForVariant(item);
    } else {
      addToCart(item, 'Full', item.price);
    }
  };

  const addToCart = (item, variant, price) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id && c.variant === variant);
      if (existing) {
        return prev.map(c => c === existing ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prev, { ...item, variant, quantity: 1, currentPrice: price }];
    });
    setSelectedItemForVariant(null);
  };

  const updateQuantity = (item, variant, delta) => {
    setCart(prev => {
      return prev.map(c => {
        if (c.id === item.id && c.variant === variant) {
          return { ...c, quantity: c.quantity + delta };
        }
        return c;
      }).filter(c => c.quantity > 0);
    });
  };

  const getCartSubtotal = () => cart.reduce((total, item) => total + (item.currentPrice * item.quantity), 0);
  const cgst = getCartSubtotal() * 0.025;
  const sgst = getCartSubtotal() * 0.025;
  const platformFee = 5.00;
  const grandTotal = getCartSubtotal() + cgst + sgst + platformFee;

  const getCartCount = () => cart.reduce((count, item) => count + item.quantity, 0);
  const getItemCount = (itemId) => cart.filter(c => c.id === itemId).reduce((count, item) => count + item.quantity, 0);
  const filteredMenu = mockMenu.filter(item => item.category === activeCat);

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Create strict Payload as requested
    const orderPayload = {
      table_number: parseInt(tableNo) || 1, // fallback if takeaway/NaN
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        variant: item.variant,
        quantity: item.quantity,
        price: item.currentPrice
      })),
      total_amount: grandTotal.toFixed(2),
      payment_method: paymentMethod === 'online' ? 'Mock Online' : 'Cash at Counter',
      status: 'pending'
    };

    try {
      if (paymentMethod === 'online') {
        // Mock Razorpay Flow
        await new Promise(resolve => setTimeout(resolve, 1500));
        alert("Razorpay Checkout Modal (MOCK)\nPayment successful!");
      }

      let orderIdToNavigate = null;

      // 1. Try Supabase direct insert if configured
      if (supabase) {
        const { data, error } = await supabase
          .from('orders')
          .insert([orderPayload])
          .select()
          .single();
          
        if (error) throw new Error("Supabase Insert Failed: " + error.message);
        orderIdToNavigate = data.id;
      } 
      // 2. Fallback to our local robust API if Supabase isn't configured
      else {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const res = await fetch(`${apiUrl}/api/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload)
        });
        
        if (!res.ok) {
          throw new Error(`Local API responded with status: ${res.status}`);
        }
        
        const data = await res.json();
        if (!data.success) throw new Error("Local API returned success: false");
        orderIdToNavigate = data.order.id;
      }

      // Smooth navigation on success
      if (orderIdToNavigate) {
        window.location.href = `/?orderId=${orderIdToNavigate}`;
      } else {
        throw new Error("No Order ID returned from server.");
      }

    } catch (e) {
      console.error(e);
      alert("Failed to place order: " + e.message + "\nPlease try again or alert staff.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <header className="px-4 pt-6 pb-4 bg-white sticky top-0 z-10 border-b border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-cafe-600 flex items-center justify-center text-white">
            <Coffee size={16} className="font-bold" />
          </div>
          <h1 className="text-xl font-display font-bold text-slate-900 tracking-tight">
            Cafe Dreams <span className="text-slate-400 font-medium text-sm ml-1">— Table {tableNo}</span>
          </h1>
        </div>

        <div className="flex overflow-x-auto hide-scrollbar gap-2.5 pt-1 pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${
                activeCat === cat 
                  ? 'bg-cafe-600 text-white' 
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <main className="px-4 pt-5 pb-8 space-y-5">
        {filteredMenu.map(item => {
          const itemCount = getItemCount(item.id);
          return (
            <div key={item.id} className="flex gap-4 items-center bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
              {item.img && (
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-display font-bold text-slate-800 mb-1 leading-tight">{item.name}</h3>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800">₹{item.price}</span>
                    {item.half_price && <span className="text-[10px] text-slate-500 font-medium">Half: ₹{item.half_price}</span>}
                  </div>
                  
                  {itemCount > 0 && !item.half_price ? (
                    <div className="flex items-center gap-3 bg-cafe-50 rounded-lg px-2 py-1.5 border border-cafe-100">
                      <button onClick={() => updateQuantity(item, 'Full', -1)} className="text-cafe-600 hover:text-cafe-700 font-bold px-1"><Minus size={14} /></button>
                      <span className="text-sm font-bold w-4 text-center text-slate-800">{itemCount}</span>
                      <button onClick={() => updateQuantity(item, 'Full', 1)} className="text-cafe-600 hover:text-cafe-700 font-bold px-1"><Plus size={14} /></button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => openVariantSelection(item)}
                      className="bg-cafe-50 hover:bg-cafe-100 text-cafe-600 px-6 py-1.5 rounded-lg border border-cafe-200 transition-colors font-bold text-sm shadow-sm relative"
                    >
                      ADD
                      {itemCount > 0 && item.half_price && (
                        <div className="absolute -top-2 -right-2 bg-cafe-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-sm">{itemCount}</div>
                      )}
                    </button>
                  )}
                </div>
                {item.half_price && <div className="text-[10px] text-cafe-600 mt-1">Customizable</div>}
              </div>
            </div>
          );
        })}
      </main>

      {getCartCount() > 0 && (
        <div className="fixed bottom-4 left-0 right-0 max-w-md mx-auto px-4 z-20 animate-slide-up">
          <button 
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full bg-cafe-600 text-white p-4 rounded-2xl font-bold flex justify-between items-center shadow-xl shadow-cafe-600/30 active:scale-[0.98] transition-transform"
          >
            <div className="flex flex-col items-start">
              <span className="text-xs text-cafe-100 uppercase tracking-wider">{getCartCount()} ITEMS</span>
              <span className="text-lg">₹{grandTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>View Cart</span>
              <ChevronRight size={20} />
            </div>
          </button>
        </div>
      )}

      {selectedItemForVariant && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 backdrop-blur-sm sm:items-center">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-slate-100 animate-slide-up">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-display font-bold text-slate-900">{selectedItemForVariant.name}</h3>
                <p className="text-sm text-slate-500 mt-1">Choose your portion size</p>
              </div>
              <button onClick={() => setSelectedItemForVariant(null)} className="bg-slate-100 p-2 rounded-full text-slate-500 hover:text-slate-800"><X size={18} /></button>
            </div>
            <div className="space-y-3 mt-6">
              <button 
                onClick={() => addToCart(selectedItemForVariant, 'Half', selectedItemForVariant.half_price)}
                className="w-full flex justify-between items-center p-4 rounded-xl border border-slate-200 hover:border-cafe-500 hover:bg-cafe-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border border-slate-300" />
                  <span className="font-semibold text-slate-800">Half Portion</span>
                </div>
                <span className="font-bold text-slate-900">₹{selectedItemForVariant.half_price}</span>
              </button>
              <button 
                onClick={() => addToCart(selectedItemForVariant, 'Full', selectedItemForVariant.price)}
                className="w-full flex justify-between items-center p-4 rounded-xl border border-slate-200 hover:border-cafe-500 hover:bg-cafe-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border border-slate-300" />
                  <span className="font-semibold text-slate-800">Full Portion</span>
                </div>
                <span className="font-bold text-slate-900">₹{selectedItemForVariant.price}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 backdrop-blur-sm sm:items-center">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto border border-slate-100 animate-slide-up custom-scrollbar">
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-display font-bold text-slate-900">Order Summary</h2>
              <button onClick={() => setIsCheckoutOpen(false)} className="bg-slate-100 p-2 rounded-full text-slate-500 hover:text-slate-800"><X size={18} /></button>
            </div>

            <div className="space-y-5 mb-6">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start text-sm">
                  <div className="flex gap-3">
                    <span className="text-cafe-600 font-bold bg-cafe-50 px-2 py-0.5 rounded border border-cafe-100 h-fit mt-0.5">{item.quantity}x</span>
                    <div>
                      <span className="font-semibold text-slate-800 block">{item.name}</span>
                      {item.half_price && <span className="text-xs text-slate-500 font-medium">{item.variant} Portion</span>}
                      <span className="text-xs text-slate-400 block mt-0.5">₹{item.currentPrice} each</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-bold text-slate-900">₹{item.currentPrice * item.quantity}</span>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => updateQuantity(item, item.variant, -1)} className="text-slate-400 p-1 border rounded bg-slate-50"><Minus size={12}/></button>
                      <button onClick={() => updateQuantity(item, item.variant, 1)} className="text-slate-400 p-1 border rounded bg-slate-50"><Plus size={12}/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-4 mb-8 space-y-2 text-sm">
              <div className="flex justify-between items-center text-slate-500">
                <span>Subtotal</span>
                <span>₹{getCartSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>CGST (2.5%)</span>
                <span>₹{cgst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>SGST (2.5%)</span>
                <span>₹{sgst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Platform Fee</span>
                <span>₹{platformFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold pt-2 mt-2 border-t border-slate-100">
                <span className="text-slate-900">Grand Total</span>
                <span className="text-cafe-600">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xs font-semibold text-slate-500 uppercase mb-3 px-1">Payment Method</p>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setPaymentMethod('online')}
                  className={`flex flex-col items-center p-4 rounded-xl border transition-all ${
                    paymentMethod === 'online' 
                      ? 'bg-cafe-50 border-cafe-500 text-cafe-700 shadow-sm' 
                      : 'bg-white border-slate-200 text-slate-500'
                  }`}
                >
                  <CreditCard size={24} className="mb-2" />
                  <span className="text-sm font-semibold">Pay Online</span>
                  {paymentMethod === 'online' && <Check size={16} className="absolute top-2 right-2 text-cafe-600" />}
                </button>
                <button 
                  onClick={() => setPaymentMethod('cash')}
                  className={`flex flex-col items-center p-4 rounded-xl border relative transition-all ${
                    paymentMethod === 'cash' 
                      ? 'bg-cafe-50 border-cafe-500 text-cafe-700 shadow-sm' 
                      : 'bg-white border-slate-200 text-slate-500'
                  }`}
                >
                  <Banknote size={24} className="mb-2" />
                  <span className="text-sm font-semibold text-center leading-tight">Cash at Counter</span>
                  {paymentMethod === 'cash' && <Check size={16} className="absolute top-2 right-2 text-cafe-600" />}
                </button>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-cafe-600 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 active:scale-[0.98] shadow-lg shadow-cafe-600/30 disabled:opacity-70"
            >
              {isProcessing ? <Loader2 size={20} className="animate-spin" /> : (paymentMethod === 'online' ? 'Proceed to Pay' : 'Place Order')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function OrderStatusScreen({ orderId }) {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Poll order status every 3 seconds
    const fetchOrder = async () => {
      try {
        if (supabase) {
          const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('id', orderId)
            .single();
          if (error) throw error;
          setOrder(data);
        } else {
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
          const res = await fetch(`${apiUrl}/api/orders/${orderId}`);
          const data = await res.json();
          setOrder(data);
        }
      } catch (e) {
        console.error("Failed to fetch order status:", e);
      }
    };
    
    fetchOrder();
    const interval = setInterval(fetchOrder, 3000);
    return () => clearInterval(interval);
  }, [orderId]);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-cafe-50">
        <Loader2 className="animate-spin text-cafe-600 mb-4" size={32} />
        <p className="font-medium text-slate-500">Loading your order details...</p>
      </div>
    );
  }

  const steps = [
    { status: 'pending', icon: Clock, label: 'Order Received' },
    { status: 'cooking', icon: Utensils, label: 'Preparing Food' },
    { status: 'delivered', icon: CheckCircle2, label: 'Served to Table' }
  ];

  const currentStepIndex = steps.findIndex(s => s.status === order.status);
  const activeIndex = currentStepIndex === -1 ? 0 : currentStepIndex;

  return (
    <div className="min-h-screen bg-white">
      <header className="px-4 py-4 border-b border-slate-100 flex items-center gap-4">
        <a href="/" className="p-2 rounded-full hover:bg-slate-50 text-slate-600">
          <ArrowLeft size={20} />
        </a>
        <div>
          <h1 className="font-display font-bold text-slate-900 text-lg">Order #{orderId}</h1>
          <p className="text-xs text-slate-500 font-medium">Table {order.table_number || order.table_id || 'X'}</p>
        </div>
      </header>

      <main className="p-6">
        <div className="bg-cafe-50 border border-cafe-100 rounded-2xl p-6 text-center mb-8">
          <h2 className="text-sm font-bold text-cafe-700 uppercase tracking-widest mb-1">Status</h2>
          <p className="text-2xl font-display font-bold text-cafe-900 capitalize">
            {order.status === 'paid' ? 'Completed' : order.status}
          </p>
          <div className="mt-4 text-xs font-semibold text-slate-500 bg-white inline-block px-3 py-1 rounded-full border border-slate-200">
            Amount: ₹{order.total_amount}
          </div>
        </div>

        <div className="relative pl-6">
          <div className="absolute top-0 bottom-0 left-9 w-0.5 bg-slate-100"></div>
          
          <div className="space-y-8">
            {steps.map((step, idx) => {
              const isCompleted = idx <= activeIndex;
              const isCurrent = idx === activeIndex;
              return (
                <div key={step.status} className="relative flex items-center gap-6">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center z-10 transition-colors ${
                    isCompleted ? 'bg-cafe-600 text-white shadow-md shadow-cafe-600/30' : 'bg-slate-100 text-slate-400 border-2 border-white'
                  }`}>
                    <step.icon size={14} />
                  </div>
                  <div>
                    <h4 className={`font-bold ${isCurrent ? 'text-slate-900 text-lg' : 'text-slate-500'}`}>{step.label}</h4>
                    {isCurrent && <p className="text-xs text-slate-400 mt-0.5">Your food is currently in this stage.</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
