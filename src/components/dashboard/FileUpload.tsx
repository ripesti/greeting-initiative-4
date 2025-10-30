import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  url: string;
  applicationId?: number;
  applicationTitle?: string;
}

interface Application {
  id: number;
  service: string;
  created_at: string;
}

interface FileUploadProps {
  applications: Application[];
}

export default function FileUpload({ applications }: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string>('');
  const [filterApplicationId, setFilterApplicationId] = useState<string>('all');

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Байт';
    const k = 1024;
    const sizes = ['Байт', 'КБ', 'МБ', 'ГБ'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getFileIcon = (type: string): string => {
    if (type.includes('pdf')) return 'FileText';
    if (type.includes('image')) return 'Image';
    if (type.includes('word') || type.includes('document')) return 'FileText';
    if (type.includes('excel') || type.includes('spreadsheet')) return 'Table';
    if (type.includes('zip') || type.includes('rar')) return 'Archive';
    return 'File';
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    if (!selectedApplicationId) {
      toast.error('Выберите заявку для прикрепления файла');
      return;
    }

    Array.from(selectedFiles).forEach((file) => {
      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date(),
        url: URL.createObjectURL(file),
        applicationId: parseInt(selectedApplicationId),
        applicationTitle: applications.find(app => app.id === parseInt(selectedApplicationId))?.service
      };

      setFiles(prev => [...prev, newFile]);
    });

    toast.success('Файлы загружены', {
      description: `Загружено файлов: ${selectedFiles.length}`
    });

    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (!selectedApplicationId) {
      toast.error('Выберите заявку для прикрепления файла');
      return;
    }

    const droppedFiles = e.dataTransfer.files;
    Array.from(droppedFiles).forEach((file) => {
      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date(),
        url: URL.createObjectURL(file),
        applicationId: parseInt(selectedApplicationId),
        applicationTitle: applications.find(app => app.id === parseInt(selectedApplicationId))?.service
      };

      setFiles(prev => [...prev, newFile]);
    });

    toast.success('Файлы загружены', {
      description: `Загружено файлов: ${droppedFiles.length}`
    });
  };

  const handleDeleteFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    toast.success('Файл удален');
  };

  const filteredFiles = filterApplicationId === 'all' 
    ? files 
    : files.filter(f => f.applicationId === parseInt(filterApplicationId));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Загрузка файлов</CardTitle>
          <CardDescription>
            Загрузите документы, относящиеся к вашим заявкам
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Выберите заявку</Label>
            <Select value={selectedApplicationId} onValueChange={setSelectedApplicationId}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите заявку" />
              </SelectTrigger>
              <SelectContent>
                {applications.map((app) => (
                  <SelectItem key={app.id} value={app.id.toString()}>
                    #{app.id} - {app.service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Icon name="Upload" size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium mb-2">
              Перетащите файлы сюда или выберите
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Поддерживаются все типы файлов
            </p>
            <Input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <Button asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                <Icon name="Upload" size={20} className="mr-2" />
                Выбрать файлы
              </label>
            </Button>
          </div>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Загруженные файлы ({filteredFiles.length})</CardTitle>
              <Select value={filterApplicationId} onValueChange={setFilterApplicationId}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все заявки</SelectItem>
                  {applications.map((app) => (
                    <SelectItem key={app.id} value={app.id.toString()}>
                      #{app.id} - {app.service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Icon name={getFileIcon(file.type)} size={24} className="text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(file.size)} • {formatDate(file.uploadedAt)}
                        {file.applicationTitle && ` • ${file.applicationTitle}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(file.url, '_blank')}
                    >
                      <Icon name="Download" size={20} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteFile(file.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Icon name="Trash2" size={20} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
