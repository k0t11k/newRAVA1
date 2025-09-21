import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CalendarIcon, MapPinIcon, CurrencyDollarIcon, TicketIcon, ShareIcon } from './Icons';

const EventDetails = ({ events, user, setCart, setShowAuthModal, setTickets, backend }) => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const result = await backend.get_event(id);
      setEvent(result[0] || null); // Предполагаем, что get_event возвращает Option<Event>
    };
    fetchEvent();
  }, [id, backend]);

  const handleAddToCart = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    if (event) {
      setCart(prev => [...prev, { ...event, quantity: 1 }]);
    }
  };

  const handleBuyTicket = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    try {
      const ticket = await backend.buy_ticket(event.id, event.price || 1000); // Заглушка для цены
      setTickets(prev => [...prev, ticket]);
      alert('Ticket purchased successfully!');
    } catch (error) {
      alert(`Failed to buy ticket: ${error.message}`);
    }
  };

  if (!event) {
    return <div className="text-center text-gray-300">Loading...</div>;
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gray-800/50">
      <div className="max-w-4xl mx-auto scale-in">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 text-[var(--neon-blue)]">{event.title}</h2>
        <div className="bg-gray-800/40 p-6 rounded-lg border border-[rgba(0,240,255,0.2)]">
          <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-lg mb-4" />
          <div className="grid gap-4">
            <p className="text-gray-300 flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2 text-[var(--neon-purple)]" />
              {event.date} at {event.time}
            </p>
            <p className="text-gray-300 flex items-center">
              <MapPinIcon className="w-5 h-5 mr-2 text-[var(--neon-purple)]" />
              {event.venue}, {event.city}
            </p>
            <p className="text-gray-300 flex items-center">
              <CurrencyDollarIcon className="w-5 h-5 mr-2 text-[var(--neon-purple)]" />
              {event.price_range}
            </p>
            <p className="text-gray-300">{event.description}</p>
            <div className="flex gap-4">
              <button className="button" onClick={handleAddToCart}>
                <TicketIcon className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
              <button className="button" onClick={handleBuyTicket}>
                <TicketIcon className="w-5 h-5 mr-2" />
                Buy Ticket
              </button>
              <button className="button">
                <ShareIcon className="w-5 h-5 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;