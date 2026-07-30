import React from 'react';
import Footer from '../components/home/Footer';
import HogarHero from '../components/hogar/HogarHero';
import HogarSpecs from '../components/hogar/HogarSpecs';
import DynamicCatalog from '../components/DynamicCatalog';
import { useProducts } from '../hooks/useProducts';

export default function EquiposHogar() {
  const { products, loading } = useProducts();

  // Filtrar productos para Línea Hogar / Doméstico
  const hogarProducts = products.filter(p => p.usage === 'Hogar' || p.usage === 'Ambos');

  // Bloque A: Fuerza (Multigimnasios, etc.)
  const fuerzaProducts = hogarProducts.filter(p => p.Category === 'Fuerza');

  // Bloque B: Cardio (Trotadoras, Elípticas, Bicicletas, Remos, etc.)
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
