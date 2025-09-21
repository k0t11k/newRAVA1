import React, { useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from './declarations/backend';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import EventDetails from './components/EventDetails';
import Cart from './components/Cart';
// Другие импорты компонентов...

const App = () => {
  const [user, setUser] = useState(null);
  const [backend, setBackend] = useState(null);
  const [cart, setCart] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const init = async () => {
      const authClient = await AuthClient.create();
      const identity = authClient.getIdentity();
      const agent = new HttpAgent({ identity });
      if (process.env.DFX_NETWORK !== 'ic') {
        await agent.fetchRootKey();
      }
      const backendActor = Actor.createActor(idlFactory, {
        agent,
        canisterId: 'i7oig-rqaaa-aaaad-aanwa-cai', // Backend canister ID
      });
      setBackend(backendActor);

      if (await authClient.isAuthenticated()) {
        setUser({ principal: identity.getPrincipal().toString() });
      }

      const eventsList = await backendActor.get_events();
      setEvents(eventsList);
    };
    init();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin"
          element={<AdminPanel user={user} backend={backend} />}
        />
        <Route
          path="/event/:id"
          element={
            <EventDetails
              events={events}
              user={user}
              setCart={setCart}
              setShowAuthModal={setShowAuthModal}
              setTickets={setTickets}
              backend={backend}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
              user={user}
              setShowAuthModal={setShowAuthModal}
              setTickets={setTickets}
              backend={backend}
            />
          }
        />
        {/* Другие маршруты */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;