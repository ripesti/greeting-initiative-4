import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';
import PaymentForm from '@/components/dashboard/PaymentForm';
import ClientSupport from '@/components/dashboard/ClientSupport';
import FileUpload from '@/components/dashboard/FileUpload';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import ApplicationsFilter from '@/components/dashboard/ApplicationsFilter';
import ApplicationsTable from '@/components/dashboard/ApplicationsTable';
import ApplicationDetailsDialog from '@/components/dashboard/ApplicationDetailsDialog';

interface Application {
  id: number;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  status: 'new' | 'in_progress' | 'completed';
  created_at: string;
  updated_at: string;
}

interface User {
  user_id: number;
  username: string;
  role: 'admin' | 'director' | 'client';
}

export default function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      window.location.href = '/login';
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
  }, []);

  useEffect(() => {
    if (user) {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async (status?: string) => {
    try {
      let url = 'https://functions.poehali.dev/680c3b01-9d4e-4dee-a366-4c371d7942aa';
      
      if (user?.role === 'client') {
        url += `?user_id=${user.user_id}`;
      }
      
      if (status && status !== 'all') {
        url += user?.role === 'client' ? `&status=${status}` : `?status=${status}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setApplications(data);
      } else {
        setApplications([]);
      }
    } catch (error) {
      toast.error('Ошибка загрузки заявок');
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    fetchApplications(status);
  };

  const handleStatusChange = async (appId: number, newStatus: string) => {
    try {
      const response = await fetch('https://functions.poehali.dev/680c3b01-9d4e-4dee-a366-4c371d7942aa', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: appId,
          status: newStatus
        }),
      });

      if (response.ok) {
        toast.success('Статус обновлен');
        fetchApplications(statusFilter === 'all' ? undefined : statusFilter);
      } else {
        toast.error('Ошибка обновления статуса');
      }
    } catch (error) {
      toast.error('Ошибка подключения к серверу');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(applications.map(app => ({
      'ID': app.id,
      'Клиент': app.name,
      'Телефон': app.phone,
      'Email': app.email,
      'Услуга': app.service,
      'Сообщение': app.message,
      'Статус': app.status === 'new' ? 'Новая' : app.status === 'in_progress' ? 'В работе' : 'Выполнена',
      'Дата создания': new Date(app.created_at).toLocaleString('ru-RU'),
      'Обновлено': new Date(app.updated_at).toLocaleString('ru-RU')
    })));
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Заявки');
    XLSX.writeFile(workbook, `заявки_${new Date().toISOString().split('T')[0]}.xlsx`);
    toast.success('Экспорт выполнен');
  };

  const handleOpenDetails = (app: Application) => {
    setSelectedApp(app);
    setIsDialogOpen(true);
  };

  const filteredApplications = applications.filter(app => {
    const searchLower = searchQuery.toLowerCase();
    return (
      app.id.toString().includes(searchLower) ||
      app.name.toLowerCase().includes(searchLower) ||
      app.phone.includes(searchLower) ||
      app.email.toLowerCase().includes(searchLower) ||
      app.service.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Личный кабинет — ЮР недвижимость</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader user={user} onLogout={handleLogout} />
        
        <div className="container mx-auto px-4 py-8">
          {user?.role !== 'client' && <DashboardStats applications={applications} />}

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Мои заявки</CardTitle>
                  <CardDescription>
                    {user?.role === 'client' 
                      ? 'Управляйте своими заявками'
                      : 'Управление всеми заявками'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ApplicationsFilter
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    statusFilter={statusFilter}
                    onStatusFilterChange={handleStatusFilterChange}
                    onExportExcel={handleExportExcel}
                    showExport={user?.role !== 'client'}
                  />
                  <ApplicationsTable
                    applications={filteredApplications}
                    user={user}
                    onStatusChange={handleStatusChange}
                    onOpenDetails={handleOpenDetails}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {user?.role === 'client' && <PaymentForm />}
              <ClientSupport />
            </div>
          </div>

          {user?.role === 'client' && (
            <FileUpload applications={applications} />
          )}
        </div>

        <ApplicationDetailsDialog
          application={selectedApp}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          user={user}
          onStatusChange={handleStatusChange}
        />
      </div>
    </>
  );
}
