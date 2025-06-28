-- Referral system tables for Ocera app
-- Run this in your Supabase SQL editor after the main NextAuth schema

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
CREATE TRIGGER update_referral_codes_updated_at BEFORE UPDATE ON referral_codes 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some default referral codes for testing
INSERT INTO referral_codes (code, max_uses, expires_at) VALUES 
  ('WELCOME2024', 100, NOW() + INTERVAL '1 year'),
  ('BETA-ACCESS', 50, NOW() + INTERVAL '6 months'),
  ('OCERA-EARLY', 25, NOW() + INTERVAL '3 months')
ON CONFLICT (code) DO NOTHING;
