import { cn } from "@/lib/utils";

interface OrbitingIconProps {
  children: React.ReactNode;
  radius: number;
  duration: number;
  delay?: number;
  reverse?: boolean;
}

const OrbitingIcon = ({ children, radius, duration, delay = 0, reverse = false }: OrbitingIconProps) => {
  return (
    <div
      className="absolute"
      style={{
        animation: `orbit ${duration}s linear infinite ${reverse ? 'reverse' : ''}`,
        animationDelay: `${delay}s`,
        width: radius * 2,
        height: radius * 2,
        left: `calc(50% - ${radius}px)`,
        top: `calc(50% - ${radius}px)`,
      }}
    >
      <div
        className="absolute"
        style={{
          left: '50%',
          top: 0,
          transform: 'translateX(-50%)',
          animation: `counter-orbit ${duration}s linear infinite ${reverse ? 'reverse' : ''}`,
          animationDelay: `${delay}s`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const TechOrbit = ({ className }: { className?: string }) => {
  const innerTechs = [
    { name: 'React', bg: 'bg-cyan-500/20', border: 'border-cyan-500/50', text: 'text-cyan-400' },
    { name: 'TS', bg: 'bg-blue-500/20', border: 'border-blue-500/50', text: 'text-blue-400' },
    { name: 'Node', bg: 'bg-green-500/20', border: 'border-green-500/50', text: 'text-green-400' },
  ];
  
  const outerTechs = [
    { name: 'Next', bg: 'bg-foreground/10', border: 'border-foreground/30', text: 'text-foreground' },
    { name: 'SQL', bg: 'bg-orange-500/20', border: 'border-orange-500/50', text: 'text-orange-400' },
    { name: 'AWS', bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', text: 'text-yellow-400' },
    { name: 'Git', bg: 'bg-red-500/20', border: 'border-red-500/50', text: 'text-red-400' },
  ];

  return (
    <div className={cn("relative w-80 h-80", className)}>
      {/* CSS for orbit animation */}
      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes counter-orbit {
          from { transform: translateX(-50%) rotate(0deg); }
          to { transform: translateX(-50%) rotate(-360deg); }
        }
      `}</style>
      
      {/* Orbit rings */}
      <div className="absolute inset-0 rounded-full border border-dashed border-border/30" style={{ margin: '60px' }} />
      <div className="absolute inset-0 rounded-full border border-dashed border-border/20" style={{ margin: '20px' }} />
      
      {/* Center icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-accent/20 border border-accent/50 flex items-center justify-center shadow-lg shadow-accent/20">
            <span className="text-accent font-mono font-bold text-lg">&lt;/&gt;</span>
          </div>
          <div className="absolute -inset-4 bg-accent/10 rounded-full blur-xl -z-10" />
        </div>
      </div>
      
      {/* Inner orbit */}
      {innerTechs.map((tech, i) => (
        <OrbitingIcon 
          key={tech.name} 
          radius={80} 
          duration={20} 
          delay={i * (20 / 3)}
        >
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center",
            "border backdrop-blur-sm shadow-lg transition-all duration-300 hover:scale-125",
            tech.bg, tech.border
          )}>
            <span className={cn("text-xs font-mono font-bold", tech.text)}>{tech.name}</span>
          </div>
        </OrbitingIcon>
      ))}
      
      {/* Outer orbit */}
      {outerTechs.map((tech, i) => (
        <OrbitingIcon 
          key={tech.name} 
          radius={130} 
          duration={30} 
          delay={i * (30 / 4)}
          reverse
        >
          <div className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center",
            "border backdrop-blur-sm shadow-md transition-all duration-300 hover:scale-125",
            tech.bg, tech.border
          )}>
            <span className={cn("text-[10px] font-mono font-bold", tech.text)}>{tech.name}</span>
          </div>
        </OrbitingIcon>
      ))}
    </div>
  );
};

// Simpler floating tech badges
export const FloatingTechBadges = ({ className }: { className?: string }) => {
  const techs = [
    { name: 'React', x: 10, y: 20, delay: 0 },
    { name: 'TypeScript', x: 75, y: 15, delay: 0.5 },
    { name: 'Node.js', x: 5, y: 60, delay: 1 },
    { name: 'PostgreSQL', x: 70, y: 70, delay: 1.5 },
    { name: 'AWS', x: 40, y: 85, delay: 2 },
  ];

  return (
    <div className={cn("relative w-full h-full", className)}>
      {techs.map((tech) => (
        <div
          key={tech.name}
          className="absolute animate-float"
          style={{
            left: `${tech.x}%`,
            top: `${tech.y}%`,
            animationDelay: `${tech.delay}s`,
          }}
        >
          <div className="px-3 py-1.5 rounded-lg bg-card/80 border border-border text-xs font-mono text-muted-foreground backdrop-blur-sm shadow-lg hover:border-accent/50 hover:text-accent transition-colors cursor-default">
            {tech.name}
          </div>
        </div>
      ))}
    </div>
  );
};
