"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property-card";
import { HeroSearch } from "@/components/hero-search";
import { LocationFeature } from "@/components/location-feature";
import { StatsSection } from "@/components/stats-section";
import { HowItWorks } from "@/components/how-it-works";
import { TestimonialSection } from "@/components/testimonial-section";
import { ArrowRight, Sparkles, Shield, Users } from "lucide-react";
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
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[700px] flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 z-10"></div>
        <motion.div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
            backgroundAttachment: "fixed"
          }}
        ></motion.div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 z-5">
          <motion.div 
            className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.6, 0.3, 0.6]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          ></motion.div>
        </div>
        
        <div className="container relative z-20 text-white text-center max-w-6xl mx-auto px-4">
          <motion.div 
            className="flex items-center justify-center mb-6"
            {...fadeInDown}
          >
            <Sparkles className="h-8 w-8 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold tracking-wide uppercase text-sm">Ghana's #1 Real Estate Platform</span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Find Your Perfect Home in Ghana
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto text-blue-100 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The most trusted platform for buying, selling, and renting properties across Ghana. 
            Discover your dream home with confidence.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <HeroSearch />
          </motion.div>
          
          <motion.div 
            className="flex items-center justify-center gap-8 mt-8 text-sm text-blue-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Shield className="h-4 w-4" />
              <span>Verified Properties</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Users className="h-4 w-4" />
              <span>Trusted Agents</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Sparkles className="h-4 w-4" />
              <span>Premium Service</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4"
              {...scaleIn}
            >
              <Sparkles className="h-4 w-4" />
              Featured Properties
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Handpicked Premium Properties
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
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
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4"
              {...scaleIn}
            >
              <Users className="h-4 w-4" />
              Popular Locations
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Explore Prime Neighborhoods
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
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

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <StatsSection />
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <HowItWorks />
      </motion.div>

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <TestimonialSection />
      </motion.div>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground relative overflow-hidden"
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-primary-foreground/90 leading-relaxed">
              Join thousands of satisfied Ghanaians who found their perfect property through HomeBase. 
              Your dream home is just a click away.
            </p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
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
                  <Link href="/agents">Connect with Agents</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}