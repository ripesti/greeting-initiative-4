import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

interface ApplicationDetailsDialogProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onStatusChange: (appId: number, newStatus: string) => void;
}

export default function ApplicationDetailsDialog({
  application,
  isOpen,
  onClose,
  user,
  onStatusChange
}: ApplicationDetailsDialogProps) {
  if (!application) return null;

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

  const canEditStatus = user?.role === 'admin' || user?.role === 'director';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Заявка #{application.id}</DialogTitle>
          <DialogDescription>
            Подробная информация о заявке
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Клиент</label>
              <p className="text-base font-medium">{application.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Телефон</label>
              <p className="text-base">
                <a href={`tel:${application.phone}`} className="text-primary hover:underline">
                  {application.phone}
                </a>
              </p>
            </div>
          </div>

          {application.email && (
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-base">
                <a href={`mailto:${application.email}`} className="text-primary hover:underline">
                  {application.email}
                </a>
              </p>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-500">Услуга</label>
            <p className="text-base font-medium">{application.service}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Сообщение</label>
            <p className="text-base whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
              {application.message || 'Нет сообщения'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Дата создания</label>
              <p className="text-base">{formatDate(application.created_at)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Последнее обновление</label>
              <p className="text-base">{formatDate(application.updated_at)}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500 block mb-2">Статус</label>
            {canEditStatus ? (
              <Select
                value={application.status}
                onValueChange={(value) => onStatusChange(application.id, value)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Новая</SelectItem>
                  <SelectItem value="in_progress">В работе</SelectItem>
                  <SelectItem value="completed">Выполнена</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              getStatusBadge(application.status)
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
