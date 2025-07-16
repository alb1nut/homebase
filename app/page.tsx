"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property-card";
import { HeroSearch } from "@/components/hero-search";
import { LocationFeature } from "@/components/location-feature";
import { HowItWorks } from "@/components/how-it-works";
import { ArrowRight, Sparkles, Shield, Users, MapPin, Star, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useProperties } from "@/hooks/use-properties";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const fadeInDown = {
  initial: { opacity: 0, y: -60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

export default function Home() {
  const { properties, loading, error } = useProperties();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20 z-10"></div>
        
        {/* Dynamic Background */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
            backgroundAttachment: "fixed"
          }}
        ></motion.div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 z-5">
          <motion.div 
            className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.2, 0.5],
              x: [0, -40, 0],
              y: [0, 20, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          ></motion.div>
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
          ></motion.div>
        </div>
        
        <div className="container relative z-20 text-white text-center max-w-7xl mx-auto px-4">
          <motion.div 
            className="flex items-center justify-center mb-8"
            {...fadeInDown}
          >
            <motion.div 
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Sparkles className="h-5 w-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold tracking-wide text-sm">Ghana's #1 Real Estate Platform</span>
              <motion.div
                className="ml-2 flex items-center gap-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="text-yellow-400 text-xs font-medium">4.9</span>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Find Your Perfect
            </span>
            <br />
            <motion.span 
              className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Home in Ghana
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-blue-100/90 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            The most trusted platform for buying, selling, and renting properties across Ghana. 
            <br className="hidden md:block" />
            <motion.span 
              className="text-yellow-400 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Your dream home is just a click away.
            </motion.span>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-12"
          >
            <HeroSearch />
          </motion.div>
          
          {/* Trust Indicators */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.div 
              className="flex flex-col items-center gap-3 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-400" />
                <span className="text-2xl font-bold text-white">5,000+</span>
              </div>
              <span className="text-blue-200 text-sm">Verified Properties</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center gap-3 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-blue-400" />
                <span className="text-2xl font-bold text-white">10,000+</span>
              </div>
              <span className="text-blue-200 text-sm">Happy Customers</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center gap-3 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-purple-400" />
                <span className="text-2xl font-bold text-white">98%</span>
              </div>
              <span className="text-blue-200 text-sm">Success Rate</span>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div 
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div 
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
              {...scaleIn}
            >
              <Sparkles className="h-4 w-4" />
              Featured Properties
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Handpicked Premium Properties
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Discover our carefully curated selection of the finest properties across Ghana
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <div className="bg-muted animate-pulse rounded-lg h-96"></div>
                </motion.div>
              ))
            ) : error ? (
              <motion.div variants={fadeInUp} className="col-span-full text-center py-12">
                <p className="text-muted-foreground">Error loading properties: {error}</p>
              </motion.div>
            ) : (
              properties.slice(0, 3).map((property) => (
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
              ))
            )}
          </motion.div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild size="lg" className="group">
                <Link href="/listings">
                  View All Properties
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Popular Locations */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
              {...scaleIn}
            >
              <MapPin className="h-4 w-4" />
              Popular Locations
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Explore Prime Neighborhoods
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Discover properties in Ghana's most sought-after and fastest-growing communities
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <LocationFeature 
                name="Accra"
                propertyCount={1245}
                image="https://images.pexels.com/photos/2548113/pexels-photo-2548113.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <LocationFeature 
                name="Kumasi"
                propertyCount={863}
                image="https://images.pexels.com/photos/2076968/pexels-photo-2076968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <LocationFeature 
                name="Takoradi"
                propertyCount={534}
                image="https://images.pexels.com/photos/2119706/pexels-photo-2119706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <LocationFeature 
                name="Tamale"
                propertyCount={387}
                image="https://images.pexels.com/photos/585758/pexels-photo-585758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <HowItWorks />
      </motion.div>

      {/* CTA Section */}
      <motion.section 
        className="py-24 bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <motion.div 
            className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl"
            animate={{ 
              scale: [1.3, 1, 1.3],
              opacity: [0.6, 0.3, 0.6]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          ></motion.div>
        </div>
        
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-primary-foreground/90 leading-relaxed">
              Join thousands of satisfied Ghanaians who found their perfect property through HomeBase. 
              Your dream home is just a click away.
            </p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" variant="secondary" className="group">
                  <Link href="/listings">
                    Browse Properties
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  <Link href="/list-property">List Your Property</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}