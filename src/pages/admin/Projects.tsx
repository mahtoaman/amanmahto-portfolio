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
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type Project = Tables<'projects'>;

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    problem: '',
    solution: '',
    category: '',
    industry: '',
    image_url: '',
    stack_frontend: '',
    stack_backend: '',
    stack_database: '',
    stack_tools: '',
    results: '',
    is_featured: false,
    display_order: 0,
    testimonial_quote: '',
    testimonial_author: '',
    testimonial_role: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order');
      
      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      toast({ title: 'Error loading projects', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  }

  function openNewDialog() {
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      description: '',
      problem: '',
      solution: '',
      category: '',
      industry: '',
      image_url: '',
      stack_frontend: '',
      stack_backend: '',
      stack_database: '',
      stack_tools: '',
      results: '',
      is_featured: false,
      display_order: 0,
      testimonial_quote: '',
      testimonial_author: '',
      testimonial_role: '',
    });
    setIsDialogOpen(true);
  }

  function openEditDialog(project: Project) {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      description: project.description || '',
      problem: project.problem || '',
      solution: project.solution || '',
      category: project.category || '',
      industry: project.industry || '',
      image_url: project.image_url || '',
      stack_frontend: (project.stack_frontend || []).join(', '),
      stack_backend: (project.stack_backend || []).join(', '),
      stack_database: (project.stack_database || []).join(', '),
      stack_tools: (project.stack_tools || []).join(', '),
      results: (project.results || []).join('\n'),
      is_featured: project.is_featured || false,
      display_order: project.display_order || 0,
      testimonial_quote: project.testimonial_quote || '',
      testimonial_author: project.testimonial_author || '',
      testimonial_role: project.testimonial_role || '',
    });
    setIsDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    const projectData = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
      description: formData.description || null,
      problem: formData.problem || null,
      solution: formData.solution || null,
      category: formData.category || null,
      industry: formData.industry || null,
      image_url: formData.image_url || null,
      stack_frontend: formData.stack_frontend ? formData.stack_frontend.split(',').map(s => s.trim()) : [],
      stack_backend: formData.stack_backend ? formData.stack_backend.split(',').map(s => s.trim()) : [],
      stack_database: formData.stack_database ? formData.stack_database.split(',').map(s => s.trim()) : [],
      stack_tools: formData.stack_tools ? formData.stack_tools.split(',').map(s => s.trim()) : [],
      results: formData.results ? formData.results.split('\n').filter(s => s.trim()) : [],
      is_featured: formData.is_featured,
      display_order: formData.display_order,
      testimonial_quote: formData.testimonial_quote || null,
      testimonial_author: formData.testimonial_author || null,
      testimonial_role: formData.testimonial_role || null,
    };

    try {
      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id);
        if (error) throw error;
        toast({ title: 'Project updated successfully' });
      } else {
        const { error } = await supabase
          .from('projects')
          .insert(projectData);
        if (error) throw error;
        toast({ title: 'Project created successfully' });
      }
      
      setIsDialogOpen(false);
      fetchProjects();
    } catch (error: any) {
      toast({ title: 'Error saving project', description: error.message, variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Project deleted' });
      fetchProjects();
    } catch (error: any) {
      toast({ title: 'Error deleting project', description: error.message, variant: 'destructive' });
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Projects</h1>
            <p className="text-muted-foreground mt-1">Manage your portfolio projects</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="accent" onClick={openNewDialog}>
                <Plus className="mr-2 h-4 w-4" /> Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Slug</Label>
                    <Input
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="auto-generated from title"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., E-commerce, Web App"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Industry</Label>
                    <Input
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      placeholder="e.g., Retail, Healthcare"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Problem Statement</Label>
                  <Textarea
                    value={formData.problem}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Solution</Label>
                  <Textarea
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Frontend Stack (comma-separated)</Label>
                    <Input
                      value={formData.stack_frontend}
                      onChange={(e) => setFormData({ ...formData, stack_frontend: e.target.value })}
                      placeholder="React, TypeScript, Tailwind"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Backend Stack (comma-separated)</Label>
                    <Input
                      value={formData.stack_backend}
                      onChange={(e) => setFormData({ ...formData, stack_backend: e.target.value })}
                      placeholder="Node.js, Express"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Database (comma-separated)</Label>
                    <Input
                      value={formData.stack_database}
                      onChange={(e) => setFormData({ ...formData, stack_database: e.target.value })}
                      placeholder="PostgreSQL, Redis"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tools (comma-separated)</Label>
                    <Input
                      value={formData.stack_tools}
                      onChange={(e) => setFormData({ ...formData, stack_tools: e.target.value })}
                      placeholder="Docker, AWS"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Results (one per line)</Label>
                  <Textarea
                    value={formData.results}
                    onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                    rows={3}
                    placeholder="40% increase in conversion rate&#10;99.9% uptime"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Testimonial Quote</Label>
                    <Textarea
                      value={formData.testimonial_quote}
                      onChange={(e) => setFormData({ ...formData, testimonial_quote: e.target.value })}
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Testimonial Author</Label>
                    <Input
                      value={formData.testimonial_author}
                      onChange={(e) => setFormData({ ...formData, testimonial_author: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Author Role</Label>
                    <Input
                      value={formData.testimonial_role}
                      onChange={(e) => setFormData({ ...formData, testimonial_role: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6">
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
                    {editingProject ? 'Update' : 'Create'}
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
        ) : projects.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No projects yet. Add your first project!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {project.title}
                        {project.is_featured && (
                          <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded">Featured</span>
                        )}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {project.category} • {project.industry}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(project)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
