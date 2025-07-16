-- Updated User Profile Creation for Agent Registration
-- Run this in your Supabase SQL Editor to replace the existing trigger

-- Drop the existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create updated function to handle agent registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Create user profile
    INSERT INTO public.user_profiles (
        user_id, 
        full_name, 
        is_agent
    )
    VALUES (
        NEW.id, 
        NEW.raw_user_meta_data->>'full_name',
        COALESCE((NEW.raw_user_meta_data->>'is_agent')::boolean, false)
    );
    
    -- If user is an agent, create a basic agent record
    IF COALESCE((NEW.raw_user_meta_data->>'is_agent')::boolean, false) = true THEN
        INSERT INTO public.agents (
            user_id,
            name,
            email,
            is_active,
            is_verified
        )
        VALUES (
            NEW.id,
            NEW.raw_user_meta_data->>'full_name',
            NEW.email,
            true,
            false  -- New agents need to be verified
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Remove the auto-populated sample agents (since you don't want them)
-- Only run this if you want to remove the sample data
DELETE FROM agents WHERE user_id IS NULL;

-- Update the agents migration to NOT auto-populate sample data
-- Comment out or remove the INSERT statements in supabase-agents-migration.sql 