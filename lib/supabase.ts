import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Database types for HomeBase Real Estate Platform
export type Database = {
  public: {
    Tables: {
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
          created_at?: string
          updated_at?: string
          user_id?: string | null
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