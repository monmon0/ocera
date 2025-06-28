-- Database setup for Ocera referral system
-- Run this in your Supabase SQL editor

-- First, ensure the NextAuth tables exist (from supabase-schema.sql)
-- Then run this additional schema for the referral system:

-- Create referral_codes table
CREATE TABLE IF NOT EXISTS referral_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(20) UNIQUE NOT NULL,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  max_uses INTEGER DEFAULT 1,
  used_count INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_referrals table to track who was referred by whom
CREATE TABLE IF NOT EXISTS user_referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referred_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  referrer_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  referral_code_id UUID REFERENCES referral_codes(id) ON DELETE SET NULL,
  referral_code VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add additional user profile fields
ALTER TABLE users ADD COLUMN IF NOT EXISTS username VARCHAR(50) UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS referred_by UUID REFERENCES users(id) ON DELETE SET NULL;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS referral_codes_code_idx ON referral_codes(code);
CREATE INDEX IF NOT EXISTS referral_codes_created_by_idx ON referral_codes(created_by);
CREATE INDEX IF NOT EXISTS user_referrals_referred_user_idx ON user_referrals(referred_user_id);
CREATE INDEX IF NOT EXISTS user_referrals_referrer_user_idx ON user_referrals(referrer_user_id);
CREATE INDEX IF NOT EXISTS users_username_idx ON users(username);

-- Add trigger to update updated_at column for referral_codes
-- (The update_updated_at_column function should already exist from supabase-schema.sql)
CREATE TRIGGER update_referral_codes_updated_at BEFORE UPDATE ON referral_codes 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some default referral codes for testing
INSERT INTO referral_codes (code, max_uses, expires_at) VALUES 
  ('WELCOME2024', 100, NOW() + INTERVAL '1 year'),
  ('BETA-ACCESS', 50, NOW() + INTERVAL '6 months'),
  ('OCERA-EARLY', 25, NOW() + INTERVAL '3 months')
ON CONFLICT (code) DO NOTHING;

-- Enable Row Level Security (RLS) for security
ALTER TABLE referral_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_referrals ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
-- Allow anyone to read active referral codes (for validation)
CREATE POLICY "Anyone can read active referral codes" ON referral_codes
  FOR SELECT USING (is_active = true);

-- Allow users to read their own referral records
CREATE POLICY "Users can read own referral records" ON user_referrals
  FOR SELECT USING (referred_user_id = auth.uid() OR referrer_user_id = auth.uid());

-- Allow service role to do everything (for API operations)
CREATE POLICY "Service role has full access to referral_codes" ON referral_codes
  FOR ALL USING (current_setting('role') = 'service_role');

CREATE POLICY "Service role has full access to user_referrals" ON user_referrals
  FOR ALL USING (current_setting('role') = 'service_role');
