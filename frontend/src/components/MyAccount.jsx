import React, { useState, useEffect, useCallback } from 'react';
import QRCode from 'qrcode.react';

const MyAccount = ({ user, tickets, backend }) => {
  const [loadedTickets, setLoadedTickets] = useState(tickets);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user.name || 'User',
    email: user.email || 'email@example.com',
    phone: user.phone || '+380123456789',
    address: user.address || 'Kyiv, Ukraine',
  });
  const [expandedTicket, setExpandedTicket] = useState(null);

  useEffect(() => {
    if (backend && user) {
      backend.get_user_tickets(user.principal).then(setLoadedTickets);
    }
  }, [backend, user]);

  const handleEditProfile = useCallback(() => {
    if (editing) {
      // Сохранить в backend (заглушка)
    }
    setEditing(!editing);
  }, [editing]);

  const handleDownloadTicket = useCallback((ticket) => {
    const ticketData = `RV.RA-ICP Ticket\nEvent: ${ticket.event_id}\nPrice: ${ticket.price} UAH\nQR: ${ticket.qr_code}`;
    const blob = new Blob([ticketData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket-${ticket.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gray-800/50">
      <div className="max-w-4xl mx-auto scale-in">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 text-[var(--neon-blue)]">My Account</h2>
        {/* Profile */}
        <div className="bg-gray-800/40 p-6 rounded-lg border border-[rgba(0,240,255,0.2)] mb-8">
          <h3 className="text-xl font-semibold text-[var(--neon-blue)] mb-4">Profile Information</h3>
          {editing ? (
            <div className="space-y-4">
              <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full p-3 bg-gray-700 text-white rounded-lg input-focus" />
              <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="w-full p-3 bg-gray-700 text-white rounded-lg input-focus" />
              <input type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="w-full p-3 bg-gray-700 text-white rounded-lg input-focus" />
              <input type="text" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} className="w-full p-3 bg-gray-700 text-white rounded-lg input-focus" />
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-gray-300">Name: {profile.name}</p>
              <p className="text-gray-300">Email: {profile.email}</p>
              <p className="text-gray-300">Phone: {profile.phone}</p>
              <p className="text-gray-300">Address: {profile.address}</p>
            </div>
          )}
          <button className="button mt-4" onClick={handleEditProfile}>
            {editing ? 'Save Profile' : 'Edit Profile'}
          </button>
        </div>
        {/* Tickets */}
        <h3 className="text-xl font-semibold text-[var(--neon-blue)] mb-4">My Tickets</h3>
        {loadedTickets.length === 0 ? (
          <p className="text-gray-300 text-center">No tickets.</p>
        ) : (
          <div className="space-y-4">
            {loadedTickets.map(ticket => (
              <div key={ticket.id} className="bg-gray-800/40 p-4 rounded-lg border border-[rgba(0,240,255,0.2)]">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpandedTicket(expandedTicket === ticket.id ? null : ticket.id)}>
                  <h4 className="text-lg font-semibold text-[var(--neon-blue)]">Ticket {ticket.id}</h4>
                  <span className="text-gray-300">{expandedTicket === ticket.id ? '▲' : '▼'}</span>
                </div>
                <div className={`collapsible ${expandedTicket === ticket.id ? 'open' : ''}`}>
                  <p className="text-gray-300 mb-1">Event: {ticket.event_id}</p>
                  <p className="text-gray-300 mb-1">Price: {ticket.price} UAH</p>
                  <div className="flex justify-center mb-3">
                    <QRCode value={ticket.qr_code} size={150} fgColor="#00f0ff" bgColor="#1a1a2e" />
                  </div>
                  <button className="button w-full" onClick={() => handleDownloadTicket(ticket)}>Download Ticket</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;