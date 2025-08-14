import React from 'react';

const Contact = () => {
  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-emerald-600 mb-4 text-center">Contact Us</h1>
        <p className="text-gray-600 text-center mb-12">We’d love to hear from you. Fill out the form or reach out directly.</p>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-md  space-y-6">
            <img  className=' w-full h-full object-cover rounded-2xl ' src="https://previews.123rf.com/images/kritchanut/kritchanut1605/kritchanut160500192/57077439-doctor-hand-touching-contact-us-sign-on-virtual-screen.jpg" alt="" />
          </div>

 
          <form className="w-full lg:w-2/3 bg-white rounded-2xl shadow-md p-8 space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                required
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-full shadow-lg transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
