-- For development: disable RLS
ALTER TABLE customers DISABLE ROW LEVEL SECURITY;
ALTER TABLE activities DISABLE ROW LEVEL SECURITY;
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;

-- For production: enable with policies
-- CREATE POLICY "Allow authenticated users to read customers"
--   ON customers FOR SELECT
--   TO authenticated
--   USING (true);

-- CREATE POLICY "Allow authenticated users to insert customers"
--   ON customers FOR INSERT
--   TO authenticated
--   WITH CHECK (true);

-- CREATE POLICY "Allow authenticated users to update customers"
--   ON customers FOR UPDATE
--   TO authenticated
--   USING (true);
