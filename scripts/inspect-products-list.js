import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const envPath = path.resolve('.env.local');
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

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function inspectAllProducts() {
  const { data: products } = await supabase.from('products').select('*').order('id');
  console.log('--- ALL PRODUCTS ---');
  products.forEach(p => {
    console.log(`ID: ${p.id} | SubCatID: ${p.subcategory_id} | BrandID: ${p.brand_id} | Usage: "${p.usage}" | Title: "${p.title}"`);
  });
}

inspectAllProducts();
