import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full px-10 py-5 mt-10 ">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-evenly gap-10">
        <div className=" flex flex-wrap justify-between items-start gap-10 w-full">
          <a href="#" className="text-gray-700 hover:text-black text-sm font-medium">About</a>
          <a href="#" className="text-gray-700 hover:text-black text-sm font-medium">Careers</a>
          <a href="#" className="text-gray-700 hover:text-black text-sm font-medium">Press Inquiries</a>
          <a href="#" className="text-gray-700 hover:text-black text-sm font-medium">Support</a>
          <a href="#" className="text-gray-700 hover:text-black text-sm font-medium">Privacy Policy</a>
          <a href="#" className="text-gray-700 hover:text-black text-sm font-medium">Terms of Service</a>
        </div>

        <div className="text-center md:text-right w-full md:w-auto">
          <h3 className="text-sm text-gray-500 font-medium">
            © 2025 HealthFirst. All rights reserved.
          </h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
