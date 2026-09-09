import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Blog from '../components/Blog';
import SEO from '../components/SEO';

const JournalPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#12100E] selection:bg-[#C5A059] selection:text-[#12100E] flex flex-col">
      <SEO title="Photography Journal & Stories" description="Read stories, tips, and behind-the-scenes insights from our latest photography sessions in Salem." path="/journal" />
      <Navbar />
      <div className="flex-grow pt-4 md:pt-8">
        <Blog />
      </div>
      <Footer />
    </div>
  );
};

export default JournalPage;
