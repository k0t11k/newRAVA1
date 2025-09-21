import React from 'react';

const Login = ({ setUser, authClient, handleLogin }) => {
  const handlePlugLogin = async () => {
    if (window.ic && window.ic.plug) {
      const connected = await window.ic.plug.isConnected();
      if (!connected) {
        await window.ic.plug.requestConnect({ whitelist: [] });
      }
      const principal = await window.ic.plug.getPrincipal();
      setUser({ principal: principal.toString() });
    } else {
      alert('Plug Wallet not installed. Install from https://plugwallet.ooo/');
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gray-800/50">
      <div className="max-w-md mx-auto bg-gray-800/40 p-6 rounded-lg border border-[rgba(0,240,255,0.2)] scale-in">
        <h2 className="text-2xl font-bold text-center mb-6 text-[var(--neon-blue)]">Login</h2>
        <button className="button w-full mb-4" onClick={handleLogin}>Login with Internet Identity</button>
        <button className="button w-full flex items-center justify-center gap-2" onClick={handlePlugLogin}>
          Sign in with Plug Wallet
        </button>
      </div>
    </section>
  );
};

export default Login;