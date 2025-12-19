import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client'; // Assuming this path based on AdminTestimonials
import { Star, Quote } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

interface Testimonial {
  id: string;
  quote: string;
  author_name: string;
  author_role?: string;
  author_company?: string;
  author_image_url?: string;
  rating?: number;
}

export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('is_featured', true) // Only show featured ones on home
          .order('display_order', { ascending: true })
          .limit(3);
        
        if (error) throw error;
        
        // If no featured testimonials, just get minimal latest
        if (!data || data.length === 0) {
            const { data: fallbackData } = await supabase
            .from('testimonials')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(3);
            setTestimonials(fallbackData || []);
        } else {
            setTestimonials(data);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Fallback static data if DB fails or is empty for demo purposes
        setTestimonials([
            {
                id: '1',
                quote: "Aman delivered exceptional work. The attention to detail and performance optimization was outstanding.",
                author_name: "Sarah Johnson",
                author_role: "CTO",
                author_company: "TechStart",
                rating: 5
            },
            {
                id: '2',
                quote: "Working with Aman was a breeze. He understood our requirements perfectly and delivered ahead of schedule.",
                author_name: "Michael Chen",
                author_role: "Product Manager",
                author_company: "Innovate Inc",
                rating: 5
            }
        ]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  if (!isLoading && testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold tracking-wider text-sm uppercase mb-3 block">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            What Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
                [1, 2, 3].map((i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm h-64 flex flex-col justify-between">
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-20 w-full" />
                        </div>
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                        <div>
                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.rating || 5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <Quote className="w-8 h-8 text-blue-100 mb-4" />
                            <p className="text-slate-700 leading-relaxed mb-6 italic">
                                "{testimonial.quote}"
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                            {testimonial.author_image_url ? (
                                <img 
                                    src={testimonial.author_image_url} 
                                    alt={testimonial.author_name} 
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                                    {testimonial.author_name.charAt(0)}
                                </div>
                            )}
                            <div>
                                <h4 className="font-bold text-slate-900">{testimonial.author_name}</h4>
                                <p className="text-sm text-slate-500">
                                    {testimonial.author_role}
                                    {testimonial.author_company && ` @ ${testimonial.author_company}`}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
      </div>
    </section>
  );
};
