import React from 'react';
import { PlugController } from '@psychedelic/plug-connect';
import { Link } from 'react-router-dom';
import { CurrencyDollarIcon } from './Icons';

const Cart = ({ cart, setCart, user, setShowAuthModal, setTickets, backend }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item));
  };

  const handleCheckout = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    const connected = await PlugController.connect();
    if (connected) {
      try {
        const result = await PlugController.requestTransfer({
          to: 'backend_principal', // Замените на реальный principal backend canister
          amount: total * 1e8, // Конвертация в e8s (ICP)
          memo: 'Ticket purchase'
        });
        if (result) {
          const newTickets = [];
          for (const item of cart) {
            const ticket = await backend.buy_ticket(item.id, item.price);
            newTickets.push(ticket);
          }
          setTickets(prev => [...prev, ...newTickets]);
          setCart([]);
          alert('Payment successful with Plug Wallet!');
        }
      } catch (error) {
        alert(`Payment failed: ${error.message}`);
      }
    } else {
      alert('Plug Wallet not connected. Using stub.');
      // Заглушка для тестирования
      const newTickets = cart.map(item => ({
        id: `${item.id}-${Date.now()}`,
        event_id: item.id,
        user_principal: user.principal,
        qr_code: `qr-${item.id}-${Date.now()}`,
        price: item.price
      }));
      setTickets(prev => [...prev, ...newTickets]);
      setCart([]);
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gray-800/50">
      <div className="max-w-4xl mx-auto scale-in">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 text-[var(--neon-blue)]">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-300 text-center">Your cart is empty.</p>
        ) : (
          <div className="bg-gray-800/40 p-6 rounded-lg border border-[rgba(0,240,255,0.2)]">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center mb-4 border-b border-gray-700 pb-4">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--neon-blue)]">{item.title}</h3>
                  <p className="text-gray-300 flex items-center">
                    <CurrencyDollarIcon className="w-5 h-5 mr-2 text-[var(--neon-purple)]" />
                    {item.price} UAH x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 p-2 bg-gray-700 text-white rounded-lg input-focus"
                  />
                  <button className="button text-sm" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-6">
              <h3 className="text-xl font-semibold text-[var(--neon-blue)]">Total: {total} UAH</h3>
              <button className="button" onClick={handleCheckout}>Checkout</button>
            </div>
            <Link to="/events" className="button inline-block mt-4">Continue Shopping</Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;