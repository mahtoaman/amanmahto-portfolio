import { Button } from "@/components/ui/button";
import { Mail, Download, ArrowRight, Github, Linkedin, Smartphone, Globe, Code2, Database } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white pt-20">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 -skew-x-12 transform origin-top-right z-0" />
      
      <div className="container mx-auto px-6 md:px-12 lg:px-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in-up text-center lg:text-left pt-10 lg:pt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mx-auto lg:mx-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Available for Freelance Projects
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Hello Mate <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
              <br />
              I'm Aman Mahto
              <br />
              a <span className="text-blue-600 relative">
                Web Developer
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-slate-600 max-w-xl leading-relaxed mx-auto lg:mx-0">
              I help brands turn their ideas into high-quality digital products. 
              Specializing in building modern, responsive, and user-friendly websites that drive results.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-12 px-8 text-sm md:h-14 md:px-8 md:text-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
                Book a Call <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
              
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white h-12 px-8 text-sm md:h-14 md:px-8 md:text-lg shadow-lg hover:shadow-slate-900/20 transition-all duration-300">
                Download CV <Download className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </div>

            <div className="pt-8 flex items-center gap-6 text-slate-400 justify-center lg:justify-start">
                <a href="https://github.com/mahtoaman" className="hover:text-blue-600 transition-colors"><Github className="h-6 w-6" /></a>
                <a href="https://linkedin.com/in/amanmahto" className="hover:text-blue-600 transition-colors"><Linkedin className="h-6 w-6" /></a>
                <a href="mailto:amankrm3@gmail.com" className="hover:text-blue-600 transition-colors"><Mail className="h-6 w-6" /></a>
            </div>
          </div>

          {/* Image/Visual Content */}
          <div className="relative hidden lg:block">
            <div className="relative z-10 w-full max-w-lg mx-auto aspect-square">
                {/* Main Image Placeholder - Replace with user image */}
                <div className="w-full h-full rounded-full bg-gradient-to-b from-blue-100 to-white border-4 border-white shadow-2xl flex items-end justify-center overflow-hidden">
                    <img 
                        src="/amanmahto-hero.jpg" 
                        alt="Aman Mahto" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    /> 
                    {/* Fallback if image missing: A stylized avatar or illustration could go here */}
                </div>

                {/* Floating Icons */}
                <div className="absolute top-10 -left-10 bg-white p-4 rounded-2xl shadow-xl animate-float" style={{ animationDelay: '0s' }}>
                    <Code2 className="w-8 h-8 text-blue-500" />
                </div>
                <div className="absolute top-20 -right-5 bg-white p-4 rounded-2xl shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                    <Globe className="w-8 h-8 text-indigo-500" />
                </div>
                <div className="absolute bottom-20 -left-5 bg-white p-4 rounded-2xl shadow-xl animate-float" style={{ animationDelay: '2s' }}>
                    <Database className="w-8 h-8 text-cyan-500" />
                </div>
                <div className="absolute bottom-10 -right-10 bg-white p-4 rounded-2xl shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
                    <Smartphone className="w-8 h-8 text-purple-500" />
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
