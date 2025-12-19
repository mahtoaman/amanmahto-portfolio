import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
    const location = useLocation();
    
    // Function to check if link is active
    const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-slate-900 font-display tracking-tight">
                Aman<span className="text-blue-600">.Dev</span>
            </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
            {['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact'].map((item) => {
                const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                return (
                    <Link 
                        key={item} 
                        to={path}
                        className={`font-medium text-sm transition-colors relative group ${isActive(path) ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
                    >
                        {item}
                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all ${isActive(path) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                    </Link>
                )
            })}
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
            <a href="mailto:hi@aman.dev" className="hidden lg:flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors">
                <Mail className="w-4 h-4" />
                hi@aman.dev
            </a>
            <Button asChild className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 shadow-lg shadow-slate-900/20">
                <Link to="/contact">Let's Talk</Link>
            </Button>
        </div>
      </div>
    </nav>
  );
};

