import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Loader2, Star } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type Testimonial = Tables<'testimonials'>;

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    quote: '',
    author_name: '',
    author_role: '',
    author_company: '',
    author_image_url: '',
    rating: 5,
    is_featured: false,
    display_order: 0,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order');
      
      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      toast({ title: 'Error loading testimonials', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  }

  function openNewDialog() {
    setEditingTestimonial(null);
    setFormData({
      quote: '',
      author_name: '',
      author_role: '',
      author_company: '',
      author_image_url: '',
      rating: 5,
      is_featured: false,
      display_order: 0,
    });
    setIsDialogOpen(true);
  }

  function openEditDialog(testimonial: Testimonial) {
    setEditingTestimonial(testimonial);
    setFormData({
      quote: testimonial.quote,
      author_name: testimonial.author_name,
      author_role: testimonial.author_role || '',
      author_company: testimonial.author_company || '',
      author_image_url: testimonial.author_image_url || '',
      rating: testimonial.rating || 5,
      is_featured: testimonial.is_featured || false,
      display_order: testimonial.display_order || 0,
    });
    setIsDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    const testimonialData = {
      quote: formData.quote,
      author_name: formData.author_name,
      author_role: formData.author_role || null,
      author_company: formData.author_company || null,
      author_image_url: formData.author_image_url || null,
      rating: formData.rating,
      is_featured: formData.is_featured,
      display_order: formData.display_order,
    };

    try {
      if (editingTestimonial) {
        const { error } = await supabase
          .from('testimonials')
          .update(testimonialData)
          .eq('id', editingTestimonial.id);
        if (error) throw error;
        toast({ title: 'Testimonial updated successfully' });
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert(testimonialData);
        if (error) throw error;
        toast({ title: 'Testimonial created successfully' });
      }
      
      setIsDialogOpen(false);
      fetchTestimonials();
    } catch (error: any) {
      toast({ title: 'Error saving testimonial', description: error.message, variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    
    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Testimonial deleted' });
      fetchTestimonials();
    } catch (error: any) {
      toast({ title: 'Error deleting testimonial', description: error.message, variant: 'destructive' });
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Testimonials</h1>
            <p className="text-muted-foreground mt-1">Manage client testimonials</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="accent" onClick={openNewDialog}>
                <Plus className="mr-2 h-4 w-4" /> Add Testimonial
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Quote *</Label>
                  <Textarea
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Author Name *</Label>
                    <Input
                      value={formData.author_name}
                      onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input
                      value={formData.author_role}
                      onChange={(e) => setFormData({ ...formData, author_role: e.target.value })}
                      placeholder="e.g., CEO"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                      value={formData.author_company}
                      onChange={(e) => setFormData({ ...formData, author_company: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Author Image URL</Label>
                    <Input
                      value={formData.author_image_url}
                      onChange={(e) => setFormData({ ...formData, author_image_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Label>Rating</Label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-5 w-5 ${star <= formData.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.is_featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                    />
                    <Label>Featured</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label>Order</Label>
                    <Input
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                      className="w-20"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="accent" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {editingTestimonial ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : testimonials.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No testimonials yet. Add your first testimonial!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {testimonial.author_image_url && (
                        <img
                          src={testimonial.author_image_url}
                          alt={testimonial.author_name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <CardTitle className="text-base flex items-center gap-2">
                          {testimonial.author_name}
                          {testimonial.is_featured && (
                            <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded">Featured</span>
                          )}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.author_role}{testimonial.author_company ? `, ${testimonial.author_company}` : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(testimonial)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(testimonial.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">"{testimonial.quote}"</p>
                  <div className="flex gap-0.5 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= (testimonial.rating || 5) ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
