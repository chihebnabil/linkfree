-- Create clicks tracking table
CREATE TABLE IF NOT EXISTS link_clicks (
  id SERIAL PRIMARY KEY,
  link_title VARCHAR(255) NOT NULL,
  link_url TEXT NOT NULL,
  link_group VARCHAR(100),
  user_agent TEXT,
  ip_address INET,
  referrer TEXT,
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_id VARCHAR(255)
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_link_clicks_clicked_at ON link_clicks(clicked_at);
CREATE INDEX IF NOT EXISTS idx_link_clicks_link_title ON link_clicks(link_title);
CREATE INDEX IF NOT EXISTS idx_link_clicks_session_id ON link_clicks(session_id);

-- Create a view for analytics
CREATE OR REPLACE VIEW link_analytics AS
SELECT 
  link_title,
  link_group,
  COUNT(*) as total_clicks,
  COUNT(DISTINCT session_id) as unique_clicks,
  DATE_TRUNC('day', clicked_at) as click_date,
  MAX(clicked_at) as last_clicked
FROM link_clicks 
GROUP BY link_title, link_group, DATE_TRUNC('day', clicked_at)
ORDER BY total_clicks DESC;
