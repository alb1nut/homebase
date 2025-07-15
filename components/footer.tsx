import Link from "next/link";
import { Building2, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-muted py-10 px-4 sm:px-6 lg:px-8">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">HomeBase</span>
            </div>
            <p className="text-muted-foreground">
              Real estate made simple for Ghanaians. Find your perfect home or investment property with ease.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-sm tracking-wider uppercase">Discover</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/buy" className="text-muted-foreground hover:text-primary transition-colors">
                  Buy Property
                </Link>
              </li>
              <li>
                <Link href="/rent" className="text-muted-foreground hover:text-primary transition-colors">
                  Rent Property
                </Link>
              </li>
              <li>
                <Link href="/sell" className="text-muted-foreground hover:text-primary transition-colors">
                  Sell Property
                </Link>
              </li>
              <li>
                <Link href="/agents" className="text-muted-foreground hover:text-primary transition-colors">
                  Find an Agent
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm tracking-wider uppercase">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tools/mortgage" className="text-muted-foreground hover:text-primary transition-colors">
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/affordability" className="text-muted-foreground hover:text-primary transition-colors">
                  Affordability Checker
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Real Estate Blog
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm tracking-wider uppercase">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms & Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} HomeBase Ghana. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Made with ❤️ in Accra, Ghana
          </p>
        </div>
      </div>
    </footer>
  );
}