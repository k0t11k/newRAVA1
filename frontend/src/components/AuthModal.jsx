import React from 'react';

const AuthModal = ({ setShow, onLogin }) => {
  return (
    <div className="fixed inset-0 modal flex items-center justify-center z-50">
      <div className="bg-gray-800/90 p-6 sm:p-8 rounded-lg border border-[rgba(0,240,255,0.2)] max-w-sm w-full scale-in">
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--neon-blue)] mb-4">Please Log In</h3>
        <p className="text-gray-300 mb-6">You need to be logged in to perform this action.</p>
        <div className="flex gap-4">
          <button className="button flex-1" onClick={onLogin}>Log In</button>
          <button className="button flex-1" onClick={() => setShow(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;