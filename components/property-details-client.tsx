'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Phone, 
  Mail, 
  Bed, 
  Bath, 
  Square, 
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface PropertyDetailsClientProps {
  id: string;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  image: string;
  description: string;
}

export function PropertyDetailsClient({ 
  id,
  title,
  price,
  location,
  beds,
  baths,
  sqft,
  type,
  image,
  description
}: PropertyDetailsClientProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              <div className="flex items-center mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{location}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="icon" 
                className={cn(
                  "transition-colors",
                  isFavorite && "text-red-500 border-red-500"
                )}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
              </Button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Share Property</DialogTitle>
                    <DialogDescription>
                      Share this property with others
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Button className="w-full">
                        <Phone className="mr-2 h-4 w-4" />
                        WhatsApp
                      </Button>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={`https://homebase.gh/listings/${id}`}
                        readOnly
                        className="w-full rounded-md border border-input bg-muted px-3 py-2 text-sm"
                      />
                      <Button 
                        variant="secondary" 
                        className="absolute right-1 top-1 h-7 text-xs"
                        onClick={() => {
                          navigator.clipboard.writeText(`https://homebase.gh/listings/${id}`);
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <span className="text-2xl font-bold text-primary">{price}</span>
            </div>
          </div>
        </div>

        {/* Property Image */}
        <div className="mb-8">
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
            <Image 
              src={image} 
              alt={title} 
              fill
              className="object-cover"
            />
            <Badge variant="secondary" className="absolute top-4 left-4">
              {type}
            </Badge>
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <Bed className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{beds}</div>
                <div className="text-sm text-muted-foreground">Bedrooms</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <Bath className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{baths}</div>
                <div className="text-sm text-muted-foreground">Bathrooms</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <Square className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{sqft}</div>
                <div className="text-sm text-muted-foreground">Sq Ft</div>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span className="text-sm">Air Conditioning</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span className="text-sm">Parking</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span className="text-sm">Security</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span className="text-sm">Garden</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Agent */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Agent</CardTitle>
                <CardDescription>Get in touch for more information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold">JD</span>
                  </div>
                  <div>
                    <div className="font-semibold">John Doe</div>
                    <div className="text-sm text-muted-foreground">Real Estate Agent</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Agent
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Agent
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Tour */}
            <Card>
              <CardHeader>
                <CardTitle>Schedule a Tour</CardTitle>
                <CardDescription>Book a viewing of this property</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Tour
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}