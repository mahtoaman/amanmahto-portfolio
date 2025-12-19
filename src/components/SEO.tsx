import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
}

const defaultMeta = {
  title: 'Aman Mahto - Full-Stack Developer',
  description: 'Full-stack developer specializing in scalable, secure, and conversion-focused web applications for startups and businesses.',
  keywords: ['full-stack developer', 'web developer', 'React developer', 'Node.js developer', 'freelance developer'],
  author: 'Aman Mahto',
};

export function SEO({
  title,
  description = defaultMeta.description,
  keywords = defaultMeta.keywords,
  canonicalUrl,
  ogImage = 'https://amanmahto.vercel.app/amanmahto.jpeg?v=1',
  ogType = 'website',
  author = defaultMeta.author,
  publishedTime,
}: SEOProps) {
  const fullTitle = title 
    ? `${title} | ${defaultMeta.title}` 
    : defaultMeta.title;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper to update or create meta tag
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const selector = isProperty 
        ? `meta[property="${name}"]` 
        : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Basic meta tags
    updateMeta('description', description);
    updateMeta('keywords', keywords.join(', '));
    updateMeta('author', author);

    // Open Graph tags
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', description, true);
    updateMeta('og:type', ogType, true);
    updateMeta('og:image', ogImage, true);
    
    if (canonicalUrl) {
      updateMeta('og:url', canonicalUrl, true);
      
      // Update or create canonical link
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonicalUrl;
    }

    // Twitter Card tags
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', ogImage);

    // Article specific
    if (ogType === 'article' && publishedTime) {
      updateMeta('article:published_time', publishedTime, true);
      updateMeta('article:author', author, true);
    }

  }, [fullTitle, description, keywords, canonicalUrl, ogImage, ogType, author, publishedTime]);

  return null;
}

// Structured data for Person (portfolio owner)
export function PersonStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Aman Mahto",
    "jobTitle": "Full-Stack Developer",
    "description": "Full-stack developer specializing in scalable web applications for startups and businesses",
    "url": typeof window !== 'undefined' ? window.location.origin : '',
    "sameAs": [
      "https://linkedin.com/in/amanmahto",
      "https://github.com/mahtoaman"
    ],
    "knowsAbout": [
      "React", "TypeScript", "Node.js", "PostgreSQL", "Web Development", "E-commerce", "SaaS"
    ]
  };

  useEffect(() => {
    let script = document.querySelector('script[data-structured="person"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-structured', 'person');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, []);

  return null;
}

// Structured data for Services
export function ServicesStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Web Development",
    "provider": {
      "@type": "Person",
      "name": "Aman Mahto"
    },
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Static & Business Websites"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Applications"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-commerce Development"
          }
        }
      ]
    }
  };

  useEffect(() => {
    let script = document.querySelector('script[data-structured="services"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-structured', 'services');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, []);

  return null;
}
