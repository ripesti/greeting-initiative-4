import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ReviewForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    text: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = {
        name: formData.name,
        phone: '',
        email: 'review@yur-nedv.ru',
        service: `Отзыв: ${formData.service}`,
        message: `Оценка: ${rating}/5\n\n${formData.text}`,
        status: 'new'
      };

      const response = await fetch('https://functions.poehali.dev/680c3b01-9d4e-4dee-a366-4c371d7942aa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        toast({
          title: 'Спасибо за отзыв!',
          description: 'Ваш отзыв отправлен и будет опубликован после модерации.',
        });
        setFormData({ name: '', service: '', text: '' });
        setRating(5);
      } else {
        throw new Error('Ошибка отправки');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить отзыв. Попробуйте позже.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Оставьте отзыв</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Ваше имя</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Введите ваше имя"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Услуга</label>
              <Input
                type="text"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                placeholder="Какую услугу вы получили?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Ваша оценка</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Icon
                      name="Star"
                      size={32}
                      className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Ваш отзыв</label>
              <Textarea
                name="text"
                value={formData.text}
                onChange={handleChange}
                required
                placeholder="Расскажите о вашем опыте работы с нами"
                rows={4}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить отзыв'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewForm;
