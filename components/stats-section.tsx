import { Building2, Users, Home, TrendingUp } from "lucide-react";

export function StatsSection() {
  return (
    <section className="py-16 bg-background border-y">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Why Choose HomeBase?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ghana's leading property platform with thousands of verified listings and happy customers
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-1">5,000+</h3>
            <p className="text-muted-foreground">Verified Properties</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-1">10,000+</h3>
            <p className="text-muted-foreground">Happy Customers</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Home className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-1">500+</h3>
            <p className="text-muted-foreground">Trusted Agents</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-1">98%</h3>
            <p className="text-muted-foreground">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}