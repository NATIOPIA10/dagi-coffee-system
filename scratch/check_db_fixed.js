const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://idnkmelxuxrsswzwwbes.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkbmttZWx4dXhyc3N3end3YmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NDMxMTksImV4cCI6MjA5MjExOTExOX0.3E_STqcMTA78ILrKJGwGwTSWZlX9Ep3SH8DUD8Ra1dk'
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
