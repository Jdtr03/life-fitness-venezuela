import React from 'react';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Features from '../components/home/Features';
import Categories from '../components/home/Categories';
import Service from '../components/home/Service';
import CTA from '../components/home/CTA';
import Footer from '../components/home/Footer';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <About />
      <Features />
      <Categories />
      <Service />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
