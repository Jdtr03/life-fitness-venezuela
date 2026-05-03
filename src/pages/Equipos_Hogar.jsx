import React from 'react';
import Footer from '../components/home/Footer';
import HogarHero from '../components/hogar/HogarHero';
import HogarProducts from '../components/hogar/HogarProducts';
import HogarSpecs from '../components/hogar/HogarSpecs';
import HogarProductsB from '../components/hogar/HogarProductsB';

export default function EquiposHogar() {
  return (
    <div className="catalog-page">
      <HogarHero />
      <HogarProducts />
      <HogarSpecs />
      <HogarProductsB />
      <Footer />
    </div>
  );
}
