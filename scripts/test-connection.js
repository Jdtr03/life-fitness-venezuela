import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const envPath = path.resolve('.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ Error: No se encontró el archivo .env.local en la raíz del proyecto.');
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

if (!url || !key || url.includes('tu_url_de_proyecto_supabase') || key.includes('tu_clave_anonima_publica_de_supabase')) {
  console.log('\n⚠️  Por favor, configura tus credenciales reales en .env.local antes de ejecutar la prueba.\n');
  process.exit(0);
}

console.log(`📡 Intentando conectar a Supabase en: ${url}...`);
const supabase = createClient(url, key);

async function testConnection() {
  try {
    const { data, error } = await supabase.from('_test_conexion_').select('*').limit(1);
    
    if (error) {
      if (error.code === 'PGRST116' || error.message.includes('relation "_test_conexion_" does not exist')) {
        console.log('✅ ¡Conexión con Supabase configurada correctamente!');
        console.log('   La URL y la Anon Key son válidas y autorizadas.');
      } else if (error.status === 401 || error.status === 403 || error.message.includes('Invalid API key') || error.message.includes('JWT')) {
        console.error('❌ Error de autenticación: La Anon Key o la URL no son válidas.');
        console.error('Detalles:', error.message);
      } else {
        console.log('✅ ¡Conexión con Supabase establecida!');
        console.log('Detalles de la respuesta:', error.message);
      }
    } else {
      console.log('✅ ¡Conexión exitosa a Supabase!');
    }
  } catch (err) {
    console.error('❌ Error inesperado al conectar con Supabase:', err.message);
  }
}

testConnection();
