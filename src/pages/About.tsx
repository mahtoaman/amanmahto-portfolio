import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle, Briefcase, GraduationCap, Rocket, Users } from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";
import { SEO } from "@/components/SEO";

const values = [
  { 
    icon: Rocket,
    title: "Performance over shortcuts", 
    description: "I prioritize clean, optimized code that scales without technical debt." 
  },
  { 
    icon: Users,
    title: "Clear communication", 
    description: "Regular updates and transparent progress tracking keep you informed." 
  },
  { 
    icon: Briefcase,
    title: "Business-driven development", 
    description: "Solutions aligned with your business goals, not just technical requirements." 
  },
  { 
    icon: CheckCircle,
    title: "Long-term maintainability", 
    description: "Code that's easy to extend, maintain, and hand off to other developers." 
  },
];

const timeline = [
  {
    year: "2019",
    title: "Learning Fundamentals",
    description: "Started with HTML, CSS, JavaScript, and fell in love with building for the web.",
    icon: GraduationCap,
  },
  {
    year: "2020",
    title: "Working with Real Clients",
    description: "Took on freelance projects, learning to translate business needs into technical solutions.",
    icon: Users,
  },
  {
    year: "2022",
    title: "Building Scalable Systems",
    description: "Focused on architecture, performance optimization, and full-stack development.",
    icon: Rocket,
  },
  {
    year: "2024",
    title: "Full-Time Freelance",
    description: "Combining freelance flexibility with enterprise-grade engineering practices.",
    icon: Briefcase,
  },
];

const skills = {
  frontend: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "Redux"],
  backend: ["Node.js", "Express", "PostgreSQL", "Supabase", "REST APIs", "GraphQL"],
  databases: ["PostgreSQL", "MongoDB", "Redis", "Supabase"],
  tools: ["Git", "Docker", "Vercel", "AWS", "CI/CD", "Figma"],
};

const About = () => {
  return (
    <Layout>
      <SEO 
        title="About" 
        description="Learn about Aman Mahto, a full-stack developer with experience building production-ready applications for startups and businesses."
        keywords={['about developer', 'full-stack developer', 'web developer experience', 'developer portfolio']}
      />
      
      {/* Hero Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-primary mb-6">
                About Me
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                I'm Aman Mahto, a full-stack developer with experience building 
                production-ready applications for startups and businesses. I focus on 
                clean architecture, performance, and long-term scalability.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My approach combines enterprise-grade engineering practices with the 
                flexibility and personalized attention of working with an independent 
                developer. I don't just write code—I help solve business problems.
              </p>
            </div>
            <div className="relative animate-fade-in-up">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center">
                <div className="w-48 h-48 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-6xl font-bold text-primary/20">AM</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-lg shadow-lg">
                <span className="font-semibold">5+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Journey Timeline */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <h2 className="text-primary mb-12 text-center">
              My Journey
            </h2>
          </ScrollReveal>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
              
              {timeline.map((item, index) => (
                <ScrollReveal key={item.year} delay={(index + 1) as 1 | 2 | 3 | 4}>
                  <div className="flex gap-6 mb-8 last:mb-0">
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-16 h-16 bg-card border border-border rounded-full flex items-center justify-center hover-scale">
                        <item.icon className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                    <div className="flex-grow bg-card p-6 rounded-lg border border-border hover-lift">
                      <span className="text-sm font-semibold text-accent">{item.year}</span>
                      <h3 className="text-lg font-semibold text-primary mt-1 mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <h2 className="text-primary mb-12 text-center">
              Core Values
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={(index + 1) as 1 | 2 | 3 | 4}>
                <div className="flex gap-4 p-6 bg-card rounded-lg border border-border hover-lift h-full">
                  <value.icon className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <h2 className="text-primary mb-12 text-center">
              Technical Skills
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <ScrollReveal delay={1}>
              <div className="bg-card p-6 rounded-lg border border-border h-full">
                <h3 className="text-lg font-semibold text-primary mb-4">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.frontend.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm hover-scale inline-block">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={2}>
              <div className="bg-card p-6 rounded-lg border border-border h-full">
                <h3 className="text-lg font-semibold text-primary mb-4">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.backend.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm hover-scale inline-block">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={3}>
              <div className="bg-card p-6 rounded-lg border border-border h-full">
                <h3 className="text-lg font-semibold text-primary mb-4">Databases</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.databases.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm hover-scale inline-block">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={4}>
              <div className="bg-card p-6 rounded-lg border border-border h-full">
                <h3 className="text-lg font-semibold text-primary mb-4">Tools & DevOps</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm hover-scale inline-block">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-primary mb-4">
              Want to know more?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Download my resume or get in touch to discuss your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="btn-press">
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
              <Button asChild size="lg" variant="accent" className="btn-press">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default About;
