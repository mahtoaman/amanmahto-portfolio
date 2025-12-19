import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, Trash2 } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type Inquiry = Tables<'contact_inquiries'>;

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchInquiries();
  }, []);

  async function fetchInquiries() {
    try {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      toast({ title: 'Error loading inquiries', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    
    try {
      const { error } = await supabase.from('contact_inquiries').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Inquiry deleted' });
      fetchInquiries();
    } catch (error: any) {
      toast({ title: 'Error deleting inquiry', description: error.message, variant: 'destructive' });
    }
  }

  async function updateStatus(id: string, status: string) {
    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: 'Status updated' });
      fetchInquiries();
    } catch (error: any) {
      toast({ title: 'Error updating status', description: error.message, variant: 'destructive' });
    }
  }

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'new': return 'bg-blue-500/10 text-blue-600';
      case 'contacted': return 'bg-yellow-500/10 text-yellow-600';
      case 'closed': return 'bg-green-500/10 text-green-600';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Contact Inquiries</h1>
          <p className="text-muted-foreground mt-1">View and manage contact form submissions</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : inquiries.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No inquiries yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {inquiries.map((inquiry) => (
              <Card key={inquiry.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {inquiry.name}
                        <Badge className={getStatusColor(inquiry.status)}>
                          {inquiry.status || 'new'}
                        </Badge>
                      </CardTitle>
                      <div className="text-sm text-muted-foreground mt-1 space-y-0.5">
                        <p><a href={`mailto:${inquiry.email}`} className="hover:text-accent">{inquiry.email}</a></p>
                        {inquiry.company && <p>Company: {inquiry.company}</p>}
                        <p className="text-xs">
                          {new Date(inquiry.created_at || '').toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={inquiry.status || 'new'}
                        onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                        className="text-sm border rounded px-2 py-1 bg-background"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(inquiry.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                    {inquiry.project_type && (
                      <div>
                        <span className="font-medium">Project Type:</span> {inquiry.project_type}
                      </div>
                    )}
                    {inquiry.budget_range && (
                      <div>
                        <span className="font-medium">Budget:</span> {inquiry.budget_range}
                      </div>
                    )}
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">{inquiry.message}</p>
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
