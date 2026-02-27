-- Function to batch fetch users with emails
CREATE OR REPLACE FUNCTION get_users_with_emails(user_ids UUID[])
RETURNS TABLE (
  id UUID,
  full_name VARCHAR,
  role VARCHAR,
  email VARCHAR,
  is_active BOOLEAN,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT up.id, up.full_name, up.role, au.email, up.is_active, up.created_at
  FROM user_profiles up
  LEFT JOIN auth.users au ON au.id = up.id
  WHERE up.id = ANY(user_ids);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
