"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface LocationFeatureProps {
  name: string;
  propertyCount: number;
  image: string;
}

export function LocationFeature({ name, propertyCount, image }: LocationFeatureProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link href={`/listings?location=${encodeURIComponent(name)}`}>
        <Card className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-md">
          <div className="relative aspect-square overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover transition-transform duration-300"
              />
            </motion.div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center mb-2">
                <MapPin className="h-5 w-5 mr-2" />
                <h3 className="text-xl font-bold">{name}</h3>
              </div>
              <motion.p 
                className="text-white/90 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {propertyCount.toLocaleString()} properties available
              </motion.p>
            </motion.div>
            
            <motion.div
              className="absolute top-4 right-4 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {propertyCount}+
            </motion.div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}