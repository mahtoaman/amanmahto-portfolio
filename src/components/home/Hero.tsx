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
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-medium text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Available for Freelance Projects
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
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
            
            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
              I help brands turn their ideas into high-quality digital products. 
              Specializing in building modern, responsive, and user-friendly websites that drive results.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-8 text-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
                Book a Call <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-slate-200 text-slate-700 hover:bg-slate-50">
                Download CV <Download className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="pt-8 flex items-center gap-6 text-slate-400">
                <a href="#" className="hover:text-blue-600 transition-colors"><Github className="h-6 w-6" /></a>
                <a href="#" className="hover:text-blue-600 transition-colors"><Linkedin className="h-6 w-6" /></a>
                <a href="#" className="hover:text-blue-600 transition-colors"><Mail className="h-6 w-6" /></a>
            </div>
          </div>

          {/* Image/Visual Content */}
          <div className="relative hidden lg:block">
            <div className="relative z-10 w-full max-w-lg mx-auto aspect-square">
                {/* Main Image Placeholder - Replace with user image */}
                <div className="w-full h-full rounded-full bg-gradient-to-b from-blue-100 to-white border-4 border-white shadow-2xl flex items-end justify-center overflow-hidden">
                    <img 
                        src="https://avatars.githubusercontent.com/u/61381501?v=4" 
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
