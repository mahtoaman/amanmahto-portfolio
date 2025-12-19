import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    slug: "ecommerce-platform",
    title: "E-commerce Platform",
    category: "E-commerce",
    industry: "Retail",
    description: "A scalable online store with inventory management and seamless checkout.",
    problem: "Client needed to handle 10,000+ concurrent users during sales events.",
    stack: ["React", "Node.js", "PostgreSQL", "Stripe"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80", // Using a real placeholder image
  },
  {
    slug: "saas-dashboard",
    title: "SaaS Dashboard",
    category: "Web Application",
    industry: "SaaS",
    description: "Analytics dashboard for tracking business metrics and user engagement.",
    problem: "Startup needed real-time analytics with sub-500ms update times.",
    stack: ["Next.js", "TypeScript", "Supabase", "Chart.js"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    slug: "marketing-website",
    title: "Marketing Website",
    category: "Static Site",
    industry: "Marketing",
    description: "High-converting landing pages with SEO optimization and fast performance.",
    problem: "Existing site had poor Lighthouse scores and low conversion rates.",
    stack: ["React", "Tailwind CSS", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  }
];

export const FeaturedProjects = () => {
  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
                <span className="text-blue-600 font-semibold tracking-wider text-sm uppercase mb-3 block">
                    Portfolio
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                    Featured Projects
                </h2>
                <p className="text-slate-600 text-lg">
                    A selection of projects showcasing my expertise in building scalable, 
                    high-performance web applications.
                </p>
            </div>
            <Button asChild variant="outline" className="hidden md:flex">
                <Link to="/portfolio">View All Projects <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
            <Link
                key={project.slug}
                to={`/portfolio/${project.slug}`}
                className="group block bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
                <div className="aspect-video bg-slate-100 relative overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-slate-900 hover:bg-white shadow-sm backdrop-blur-sm">
                            {project.category}
                        </Badge>
                    </div>
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {project.stack.slice(0, 3).map((tech) => (
                            <span key={tech} className="text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-md">
                                {tech}
                            </span>
                        ))}
                        {project.stack.length > 3 && (
                            <span className="text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-md">
                                +{project.stack.length - 3}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
            ))}
        </div>

        <div className="mt-12 text-center md:hidden">
            <Button asChild variant="outline" className="w-full">
                <Link to="/portfolio">View All Projects <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
        </div>
      </div>
    </section>
  );
};
