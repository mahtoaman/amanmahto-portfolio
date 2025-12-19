import { ReactNode, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TechieCardProps {
  children: ReactNode;
  className?: string;
  glowOnHover?: boolean;
}

export const TechieCard = ({ children, className, glowOnHover = true }: TechieCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative bg-card border border-border rounded-lg overflow-hidden transition-all duration-300",
        glowOnHover && "hover:border-accent/50",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? '0 20px 40px -15px hsl(199 89% 48% / 0.2), 0 0 30px hsl(199 89% 48% / 0.1)' 
          : 'none',
      }}
    >
      {/* Spotlight effect following mouse */}
      {glowOnHover && isHovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: 'translate(-50%, -50%)',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, hsl(199 89% 48% / 0.15) 0%, transparent 70%)',
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      {/* Corner accents */}
      <div 
        className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 transition-all duration-300"
        style={{
          borderColor: isHovered ? 'hsl(199 89% 48%)' : 'hsl(199 89% 48% / 0.3)',
          width: isHovered ? '24px' : '16px',
          height: isHovered ? '24px' : '16px',
        }}
      />
      <div 
        className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 transition-all duration-300"
        style={{
          borderColor: isHovered ? 'hsl(199 89% 48%)' : 'hsl(199 89% 48% / 0.3)',
          width: isHovered ? '24px' : '16px',
          height: isHovered ? '24px' : '16px',
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 transition-all duration-300"
        style={{
          borderColor: isHovered ? 'hsl(199 89% 48%)' : 'hsl(199 89% 48% / 0.3)',
          width: isHovered ? '24px' : '16px',
          height: isHovered ? '24px' : '16px',
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 transition-all duration-300"
        style={{
          borderColor: isHovered ? 'hsl(199 89% 48%)' : 'hsl(199 89% 48% / 0.3)',
          width: isHovered ? '24px' : '16px',
          height: isHovered ? '24px' : '16px',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

interface FloatingIconProps {
  icon: ReactNode;
  className?: string;
  delay?: number;
}

export const FloatingIcon = ({ icon, className, delay = 0 }: FloatingIconProps) => {
  return (
    <div 
      className={cn("relative", className)}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="animate-float">
        <div className="p-3 rounded-xl bg-accent/10 border border-accent/30 text-accent shadow-accent-glow">
          {icon}
        </div>
      </div>
    </div>
  );
};
