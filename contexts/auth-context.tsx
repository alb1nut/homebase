"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string, isAgent?: boolean) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        
        // If user just signed in and is an agent, check if they need to complete setup
        if (event === 'SIGNED_IN' && session?.user?.user_metadata?.is_agent) {
          // Check if agent profile is complete
          const { data: existingAgent } = await supabase
            .from('agents')
            .select('id, title, company, bio')
            .eq('user_id', session.user.id)
            .single();
          
          // If agent record exists but profile is incomplete, redirect to setup
          if (existingAgent && (!existingAgent.title || !existingAgent.company || !existingAgent.bio)) {
            setTimeout(() => {
              window.location.href = '/agent-setup';
            }, 100);
          }
          // If no agent record exists, redirect to setup
          else if (!existingAgent) {
            setTimeout(() => {
              window.location.href = '/agent-setup';
            }, 100);
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, fullName: string, isAgent: boolean = false) => {
    // First try normal signup
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          is_agent: isAgent,
        },
        emailRedirectTo: undefined, // Disable email verification
        captchaToken: undefined, // Disable captcha if enabled
      },
    });

    // If signup successful, automatically sign in the user
    if (data.user && !error) {
      // Wait a moment for the database triggers to complete
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sign in the user immediately
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (signInError) {
        console.error('Auto sign-in failed:', signInError);
        return { error: signInError };
      }
      
      return { error: null };
    }

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 