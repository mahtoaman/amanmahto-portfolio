import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    
    // Function to check if link is active
    const isActive = (path: string) => location.pathname === path;

    const navItems = ['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact'];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-slate-900 font-display tracking-tight">
                Aman<span className="text-blue-600"> Mahto</span>
            </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
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
            <a href="mailto:amankrm3@gmail.com" className="hidden lg:flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors">
                <Mail className="w-4 h-4" />
                amankrm3@gmail.com
            </a>
            
            {/* Desktop Button */}
            <Button asChild className="hidden md:inline-flex bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 shadow-lg shadow-slate-900/20">
                <Link to="/contact">Let's Talk</Link>
            </Button>

            {/* Mobile Menu Toggle */}
            <button 
                className="md:hidden p-2 text-slate-900 hover:text-blue-600 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 shadow-xl py-6 px-6 flex flex-col gap-4 animate-in slide-in-from-top-5 duration-200">
            {navItems.map((item) => {
                const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                return (
                    <Link 
                        key={item} 
                        to={path}
                        onClick={() => setIsOpen(false)}
                        className={`text-lg font-medium py-2 border-b border-slate-50 ${isActive(path) ? 'text-blue-600' : 'text-slate-600'}`}
                    >
                        {item}
                    </Link>
                )
            })}
            <Button asChild className="bg-slate-900 hover:bg-slate-800 text-white rounded-full w-full mt-2">
                <Link to="/contact" onClick={() => setIsOpen(false)}>Let's Talk</Link>
            </Button>
        </div>
      )}
    </nav>
  );
};

