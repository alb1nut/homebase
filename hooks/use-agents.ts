import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/supabase';

type Agent = Database['public']['Tables']['agents']['Row'];

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('is_active', true)
        .order('rating', { ascending: false });

      if (error) {
        setError(error.message);
        console.error('Error fetching agents:', error);
      } else {
        setAgents(data || []);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchAgents();
  };

  return {
    agents,
    loading,
    error,
    refetch
  };
}

export function useAgent(id: string) {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchAgent(id);
    }
  }, [id]);

  const fetchAgent = async (agentId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('id', agentId)
        .eq('is_active', true)
        .single();

      if (error) {
        setError(error.message);
        console.error('Error fetching agent:', error);
      } else {
        setAgent(data);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    agent,
    loading,
    error,
    refetch: () => fetchAgent(id)
  };
}

// Hook for submitting contact requests to agents
export function useAgentContact() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitContact = async (contactData: {
    agent_id: string;
    contact_name: string;
    contact_email: string;
    contact_phone?: string;
    message?: string;
    property_id?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('agent_contacts')
        .insert([contactData])
        .select()
        .single();

      if (error) {
        setError(error.message);
        console.error('Error submitting contact:', error);
        return null;
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    submitContact,
    loading,
    error
  };
}

// Hook for agent reviews
export function useAgentReviews(agentId: string) {
  const [reviews, setReviews] = useState<Database['public']['Tables']['agent_reviews']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (agentId) {
      fetchReviews(agentId);
    }
  }, [agentId]);

  const fetchReviews = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('agent_reviews')
        .select('*')
        .eq('agent_id', id)
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
        console.error('Error fetching reviews:', error);
      } else {
        setReviews(data || []);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async (reviewData: {
    agent_id: string;
    rating: number;
    review_text?: string;
    property_id?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('agent_reviews')
        .insert([{
          ...reviewData,
          reviewer_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single();

      if (error) {
        setError(error.message);
        console.error('Error submitting review:', error);
        return null;
      }

      // Refresh reviews after submission
      fetchReviews(reviewData.agent_id);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    reviews,
    loading,
    error,
    submitReview,
    refetch: () => fetchReviews(agentId)
  };
} 