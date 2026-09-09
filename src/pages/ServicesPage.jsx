import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Services from '../components/Services';
import BookingSection from '../components/BookingSection';
import SEO from '../components/SEO';

const ServicesPage = () => {
  const [bookingCategory, setBookingCategory] = useState("wedding");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF8] selection:bg-[#C5A059] selection:text-[#12100E] flex flex-col">
      <SEO title="Photography Services in Salem" description="Explore our premium photography services in Salem including Wedding, Candid, Portrait, and Event photography." path="/services" />
      <Navbar />
      <div className="flex-grow">
        <Services onBook={(category) => setBookingCategory(category)} />
        <BookingSection selectedCategory={bookingCategory} onCategoryChange={setBookingCategory} />
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
