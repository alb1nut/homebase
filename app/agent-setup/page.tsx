"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { Building2, User, Phone, MapPin, Briefcase, Languages, Award } from 'lucide-react';

interface AgentFormData {
  title: string;
  company: string;
  location: string;
  phone: string;
  bio: string;
  specialties: string[];
  languages: string[];
  experience_years: number;
}

const specialtyOptions = [
  'Residential',
  'Commercial',
  'Luxury Homes',
  'Investment',
  'Land',
  'Industrial',
  'Office Spaces',
  'Vacation Homes',
  'First-time Buyers',
  'Rentals'
];

const languageOptions = [
  'English',
  'Twi',
  'Ga',
  'Fante',
  'Ewe',
  'Hausa',
  'Dagbani',
  'French'
];

export default function AgentSetupPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<AgentFormData>({
    title: '',
    company: '',
    location: '',
    phone: '',
    bio: '',
    specialties: [],
    languages: ['English'],
    experience_years: 1
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth');
      return;
    }
    
    // Check if user is actually an agent
    if (!authLoading && user && !user.user_metadata?.is_agent) {
      router.push('/dashboard');
      return;
    }

    // Load existing agent data if available
    if (user && user.user_metadata?.is_agent) {
      loadExistingAgentData();
    }
  }, [user, authLoading, router]);

  const loadExistingAgentData = async () => {
    if (!user) return;
    
    try {
      const { data: agentData } = await supabase
        .from('agents')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (agentData) {
        setFormData({
          title: agentData.title || '',
          company: agentData.company || '',
          location: agentData.location || '',
          phone: agentData.phone || '',
          bio: agentData.bio || '',
          specialties: agentData.specialties || [],
          languages: agentData.languages || ['English'],
          experience_years: agentData.experience_years || 1
        });
      }
    } catch (error) {
      console.error('Error loading agent data:', error);
    }
  };

  const handleInputChange = (field: keyof AgentFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      specialties: checked 
        ? [...prev.specialties, specialty]
        : prev.specialties.filter(s => s !== specialty)
    }));
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      languages: checked 
        ? [...prev.languages, language]
        : prev.languages.filter(l => l !== language)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // First check if agent record exists
      const { data: existingAgent } = await supabase
        .from('agents')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (existingAgent) {
        // Update existing agent record
        const { error } = await supabase
          .from('agents')
          .update({
            title: formData.title,
            company: formData.company,
            location: formData.location,
            phone: formData.phone,
            bio: formData.bio,
            specialties: formData.specialties,
            languages: formData.languages,
            experience_years: formData.experience_years
          })
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Create new agent record if it doesn't exist
        const { error } = await supabase
          .from('agents')
          .insert({
            user_id: user.id,
            name: user.user_metadata?.full_name || '',
            email: user.email || '',
            title: formData.title,
            company: formData.company,
            location: formData.location,
            phone: formData.phone,
            bio: formData.bio,
            specialties: formData.specialties,
            languages: formData.languages,
            experience_years: formData.experience_years,
            is_active: true,
            is_verified: false
          });

        if (error) throw error;
      }

      toast({
        title: "Agent profile completed!",
        description: "Your profile has been set up successfully. You can now start helping clients.",
      });

      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving agent profile:', error);
      toast({
        title: "Error saving profile",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-12 px-4">
      <div className="container max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center justify-center mb-4"
              >
                <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-primary-foreground" />
                </div>
              </motion.div>
              <CardTitle className="text-3xl font-bold">Complete Your Agent Profile</CardTitle>
              <CardDescription className="text-lg">
                Help clients find you by completing your professional profile
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Basic Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Senior Real Estate Agent"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        placeholder="e.g., HomeBase Realty"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Accra, Ghana">Accra, Ghana</SelectItem>
                          <SelectItem value="Kumasi, Ghana">Kumasi, Ghana</SelectItem>
                          <SelectItem value="Takoradi, Ghana">Takoradi, Ghana</SelectItem>
                          <SelectItem value="Tema, Ghana">Tema, Ghana</SelectItem>
                          <SelectItem value="Cape Coast, Ghana">Cape Coast, Ghana</SelectItem>
                          <SelectItem value="Tamale, Ghana">Tamale, Ghana</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+233 20 123 4567"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Select 
                      value={formData.experience_years.toString()} 
                      onValueChange={(value) => handleInputChange('experience_years', parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 20 }, (_, i) => i + 1).map(year => (
                          <SelectItem key={year} value={year.toString()}>
                            {year} year{year > 1 ? 's' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Professional Bio */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Professional Bio
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Tell clients about yourself</Label>
                    <Textarea
                      id="bio"
                      placeholder="Describe your experience, expertise, and what makes you unique as a real estate agent..."
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={4}
                      required
                    />
                  </div>
                </div>

                {/* Specialties */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Specialties
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {specialtyOptions.map(specialty => (
                      <div key={specialty} className="flex items-center space-x-2">
                        <Checkbox
                          id={specialty}
                          checked={formData.specialties.includes(specialty)}
                          onCheckedChange={(checked) => handleSpecialtyChange(specialty, checked as boolean)}
                        />
                        <Label htmlFor={specialty} className="text-sm cursor-pointer">
                          {specialty}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Languages className="h-5 w-5" />
                    Languages Spoken
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {languageOptions.map(language => (
                      <div key={language} className="flex items-center space-x-2">
                        <Checkbox
                          id={language}
                          checked={formData.languages.includes(language)}
                          onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                        />
                        <Label htmlFor={language} className="text-sm cursor-pointer">
                          {language}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? "Setting up your profile..." : "Complete Agent Profile"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 