import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Database types for HomeBase Real Estate Platform
export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string | null
          phone: string | null
          bio: string | null
          location: string | null
          avatar_url: string | null
          is_agent: boolean | null
          is_verified: boolean | null
          email_notifications: boolean | null
          sms_notifications: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name?: string | null
          phone?: string | null
          bio?: string | null
          location?: string | null
          avatar_url?: string | null
          is_agent?: boolean | null
          is_verified?: boolean | null
          email_notifications?: boolean | null
          sms_notifications?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string | null
          phone?: string | null
          bio?: string | null
          location?: string | null
          avatar_url?: string | null
          is_agent?: boolean | null
          is_verified?: boolean | null
          email_notifications?: boolean | null
          sms_notifications?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          title: string
          description: string | null
          price: number
          location: string
          beds: number | null
          baths: number | null
          sqft: number | null
          property_type: string
          image_url: string | null
          created_at: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          price: number
          location: string
          beds?: number | null
          baths?: number | null
          sqft?: number | null
          property_type: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          price?: number
          location?: string
          beds?: number | null
          baths?: number | null
          sqft?: number | null
          property_type?: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
          user_id?: string | null
        }
      }
      agents: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          bio: string | null
          image_url: string | null
          rating: number | null
          properties_sold: number | null
          title: string | null
          company: string | null
          location: string | null
          reviews: number | null
          properties_count: number | null
          sales_volume: number | null
          specialties: string[] | null
          languages: string[] | null
          experience_years: number | null
          is_verified: boolean | null
          is_active: boolean | null
          created_at: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          bio?: string | null
          image_url?: string | null
          rating?: number | null
          properties_sold?: number | null
          title?: string | null
          company?: string | null
          location?: string | null
          reviews?: number | null
          properties_count?: number | null
          sales_volume?: number | null
          specialties?: string[] | null
          languages?: string[] | null
          experience_years?: number | null
          is_verified?: boolean | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          bio?: string | null
          image_url?: string | null
          rating?: number | null
          properties_sold?: number | null
          title?: string | null
          company?: string | null
          location?: string | null
          reviews?: number | null
          properties_count?: number | null
          sales_volume?: number | null
          specialties?: string[] | null
          languages?: string[] | null
          experience_years?: number | null
          is_verified?: boolean | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
          user_id?: string | null
        }
      }
      agent_reviews: {
        Row: {
          id: string
          agent_id: string
          reviewer_id: string | null
          rating: number
          review_text: string | null
          property_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          agent_id: string
          reviewer_id?: string | null
          rating: number
          review_text?: string | null
          property_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          agent_id?: string
          reviewer_id?: string | null
          rating?: number
          review_text?: string | null
          property_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      agent_contacts: {
        Row: {
          id: string
          agent_id: string
          contact_name: string
          contact_email: string
          contact_phone: string | null
          message: string | null
          property_id: string | null
          status: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          agent_id: string
          contact_name: string
          contact_email: string
          contact_phone?: string | null
          message?: string | null
          property_id?: string | null
          status?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          agent_id?: string
          contact_name?: string
          contact_email?: string
          contact_phone?: string | null
          message?: string | null
          property_id?: string | null
          status?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      property_images: {
        Row: {
          id: string
          property_id: string
          image_url: string
          is_primary: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          image_url: string
          is_primary?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          image_url?: string
          is_primary?: boolean | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Export common types
export type Property = Database['public']['Tables']['properties']['Row']
export type UserProfile = Database['public']['Tables']['user_profiles']['Row']
export type Agent = Database['public']['Tables']['agents']['Row']
export type PropertyImage = Database['public']['Tables']['property_images']['Row'] 