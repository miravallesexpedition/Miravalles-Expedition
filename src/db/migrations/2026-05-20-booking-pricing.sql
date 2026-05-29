-- Run this only if the database was created with the older schema.
-- New installations can use src/db/schema.sql directly.

ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS customer_type TEXT CHECK (customer_type IN ('foreign', 'national')) DEFAULT 'foreign',
  ADD COLUMN IF NOT EXISTS currency TEXT CHECK (currency IN ('USD', 'CRC')) DEFAULT 'USD',
  ADD COLUMN IF NOT EXISTS unit_price DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS price_label TEXT,
  ADD COLUMN IF NOT EXISTS confirmation_expires_at TIMESTAMP WITH TIME ZONE;

-- If your Supabase project already has UUID tour IDs, create fresh tour rows with
-- the same slug IDs used by the website before enabling real bookings.
-- The safest clean setup is to create a new project and run src/db/schema.sql.
