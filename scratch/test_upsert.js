const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://idnkmelxuxrsswzwwbes.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkbmttZWx4dXhyc3N3end3YmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NDMxMTksImV4cCI6MjA5MjExOTExOX0.3E_STqcMTA78ILrKJGwGwTSWZlX9Ep3SH8DUD8Ra1dk'
);

async function run() {
  // We can't easily list columns without a direct SQL tool, 
  // but we can try an insert with all columns and see if it errors.
  const testData = {
    id: 1,
    store_name: 'Test',
    phone_number: '123',
    store_address: 'Test',
    hours_weekday: 'Test',
    hours_weekend: 'Test',
    contact_email: 'test@test.com',
    hero_tagline: 'Test',
    about_title: 'Test',
    about_body_1: 'Test',
    about_body_2: 'Test',
    hero_image_url: 'Test',
    about_image_1_url: 'Test',
    about_image_2_url: 'Test',
    about_image_3_url: 'Test',
    map_image_url: 'Test',
    visit_us_title: 'Test'
  };

  const { error } = await supabase.from('store_settings').upsert(testData);
  if (error) {
    console.error('Error during upsert test:', error.message);
    if (error.message.includes('column') && error.message.includes('does not exist')) {
        console.log('CRITICAL: One or more columns are missing!');
    }
  } else {
    console.log('Upsert successful! Row 1 created.');
  }
}

run();
