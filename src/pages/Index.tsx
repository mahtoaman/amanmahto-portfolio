import { Hero } from "@/components/home/Hero";
import { CollaborationSection } from "@/components/home/CollaborationSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ToolsSection } from "@/components/home/ToolsSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <Hero />
      <ToolsSection />
      <FeaturedProjects />
      <ServicesSection />
      <CollaborationSection />
      <TestimonialsSection />
      
      {/* Contact CTA Section */}
      <section className="py-24 bg-blue-600 relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
                Ready to Start Your Project?
            </h2>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Let's collaborate to build something amazing. Schedule a free consultation to discuss your needs.
            </p>
            <Button size="lg" className="h-16 px-10 text-lg bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-bold shadow-2xl transition-all hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Contact Me Now
            </Button>
        </div>
      </section>

      {/* Footer Simple */}
      <footer className="py-12 bg-slate-900 text-slate-400 text-center text-sm">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
            <div className="flex justify-center gap-8 mb-8">
                <a href="#" className="hover:text-white transition-colors">Home</a>
                <a href="#" className="hover:text-white transition-colors">About</a>
                <a href="#" className="hover:text-white transition-colors">Services</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <p>© {new Date().getFullYear()} Aman Mahto. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
