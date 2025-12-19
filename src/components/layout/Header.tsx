import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg shadow-background/50" 
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 group">
          <span className="text-lg font-mono font-medium text-accent">&lt;</span>
          <span className="text-lg font-display font-bold text-foreground group-hover:text-accent transition-colors">
            Aman Mahto
          </span>
          <span className="text-lg font-mono font-medium text-accent">/&gt;</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md",
                location.pathname === item.href
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/5"
              )}
            >
              {location.pathname === item.href && (
                <span className="absolute inset-x-3 -bottom-[17px] h-px bg-accent" />
              )}
              <span className="font-mono text-xs mr-1 text-accent/50">/</span>
              {item.name.toLowerCase()}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex">
          <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-accent-glow font-mono btn-press">
            <Link to="/contact">
              <span className="opacity-70">&gt;</span> start_project()
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-lg border-b border-border overflow-hidden transition-all duration-300",
          mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-4 py-4 space-y-1">
          {navigation.map((item, index) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-2 px-3 py-3 text-base font-medium transition-all duration-200 rounded-md",
                location.pathname === item.href
                  ? "text-accent bg-accent/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/5"
              )}
              onClick={() => setMobileMenuOpen(false)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="font-mono text-xs text-accent/50">{String(index + 1).padStart(2, '0')}.</span>
              {item.name}
            </Link>
          ))}
          <div className="pt-4">
            <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-accent-glow font-mono btn-press">
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                &gt; start_project()
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
