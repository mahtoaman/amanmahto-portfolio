import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { FolderKanban, MessageSquareQuote, FileText, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Stats {
  projects: number;
  testimonials: number;
  blogs: number;
  inquiries: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ projects: 0, testimonials: 0, blogs: 0, inquiries: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [projectsRes, testimonialsRes, blogsRes, inquiriesRes] = await Promise.all([
          supabase.from('projects').select('id', { count: 'exact', head: true }),
          supabase.from('testimonials').select('id', { count: 'exact', head: true }),
          supabase.from('blogs').select('id', { count: 'exact', head: true }),
          supabase.from('contact_inquiries').select('id', { count: 'exact', head: true }),
        ]);

        setStats({
          projects: projectsRes.count || 0,
          testimonials: testimonialsRes.count || 0,
          blogs: blogsRes.count || 0,
          inquiries: inquiriesRes.count || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Projects', value: stats.projects, icon: FolderKanban, href: '/admin/projects', color: 'text-blue-500' },
    { title: 'Testimonials', value: stats.testimonials, icon: MessageSquareQuote, href: '/admin/testimonials', color: 'text-green-500' },
    { title: 'Blog Posts', value: stats.blogs, icon: FileText, href: '/admin/blogs', color: 'text-purple-500' },
    { title: 'Inquiries', value: stats.inquiries, icon: Mail, href: '/admin/inquiries', color: 'text-orange-500' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome to your admin dashboard</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <Link key={stat.title} to={stat.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {isLoading ? '...' : stat.value}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link 
                to="/admin/projects" 
                className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <span className="font-medium">Add New Project</span>
                <p className="text-sm text-muted-foreground">Showcase your latest work</p>
              </Link>
              <Link 
                to="/admin/blogs" 
                className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <span className="font-medium">Write Blog Post</span>
                <p className="text-sm text-muted-foreground">Share your insights and expertise</p>
              </Link>
              <Link 
                to="/admin/testimonials" 
                className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <span className="font-medium">Add Testimonial</span>
                <p className="text-sm text-muted-foreground">Highlight client feedback</p>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Activity tracking coming soon. For now, use the sidebar to manage your content.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
