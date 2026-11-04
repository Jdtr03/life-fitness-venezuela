import React from 'react';
import Footer from '../components/home/Footer';
import GimnasioHero from '../components/gimnasio/GimnasioHero';
import GimnasioSpecs from '../components/gimnasio/GimnasioSpecs';
import DynamicCatalog from '../components/DynamicCatalog';
import { useProducts } from '../hooks/useProducts';

export default function EquiposGimnasio() {
  const { products, loading } = useProducts();

  // Filtrar productos para Línea Comercial / Gimnasio
  const gimnasioProducts = products.filter(p => p.usage === 'Gimnasio' || p.usage === 'Ambos');

  // Bloque A: Fuerza (Serie Selectorizada, Placas, etc.)
  const fuerzaProducts = gimnasioProducts.filter(p => p.Category === 'Fuerza');

  // Bloque B: Cardio (Trotadoras, Elípticas, Bicicletas, Air Bikes, Indoor, Remos)
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
