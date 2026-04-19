const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function run() {
  const { data, error } = await supabase.from('store_settings').select('*');
  if (error) {
    console.error('Error:', error);
    return;
  }
  console.log('Rows in store_settings:', data.length);
  console.log('Data:', JSON.stringify(data, null, 2));
}

run();
