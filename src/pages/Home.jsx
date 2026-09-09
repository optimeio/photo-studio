import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PricingPackages from '../components/PricingPackages';
import WorksPreview from '../components/WorksPreview';
import Footer from '../components/Footer';
import BookingSection from '../components/BookingSection';
import SEO from '../components/SEO';

const Home = () => {
  const [bookingCategory, setBookingCategory] = useState("wedding");

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#12100E] selection:bg-[#C5A059] selection:text-[#12100E]">
      <div className="">
        <Navbar />
        <main>
          <SEO title="LumaCraft Photography - Cinematic Wedding & Portrait Photography" description="LumaCraft Photography is a premium photography studio offering cinematic wedding, portrait, fashion, and event photography worldwide." path="/" />
          <Hero />
          <PricingPackages onBook={(category) => setBookingCategory(category)} />
          <WorksPreview />
          <BookingSection selectedCategory={bookingCategory} onCategoryChange={setBookingCategory} />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
