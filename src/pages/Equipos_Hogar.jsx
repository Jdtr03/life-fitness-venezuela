import React from 'react';
import Footer from '../components/home/Footer';
import HogarHero from '../components/hogar/HogarHero';
import HogarSpecs from '../components/hogar/HogarSpecs';
import DynamicCatalog from '../components/DynamicCatalog';
import { gymData } from '../data/gym_data';

export default function EquiposHogar() {
  // Filtrar productos para Hogar
  const hogarProducts = gymData.filter(p => p.usage === 'Hogar');

  // Bloque A: Fuerza
  const fuerzaProducts = hogarProducts.filter(p => p.Category === 'Fuerza');

  // Bloque B: Cardio
  const cardioProducts = hogarProducts.filter(p => p.Category === 'Cardio');

  return (
    <div className="catalog-page">
      <HogarHero />
      
      {/* BLOQUE A: FUERZA */}
      <DynamicCatalog products={fuerzaProducts} title="Fuerza" />

      <HogarSpecs />

      {/* BLOQUE B: CARDIO */}
      <DynamicCatalog products={cardioProducts} title="Cardio" />
      
      <Footer />
    </div>
  );
}
