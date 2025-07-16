"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Bed, 
  Bath, 
  Square, 
  Camera,
  Home,
  ArrowLeft,
  Upload
} from "lucide-react";
import Link from "next/link";

interface PropertyFormData {
  title: string;
  description: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  property_type: string;
  image_url: string;
  features: string[];
}

const ghanaRegions = [
  "Greater Accra",
  "Ashanti",
  "Western",
  "Central",
  "Eastern",
  "Volta",
  "Northern",
  "Upper East",
  "Upper West",
  "Brong-Ahafo",
  "Bono East",
  "Ahafo",
  "Oti",
  "North East",
  "Savannah",
  "Western North"
];

const propertyTypes = [
  "For Sale",
  "For Rent"
];

const propertyCategories = [
  "House",
  "Apartment",
  "Villa",
  "Townhouse",
  "Condo",
  "Land",
  "Commercial",
  "Office Space"
];

const commonFeatures = [
  "Swimming Pool",
  "Gym/Fitness Center",
  "Parking",
  "Security",
  "Garden",
  "Balcony",
  "Air Conditioning",
  "Furnished",
  "Pet Friendly",
  "Elevator",
  "Fireplace",
  "Laundry Room"
];

export default function ListPropertyPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    description: "",
    price: 0,
    location: "",
    beds: 1,
    baths: 1,
    sqft: 0,
    property_type: "",
    image_url: "",
    features: []
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth');
    }
  }, [user, authLoading, router]);

  const handleInputChange = (field: keyof PropertyFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to list a property.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('properties')
        .insert([
          {
            ...formData,
            user_id: user.id,
            image_url: formData.image_url || "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "Property listed successfully!",
        description: "Your property has been added to the marketplace.",
      });

      router.push(`/listings/${data.id}`);
    } catch (error) {
      console.error('Error listing property:', error);
      toast({
        title: "Error listing property",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-64 mb-8"></div>
            <div className="h-96 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-3xl font-bold mb-2">List Your Property</h1>
            <p className="text-muted-foreground">
              Add your property to Ghana's largest real estate marketplace
            </p>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
              <CardDescription>
                Fill in the details below to list your property
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Property Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Modern 3-bedroom house in East Legon"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Select 
                      value={formData.location} 
                      onValueChange={(value) => handleInputChange('location', value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {ghanaRegions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your property in detail..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                {/* Property Type and Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="property_type">Listing Type *</Label>
                    <Select 
                      value={formData.property_type} 
                      onValueChange={(value) => handleInputChange('property_type', value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">
                      Price * {formData.property_type === 'For Rent' ? '(per month)' : ''}
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="price"
                        type="number"
                        placeholder="0"
                        value={formData.price || ''}
                        onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Property Specifications */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="beds">Bedrooms *</Label>
                    <div className="relative">
                      <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="beds"
                        type="number"
                        min="0"
                        value={formData.beds}
                        onChange={(e) => handleInputChange('beds', parseInt(e.target.value) || 0)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="baths">Bathrooms *</Label>
                    <div className="relative">
                      <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="baths"
                        type="number"
                        min="0"
                        value={formData.baths}
                        onChange={(e) => handleInputChange('baths', parseInt(e.target.value) || 0)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sqft">Square Feet</Label>
                    <div className="relative">
                      <Square className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="sqft"
                        type="number"
                        min="0"
                        value={formData.sqft || ''}
                        onChange={(e) => handleInputChange('sqft', parseInt(e.target.value) || 0)}
                        className="pl-10"
                        placeholder="Optional"
                      />
                    </div>
                  </div>
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <Label htmlFor="image_url">Property Image URL</Label>
                  <div className="relative">
                    <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="image_url"
                      type="url"
                      placeholder="https://example.com/image.jpg (optional)"
                      value={formData.image_url}
                      onChange={(e) => handleInputChange('image_url', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Leave blank to use a default image. Professional photos get more views!
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <Label>Property Features</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {commonFeatures.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox
                          id={feature}
                          checked={formData.features.includes(feature)}
                          onCheckedChange={() => handleFeatureToggle(feature)}
                        />
                        <Label
                          htmlFor={feature}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {feature}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type="submit"
                      disabled={loading}
                      className="min-w-[200px]"
                    >
                      {loading ? 'Listing Property...' : 'List Property'}
                    </Button>
                  </motion.div>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 