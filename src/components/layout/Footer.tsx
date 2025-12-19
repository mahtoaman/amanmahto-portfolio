import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail, Terminal, ArrowUpRight } from "lucide-react";

const navigation = {
  main: [
    { name: "home", href: "/" },
    { name: "about", href: "/about" },
    { name: "services", href: "/services" },
    { name: "portfolio", href: "/portfolio" },
    { name: "blog", href: "/blog" },
    { name: "contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
  social: [
    { name: "GitHub", href: "https://github.com", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { name: "Twitter", href: "https://twitter.com", icon: Twitter },
    { name: "Email", href: "mailto:hello@amanmahto.dev", icon: Mail },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-secondary border-t border-border">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-1 group mb-4">
              <span className="text-lg font-mono font-medium text-accent">&lt;</span>
              <span className="text-lg font-display font-bold text-foreground group-hover:text-accent transition-colors">
                Aman Mahto
              </span>
              <span className="text-lg font-mono font-medium text-accent">/&gt;</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6">
              Full-stack developer helping startups and small businesses build fast, 
              scalable, and conversion-focused web applications.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-2">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-card border border-border text-muted-foreground hover:text-accent hover:border-accent/50 hover:bg-accent/5 transition-all duration-200"
                  aria-label={item.name}
                >
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-xs text-accent mb-4">// NAVIGATION</h4>
            <ul className="space-y-2">
              {navigation.main.map((item, index) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="font-mono text-xs text-accent/50">{String(index + 1).padStart(2, '0')}</span>
                    <span className="link-underline">/{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs text-accent mb-4">// LET'S BUILD</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Have a project in mind? Let's create something amazing together.
            </p>
            <Link 
              to="/contact"
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 hover:border-accent/50 transition-all duration-200 font-mono text-sm"
            >
              get_in_touch()
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            
            {/* Status indicator */}
            <div className="flex items-center gap-2 mt-6 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="font-mono">Available for new projects</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-xs font-mono">
              <span className="text-accent">&copy;</span> {new Date().getFullYear()} Aman Mahto. 
              <span className="text-accent/50"> // </span>
              Built with React + TypeScript
            </p>
            <div className="flex gap-6">
              {navigation.legal.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Gradient accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
    </footer>
  );
}
