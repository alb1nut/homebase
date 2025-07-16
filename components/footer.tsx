import Link from "next/link";
import { Building2, Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-muted/50 py-12 px-4 sm:px-6 lg:px-8 border-t">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-7 w-7 text-primary" />
              <span className="font-bold text-2xl">HomeBase</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Ghana's leading real estate platform. Find your perfect home with confidence.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-full"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-full"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-full"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/buy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Buy Property
                </Link>
              </li>
              <li>
                <Link href="/rent" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Rent Property
                </Link>
              </li>
              <li>
                <Link href="/sell" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Sell Property
                </Link>
              </li>
              <li>
                <Link href="/list-property" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  List Property
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground text-sm">info@homebase.gh</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground text-sm">+233 20 123 4567</span>
              </div>
              <div className="pt-2">
                <Link 
                  href="/contact" 
                  className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                >
                  Get in Touch →
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} HomeBase Ghana. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms & Privacy
            </Link>
            <span className="text-muted-foreground/50">•</span>
            <span className="text-muted-foreground">
              Made with ❤️ in Accra
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}