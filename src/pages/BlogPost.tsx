import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Share2, Linkedin, Twitter } from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";

// This would typically come from a database or CMS
const postData: Record<string, {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
}> = {
  "building-scalable-web-apps": {
    title: "Building Scalable Web Applications: A Practical Guide",
    excerpt: "Learn the key principles and patterns for building web applications that can grow with your business.",
    content: `When building web applications, scalability should be a consideration from day one. A scalable application can handle growth in users, data, and features without requiring a complete rewrite.

## Key Principles

### 1. Design for Modularity

Break your application into independent, loosely-coupled modules. This makes it easier to scale individual components and maintain the codebase over time.

Each module should have a single responsibility and communicate with others through well-defined interfaces. This approach allows teams to work independently and makes it easier to replace or upgrade individual components.

### 2. Optimize Database Queries

Database operations are often the bottleneck in web applications. Use indexing, query optimization, and caching strategies to ensure your database can handle increased load.

Consider implementing read replicas for read-heavy workloads and connection pooling to manage database connections efficiently.

### 3. Implement Caching

Caching frequently accessed data reduces database load and improves response times. Consider using Redis or similar solutions for session storage and frequently accessed data.

Implement caching at multiple levels: browser caching, CDN caching, application-level caching, and database query caching.

### 4. Use Asynchronous Processing

For time-consuming operations, use background jobs and message queues. This keeps your application responsive while handling heavy workloads.

Operations like sending emails, processing images, or generating reports should be handled asynchronously to avoid blocking user requests.

## Conclusion

Building scalable applications requires thoughtful architecture and adherence to proven patterns. Start with these principles and adapt them to your specific needs. Remember, the best time to think about scalability is before you need it.`,
    category: "Web Development",
    readTime: "8 min read",
    date: "Dec 15, 2024",
    image: "/placeholder.svg",
  },
  "choosing-tech-stack-startup": {
    title: "Choosing the Right Tech Stack for Your Startup",
    excerpt: "A comprehensive guide to selecting technologies that balance speed, scalability, and maintainability.",
    content: `Your technology choices will impact your startup's ability to iterate quickly, scale efficiently, and attract talent. Choose wisely, but don't overthink it.

## Factors to Consider

### 1. Time to Market

For early-stage startups, speed is crucial. Choose technologies with robust ecosystems and good documentation. The faster you can ship, the faster you can learn from real users.

Frameworks like Next.js or Remix can help you move quickly while maintaining code quality.

### 2. Scalability

While you shouldn't over-engineer early, choose technologies that won't require a complete rewrite when you grow. PostgreSQL, for example, can scale from prototype to millions of users.

Avoid niche technologies that might limit your options later.

### 3. Developer Availability

Consider the talent pool when making technology choices. Popular technologies make it easier to hire and onboard new team members.

TypeScript has become the de facto standard for web development, making it easier to find skilled developers.

### 4. Community and Support

Strong community support means better documentation, more libraries, and faster problem-solving. Look for active GitHub repositories and helpful communities on Discord or Stack Overflow.

## Recommended Stack for Most Startups

Based on these principles, here's what I recommend for most startups:

- **Frontend**: React or Next.js with TypeScript
- **Backend**: Node.js or Python (Django/FastAPI)
- **Database**: PostgreSQL for most cases, MongoDB for document-heavy applications
- **Hosting**: Vercel for frontend, Railway or AWS for backend

## Conclusion

The best tech stack is one that lets you ship fast while providing room for growth. Don't chase trends—choose proven technologies that your team knows well.`,
    category: "Business & Startups",
    readTime: "6 min read",
    date: "Dec 10, 2024",
    image: "/placeholder.svg",
  },
  "performance-optimization-react": {
    title: "Performance Optimization Techniques for React Apps",
    excerpt: "Practical strategies to improve the performance of your React applications.",
    content: `Slow applications frustrate users and hurt conversion rates. Studies show that every 100ms of latency can cost you 1% in sales. Let's fix that.

## Optimization Techniques

### 1. Code Splitting

Use dynamic imports to load code only when needed. This reduces initial bundle size and improves load times.

Next.js handles this automatically for pages, but you can also split at the component level for large features.

### 2. Memoization

Use React.memo, useMemo, and useCallback to prevent unnecessary re-renders. But profile first—premature optimization is the root of all evil.

Focus on components that render frequently or have expensive computations.

### 3. Virtual Lists

For long lists, use virtualization libraries like react-virtual or @tanstack/virtual. Only render what's visible on screen.

This can turn a list of 10,000 items from a performance nightmare into a butter-smooth experience.

### 4. Image Optimization

Use modern formats like WebP or AVIF, implement lazy loading, and serve appropriately sized images. Next.js Image component handles most of this automatically.

Consider using a CDN with automatic image optimization for production applications.

### 5. Bundle Analysis

Regularly analyze your bundle to identify and remove unused code. Tools like webpack-bundle-analyzer help visualize your bundle composition.

Look for duplicate dependencies and large libraries that could be replaced with lighter alternatives.

## Measuring Performance

Before optimizing, measure. Use:
- Chrome DevTools Performance tab
- Lighthouse for overall metrics
- React DevTools Profiler for component-level analysis
- Core Web Vitals for real-world metrics

## Conclusion

Performance optimization is an ongoing process. Measure, optimize, and repeat. Focus on metrics that actually impact user experience rather than synthetic benchmarks.`,
    category: "Performance",
    readTime: "10 min read",
    date: "Dec 5, 2024",
    image: "/placeholder.svg",
  },
  "freelancing-vs-agency": {
    title: "Freelancer vs Agency: What's Right for Your Project?",
    excerpt: "Understanding the pros and cons of working with freelancers versus agencies for your development needs.",
    content: `When you need development help, you face a choice: hire a freelancer or work with an agency. Both have their place, and the right choice depends on your specific situation.

## When to Choose a Freelancer

### Focused Projects
When you have a clear, well-defined scope, a skilled freelancer can execute efficiently without the overhead of an agency.

### Budget Constraints
Freelancers typically have lower overhead and can offer more competitive rates for equivalent skill levels.

### Direct Communication
You work directly with the person doing the work. No telephone game through project managers.

### Specialized Skills
For niche technologies or specific expertise, freelancers often have deeper specialization than generalist agency teams.

## When to Choose an Agency

### Large Projects
When you need multiple skill sets (design, frontend, backend, DevOps), an agency provides an integrated team.

### Ongoing Relationships
For long-term retainers and support, agencies offer continuity even if individual team members change.

### Risk Mitigation
Agencies have backup if someone gets sick or leaves. Your project won't stall.

### Design + Development
When you need both under one roof with established workflows and design systems.

## The Middle Ground

Some freelancers operate like mini-agencies, bringing in trusted collaborators as needed. This gives you:
- Direct relationship with a primary contact
- Access to specialized skills when needed
- Lower overhead than traditional agencies
- Flexibility to scale up or down

## Making the Decision

Consider:
1. Project scope and complexity
2. Timeline and urgency
3. Budget constraints
4. Need for ongoing support
5. Required skill sets

## Conclusion

The right choice depends on your project's scope, budget, and timeline. Don't automatically assume bigger is better—a skilled freelancer can often deliver better results than a generic agency team.`,
    category: "Freelancing",
    readTime: "5 min read",
    date: "Nov 28, 2024",
    image: "/placeholder.svg",
  },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? postData[slug] : null;

  if (!post) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Post not found</h1>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Get related posts (same category, different slug)
  const relatedPosts = Object.entries(postData)
    .filter(([s, p]) => s !== slug && p.category === post.category)
    .slice(0, 2);

  return (
    <Layout>
      {/* Header */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <Link
              to="/blog"
              className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
            
            <Badge variant="secondary" className="mb-4">
              {post.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-2 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Aman Mahto</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-elegant">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <article className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="prose prose-lg max-w-none">
                {post.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-2xl font-bold text-primary mt-10 mb-4">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-xl font-semibold text-primary mt-8 mb-3">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n').map(item => item.replace('- ', ''));
                    return (
                      <ul key={index} className="list-disc list-inside text-muted-foreground space-y-2 my-4">
                        {items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </ScrollReveal>
          </article>
        </div>
      </section>

      {/* Share */}
      <section className="py-8 border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share this article
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="btn-press">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="btn-press">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Author */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-start gap-4 bg-card p-6 rounded-lg border border-border">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-primary/40">AM</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Written by</p>
                  <h3 className="font-semibold text-primary text-lg">Aman Mahto</h3>
                  <p className="text-muted-foreground mt-2">
                    Full-Stack Developer helping startups and businesses build scalable web applications. 
                    I write about web development, performance, and building successful products.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-primary mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedPosts.map(([relatedSlug, relatedPost]) => (
                  <Link 
                    key={relatedSlug}
                    to={`/blog/${relatedSlug}`}
                    className="p-4 bg-card border border-border rounded-lg hover-lift group"
                  >
                    <Badge variant="secondary" className="mb-2">{relatedPost.category}</Badge>
                    <h4 className="font-semibold text-primary group-hover:text-accent transition-colors">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">{relatedPost.readTime}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              Need help implementing this?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Let's discuss how I can help bring your project to life.
            </p>
            <Button asChild size="lg" variant="accent" className="btn-press">
              <Link to="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
