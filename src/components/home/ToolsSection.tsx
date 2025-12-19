import { useRef, useEffect } from "react";

export const ToolsSection = () => {
    const tools = [
      "React", "TypeScript", "Node.js", "Tailwind", "Next.js", "Vite", "Supabase", "Figma",
      "Git", "PostgreSQL", "MongoDB", "Redux", "Docker", "AWS"
    ];
  
    return (
      <section className="py-20 border-b border-white/5 bg-secondary relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-grid-fine opacity-[0.03] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-secondary to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-secondary to-transparent z-10"></div>
        
        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-20">
            <h2 className="text-center text-3xl font-bold font-display mb-12 gradient-text">
                Tools I Use
            </h2>
            
            <div className="relative w-full overflow-hidden group">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-secondary to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-secondary to-transparent z-10"></div>

                {/* Marquee Container */}
                <div className="flex w-max animate-marquee space-x-12 hover:pause">
                    {/* First set of items */}
                    {tools.map((tool, index) => (
                        <div key={`${tool}-1-${index}`} className="flex items-center space-x-2 group/item cursor-default">
                             <span className="text-xl md:text-2xl font-bold font-display text-slate-400 group-hover/item:text-white transition-colors duration-300">
                                {tool}
                            </span>
                        </div>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {tools.map((tool, index) => (
                        <div key={`${tool}-2-${index}`} className="flex items-center space-x-2 group/item cursor-default">
                             <span className="text-xl md:text-2xl font-bold font-display text-slate-400 group-hover/item:text-white transition-colors duration-300">
                                {tool}
                            </span>
                        </div>
                    ))}
                    {/* Triplicate set for wide screens to ensure no gaps */}
                    {tools.map((tool, index) => (
                        <div key={`${tool}-3-${index}`} className="flex items-center space-x-2 group/item cursor-default">
                             <span className="text-xl md:text-2xl font-bold font-display text-slate-400 group-hover/item:text-white transition-colors duration-300">
                                {tool}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>
    );
  };
