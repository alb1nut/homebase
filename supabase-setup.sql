-- HomeBase Real Estate Platform Database Setup
-- Run this in your Supabase SQL Editor

-- Create user profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    full_name TEXT,
    phone TEXT,
    bio TEXT,
    location TEXT,
    avatar_url TEXT,
    is_agent BOOLEAN DEFAULT false,
    is_verified BOOLEAN DEFAULT false,
    email_notifications BOOLEAN DEFAULT true,
    sms_notifications BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for user profiles
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_is_agent ON user_profiles(is_agent);

-- Enable RLS for user profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user profiles
CREATE POLICY "Users can view their own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view agent profiles" ON user_profiles
    FOR SELECT USING (is_agent = true);

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    price DECIMAL(12, 2) NOT NULL,
    location TEXT NOT NULL,
    beds INTEGER,
    baths INTEGER,
    sqft INTEGER,
    property_type TEXT NOT NULL CHECK (property_type IN ('For Sale', 'For Rent')),
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_user_id ON properties(user_id);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(location);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Anyone can view properties" ON properties
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert properties" ON properties
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own properties" ON properties
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own properties" ON properties
    FOR DELETE USING (auth.uid() = user_id);

-- Create agents table (legacy - keeping for backward compatibility)
CREATE TABLE IF NOT EXISTS agents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    bio TEXT,
    image_url TEXT,
    rating DECIMAL(3, 2) DEFAULT 0,
    properties_sold INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable RLS for agents
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for agents
CREATE POLICY "Anyone can view agents" ON agents
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert agent profiles" ON agents
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own agent profile" ON agents
    FOR UPDATE USING (auth.uid() = user_id);

-- Create property_images table for multiple images per property
CREATE TABLE IF NOT EXISTS property_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for property_images
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for property_images
CREATE POLICY "Anyone can view property images" ON property_images
    FOR SELECT USING (true);

CREATE POLICY "Property owners can manage images" ON property_images
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM properties 
            WHERE properties.id = property_images.property_id 
            AND properties.user_id = auth.uid()
        )
    );

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (user_id, full_name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample data (you can modify or remove this)
INSERT INTO properties (title, description, price, location, beds, baths, sqft, property_type, image_url) VALUES
    ('Modern Apartment in Airport Residential', 'Beautiful modern apartment with great amenities and excellent location near the airport.', 750000, 'Airport Residential, Accra', 3, 2, 1200, 'For Sale', 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
    ('Spacious Family Home in East Legon', 'Perfect family home with spacious rooms and modern finishes in the prestigious East Legon area.', 1200000, 'East Legon, Accra', 4, 3, 2500, 'For Sale', 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
    ('Luxury Villa with Pool in Trasacco', 'Stunning luxury villa with swimming pool and beautiful gardens in the exclusive Trasacco Valley.', 2500000, 'Trasacco Valley, Accra', 5, 5, 4000, 'For Sale', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
    ('Cozy Studio in Osu', 'Perfect studio apartment for young professionals in the vibrant Osu area.', 2500, 'Osu, Accra', 1, 1, 500, 'For Rent', 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
    ('Executive Apartment in Cantonments', 'Luxury executive apartment with modern amenities in the diplomatic area of Cantonments.', 5000, 'Cantonments, Accra', 2, 2, 1000, 'For Rent', 'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
    ('Affordable Housing in Tema', 'Great value family home in the industrial city of Tema.', 450000, 'Tema, Greater Accra', 3, 2, 1500, 'For Sale', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
    ('Beachfront Property in Labadi', 'Stunning beachfront property with direct beach access.', 3500000, 'Labadi, Accra', 4, 4, 3000, 'For Sale', 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
    ('Modern Townhouse in Spintex', 'Contemporary townhouse with modern amenities in the growing Spintex area.', 3000, 'Spintex, Accra', 3, 3, 1800, 'For Rent', 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');

-- Update function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for property images (run this separately if needed)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('property-images', 'property-images', true);

-- Create storage policy for property images
-- CREATE POLICY "Anyone can view property images" ON storage.objects FOR SELECT USING (bucket_id = 'property-images');
-- CREATE POLICY "Authenticated users can upload property images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'property-images' AND auth.role() = 'authenticated');
-- CREATE POLICY "Users can update their own property images" ON storage.objects FOR UPDATE USING (bucket_id = 'property-images' AND auth.uid()::text = (storage.foldername(name))[1]);
-- CREATE POLICY "Users can delete their own property images" ON storage.objects FOR DELETE USING (bucket_id = 'property-images' AND auth.uid()::text = (storage.foldername(name))[1]); 