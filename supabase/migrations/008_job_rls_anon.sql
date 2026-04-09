-- Allow anonymous reads on job_preferences (needed for server-side cron/admin API routes)
CREATE POLICY "Allow anon select on job_preferences"
  ON job_preferences FOR SELECT
  USING (true);

-- Allow anonymous reads on job_opportunities (needed for server-side scoring updates)
CREATE POLICY "Allow anon select on job_opportunities"
  ON job_opportunities FOR SELECT
  USING (true);

-- Allow anonymous insert on job_opportunities (needed for cron upsert)
CREATE POLICY "Allow anon insert on job_opportunities"
  ON job_opportunities FOR INSERT
  WITH CHECK (true);

-- Allow anonymous update on job_opportunities (needed for score updates)
CREATE POLICY "Allow anon update on job_opportunities"
  ON job_opportunities FOR UPDATE
  USING (true);
