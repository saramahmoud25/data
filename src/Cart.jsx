import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#D3D3FF]">Your Cart</h1>
          <Link to="/" className="text-[#D3D3FF] hover:text-[#b8b8ff]">
            ← Continue Shopping
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Link 
              to="/" 
              className="inline-block bg-[#D3D3FF] hover:bg-[#b8b8ff] text-white font-medium py-2 px-6 rounded-md"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="divide-y">
              {cart.map(item => (
                <div key={item.id} className="p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-contain mr-4" />
                    <div>
                      <h3 className="font-medium text-gray-800">{item.title}</h3>
                      <div className="flex items-center mt-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 bg-gray-200 rounded"
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 bg-gray-200 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-4">${(item.price * item.quantity).toFixed(2)}</span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg">Total:</span>
                <span className="font-bold text-lg text-[#D3D3FF]">${total.toFixed(2)}</span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={clearCart}
                  className="flex-1 border border-red-500 text-red-500 hover:bg-red-50 font-medium py-2 px-4 rounded-md"
                >
                  Clear Cart
                </button>
                <button
                  className="flex-1 bg-[#D3D3FF] hover:bg-[#b8b8ff] text-white font-medium py-2 px-4 rounded-md"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;