import React, { useState } from 'react';
import { useAuthClient } from '@dfinity/auth-client';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../declarations/backend';

const AdminPanel = ({ user, backend }) => {
  const [event, setEvent] = useState({
    id: '',
    title: '',
    date: '',
    time: '',
    city: '',
    category: '',
    price_range: '',
    image: '',
    url: '',
    venue: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateEvent = async () => {
    if (!user) {
      alert('Please log in to create an event.');
      return;
    }

    try {
      await backend.create_event(event);
      alert('Event created successfully!');
      setEvent({
        id: '',
        title: '',
        date: '',
        time: '',
        city: '',
        category: '',
        price_range: '',
        image: '',
        url: '',
        venue: '',
        description: '',
      });
    } catch (error) {
      alert(`Failed to create event: ${error.message}`);
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gray-800/50">
      <div className="max-w-4xl mx-auto scale-in">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 text-[var(--neon-blue)]">Admin Panel - Create Event</h2>
        <div className="bg-gray-800/40 p-6 rounded-lg border border-[rgba(0,240,255,0.2)]">
          <div className="grid gap-4">
            <input
              type="text"
              name="id"
              value={event.id}
              onChange={handleInputChange}
              placeholder="Event ID"
              className="p-2 bg-gray-700 text-white rounded-lg input-focus"
            />
            <input
              type="text"
              name="title"
              value={event.title}
              onChange={handleInputChange}
              placeholder="Event Title"
              className="p-2 bg-gray-700 text-white rounded-lg input-focus"
            />
            <input
              type="text"
              name="date"
              value={event.date}
              onChange={handleInputChange}
              placeholder="Date (e.g., 2025-09-21)"
              className="p-2 bg-gray-700 text-white rounded-lg input-focus"
            />
            <input
              type="text"
              name="time"
              value={event.time}
              onChange={handleInputChange}
              placeholder="Time (e.g., 18:00)"
              className="p-2 bg-gray-700 text-white rounded-lg input-focus"
            />
            <input
              type="text"
              name="city"
              value={event.city}
              onChange={handleInputChange}
              placeholder="City"
              className="p-2 bg-gray-700 text-white rounded-lg input-focus"
            />
            <input
              type="text"
              name="category"
              value={event.category}
              onChange={handleInputChange}
              placeholder="Category"
              className="p-2 bg-gray-700 text-white rounded-lg input-focus"
            />
            <input
              type="text"
              name="price_range"
              value={event.price_range}
              onChange={handleInputChange}
              placeholder="Price Range (e.g., 100-500)"
              className="p-2 bg-gray-700 text-white rounded-lg input-focus"
            />
            <input
              type="text"
              name="image"
              value={event.image}
              onChange={handleInputChange}
              placeholder="Image URL"
              className="p-2 bg-gray-700 text-white rounded-lg input-focus"
            />
            <input
              type="text"
              name="url"
              value={event.url}
              onChange={handleInputChange}
              placeholder="Event URL"
              className="p-2 bg-gray-700 text-white rounded-lg input-focus"
            />
            <input
              type="text"
              name="venue"
              value={event.venue}
              onChange={handleInputChange}
              placeholder="Venue"
              className="p-2 bg-gray-700 text-white rounded-lg input-focus"
            />
            <textarea
              name="description"
              value={event.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="p-2 bg-gray-700 text-white rounded-lg input-focus"
            />
            <button className="button" onClick={handleCreateEvent}>
              Create Event
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;