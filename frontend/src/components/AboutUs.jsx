import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gray-800/50">
      <div className="max-w-4xl mx-auto scale-in">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 text-[var(--neon-blue)]">About Us</h2>
        <div className="bg-gray-800/40 p-6 rounded-lg border border-[rgba(0,240,255,0.2)]">
          <p className="text-gray-300 mb-4">RV.RA-ICP (Tickets Partner) is a decentralized platform for creating events and selling tickets. Our services are available through the Telegram web application, which provides fast and convenient use without installation. Today we have created a website that expands our capabilities and in the future we plan to expand the capabilities of iOS, Android.</p>
          <p className="text-gray-300 mb-4">Founded in 2025, our mission is to connect event-goers with unforgettable experiences while ensuring trust and transparency in every transaction. We partner with top venues and organizers to bring you a diverse range of events, from local comedy shows to international music festivals.</p>
          <p className="text-gray-300 mb-4">RV.RA-ICP offers a secure, convenient ticket purchasing solution using ICP blockchain for transparency and decentralized storage. With Internet Identity and NFT tickets, each ticket is unique and fraud-proof. QR code entry ensures ease of use. Whether you love music, theater, or festivals, RV.RA-ICP delivers unforgettable experiences with cutting-edge technology.</p>
          <p className="text-gray-300">Join thousands of satisfied customers and explore the world of events with RV.RA-ICP today!</p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;