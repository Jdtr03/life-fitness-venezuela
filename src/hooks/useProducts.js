import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

// Diccionario de respaldo para subcategorías según ID en Supabase
const SUBCAT_MAP = {
  3: { name: 'Trotadoras', category: 'Cardio' },
  4: { name: 'Elípticas', category: 'Cardio' },
  5: { name: 'Bicicletas Verticales', category: 'Cardio' },
  6: { name: 'Bicicletas Reclinadas', category: 'Cardio' },
  7: { name: 'Air Bikes', category: 'Cardio' },
  8: { name: 'Ciclismo Indoor', category: 'Cardio' },
  9: { name: 'Remos', category: 'Cardio' },
  10: { name: 'Multigimnasios', category: 'Fuerza' },
  11: { name: 'Serie Selectorizada', category: 'Fuerza' }
};

function normalizeUsage(rawUsage) {
  if (!rawUsage) return 'Gimnasio';
  const u = rawUsage.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (u.includes('domest') || u.includes('hogar') || u.includes('residencial')) {
    return 'Hogar';
  }
  if (u.includes('semicomercial')) {
    return 'Ambos';
  }
  if (u.includes('comercial') || u.includes('gimnasio') || u.includes('profesional')) {
    return 'Gimnasio';
  }
  return 'Gimnasio';
}

function cleanTitle(title, subCatName) {
  if (!title) return 'Producto';
  let t = title.trim();

  // Elimina cualquier número al inicio seguido de espacios, puntos o guiones (ej. "5 Aspire" -> "Aspire", "6 RS1" -> "RS1")
  let cleaned = t.replace(/^\d+[\s\.\-:]*/, '').trim();

  // Si quieres anteponer la subcategoría al título ya limpio
  if (subCatName && !cleaned.toLowerCase().includes(subCatName.toLowerCase())) {
    return `${subCatName} ${cleaned}`;
  }

  return cleaned || t;
}

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const { data, error: dbError } = await supabase
          .from('products')
          .select(`
            id,
            sku,
            title,
            description,
            usage,
            img_url,
            manual_url,
            brand_id,
            subcategory_id,
            brands ( name ),
            subcategories (
              name,
              categories ( name )
            )
          `);

        if (dbError) {
          throw dbError;
        }

        if (data && data.length > 0) {
          const dbProducts = data.map(p => {
            const usageType = normalizeUsage(p.usage);
            const brandName = p.brands?.name || (p.brand_id === 2 ? 'Hammer Strength' : 'Life Fitness');
            const subInfo = SUBCAT_MAP[p.subcategory_id] || {
              name: p.subcategories?.name || 'General',
              category: p.subcategories?.categories?.name || 'Cardio'
            };
            const catName = p.subcategories?.categories?.name || subInfo.category;
            const subCatName = p.subcategories?.name || subInfo.name;

            return {
              id: String(p.id),
              Brand: brandName,
              Category: catName,
              SubCategory: subCatName,
              usage: usageType,
              img: p.img_url || 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop',
              Titles: cleanTitle(p.title, subCatName),
              Desc: p.description || 'Sin descripción',
              Manual: p.manual_url || null,
            };
          });

          setProducts(dbProducts);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error('Error fetching products from Supabase:', err);
        setError(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}


