-- Add CV and cover letter support to job system

-- CV URL in preferences
ALTER TABLE job_preferences ADD COLUMN IF NOT EXISTS cv_url TEXT;
ALTER TABLE job_preferences ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE job_preferences ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE job_preferences ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE job_preferences ADD COLUMN IF NOT EXISTS freelancer_token TEXT; -- OAuth token for Freelancer API

-- Cover letter and apply tracking on opportunities
ALTER TABLE job_opportunities ADD COLUMN IF NOT EXISTS cover_letter TEXT;
ALTER TABLE job_opportunities ADD COLUMN IF NOT EXISTS applied_at TIMESTAMPTZ;
ALTER TABLE job_opportunities ADD COLUMN IF NOT EXISTS apply_method TEXT; -- 'email', 'freelancer', 'manual'
ALTER TABLE job_opportunities ADD COLUMN IF NOT EXISTS contact_email TEXT; -- extracted email for apply
