import React from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import FindDoctor from '../components/FindDoctor';
import AboutUs from '../components/AboutUs';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      <Nav />
      <section className="flex flex-col lg:flex-row items-center justify-between px-10 lg:px-24 pt-30 pb-15 from-emerald-50 via-white to-teal-50 ">
        <div className="w-full lg:w-1/2 max-h-[520px] overflow-hidden rounded-3xl shadow-xl">
          <img
            src="https://thumbs.dreamstime.com/b/d-style-cute-cartoon-character-medical-doctor-against-bright-color-background-d-style-cute-cartoon-character-medical-306091095.jpg"
            alt="Doctor"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>

        <div className="w-full lg:w-1/2 mt-10 lg:mt-0 lg:pl-16 flex flex-col gap-6">
          <h1 className="text-5xl font-bold text-gray-900 leading-snug">
            Find the right care,<br /> right when you need it
          </h1>
          <div className="space-y-2 text-gray-600 text-base font-medium">
            <p>Book appointments with top-rated doctors, instantly.</p>
            <p>Millions of patients trust us to find and book the best care.</p>
            <p>Verified profiles, real-time availability, and easy booking.</p>
          </div>
          <a href="#find-doctor">
            <button className="px-8 py-3 mt-4 text-lg rounded-full font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
              Find a Doctor
            </button>
          </a>
        </div>
      </section>

         <div className="max-w-7xl mx-auto text-center mb-12">
        <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Trusted Healthcare Network
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Top Doctors to <span className="text-emerald-600">Book</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Simply browse through our extensive list of trusted doctors and find the perfect healthcare partner for your needs.
        </p>
      </div>
        <FindDoctor />
    

      <section id="about-us">
        <AboutUs />
      </section>

      <section id="Contact">
       <Contact/>
      </section>




      <Footer />
    </>
  );
};

export default Home;
