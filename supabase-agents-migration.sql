-- Enhanced Agents Table Migration for HomeBase
-- Run this in your Supabase SQL Editor

-- First, let's add the missing columns to the existing agents table
ALTER TABLE agents 
ADD COLUMN IF NOT EXISTS title TEXT,
ADD COLUMN IF NOT EXISTS company TEXT,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS reviews INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS properties_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS sales_volume DECIMAL(12, 2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS specialties TEXT[],
ADD COLUMN IF NOT EXISTS languages TEXT[],
ADD COLUMN IF NOT EXISTS experience_years INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_agents_location ON agents(location);
CREATE INDEX IF NOT EXISTS idx_agents_rating ON agents(rating);
CREATE INDEX IF NOT EXISTS idx_agents_is_verified ON agents(is_verified);
CREATE INDEX IF NOT EXISTS idx_agents_is_active ON agents(is_active);
CREATE INDEX IF NOT EXISTS idx_agents_specialties ON agents USING GIN(specialties);

-- Create agent_reviews table for detailed reviews
CREATE TABLE IF NOT EXISTS agent_reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    agent_id UUID REFERENCES agents(id) ON DELETE CASCADE NOT NULL,
    reviewer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for agent_reviews
CREATE INDEX IF NOT EXISTS idx_agent_reviews_agent_id ON agent_reviews(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_reviews_rating ON agent_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_agent_reviews_created_at ON agent_reviews(created_at);

-- Enable RLS for agent_reviews
ALTER TABLE agent_reviews ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for agent_reviews
CREATE POLICY "Anyone can view agent reviews" ON agent_reviews
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert reviews" ON agent_reviews
    FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Users can update their own reviews" ON agent_reviews
    FOR UPDATE USING (auth.uid() = reviewer_id);

CREATE POLICY "Users can delete their own reviews" ON agent_reviews
    FOR DELETE USING (auth.uid() = reviewer_id);

-- Create agent_contacts table to track contact requests
CREATE TABLE IF NOT EXISTS agent_contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    agent_id UUID REFERENCES agents(id) ON DELETE CASCADE NOT NULL,
    contact_name TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT,
    message TEXT,
    property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for agent_contacts
CREATE INDEX IF NOT EXISTS idx_agent_contacts_agent_id ON agent_contacts(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_contacts_status ON agent_contacts(status);
CREATE INDEX IF NOT EXISTS idx_agent_contacts_created_at ON agent_contacts(created_at);

-- Enable RLS for agent_contacts
ALTER TABLE agent_contacts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for agent_contacts
CREATE POLICY "Agents can view their own contacts" ON agent_contacts
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM agents 
            WHERE agents.id = agent_contacts.agent_id 
            AND agents.user_id = auth.uid()
        )
    );

CREATE POLICY "Anyone can insert contact requests" ON agent_contacts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Agents can update their own contacts" ON agent_contacts
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM agents 
            WHERE agents.id = agent_contacts.agent_id 
            AND agents.user_id = auth.uid()
        )
    );

-- Function to update agent statistics
CREATE OR REPLACE FUNCTION update_agent_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Update agent's properties count and sales volume
    UPDATE agents 
    SET 
        properties_count = (
            SELECT COUNT(*) 
            FROM properties 
            WHERE user_id = (
                SELECT user_id FROM agents WHERE id = NEW.agent_id
            )
        ),
        sales_volume = (
            SELECT COALESCE(SUM(price), 0) 
            FROM properties 
            WHERE user_id = (
                SELECT user_id FROM agents WHERE id = NEW.agent_id
            )
            AND property_type = 'For Sale'
        )
    WHERE id = NEW.agent_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update agent rating based on reviews
CREATE OR REPLACE FUNCTION update_agent_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE agents 
    SET 
        rating = (
            SELECT ROUND(AVG(rating), 2) 
            FROM agent_reviews 
            WHERE agent_id = NEW.agent_id
        ),
        reviews = (
            SELECT COUNT(*) 
            FROM agent_reviews 
            WHERE agent_id = NEW.agent_id
        )
    WHERE id = NEW.agent_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic stats updates
CREATE TRIGGER update_agent_stats_trigger
    AFTER INSERT OR UPDATE OR DELETE ON properties
    FOR EACH ROW
    EXECUTE FUNCTION update_agent_stats();

CREATE TRIGGER update_agent_rating_trigger
    AFTER INSERT OR UPDATE OR DELETE ON agent_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_agent_rating();

-- Create updated_at triggers for new tables
CREATE TRIGGER update_agent_reviews_updated_at 
    BEFORE UPDATE ON agent_reviews 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agent_contacts_updated_at 
    BEFORE UPDATE ON agent_contacts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample agent data to populate the agents page
INSERT INTO agents (name, email, phone, bio, title, company, location, rating, reviews, properties_count, sales_volume, specialties, languages, experience_years, is_verified, is_active, image_url) VALUES
(
    'Kwame Asante',
    'kwame@homebase.gh',
    '+233 20 123 4567',
    'Experienced real estate agent specializing in residential properties in Accra. Committed to helping clients find their dream homes.',
    'Senior Real Estate Agent',
    'HomeBase Realty',
    'Accra, Ghana',
    4.9,
    127,
    45,
    2500000,
    ARRAY['Residential', 'Luxury Homes', 'Investment'],
    ARRAY['English', 'Twi', 'Ga'],
    8,
    true,
    true,
    'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400'
),
(
    'Abena Mensah',
    'abena@ghanaproperties.com',
    '+233 24 987 6543',
    'Property investment specialist with extensive knowledge of commercial real estate in Kumasi and surrounding areas.',
    'Property Investment Specialist',
    'Ghana Properties Ltd',
    'Kumasi, Ghana',
    4.8,
    89,
    32,
    1800000,
    ARRAY['Commercial', 'Investment', 'Land'],
    ARRAY['English', 'Twi'],
    6,
    true,
    true,
    'https://images.pexels.com/photos/3775087/pexels-photo-3775087.jpeg?auto=compress&cs=tinysrgb&w=400'
),
(
    'Samuel Owusu',
    'samuel@primeestates.gh',
    '+233 26 555 7890',
    'Dedicated to helping first-time buyers and families find affordable housing solutions in Takoradi.',
    'Residential Sales Agent',
    'Prime Estates',
    'Takoradi, Ghana',
    4.7,
    64,
    28,
    1200000,
    ARRAY['Residential', 'First-time Buyers', 'Rentals'],
    ARRAY['English', 'Fante'],
    4,
    true,
    true,
    'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400'
),
(
    'Akosua Boateng',
    'akosua@eliterealty.gh',
    '+233 20 111 2222',
    'Luxury property consultant with a passion for high-end real estate and executive rentals in Accra.',
    'Luxury Property Consultant',
    'Elite Realty Ghana',
    'Accra, Ghana',
    4.9,
    156,
    67,
    3200000,
    ARRAY['Luxury Homes', 'High-end Condos', 'Executive Rentals'],
    ARRAY['English', 'Twi', 'French'],
    10,
    true,
    true,
    'https://images.pexels.com/photos/3775087/pexels-photo-3775087.jpeg?auto=compress&cs=tinysrgb&w=400'
),
(
    'Kofi Adjei',
    'kofi@businessproperties.gh',
    '+233 27 333 4444',
    'Commercial property expert focusing on industrial and office spaces in the Tema industrial area.',
    'Commercial Property Agent',
    'Business Properties Ghana',
    'Tema, Ghana',
    4.6,
    73,
    21,
    2100000,
    ARRAY['Commercial', 'Industrial', 'Office Spaces'],
    ARRAY['English', 'Twi', 'Ewe'],
    7,
    true,
    true,
    'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400'
),
(
    'Ama Darko',
    'ama@darkoassociates.gh',
    '+233 24 555 6666',
    'Real estate consultant specializing in vacation homes and land development in the Central Region.',
    'Real Estate Consultant',
    'Darko & Associates',
    'Cape Coast, Ghana',
    4.8,
    91,
    38,
    1600000,
    ARRAY['Residential', 'Vacation Homes', 'Land Development'],
    ARRAY['English', 'Fante', 'Twi'],
    5,
    true,
    true,
    'https://images.pexels.com/photos/3775087/pexels-photo-3775087.jpeg?auto=compress&cs=tinysrgb&w=400'
);

-- Create a view for agent statistics
CREATE OR REPLACE VIEW agent_stats AS
SELECT 
    a.id,
    a.name,
    a.title,
    a.company,
    a.location,
    a.rating,
    a.reviews,
    a.properties_count,
    a.sales_volume,
    a.specialties,
    a.languages,
    a.experience_years,
    a.is_verified,
    a.image_url,
    a.phone,
    a.email,
    a.bio,
    COUNT(DISTINCT p.id) as active_properties,
    AVG(ar.rating) as avg_review_rating,
    COUNT(DISTINCT ac.id) as total_contacts
FROM agents a
LEFT JOIN properties p ON p.user_id = a.user_id
LEFT JOIN agent_reviews ar ON ar.agent_id = a.id
LEFT JOIN agent_contacts ac ON ac.agent_id = a.id
WHERE a.is_active = true
GROUP BY a.id, a.name, a.title, a.company, a.location, a.rating, a.reviews, 
         a.properties_count, a.sales_volume, a.specialties, a.languages, 
         a.experience_years, a.is_verified, a.image_url, a.phone, a.email, a.bio;

-- Grant necessary permissions
GRANT SELECT ON agent_stats TO authenticated;
GRANT SELECT ON agent_stats TO anon; 