import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

interface Service {
  id: string;
  title: string;
}

interface ApplicationFormProps {
  services: Service[];
}

export default function ApplicationForm({ services }: ApplicationFormProps) {
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast.error('Необходимо согласие на обработку данных');
      return;
    }

    try {
      const userData = localStorage.getItem('user');
      const user = userData ? JSON.parse(userData) : null;
      
      setUploading(true);
      let uploadedFileUrls: string[] = [];

      if (files.length > 0) {
        const uploadPromises = files.map(async (file) => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64 = reader.result as string;
              resolve(base64);
            };
            reader.readAsDataURL(file);
          });
        });
        
        uploadedFileUrls = await Promise.all(uploadPromises);
      }

      const filesText = uploadedFileUrls.length > 0 
        ? `\n\nПрикрепленные файлы (${files.length}):\n${files.map(f => f.name).join(', ')}`
        : '';

      const response = await fetch('https://functions.poehali.dev/680c3b01-9d4e-4dee-a366-4c371d7942aa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          message: formData.message + filesText,
          status: 'new',
          user_id: user?.user_id || null
        }),
      });

      if (response.ok) {
        toast.success('Заявка отправлена!', {
          description: 'Мы свяжемся с вами в ближайшее время'
        });
        setFormData({ name: '', phone: '', email: '', service: '', message: '' });
        setFiles([]);
        setAgreed(false);
      } else {
        throw new Error('Ошибка отправки');
      }
    } catch (error) {
      toast.error('Ошибка отправки', {
        description: 'Попробуйте позже или позвоните нам'
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <section id="application-form" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-4xl font-bold text-center mb-4 animate-on-scroll">Оставьте заявку</h2>
        <p className="text-center text-gray-600 mb-8 animate-on-scroll">Мы свяжемся с вами в течение 15 минут</p>
        <Card className="animate-on-scroll shadow-xl">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Ваше имя *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Иван Иванов"
                />
              </div>
              <div>
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@mail.ru"
                />
              </div>
              <div>
                <Label htmlFor="service">Услуга *</Label>
                <Select required value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите услугу" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.title}>
                        {service.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="message">Сообщение</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Расскажите подробнее о вашей ситуации"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="files">Прикрепить файлы (необязательно)</Label>
                <Input
                  id="files"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                {files.length > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    Выбрано файлов: {files.length}
                  </p>
                )}
              </div>
              <div className="flex items-start gap-2">
                <Checkbox
                  id="agreement"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                />
                <Label htmlFor="agreement" className="text-sm cursor-pointer">
                  Я согласен с{' '}
                  <Link to="/privacy-policy" className="text-primary hover:underline">
                    политикой конфиденциальности
                  </Link>
                  {' '}и{' '}
                  <Link to="/personal-data-consent" className="text-primary hover:underline">
                    обработкой персональных данных
                  </Link>
                </Label>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={uploading}>
                {uploading ? (
                  <>
                    <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  'Отправить заявку'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
