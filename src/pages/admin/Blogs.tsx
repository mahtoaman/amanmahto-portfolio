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
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type Blog = Tables<'blogs'>;

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    image_url: '',
    read_time: '',
    is_published: false,
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      toast({ title: 'Error loading blogs', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  }

  function openNewDialog() {
    setEditingBlog(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: '',
      image_url: '',
      read_time: '',
      is_published: false,
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
    });
    setIsDialogOpen(true);
  }

  function openEditDialog(blog: Blog) {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      category: blog.category || '',
      image_url: blog.image_url || '',
      read_time: blog.read_time || '',
      is_published: blog.is_published || false,
      meta_title: blog.meta_title || '',
      meta_description: blog.meta_description || '',
      meta_keywords: (blog.meta_keywords || []).join(', '),
    });
    setIsDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    const blogData = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
      excerpt: formData.excerpt || null,
      content: formData.content || null,
      category: formData.category || null,
      image_url: formData.image_url || null,
      read_time: formData.read_time || null,
      is_published: formData.is_published,
      published_at: formData.is_published && !editingBlog?.published_at ? new Date().toISOString() : editingBlog?.published_at || null,
      meta_title: formData.meta_title || null,
      meta_description: formData.meta_description || null,
      meta_keywords: formData.meta_keywords ? formData.meta_keywords.split(',').map(s => s.trim()) : [],
    };

    try {
      if (editingBlog) {
        const { error } = await supabase
          .from('blogs')
          .update(blogData)
          .eq('id', editingBlog.id);
        if (error) throw error;
        toast({ title: 'Blog post updated successfully' });
      } else {
        const { error } = await supabase
          .from('blogs')
          .insert(blogData);
        if (error) throw error;
        toast({ title: 'Blog post created successfully' });
      }
      
      setIsDialogOpen(false);
      fetchBlogs();
    } catch (error: any) {
      toast({ title: 'Error saving blog post', description: error.message, variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      const { error } = await supabase.from('blogs').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Blog post deleted' });
      fetchBlogs();
    } catch (error: any) {
      toast({ title: 'Error deleting blog post', description: error.message, variant: 'destructive' });
    }
  }

  async function togglePublish(blog: Blog) {
    try {
      const { error } = await supabase
        .from('blogs')
        .update({
          is_published: !blog.is_published,
          published_at: !blog.is_published ? new Date().toISOString() : blog.published_at,
        })
        .eq('id', blog.id);
      
      if (error) throw error;
      toast({ title: blog.is_published ? 'Blog unpublished' : 'Blog published' });
      fetchBlogs();
    } catch (error: any) {
      toast({ title: 'Error updating blog', description: error.message, variant: 'destructive' });
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Blog Posts</h1>
            <p className="text-muted-foreground mt-1">Manage your blog articles</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="accent" onClick={openNewDialog}>
                <Plus className="mr-2 h-4 w-4" /> Add Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}</DialogTitle>
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., Web Development"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Read Time</Label>
                    <Input
                      value={formData.read_time}
                      onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                      placeholder="e.g., 5 min read"
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
                  <Label>Excerpt</Label>
                  <Textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={2}
                    placeholder="Brief summary of the post"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Content</Label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={10}
                    placeholder="Write your blog post content here..."
                  />
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium mb-3">SEO Settings</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Meta Title</Label>
                      <Input
                        value={formData.meta_title}
                        onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Meta Description</Label>
                      <Textarea
                        value={formData.meta_description}
                        onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Meta Keywords (comma-separated)</Label>
                      <Input
                        value={formData.meta_keywords}
                        onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                  />
                  <Label>Publish immediately</Label>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="accent" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {editingBlog ? 'Update' : 'Create'}
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
        ) : blogs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No blog posts yet. Write your first article!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {blogs.map((blog) => (
              <Card key={blog.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {blog.title}
                        {blog.is_published ? (
                          <span className="text-xs bg-green-500/10 text-green-600 px-2 py-0.5 rounded flex items-center gap-1">
                            <Eye className="h-3 w-3" /> Published
                          </span>
                        ) : (
                          <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded flex items-center gap-1">
                            <EyeOff className="h-3 w-3" /> Draft
                          </span>
                        )}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {blog.category} • {blog.read_time || 'No read time set'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => togglePublish(blog)}
                      >
                        {blog.is_published ? 'Unpublish' : 'Publish'}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(blog)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(blog.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{blog.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
