"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Star, Phone, Mail, MessageCircle, Filter, Users, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";
import { useAgents } from "@/hooks/use-agents";
import ClientOnly from "@/components/client-only";

// Agents data now comes from Supabase via useAgents hook

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

export default function AgentsPage() {
  const { agents, loading: agentsLoading, error: agentsError } = useAgents();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (agent.company || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || (agent.location || '').includes(locationFilter);
    const matchesSpecialty = !specialtyFilter || (agent.specialties || []).includes(specialtyFilter);
    
    return matchesSearch && matchesLocation && matchesSpecialty;
  }).sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "reviews":
        return (b.reviews || 0) - (a.reviews || 0);
      case "properties":
        return (b.properties_count || 0) - (a.properties_count || 0);
      case "experience":
        return (b.experience_years || 0) - (a.experience_years || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Users className="h-4 w-4" />
              Verified Real Estate Agents
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Find Your Perfect Agent
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Connect with Ghana's top real estate professionals. Our verified agents are ready to help you buy, sell, or rent your dream property.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <motion.div 
                className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">500+</span>
                </div>
                <p className="text-sm text-muted-foreground">Verified Agents</p>
              </motion.div>
              
              <motion.div 
                className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">98%</span>
                </div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </motion.div>
              
              <motion.div 
                className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">4.8</span>
                </div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ClientOnly fallback={<div className="bg-background rounded-lg p-6 shadow-sm border animate-pulse h-20" />}>
            <motion.div
              className="bg-background rounded-lg p-6 shadow-sm border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative lg:col-span-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search agents or companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={locationFilter || "all"} onValueChange={(value) => setLocationFilter(value === "all" ? "" : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="Accra">Accra</SelectItem>
                    <SelectItem value="Kumasi">Kumasi</SelectItem>
                    <SelectItem value="Takoradi">Takoradi</SelectItem>
                    <SelectItem value="Tema">Tema</SelectItem>
                    <SelectItem value="Cape Coast">Cape Coast</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={specialtyFilter || "all"} onValueChange={(value) => setSpecialtyFilter(value === "all" ? "" : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Luxury Homes">Luxury Homes</SelectItem>
                    <SelectItem value="Investment">Investment</SelectItem>
                    <SelectItem value="Land">Land</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                    <SelectItem value="properties">Most Properties</SelectItem>
                    <SelectItem value="experience">Most Experience</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          </ClientOnly>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-2">
              {filteredAgents.length} Agent{filteredAgents.length !== 1 ? 's' : ''} Found
            </h2>
            <p className="text-muted-foreground">
              Connect with verified real estate professionals in Ghana
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {agentsLoading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <div className="bg-muted animate-pulse rounded-lg h-96"></div>
                </motion.div>
              ))
            ) : agentsError ? (
              <motion.div variants={fadeInUp} className="col-span-full text-center py-12">
                <p className="text-muted-foreground">Error loading agents: {agentsError}</p>
              </motion.div>
            ) : (
              filteredAgents.map((agent) => (
                <motion.div key={agent.id} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative">
                          <Image
                            src={agent.image_url || "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400"}
                            alt={agent.name}
                            width={64}
                            height={64}
                            className="rounded-full object-cover"
                          />
                          {agent.is_verified && (
                            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{agent.name}</h3>
                          <p className="text-sm text-muted-foreground mb-1">{agent.title}</p>
                          <p className="text-sm text-primary font-medium">{agent.company}</p>
                          
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm font-medium">{agent.rating?.toFixed(1) || '0.0'}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              ({agent.reviews || 0} reviews)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{agent.location}</span>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                        <div>
                          <div className="font-semibold text-sm">{agent.properties_count || 0}</div>
                          <div className="text-xs text-muted-foreground">Properties</div>
                        </div>
                        <div>
                          <div className="font-semibold text-sm">
                            ₵{agent.sales_volume ? (agent.sales_volume / 1000000).toFixed(1) + 'M' : '0'}
                          </div>
                          <div className="text-xs text-muted-foreground">Sales</div>
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{agent.experience_years || 0} years</div>
                          <div className="text-xs text-muted-foreground">Experience</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {(agent.specialties || []).slice(0, 3).map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 group-hover:scale-[1.02] transition-transform">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/agents/${agent.id}`}>
                            View Profile
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>

          {filteredAgents.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-muted/50 rounded-lg p-8 max-w-md mx-auto">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No agents found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setLocationFilter("");
                    setSpecialtyFilter("");
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Property Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with our verified agents today and find your perfect property in Ghana
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/listings">Browse Properties</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/list-property">List Your Property</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 