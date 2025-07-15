"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PropertyCard } from "@/components/property-card";
import { useProperties } from "@/hooks/use-properties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ListingsPage() {
  const { properties, loading, error } = useProperties();
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [location, setLocation] = useState("all");

  // Filter properties based on search criteria
  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = propertyType === "all" || property.property_type === propertyType;
    const matchesLocation = location === "all" || property.location.toLowerCase().includes(location.toLowerCase());
    
    let matchesPrice = true;
    if (priceRange !== "all") {
      const price = property.price;
      switch (priceRange) {
        case "under-500k":
          matchesPrice = price < 500000;
          break;
        case "500k-1m":
          matchesPrice = price >= 500000 && price < 1000000;
          break;
        case "1m-2m":
          matchesPrice = price >= 1000000 && price < 2000000;
          break;
        case "over-2m":
          matchesPrice = price >= 2000000;
          break;
        case "under-3k":
          matchesPrice = price < 3000;
          break;
        case "3k-5k":
          matchesPrice = price >= 3000 && price < 5000;
          break;
        case "over-5k":
          matchesPrice = price >= 5000;
          break;
      }
    }
    
    return matchesSearch && matchesType && matchesLocation && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <motion.section 
        className="bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground py-20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property Listings
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Discover your perfect home from our extensive collection of properties across Ghana
          </p>
        </div>
      </motion.section>

      {/* Filters */}
      <motion.section 
        className="py-8 bg-background border-b"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="For Sale">For Sale</SelectItem>
                <SelectItem value="For Rent">For Rent</SelectItem>
              </SelectContent>
            </Select>

            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="accra">Accra</SelectItem>
                <SelectItem value="kumasi">Kumasi</SelectItem>
                <SelectItem value="tema">Tema</SelectItem>
                <SelectItem value="takoradi">Takoradi</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-500k">Under GH₵ 500K</SelectItem>
                <SelectItem value="500k-1m">GH₵ 500K - 1M</SelectItem>
                <SelectItem value="1m-2m">GH₵ 1M - 2M</SelectItem>
                <SelectItem value="over-2m">Over GH₵ 2M</SelectItem>
                <SelectItem value="under-3k">Under GH₵ 3K/month</SelectItem>
                <SelectItem value="3k-5k">GH₵ 3K - 5K/month</SelectItem>
                <SelectItem value="over-5k">Over GH₵ 5K/month</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold">
              {filteredProperties.length} Properties Found
            </h2>
            <Select defaultValue="newest">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {loading ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <div className="bg-muted animate-pulse rounded-lg h-96"></div>
                </motion.div>
              ))}
            </motion.div>
          ) : error ? (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-muted-foreground text-lg">Error loading properties: {error}</p>
            </motion.div>
          ) : filteredProperties.length === 0 ? (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-muted-foreground text-lg">No properties found matching your criteria.</p>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {filteredProperties.map((property) => (
                <motion.div key={property.id} variants={fadeInUp}>
                  <PropertyCard
                    id={property.id}
                    title={property.title}
                    price={`GH₵ ${property.price.toLocaleString()}`}
                    location={property.location}
                    beds={property.beds || 0}
                    baths={property.baths || 0}
                    sqft={property.sqft || 0}
                    type={property.property_type}
                    image={property.image_url || "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
} 