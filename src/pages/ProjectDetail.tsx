import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, CheckCircle, Code2, Database, Server, Wrench } from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";

// This would typically come from a database or CMS
const projectData: Record<string, {
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  results: string[];
  stack: {
    frontend: string[];
    backend: string[];
    database: string[];
    tools: string[];
  };
  image: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}> = {
  "ecommerce-platform": {
    title: "E-commerce Platform",
    category: "E-commerce",
    description: "A scalable online store with inventory management and seamless checkout.",
    problem: "The client needed a modern e-commerce platform that could handle high traffic during sales events while providing a seamless shopping experience. Their existing solution crashed during peak times and had a 4+ second load time.",
    solution: "I designed and developed a full-stack e-commerce solution with real-time inventory tracking, optimized product search, and a streamlined checkout process. Implemented server-side rendering for SEO, edge caching for performance, and integrated Stripe for secure payments.",
    results: [
      "50% improvement in page load times",
      "30% increase in conversion rate",
      "99.9% uptime during peak sales",
      "Handles 10,000+ concurrent users",
    ],
    stack: {
      frontend: ["React", "TypeScript", "Tailwind CSS"],
      backend: ["Node.js", "Express", "Redis"],
      database: ["PostgreSQL"],
      tools: ["Stripe", "AWS", "Docker"],
    },
    image: "/placeholder.svg",
    testimonial: {
      quote: "Aman delivered a solution that transformed our business. The new platform handles our biggest sales days without breaking a sweat.",
      author: "David Park",
      role: "CEO, RetailTech",
    },
  },
  "saas-dashboard": {
    title: "SaaS Dashboard",
    category: "Web Application",
    description: "Analytics dashboard for tracking business metrics and user engagement.",
    problem: "The startup needed a comprehensive analytics dashboard to help their customers track key business metrics and make data-driven decisions. The existing tool was slow and couldn't handle real-time data.",
    solution: "Built a responsive dashboard with real-time data visualization, customizable widgets, and role-based access control. Implemented efficient data fetching with optimistic updates and WebSocket connections for live data streams.",
    results: [
      "Real-time updates under 500ms",
      "40% reduction in data analysis time",
      "Support for 50+ chart types",
      "Mobile-responsive design",
    ],
    stack: {
      frontend: ["Next.js", "TypeScript", "Chart.js"],
      backend: ["Node.js", "WebSockets"],
      database: ["Supabase", "Redis"],
      tools: ["Vercel", "TanStack Query"],
    },
    image: "/placeholder.svg",
  },
  "marketing-website": {
    title: "Marketing Website",
    category: "Static Site",
    description: "High-converting landing pages with SEO optimization and fast performance.",
    problem: "The client's existing website had poor performance scores and wasn't converting visitors into leads effectively. Their Lighthouse score was 45 and bounce rate was over 70%.",
    solution: "Redesigned and rebuilt the website with a focus on performance, SEO, and conversion optimization. Implemented a modern design with engaging animations, clear CTAs, and optimized for Core Web Vitals.",
    results: [
      "100 Lighthouse performance score",
      "200% increase in organic traffic",
      "45% improvement in lead generation",
      "Sub-second page loads",
    ],
    stack: {
      frontend: ["React", "Tailwind CSS", "Framer Motion"],
      backend: [],
      database: [],
      tools: ["Vercel", "Google Analytics"],
    },
    image: "/placeholder.svg",
    testimonial: {
      quote: "Our new website is blazing fast and converts like crazy. Best investment we've made this year.",
      author: "Lisa Chen",
      role: "Marketing Director",
    },
  },
  "booking-system": {
    title: "Booking System",
    category: "Web Application",
    description: "Appointment scheduling system with calendar integration and notifications.",
    problem: "The service business was losing appointments due to manual scheduling processes and no-shows from lack of reminders. Staff spent hours each week on scheduling tasks.",
    solution: "Developed an automated booking system with calendar sync, SMS/email reminders, and a customer portal for easy rescheduling. Integrated with existing CRM and payment systems.",
    results: [
      "70% reduction in no-shows",
      "Automated 500+ bookings/month",
      "Syncs with Google & Outlook calendars",
      "Multi-location support",
    ],
    stack: {
      frontend: ["React", "TypeScript"],
      backend: ["Node.js", "Express"],
      database: ["PostgreSQL"],
      tools: ["Twilio", "Google Calendar API", "SendGrid"],
    },
    image: "/placeholder.svg",
  },
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectData[slug] : null;

  if (!project) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Project not found</h1>
          <Button asChild>
            <Link to="/portfolio">Back to Portfolio</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const projectSlugs = Object.keys(projectData);
  const currentIndex = projectSlugs.indexOf(slug || "");
  const nextSlug = projectSlugs[(currentIndex + 1) % projectSlugs.length];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <Link
            to="/portfolio"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Link>
          
          <div className="animate-fade-in">
            <Badge variant="secondary" className="mb-4">
              {project.category}
            </Badge>
            <h1 className="text-primary mb-6">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Project Image */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-elegant">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ScrollReveal delay={1}>
              <div className="bg-card p-8 rounded-lg border border-border h-full">
                <h2 className="text-2xl font-bold text-primary mb-4">The Problem</h2>
                <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <div className="bg-card p-8 rounded-lg border border-border h-full">
                <h2 className="text-2xl font-bold text-primary mb-4">The Solution</h2>
                <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <h2 className="text-primary mb-8 text-center">Tech Stack Used</h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {project.stack.frontend.length > 0 && (
              <ScrollReveal delay={1}>
                <div className="bg-card p-6 rounded-lg border border-border text-center">
                  <Code2 className="h-8 w-8 text-accent mx-auto mb-3" />
                  <h3 className="font-semibold text-primary mb-3">Frontend</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {project.stack.frontend.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
            
            {project.stack.backend.length > 0 && (
              <ScrollReveal delay={2}>
                <div className="bg-card p-6 rounded-lg border border-border text-center">
                  <Server className="h-8 w-8 text-accent mx-auto mb-3" />
                  <h3 className="font-semibold text-primary mb-3">Backend</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {project.stack.backend.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
            
            {project.stack.database.length > 0 && (
              <ScrollReveal delay={3}>
                <div className="bg-card p-6 rounded-lg border border-border text-center">
                  <Database className="h-8 w-8 text-accent mx-auto mb-3" />
                  <h3 className="font-semibold text-primary mb-3">Database</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {project.stack.database.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
            
            {project.stack.tools.length > 0 && (
              <ScrollReveal delay={4}>
                <div className="bg-card p-6 rounded-lg border border-border text-center">
                  <Wrench className="h-8 w-8 text-accent mx-auto mb-3" />
                  <h3 className="font-semibold text-primary mb-3">Tools</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {project.stack.tools.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <h2 className="text-primary mb-8 text-center">Results & Metrics</h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {project.results.map((result, index) => (
              <ScrollReveal key={result} delay={((index % 4) + 1) as 1 | 2 | 3 | 4}>
                <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover-lift">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-foreground font-medium">{result}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {project.testimonial && (
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <ScrollReveal>
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-2xl text-foreground italic mb-6">
                  "{project.testimonial.quote}"
                </p>
                <p className="font-semibold text-primary">{project.testimonial.author}</p>
                <p className="text-muted-foreground text-sm">{project.testimonial.role}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Navigation & CTA */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <Link 
              to={`/portfolio/${nextSlug}`}
              className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors"
            >
              Next Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Want a similar solution?
              </h2>
              <Button asChild size="lg" variant="accent" className="btn-press">
                <Link to="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;
