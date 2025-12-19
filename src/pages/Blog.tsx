import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Search, Clock, Send, CheckCircle } from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string()
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters')
});
const posts = [
  {
    slug: "building-scalable-web-apps",
    title: "Building Scalable Web Applications: A Practical Guide",
    excerpt: "Learn the key principles and patterns for building web applications that can grow with your business.",
    category: "Web Development",
    readTime: "8 min read",
    date: "Dec 15, 2024",
    image: "/placeholder.svg",
  },
  {
    slug: "choosing-tech-stack-startup",
    title: "Choosing the Right Tech Stack for Your Startup",
    excerpt: "A comprehensive guide to selecting technologies that balance speed, scalability, and maintainability.",
    category: "Business & Startups",
    readTime: "6 min read",
    date: "Dec 10, 2024",
    image: "/placeholder.svg",
  },
  {
    slug: "performance-optimization-react",
    title: "Performance Optimization Techniques for React Apps",
    excerpt: "Practical strategies to improve the performance of your React applications.",
    category: "Performance",
    readTime: "10 min read",
    date: "Dec 5, 2024",
    image: "/placeholder.svg",
  },
  {
    slug: "freelancing-vs-agency",
    title: "Freelancer vs Agency: What's Right for Your Project?",
    excerpt: "Understanding the pros and cons of working with freelancers versus agencies for your development needs.",
    category: "Freelancing",
    readTime: "5 min read",
    date: "Nov 28, 2024",
    image: "/placeholder.svg",
  },
];

const categories = ["All", "Web Development", "Performance", "Business & Startups", "Freelancing"];

// Rate limiting constant
const SUBMIT_COOLDOWN_MS = 60000; // 60 seconds

const Blog = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState<number | null>(null);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting: check cooldown
    if (lastSubmitTime && Date.now() - lastSubmitTime < SUBMIT_COOLDOWN_MS) {
      const remainingSeconds = Math.ceil((SUBMIT_COOLDOWN_MS - (Date.now() - lastSubmitTime)) / 1000);
      toast({
        title: "Please wait",
        description: `You can subscribe again in ${remainingSeconds} seconds.`,
        variant: "destructive",
      });
      return;
    }
    
    const result = newsletterSchema.safeParse({ email: newsletterEmail });
    if (!result.success) {
      toast({
        title: "Invalid email",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);
    try {
      const { error } = await supabase.from('newsletter_subscribers').insert({
        email: result.data.email,
      });

      if (error) {
        // Handle duplicate email without exposing error codes
        if (error.code === '23505') {
          toast({
            title: "Already subscribed",
            description: "You're already on our mailing list!",
          });
        } else {
          throw error;
        }
      } else {
        setLastSubmitTime(Date.now());
        setIsSubscribed(true);
        toast({
          title: "Subscribed!",
          description: "You'll receive the latest articles in your inbox.",
        });
      }
    } catch (error) {
      // Sanitize error - don't expose database details
      toast({
        title: "Something went wrong",
        description: "We couldn't complete your subscription. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <SEO 
        title="Blog" 
        description="Insights on web development, startups, performance optimization, and building scalable products."
        keywords={['web development blog', 'startup tech', 'React tutorials', 'freelance developer tips']}
      />
      
      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-primary mb-6">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Insights on web development, startups, and building scalable products.
            </p>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4 border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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
      </section>

      {/* Posts Grid */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No articles match your search.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post, index) => (
                <ScrollReveal key={post.slug} delay={((index % 4) + 1) as 1 | 2 | 3 | 4}>
                  <article className="bg-card rounded-lg border border-border overflow-hidden hover-lift hover-glow group">
                    <Link to={`/blog/${post.slug}`}>
                      <div className="aspect-video bg-muted relative overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </Link>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                        <span>{post.date}</span>
                      </div>
                      <h2 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center text-accent hover:text-accent/80 font-medium text-sm group-hover:gap-2 transition-all"
                      >
                        Read More
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="bg-primary rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
              <div className="relative z-10">
                {isSubscribed ? (
                  <>
                    <div className="w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                      You're subscribed!
                    </h2>
                    <p className="text-primary-foreground/80 max-w-xl mx-auto">
                      Thanks for subscribing. You'll receive the latest articles directly in your inbox.
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                      Get practical insights on building scalable web products
                    </h2>
                    <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                      Subscribe to receive articles on web development, performance, and building successful products.
                    </p>
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                        required
                      />
                      <Button type="submit" variant="secondary" className="btn-press" disabled={isSubscribing}>
                        <Send className="mr-2 h-4 w-4" />
                        {isSubscribing ? "Subscribing..." : "Subscribe"}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
