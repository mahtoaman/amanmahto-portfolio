import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Home, FolderOpen, Mail } from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";

const NotFound = () => {
  return (
    <Layout>
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-8xl md:text-9xl font-bold text-primary/10 mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              Oops! This page doesn't exist.
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              The page you're looking for might have been moved, deleted, or never existed. 
              Let's get you back on track.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="accent" className="btn-press">
                <Link to="/">
                  <Home className="mr-2 h-5 w-5" />
                  Go Home
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="btn-press">
                <Link to="/portfolio">
                  <FolderOpen className="mr-2 h-5 w-5" />
                  View Portfolio
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="btn-press">
                <Link to="/contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Me
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
