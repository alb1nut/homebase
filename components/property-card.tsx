"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Bed, Bath, Square, Share2 } from "lucide-react";
import { motion } from "framer-motion";

interface PropertyCardProps {
  id: string;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  image: string;
}

export function PropertyCard({
  id,
  title,
  price,
  location,
  beds,
  baths,
  sqft,
  type,
  image,
}: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl border-0 shadow-md">
        <Link href={`/listings/${id}`}>
          <div className="relative aspect-video overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-300"
              />
            </motion.div>
            
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-white/90 text-gray-800 font-medium">
                {type}
              </Badge>
            </div>
            
            <motion.div 
              className="absolute top-4 right-4 flex gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-white/90 hover:bg-white shadow-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    // Add to favorites logic
                  }}
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-white/90 hover:bg-white shadow-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    // Share logic
                  }}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
          
          <CardContent className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <span className="text-2xl font-bold text-primary">
                  {price}
                </span>
              </div>
              
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm line-clamp-1">{location}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>{beds} beds</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{baths} baths</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="h-4 w-4" />
                    <span>{sqft} sqft</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
}