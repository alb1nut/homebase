import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: "Kwame Asante",
      role: "First-time Home Buyer",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 5,
      text: "HomeBase made finding my first home in Accra so much easier than I expected. The verified listings gave me confidence, and the mortgage calculator helped me plan my finances properly."
    },
    {
      id: 2,
      name: "Abena Mensah",
      role: "Property Investor",
      image: "https://images.pexels.com/photos/3775087/pexels-photo-3775087.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 5,
      text: "As an investor, I've used many real estate platforms, but HomeBase stands out for its verification process and detailed neighborhood insights. It's now my go-to for finding investment properties in Ghana."
    },
    {
      id: 3,
      name: "Samuel Owusu",
      role: "Real Estate Agent",
      image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 4,
      text: "The agent dashboard is intuitive and helps me manage all my listings efficiently. I've seen a significant increase in qualified leads since joining HomeBase. It's worth every cedi."
    }
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from people who have found their perfect property through HomeBase
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-card h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} 
                    />
                  ))}
                </div>
                
                <div className="relative flex-1">
                  <Quote className="absolute -top-1 -left-1 h-6 w-6 text-primary/20" />
                  <p className="text-muted-foreground relative z-10 pl-3 pt-2">
                    {testimonial.text}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}