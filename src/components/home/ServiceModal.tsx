import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
}

interface ServiceModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedService: Service | null;
}

const serviceOptions: Record<string, { label: string; type: 'select' | 'checkbox' | 'input'; options?: string[]; placeholder?: string }[]> = {
  mortgage: [
    { label: 'Сумма кредита', type: 'select', options: ['до 3 млн ₽', '3-5 млн ₽', '5-10 млн ₽', 'более 10 млн ₽'] },
    { label: 'Срок кредита', type: 'select', options: ['до 10 лет', '10-15 лет', '15-20 лет', '20-30 лет'] },
    { label: 'Первоначальный взнос', type: 'select', options: ['менее 10%', '10-20%', '20-30%', 'более 30%'] },
    { label: 'Есть одобренная ипотека', type: 'checkbox' },
    { label: 'Нужна помощь с подбором банка', type: 'checkbox' }
  ],
  buy: [
    { label: 'Тип недвижимости', type: 'select', options: ['Квартира', 'Дом', 'Участок', 'Коммерческая'] },
    { label: 'Количество комнат', type: 'select', options: ['Студия', '1 комната', '2 комнаты', '3 комнаты', '4+ комнаты'] },
    { label: 'Бюджет', type: 'select', options: ['до 3 млн ₽', '3-5 млн ₽', '5-10 млн ₽', 'более 10 млн ₽'] },
    { label: 'Район', type: 'input', placeholder: 'Укажите желаемый район' },
    { label: 'Покупка с использованием ипотеки', type: 'checkbox' },
    { label: 'Рассматриваю новостройки', type: 'checkbox' }
  ],
  sale: [
    { label: 'Тип недвижимости', type: 'select', options: ['Квартира', 'Дом', 'Участок', 'Коммерческая'] },
    { label: 'Количество комнат', type: 'select', options: ['Студия', '1 комната', '2 комнаты', '3 комнаты', '4+ комнаты'] },
    { label: 'Желаемая цена', type: 'input', placeholder: 'Укажите желаемую цену' },
    { label: 'Адрес объекта', type: 'input', placeholder: 'Укажите адрес' },
    { label: 'Срочная продажа', type: 'checkbox' },
    { label: 'Есть обременения', type: 'checkbox' }
  ],
  legal: [
    { label: 'Тип услуги', type: 'select', options: ['Проверка документов', 'Сопровождение сделки', 'Консультация', 'Оспаривание'] },
    { label: 'Тип недвижимости', type: 'select', options: ['Квартира', 'Дом', 'Участок', 'Коммерческая'] },
    { label: 'Описание ситуации', type: 'input', placeholder: 'Кратко опишите вашу ситуацию' }
  ],
  rent: [
    { label: 'Тип недвижимости', type: 'select', options: ['Квартира', 'Дом', 'Коммерческая'] },
    { label: 'Количество комнат', type: 'select', options: ['Студия', '1 комната', '2 комнаты', '3 комнаты', '4+ комнаты'] },
    { label: 'Желаемая арендная плата', type: 'input', placeholder: 'Укажите желаемую цену' },
    { label: 'Срок аренды', type: 'select', options: ['Долгосрочная', 'Краткосрочная', 'Посуточно'] }
  ],
  insurance: [
    { label: 'Тип страхования', type: 'select', options: ['Страхование жизни и здоровья', 'Страхование имущества', 'Комплексное'] },
    { label: 'Сумма ипотеки', type: 'input', placeholder: 'Укажите сумму' },
    { label: 'Есть действующая ипотека', type: 'checkbox' }
  ]
};

export default function ServiceModal({ isOpen, onOpenChange, selectedService }: ServiceModalProps) {
  const [formData, setFormData] = useState<Record<string, string | boolean>>({});
  const [contactInfo, setContactInfo] = useState({ name: '', phone: '', email: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedService) {
      setFormData({});
    }
  }, [selectedService]);

  const currentOptions = selectedService ? serviceOptions[selectedService.id] || [] : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInfo.name || !contactInfo.phone) {
      toast.error('Заполните обязательные поля');
      return;
    }

    setLoading(true);

    try {
      const detailsText = Object.entries(formData)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');

      const response = await fetch('https://functions.poehali.dev/680c3b01-9d4e-4dee-a366-4c371d7942aa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactInfo.name,
          phone: contactInfo.phone,
          email: contactInfo.email,
          service: selectedService?.title,
          message: `Заявка на услугу: ${selectedService?.title}\n\nДетали:\n${detailsText}`,
          status: 'new'
        }),
      });

      if (response.ok) {
        toast.success('Заявка отправлена!', {
          description: 'Мы свяжемся с вами в ближайшее время'
        });
        setFormData({});
        setContactInfo({ name: '', phone: '', email: '' });
        onOpenChange(false);
      } else {
        throw new Error('Ошибка отправки');
      }
    } catch (error) {
      toast.error('Ошибка отправки', {
        description: 'Попробуйте позже или позвоните нам'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {selectedService && <Icon name={selectedService.icon} className="text-primary" size={28} />}
            {selectedService?.title}
          </DialogTitle>
          <DialogDescription>
            {selectedService?.description}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {currentOptions.map((option, index) => (
            <div key={index}>
              <Label>{option.label}</Label>
              {option.type === 'select' && option.options && (
                <Select
                  value={formData[option.label] as string}
                  onValueChange={(value) => setFormData({ ...formData, [option.label]: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={`Выберите ${option.label.toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {option.options.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {option.type === 'input' && (
                <Input
                  placeholder={option.placeholder}
                  value={formData[option.label] as string || ''}
                  onChange={(e) => setFormData({ ...formData, [option.label]: e.target.value })}
                />
              )}
              {option.type === 'checkbox' && (
                <div className="flex items-center gap-2 mt-2">
                  <Checkbox
                    checked={formData[option.label] as boolean || false}
                    onCheckedChange={(checked) => setFormData({ ...formData, [option.label]: checked })}
                  />
                  <span className="text-sm">{option.label}</span>
                </div>
              )}
            </div>
          ))}

          <div className="border-t pt-4 mt-6">
            <h4 className="font-semibold mb-4">Контактная информация</h4>
            <div className="space-y-3">
              <div>
                <Label>Ваше имя *</Label>
                <Input
                  required
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                  placeholder="Иван Иванов"
                />
              </div>
              <div>
                <Label>Телефон *</Label>
                <Input
                  required
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  placeholder="example@mail.ru"
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
            {loading ? 'Отправка...' : 'Отправить заявку'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
