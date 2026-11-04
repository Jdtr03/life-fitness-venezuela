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

const candidateTables = ['productos', 'products', 'equipos', 'gym_data', 'items', 'catalogo', 'products_gym'];

async function searchTables() {
  console.log('📡 Buscando tablas en Supabase...');
  for (const table of candidateTables) {
    try {
      const { data, error } = await supabase.from(table).select('*').limit(5);
      if (!error) {
        console.log(`\n🎉 ¡Tabla encontrada! Nombre: "${table}"`);
        console.log(`Cantidad de filas obtenidas: ${data.length}`);
        if (data.length > 0) {
          console.log('Primer registro:', JSON.stringify(data[0], null, 2));
        } else {
          console.log('La tabla está vacía.');
        }
      } else {
        // Si el error no es de "no existe la tabla" (código PGRST116 o similar)
        if (error.code !== 'PGRST116' && !error.message.includes('does not exist')) {
          console.log(`❓ Tabla "${table}" existe o dio otro tipo de error:`, error.message);
        }
      }
    } catch (err) {
      // Ignorar
    }
  }
  console.log('\nBusqueda finalizada.');
}

searchTables();
