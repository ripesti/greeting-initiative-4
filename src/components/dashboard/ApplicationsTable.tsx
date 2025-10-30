import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

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

interface ApplicationsTableProps {
  applications: Application[];
  user: User | null;
  onStatusChange: (appId: number, newStatus: string) => void;
  onOpenDetails: (app: Application) => void;
}

export default function ApplicationsTable({ 
  applications, 
  user, 
  onStatusChange, 
  onOpenDetails 
}: ApplicationsTableProps) {
  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      new: { label: 'Новая', className: 'bg-blue-500 hover:bg-blue-600' },
      in_progress: { label: 'В работе', className: 'bg-yellow-500 hover:bg-yellow-600' },
      completed: { label: 'Выполнена', className: 'bg-green-500 hover:bg-green-600' },
    };
    const variant = variants[status] || variants.new;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="FileText" size={48} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500">Заявок не найдено</p>
      </div>
    );
  }

  const canEditStatus = user?.role === 'admin' || user?.role === 'director';

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Клиент</TableHead>
            <TableHead>Телефон</TableHead>
            <TableHead>Услуга</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Дата создания</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id}>
              <TableCell className="font-medium">#{app.id}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{app.name}</div>
                  {app.email && <div className="text-sm text-gray-500">{app.email}</div>}
                </div>
              </TableCell>
              <TableCell>{app.phone}</TableCell>
              <TableCell>{app.service}</TableCell>
              <TableCell>
                {canEditStatus ? (
                  <Select
                    value={app.status}
                    onValueChange={(value) => onStatusChange(app.id, value)}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Новая</SelectItem>
                      <SelectItem value="in_progress">В работе</SelectItem>
                      <SelectItem value="completed">Выполнена</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  getStatusBadge(app.status)
                )}
              </TableCell>
              <TableCell>{formatDate(app.created_at)}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onOpenDetails(app)}
                >
                  <Icon name="Eye" size={16} className="mr-2" />
                  Подробнее
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
