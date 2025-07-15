"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Building, 
  Search,
  MapPin,
  Home,
  Building2,
  DollarSign,
  Bed
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export function HeroSearch() {
  const router = useRouter();
  const [searchType, setSearchType] = useState("buy");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build query params
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (propertyType) params.append("propertyType", propertyType);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (bedrooms) params.append("bedrooms", bedrooms);
    
    // Navigate to search results page
    router.push(`/${searchType}?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Tabs 
        defaultValue="buy" 
        onValueChange={setSearchType} 
        className="w-full"
      >
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-6">
          <TabsTrigger value="buy" className="text-lg">
            Buy
          </TabsTrigger>
          <TabsTrigger value="rent" className="text-lg">
            Rent
          </TabsTrigger>
          <TabsTrigger value="sell" className="text-lg">
            Sell
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="buy">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-white">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      <Input 
                        id="location" 
                        placeholder="City, neighborhood" 
                        className="pl-10"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        suppressHydrationWarning
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="propertyType" className="text-white">Property Type</Label>
                    <div className="relative">
                      <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      <Select value={propertyType} onValueChange={setPropertyType}>
                        <SelectTrigger id="propertyType" className="pl-10" suppressHydrationWarning>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                          <SelectItem value="land">Land</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priceRange" className="text-white">Price Range</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input 
                          id="minPrice" 
                          placeholder="Min" 
                          className="pl-10"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                          suppressHydrationWarning
                        />
                      </div>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input 
                          id="maxPrice" 
                          placeholder="Max" 
                          className="pl-10"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          suppressHydrationWarning
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms" className="text-white">Bedrooms</Label>
                    <div className="relative">
                      <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      <Select value={bedrooms} onValueChange={setBedrooms}>
                        <SelectTrigger id="bedrooms" className="pl-10" suppressHydrationWarning>
                          <SelectValue placeholder="Bedrooms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                          <SelectItem value="5">5+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center pt-2">
                  <Button type="submit" size="lg" className="w-full md:w-auto min-w-[200px]" suppressHydrationWarning>
                    <Search className="mr-2 h-5 w-5" />
                    Search Properties
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rent">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-white">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      <Input 
                        id="location" 
                        placeholder="City, neighborhood" 
                        className="pl-10"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="propertyType" className="text-white">Property Type</Label>
                    <div className="relative">
                      <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      <Select value={propertyType} onValueChange={setPropertyType}>
                        <SelectTrigger id="propertyType" className="pl-10">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                          <SelectItem value="shared">Shared</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priceRange" className="text-white">Monthly Rent</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input 
                          id="minPrice" 
                          placeholder="Min" 
                          className="pl-10"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                        />
                      </div>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input 
                          id="maxPrice" 
                          placeholder="Max" 
                          className="pl-10"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms" className="text-white">Bedrooms</Label>
                    <div className="relative">
                      <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      <Select value={bedrooms} onValueChange={setBedrooms}>
                        <SelectTrigger id="bedrooms" className="pl-10">
                          <SelectValue placeholder="Bedrooms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                          <SelectItem value="5">5+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center pt-2">
                  <Button type="submit" size="lg" className="w-full md:w-auto min-w-[200px]">
                    <Search className="mr-2 h-5 w-5" />
                    Find Rentals
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sell">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-medium mb-2">Want to sell your property?</h3>
                <p className="text-muted-foreground">Get an estimate of your property's value and connect with our verified agents</p>
              </div>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sellLocation" className="text-white">Property Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      <Input id="sellLocation" placeholder="Address" className="pl-10" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sellPropertyType" className="text-white">Property Type</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      <Select>
                        <SelectTrigger id="sellPropertyType" className="pl-10">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                          <SelectItem value="land">Land</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center pt-2">
                  <Button size="lg" className="w-full md:w-auto min-w-[200px]">
                    Get Started
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}