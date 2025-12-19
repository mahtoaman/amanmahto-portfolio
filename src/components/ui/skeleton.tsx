import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn(
        "animate-pulse rounded-md bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%]",
        className
      )} 
      {...props} 
    />
  );
}

// Card skeleton for project cards
function ProjectCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("bg-card rounded-lg overflow-hidden border border-border", className)}>
      <Skeleton className="aspect-video w-full" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// Blog card skeleton
function BlogCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("bg-card rounded-lg overflow-hidden border border-border", className)}>
      <Skeleton className="aspect-[16/9] w-full" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export { Skeleton, ProjectCardSkeleton, BlogCardSkeleton };
