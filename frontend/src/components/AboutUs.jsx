import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-gradient-to-br from-white via-gray-50 to-emerald-50 py-16 px-6 md:px-20">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-600">
            Our Mission at HealthFirst
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            At HealthFirst, we believe in making healthcare accessible and compassionate. 
            Our mission is to connect patients with top-rated doctors instantly and seamlessly.
            Whether you're looking for preventative care or urgent consultations, our platform ensures quality care with convenience.
          </p>
          <p className="text-gray-600 text-md">
            Empowering communities through verified doctors, real-time availability, and transparent booking — all in one trusted space.
          </p>
        </div>

        <div className="w-full lg:w-1/2">
          <img
            className="w-full h-full object-contain rounded-3xl drop-shadow-2xl shadow-green-400 "
            src="https://www.kindpng.com/picc/m/275-2754908_department-of-health-doctors-hd-png-download.png"
            alt="Doctors illustration"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
