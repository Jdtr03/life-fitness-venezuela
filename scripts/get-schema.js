import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch'; // Wait, node-fetch might not be installed, but Node 18+ has native fetch! Let's use native fetch.

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

if (!url || !key) {
  console.error('❌ Error: VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY no configurados.');
  process.exit(1);
}

async function inspectSchema() {
  try {
    console.log(`📡 Consultando especificación OpenAPI de Supabase en ${url}...`);
    const res = await fetch(`${url}/rest/v1/`, {
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
      }
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const schema = await res.json();
    console.log('✅ Conexión OpenAPI exitosa.');
    console.log('\nTablas disponibles en la base de datos:');
    if (schema.definitions) {
      const tables = Object.keys(schema.definitions);
      tables.forEach(table => {
        console.log(`- ${table}`);
        const properties = schema.definitions[table].properties;
        if (properties) {
          console.log('  Campos:');
          Object.keys(properties).forEach(prop => {
            console.log(`    * ${prop}: ${properties[prop].type}`);
          });
        }
      });
    } else {
      console.log('No se encontraron definiciones de tablas en el esquema public.');
    }
  } catch (err) {
    console.error('❌ Error al obtener el esquema:', err.message);
  }
}

inspectSchema();
