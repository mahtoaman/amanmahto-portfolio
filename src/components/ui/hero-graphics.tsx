import { cn } from "@/lib/utils";

// Animated code editor mockup
export const CodeEditorMockup = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative", className)}>
      <div className="relative bg-card/80 backdrop-blur-xl rounded-xl border border-border shadow-2xl overflow-hidden">
        {/* Window header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-muted-foreground font-mono">project.tsx</span>
          </div>
        </div>
        
        {/* Code content */}
        <div className="p-4 font-mono text-sm">
          <div className="flex">
            <span className="text-muted-foreground/50 w-8 select-none">1</span>
            <span><span className="text-purple-400">const</span> <span className="text-cyan-400">YourProject</span> = () =&gt; {"{"}</span>
          </div>
          <div className="flex">
            <span className="text-muted-foreground/50 w-8 select-none">2</span>
            <span className="pl-4"><span className="text-purple-400">return</span> (</span>
          </div>
          <div className="flex">
            <span className="text-muted-foreground/50 w-8 select-none">3</span>
            <span className="pl-8 text-accent">&lt;<span className="text-emerald-400">Success</span></span>
          </div>
          <div className="flex items-center">
            <span className="text-muted-foreground/50 w-8 select-none">4</span>
            <span className="pl-12 text-yellow-400">performance</span>
            <span className="text-foreground/60">=</span>
            <span className="text-accent">"blazing"</span>
            <span className="animate-pulse ml-1">|</span>
          </div>
          <div className="flex">
            <span className="text-muted-foreground/50 w-8 select-none">5</span>
            <span className="pl-12"><span className="text-yellow-400">scalability</span>=<span className="text-accent">"infinite"</span></span>
          </div>
          <div className="flex">
            <span className="text-muted-foreground/50 w-8 select-none">6</span>
            <span className="pl-8 text-accent">/&gt;</span>
          </div>
          <div className="flex">
            <span className="text-muted-foreground/50 w-8 select-none">7</span>
            <span className="pl-4">);</span>
          </div>
          <div className="flex">
            <span className="text-muted-foreground/50 w-8 select-none">8</span>
            <span>{"}"};</span>
          </div>
        </div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-accent/20 rounded-2xl blur-2xl -z-10" />
    </div>
  );
};

// Browser mockup for project previews
export const BrowserMockup = ({ 
  className, 
  title,
  children 
}: { 
  className?: string;
  title?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn("relative group", className)}>
      <div className="bg-card/90 backdrop-blur-xl rounded-xl border border-border shadow-xl overflow-hidden transition-all duration-300 group-hover:border-accent/30 group-hover:shadow-accent/10 group-hover:shadow-2xl">
        {/* Browser header */}
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-secondary/50">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground font-mono">
              <div className="w-3 h-3 rounded-full border border-green-500/50 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              </div>
              {title || "yourproject.com"}
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="aspect-[16/10] bg-gradient-to-br from-muted/30 to-muted/10">
          {children}
        </div>
      </div>
    </div>
  );
};

// Project preview content
export const ProjectPreview = ({ 
  type 
}: { 
  type: 'ecommerce' | 'dashboard' | 'marketing';
}) => {
  if (type === 'ecommerce') {
    return (
      <div className="p-4 h-full flex flex-col">
        {/* Nav */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-20 h-4 bg-accent/30 rounded" />
          <div className="flex gap-2">
            <div className="w-10 h-4 bg-muted rounded" />
            <div className="w-10 h-4 bg-muted rounded" />
            <div className="w-16 h-6 bg-accent/50 rounded" />
          </div>
        </div>
        {/* Products grid */}
        <div className="grid grid-cols-3 gap-2 flex-grow">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-muted/50 rounded-lg p-2 flex flex-col">
              <div className="aspect-square bg-gradient-to-br from-accent/20 to-cyber/20 rounded mb-2" />
              <div className="w-full h-2 bg-muted rounded mb-1" />
              <div className="w-1/2 h-2 bg-accent/30 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (type === 'dashboard') {
    return (
      <div className="p-4 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-24 h-4 bg-accent/30 rounded" />
          <div className="w-8 h-8 rounded-full bg-accent/20" />
        </div>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-muted/50 rounded-lg p-2">
              <div className="w-8 h-2 bg-muted rounded mb-1" />
              <div className="w-12 h-4 bg-accent/30 rounded" />
            </div>
          ))}
        </div>
        {/* Chart area */}
        <div className="flex-grow bg-muted/30 rounded-lg p-2 flex items-end gap-1">
          {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
            <div 
              key={i} 
              className="flex-1 bg-gradient-to-t from-accent/50 to-accent/20 rounded-t"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    );
  }
  
  // Marketing
  return (
    <div className="p-4 h-full flex flex-col">
      {/* Nav */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-4 bg-accent/30 rounded" />
        <div className="flex gap-4">
          <div className="w-8 h-2 bg-muted rounded" />
          <div className="w-8 h-2 bg-muted rounded" />
          <div className="w-14 h-6 bg-accent/50 rounded-full" />
        </div>
      </div>
      {/* Hero */}
      <div className="flex-grow flex items-center gap-4">
        <div className="flex-1 space-y-2">
          <div className="w-3/4 h-6 bg-muted rounded" />
          <div className="w-full h-3 bg-muted/50 rounded" />
          <div className="w-2/3 h-3 bg-muted/50 rounded" />
          <div className="w-20 h-8 bg-accent/50 rounded mt-4" />
        </div>
        <div className="w-1/3 aspect-square bg-gradient-to-br from-accent/30 to-cyber/30 rounded-lg" />
      </div>
    </div>
  );
};

// Decorative tech stack icons
export const TechStackVisual = ({ className }: { className?: string }) => {
  const techs = [
    { name: 'React', color: 'from-cyan-400 to-cyan-600' },
    { name: 'TS', color: 'from-blue-400 to-blue-600' },
    { name: 'Node', color: 'from-green-400 to-green-600' },
    { name: 'SQL', color: 'from-orange-400 to-orange-600' },
  ];
  
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {techs.map((tech, i) => (
        <div 
          key={tech.name}
          className="relative group"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className={cn(
            "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center",
            "border border-border/50 shadow-lg transition-transform duration-300",
            "group-hover:scale-110 group-hover:-translate-y-1",
            tech.color
          )}>
            <span className="text-xs font-bold text-white font-mono">{tech.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Animated connection lines
export const ConnectionLines = ({ className }: { className?: string }) => {
  return (
    <svg 
      className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
      viewBox="0 0 400 300"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0" />
          <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,150 Q100,100 200,150 T400,150"
        fill="none"
        stroke="url(#lineGradient)"
        strokeWidth="2"
        className="animate-pulse"
      />
      <path
        d="M0,200 Q150,150 200,200 T400,180"
        fill="none"
        stroke="url(#lineGradient)"
        strokeWidth="1"
        className="animate-pulse"
        style={{ animationDelay: '0.5s' }}
      />
    </svg>
  );
};

// Metric card with animation
export const MetricCard = ({ 
  value, 
  label, 
  icon 
}: { 
  value: string; 
  label: string; 
  icon: React.ReactNode;
}) => {
  return (
    <div className="relative group">
      <div className="flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-border transition-all duration-300 group-hover:border-accent/30 group-hover:bg-card/80">
        <div className="p-2 rounded-lg bg-accent/10 text-accent">
          {icon}
        </div>
        <div>
          <div className="text-2xl font-display font-bold text-accent">{value}</div>
          <div className="text-xs text-muted-foreground font-mono">{label}</div>
        </div>
      </div>
    </div>
  );
};
