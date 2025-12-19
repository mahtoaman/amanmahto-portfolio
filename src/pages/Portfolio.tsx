import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Filter } from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";
import { SEO } from "@/components/SEO";

const projects = [
  {
    slug: "ecommerce-platform",
    title: "E-commerce Platform",
    category: "E-commerce",
    industry: "Retail",
    description: "A scalable online store with inventory management and seamless checkout.",
    problem: "Client needed to handle 10,000+ concurrent users during sales events.",
    stack: ["React", "Node.js", "PostgreSQL", "Stripe"],
    image: "/placeholder.svg",
  },
  {
    slug: "saas-dashboard",
    title: "SaaS Dashboard",
    category: "Web Application",
    industry: "SaaS",
    description: "Analytics dashboard for tracking business metrics and user engagement.",
    problem: "Startup needed real-time analytics with sub-500ms update times.",
    stack: ["Next.js", "TypeScript", "Supabase", "Chart.js"],
    image: "/placeholder.svg",
  },
  {
    slug: "marketing-website",
    title: "Marketing Website",
    category: "Static Site",
    industry: "Marketing",
    description: "High-converting landing pages with SEO optimization and fast performance.",
    problem: "Existing site had poor Lighthouse scores and low conversion rates.",
    stack: ["React", "Tailwind CSS", "Framer Motion"],
    image: "/placeholder.svg",
  },
  {
    slug: "booking-system",
    title: "Booking System",
    category: "Web Application",
    industry: "Services",
    description: "Appointment scheduling system with calendar integration and notifications.",
    problem: "Manual scheduling led to double-bookings and high no-show rates.",
    stack: ["React", "Node.js", "PostgreSQL", "Twilio"],
    image: "/placeholder.svg",
  },
];

const categories = ["All", "Web Application", "E-commerce", "Static Site"];
const technologies = ["All", "React", "Next.js", "Node.js", "TypeScript", "PostgreSQL"];
const industries = ["All", "SaaS", "Retail", "Marketing", "Services"];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTech, setActiveTech] = useState("All");
  const [activeIndustry, setActiveIndustry] = useState("All");

  const filteredProjects = projects.filter((project) => {
    const categoryMatch = activeCategory === "All" || project.category === activeCategory;
    const techMatch = activeTech === "All" || project.stack.includes(activeTech);
    const industryMatch = activeIndustry === "All" || project.industry === activeIndustry;
    return categoryMatch && techMatch && industryMatch;
  });

  return (
    <Layout>
      <SEO 
        title="Portfolio" 
        description="View case studies and projects showcasing expertise in building scalable web applications."
        keywords={['portfolio', 'web development projects', 'case studies', 'React projects']}
      />
      
      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-primary mb-6">
              Portfolio
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A selection of projects showcasing my expertise in building scalable, 
              high-performance web applications.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Category Filter */}
            <div className="flex items-center gap-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Type:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      activeCategory === category
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-muted"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Technology Filter */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">Tech:</span>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => setActiveTech(tech)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      activeTech === tech
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-muted"
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            {/* Industry Filter */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">Industry:</span>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => setActiveIndustry(industry)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      activeIndustry === industry
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-muted"
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No projects match your filters.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setActiveCategory("All");
                  setActiveTech("All");
                  setActiveIndustry("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project, index) => (
                <ScrollReveal key={project.slug} delay={((index % 4) + 1) as 1 | 2 | 3 | 4}>
                  <Link
                    to={`/portfolio/${project.slug}`}
                    className="group block bg-card rounded-lg border border-border overflow-hidden hover-lift hover-glow"
                  >
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-accent uppercase tracking-wide">
                          {project.category}
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">
                          {project.industry}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {project.description}
                      </p>
                      <p className="text-sm text-foreground/80 mb-4 italic">
                        "{project.problem}"
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.stack.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <span className="inline-flex items-center text-accent font-medium text-sm group-hover:gap-2 transition-all">
                        View Case Study
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-primary mb-4">
              Want a similar solution?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Let's discuss how I can help build something great for your business.
            </p>
            <Button asChild size="lg" variant="accent" className="btn-press">
              <Link to="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
