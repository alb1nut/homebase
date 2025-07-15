import { Search, Building, CheckCircle, ThumbsUp } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Search",
      description: "Browse thousands of verified listings across Ghana"
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: "Visit",
      description: "Schedule property viewings with verified agents"
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Choose",
      description: "Select the perfect property that meets your needs"
    },
    {
      icon: <ThumbsUp className="h-8 w-8" />,
      title: "Move In",
      description: "Complete the transaction and enjoy your new property"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Finding your dream property in Ghana is simple with HomeBase
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <div className="text-primary">{step.icon}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -z-10"></div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}