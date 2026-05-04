import React from 'react';
import Footer from '../components/home/Footer';
import GimnasioHero from '../components/gimnasio/GimnasioHero';
import GimnasioSpecs from '../components/gimnasio/GimnasioSpecs';
import DynamicCatalog from '../components/DynamicCatalog';
import { gymData } from '../data/gym_data';

export default function EquiposGimnasio() {
  // Filtrar productos para Gimnasio
  const gimnasioProducts = gymData.filter(p => p.usage === 'Gimnasio');

  // Bloque A: Fuerza
  const fuerzaProducts = gimnasioProducts.filter(p => p.Category === 'Fuerza');

  // Bloque B: Cardio
  const cardioProducts = gimnasioProducts.filter(p => p.Category === 'Cardio');

  return (
    <div className="catalog-page">
      <GimnasioHero />
      
      {/* BLOQUE A: FUERZA */}
      <DynamicCatalog products={fuerzaProducts} title="Fuerza" />

      <GimnasioSpecs />

      {/* BLOQUE B: CARDIO */}
      <DynamicCatalog products={cardioProducts} title="Cardio" />
      
      <Footer />
    </div>
  );
}
