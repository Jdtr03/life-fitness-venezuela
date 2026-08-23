import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const envPath = path.resolve('.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ Error: No se encontró el archivo .env.local');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)\s*$/);
  if (match) {
    const key = match[1].trim();
    let val = match[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.substring(1, val.length - 1);
    }
    env[key] = val;
  }
});

const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(url, key);

async function testJoinQuery() {
  console.log('📡 Haciendo consulta JOIN a la tabla de productos...');
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        sku,
        title,
        description,
        usage,
        img_url,
        manual_url,
        brands ( name ),
        subcategories (
          name,
          categories ( name )
        )
      `);

    if (error) {
      console.error('❌ Error en la consulta:', error.message);
      return;
    }

    console.log('✅ Consulta exitosa.');
    console.log(`Cantidad de productos obtenidos: ${data.length}`);
    if (data.length > 0) {
      console.log('Estructura del primer producto:', JSON.stringify(data[0], null, 2));
    } else {
      console.log('La consulta no devolvió filas. Verifica que la política RLS permita lecturas públicas en la tabla "products", "brands", "subcategories" y "categories".');
    }
  } catch (err) {
    console.error('❌ Error inesperado:', err.message);
  }
}

testJoinQuery();
