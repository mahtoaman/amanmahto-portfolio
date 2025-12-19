import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  title: string;
  description: string;
  slug: string;
  image?: string;
  tags?: string[];
  className?: string;
}

export function ProjectCard({ 
  title, 
  description, 
  slug, 
  image, 
  tags = [],
  className 
}: ProjectCardProps) {
  return (
    <Link 
      to={`/portfolio/${slug}`}
      className={cn(
        "group block bg-card rounded-lg overflow-hidden border border-border",
        "hover-lift hover-glow",
        className
      )}
    >
      {/* Image container */}
      <div className="aspect-video bg-muted overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <span className="text-sm">Project Preview</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        {/* CTA */}
        <span className="inline-flex items-center text-sm font-medium text-accent group-hover:gap-2 transition-all">
          View Case Study 
          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
