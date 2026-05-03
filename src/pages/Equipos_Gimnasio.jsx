import React from 'react';
import Footer from '../components/home/Footer';
import GimnasioHero from '../components/gimnasio/GimnasioHero';
import GimnasioProducts from '../components/gimnasio/GimnasioProducts';
import GimnasioSpecs from '../components/gimnasio/GimnasioSpecs';
import GimnasioProductsB from '../components/gimnasio/GimnasioProductsB';

export default function EquiposGimnasio() {
  return (
    <div className="catalog-page">
      <GimnasioHero />
      <GimnasioProducts />
      <GimnasioSpecs />
      <GimnasioProductsB />
      <Footer />
    </div>
  );
}
