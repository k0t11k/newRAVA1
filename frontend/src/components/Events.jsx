import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, MapPinIcon, CurrencyDollarIcon, ShareIcon } from './Icons';

const Events = ({ events, cart, setCart, user, setShowAuthModal, setTickets, backend }) => {
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterDate, setFilterDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['All', 'Concert', 'Theater', 'Comedy', 'Festival', 'Conference', 'Exhibition'];
  const [loadedEvents, setLoadedEvents] = useState([]);

  useEffect(() => {
    if (backend) {
      backend.get_events().then(setLoadedEvents);
    } else {
      setLoadedEvents(events);
    }
  }, [backend, events]);

  const filteredEvents = useMemo(() => loadedEvents.filter(e => 
    (filterCategory === 'All' || e.category === filterCategory) &&
    (!filterDate || e.date === filterDate) &&
    (!searchQuery || e.title.toLowerCase().includes(searchQuery.toLowerCase()) || e.city.toLowerCase().includes(searchQuery.toLowerCase()))
  ), [loadedEvents, filterCategory, filterDate, searchQuery]);

  const handleAddToCart = useCallback((event) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    // Логика добавления в корзину
  }, [user, setShowAuthModal]);

  const handleBuyNow = useCallback(async (event) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    if (backend) {
      const price = parseInt(event.price_range.split('-')[0]);
      const ticket = await backend.buy_ticket(event.id, price);
      setTickets(prev => [...prev, ticket]);
      alert(`Ticket purchased! QR: ${ticket.qr_code}`);
    }
  }, [user, backend, setTickets, setShowAuthModal]);

  const handleShare = useCallback((eventId) => {
    const shareUrl = `${window.location.origin}/event/${eventId}`;
    navigator.clipboard.writeText(shareUrl).then(() => alert('Link copied!'));
  }, []);

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] fade-in-up">
        Upcoming Events
      </h2>
      <div className="max-w-6xl mx-auto mb-8 flex flex-col sm:flex-row gap-4 items-center">
        <input type="text" placeholder="Search by title or city..." className="bg-gray-800 text-white p-3 rounded-lg input-focus w-full sm:w-1/3" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <select className="bg-gray-800 text-white p-3 rounded-lg input-focus w-full sm:w-auto" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input type="date" className="bg-gray-800 text-white p-3 rounded-lg input-focus w-full sm:w-auto" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
      </div>
      {filteredEvents.length === 0 ? (
        <p className="text-gray-300 text-center">No events found.</p>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <div key={event.id} className="card overflow-hidden border-[1.5px] border-[rgba(0,240,255,0.3)] hover:border-[rgba(212,0,255,0.4)] hover:shadow-lg transition-all fade-in-up">
              <div className="relative">
                <img src={event.image} alt={event.title} className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-t-xl lazy-img" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,17,17,0.9)] to-transparent transition-opacity duration-300" />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[var(--neon-blue)] mb-2 line-clamp-2">{event.title}</h3>
                <p className="text-gray-300 flex items-center mb-1 text-sm sm:text-base">
                  <CalendarIcon className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-[var(--neon-purple)]" />
                  Date: {event.date} {event.time}
                </p>
                <p className="text-gray-300 flex items-center mb-1 text-sm sm:text-base">
                  <MapPinIcon className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-[var(--neon-purple)]" />
                  City: {event.city}
                </p>
                <p className="text-gray-300 flex items-center mb-3 sm:mb-4 text-sm sm:text-base">
                  <CurrencyDollarIcon className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-[var(--neon-purple)]" />
                  Price: {event.price_range}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Link to={`/event/${event.id}`} className="button flex-1 text-center text-sm sm:text-base">View Details</Link>
                  <button className="button flex-1 text-center text-sm sm:text-base" onClick={() => handleAddToCart(event)}>Add to Cart</button>
                  <button className="button flex-1 text-center text-sm sm:text-base" onClick={() => handleBuyNow(event)}>Buy Now</button>
                  <button className="button flex-1 text-center text-sm sm:text-base flex items-center justify-center gap-2" onClick={() => handleShare(event.id)}>
                    <ShareIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Events;