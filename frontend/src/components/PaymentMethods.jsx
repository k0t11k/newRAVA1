import React from 'react';

const PaymentMethods = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gray-800/50">
      <div className="max-w-4xl mx-auto scale-in">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 text-[var(--neon-blue)]">Payment Methods</h2>
        <div className="bg-gray-800/40 p-6 rounded-lg border border-[rgba(0,240,255,0.2)]">
          <h3 className="text-xl font-semibold text-[var(--neon-blue)] mb-4">Secure Payment Options</h3>
          <p className="text-gray-300 mb-4">At RV.RA-ICP, we offer a variety of secure payment methods:</p>
          <ul className="text-gray-300 list-disc list-inside space-y-2 mb-4">
            <li>Credit/Debit Cards (Visa, MasterCard)</li>
            <li>Plug Wallet (Blockchain-based secure payments with cryptocurrency)</li>
            <li>PayPal for quick and trusted transactions</li>
            <li>Bank Transfers for select events</li>
            <li>NOWPayments</li>
          </ul>
          <p className="text-gray-300 mb-4">All transactions are encrypted and stored on the blockchain for protection.</p>
          <p className="text-gray-300">Questions? Contact us at citointrues@gmail.com or +380934307551.</p>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethods;