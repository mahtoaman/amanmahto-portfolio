import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Globe, Code2, ShoppingCart, Zap, ArrowRight, CheckCircle } from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";
import { SEO, ServicesStructuredData } from "@/components/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const services = [
  {
    icon: Globe,
    title: "Static & Business Websites",
    description: "Professional websites that establish your online presence and drive conversions.",
    features: [
      "Marketing sites and landing pages",
      "SEO optimization built-in",
      "Fast loading and accessible",
      "Mobile-first responsive design",
    ],
  },
  {
    icon: Code2,
    title: "Web Applications",
    description: "Custom web applications designed for your specific business needs.",
    features: [
      "Dashboards and admin panels",
      "SaaS product development",
      "Role-based access systems",
      "Secure authentication",
    ],
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Development",
    description: "Scalable online stores that provide seamless shopping experiences.",
    features: [
      "Product catalog management",
      "Payment gateway integration",
      "Admin dashboards",
      "Inventory and order management",
    ],
  },
  {
    icon: Zap,
    title: "Automation & Integrations",
    description: "Streamline your operations with custom integrations and automated workflows.",
    features: [
      "API development and integration",
      "Workflow automation",
      "Third-party service connections",
      "Data synchronization",
    ],
  },
];

const processSteps = [
  { 
    step: "01", 
    title: "Requirement Discussion", 
    description: "Understanding your goals, target audience, and project requirements through a discovery call." 
  },
  { 
    step: "02", 
    title: "Planning & Architecture", 
    description: "Designing the optimal technical solution with clear milestones and deliverables." 
  },
  { 
    step: "03", 
    title: "Development", 
    description: "Building your solution with regular updates and opportunities for feedback." 
  },
  { 
    step: "04", 
    title: "Testing & Optimization", 
    description: "Rigorous testing to ensure quality, performance, and security." 
  },
  { 
    step: "05", 
    title: "Deployment & Support", 
    description: "Smooth launch with documentation and ongoing maintenance options." 
  },
];

const faqs = [
  {
    question: "How do projects typically start?",
    answer: "Projects begin with a free consultation call where we discuss your goals, requirements, and timeline. After understanding your needs, I provide a detailed proposal with scope, timeline, and pricing. Once approved, we kick off with a discovery phase to finalize all requirements.",
  },
  {
    question: "What's your pricing approach?",
    answer: "I offer both project-based and hourly pricing depending on the scope. For well-defined projects, I provide fixed quotes with clear deliverables. For ongoing work or projects with evolving requirements, hourly or retainer arrangements work better. All pricing is transparent with no hidden fees.",
  },
  {
    question: "How do we communicate during the project?",
    answer: "I use a combination of scheduled video calls (weekly or bi-weekly), async updates via Slack or email, and project management tools like Linear or Notion. You'll have visibility into progress and can provide feedback at every stage.",
  },
  {
    question: "Do you offer maintenance and support?",
    answer: "Yes, I offer ongoing maintenance packages to keep your application updated, secure, and running smoothly. This includes bug fixes, security updates, performance monitoring, and minor enhancements. Support packages are customized based on your needs.",
  },
];

const Services = () => {
  return (
    <Layout>
      <SEO 
        title="Services" 
        description="Web development services including static websites, web applications, e-commerce, and automation solutions."
        keywords={['web development services', 'web application development', 'e-commerce development', 'React development']}
      />
      <ServicesStructuredData />
      
      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-primary mb-6">
              Services
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              From concept to deployment, I deliver solutions that are built for 
              performance, scalability, and business growth.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={service.title} delay={((index % 4) + 1) as 1 | 2 | 3 | 4}>
                <div className="bg-card p-8 rounded-lg border border-border hover-lift h-full">
                  <service.icon className="h-12 w-12 text-accent mb-6" />
                  <h3 className="text-2xl font-bold text-primary mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <h2 className="text-primary mb-4 text-center">
              My Process
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              A structured approach that ensures quality delivery and clear communication at every step.
            </p>
          </ScrollReveal>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {processSteps.map((step, index) => (
                <ScrollReveal key={step.step} delay={((index % 4) + 1) as 1 | 2 | 3 | 4}>
                  <div className="relative text-center p-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent text-accent-foreground font-bold text-lg mb-4 hover-scale">
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-primary mb-2 text-sm">{step.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{step.description}</p>
                    
                    {/* Connector line for desktop */}
                    {index < processSteps.length - 1 && (
                      <div className="hidden md:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-28px)] h-0.5 bg-border" />
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <h2 className="text-primary mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Common questions about working together. Don't see your question? Feel free to reach out.
            </p>
          </ScrollReveal>
          
          <ScrollReveal>
            <div className="max-w-2xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-semibold text-primary">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-primary mb-4">
              Ready to start your project?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Let's discuss how I can help bring your vision to life.
            </p>
            <Button asChild size="lg" variant="accent" className="btn-press">
              <Link to="/contact">
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
