import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const ServicesSection = () => {
  const services = [
    {
      title: "Web Apps",
      description: "Scalable, high-performance web applications built with React and Next.js.",
      image: "/images/services/web-apps.png",
      delay: "0ms"
    },
    {
      title: "E-commerce",
      description: "Custom online stores with secure payment integration and inventory management.",
      image: "/images/services/e-commerce.png",
      delay: "100ms"
    },
    {
      title: "Static Websites",
      description: "Blazing fast static sites optimized for SEO and conversion.",
      image: "/images/services/static-website.png",
      delay: "200ms"
    },
    {
      title: "Portfolios",
      description: "Professional personal websites content that showcase your work and brand.",
      image: "/images/services/portfolio.png",
      delay: "300ms"
    },
    {
      title: "Mobile Apps",
      description: "Cross-platform mobile applications for both iOS and Android.",
      image: "/images/services/android.png", 
      delay: "0ms"
    },
    {
      title: "iOS Apps",
      description: "Native iOS applications optimized for the Apple ecosystem.",
      image: "/images/services/ios.png",
      delay: "100ms"
    },
    
    {
      title: "Mac Apps",
      description: "Powerful desktop applications built for macOS users.",
      image: "/images/services/mac-apps.png",
      delay: "300ms"
    }
  ];

  return (
    <section className="py-24 bg-[#D2DEEB] relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-white/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-200/40 rounded-full blur-3xl pointer-events-none"></div>
        
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-blue-600 font-semibold tracking-wider text-sm uppercase mb-3 block">
            What I Build
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            Services & Solutions
          </h2>
          <p className="text-slate-600 text-lg">
            From simple websites to complex applications, I deliver high-quality solutions across all platforms.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8">
          {services.map((service, index) => (
            <Card 
                key={index} 
                className="bg-white border-none shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-visible relative flex flex-col items-center text-center p-6 w-[280px] h-[340px]"
                style={{ animationDelay: service.delay }}
            >
              {/* Floating Image Container */}
              <div className="relative w-40 h-40 mb-4 group-hover:-translate-y-4 transition-transform duration-500 ease-in-out shrink-0">
                  {/* Shadow Element for Floating Effect */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-contain filter drop-shadow-xl hover:drop-shadow-2xl transition-all duration-300 transform"
                  />
              </div>

              <CardHeader className="p-0 mb-2 shrink-0">
                <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 grow">
                <CardDescription className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors text-sm line-clamp-3">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
