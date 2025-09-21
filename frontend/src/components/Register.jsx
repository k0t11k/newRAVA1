import React, { useState } from 'react';

const Register = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    if (!email || !password || !name || !phone || !address) {
      setError('Please fill in all fields.');
      return;
    }
    // Заглушка регистрации (в реале - backend)
    setUser({ name, email, phone, address });
    setError('');
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gray-800/50">
      <div className="max-w-md mx-auto bg-gray-800/40 p-6 rounded-lg border border-[rgba(0,240,255,0.2)] scale-in">
        <h2 className="text-2xl font-bold text-center mb-6 text-[var(--neon-blue)]">Register</h2>
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        <input type="text" placeholder="Name" className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg input-focus" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg input-focus" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg input-focus" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="tel" placeholder="Phone" className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg input-focus" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="text" placeholder="Address" className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg input-focus" value={address} onChange={(e) => setAddress(e.target.value)} />
        <button className="button w-full mb-4" onClick={handleRegister}>Register</button>
      </div>
    </section>
  );
};

export default Register;