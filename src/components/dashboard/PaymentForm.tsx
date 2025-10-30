import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function PaymentForm() {
  const [formData, setFormData] = useState({
    amount: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.cardNumber || !formData.cardExpiry || !formData.cardCVC) {
      toast.error('Заполните все поля');
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Укажите корректную сумму');
      return;
    }

    toast.success('Платеж обрабатывается', {
      description: 'Ваш платеж будет обработан в ближайшее время'
    });

    setFormData({
      amount: '',
      cardNumber: '',
      cardExpiry: '',
      cardCVC: ''
    });
  };

  return (
    <Card className="shadow-xl border-2 border-primary/10">
      <CardHeader className="text-center pb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CreditCard" size={32} className="text-primary" />
        </div>
        <CardTitle className="text-2xl">Оплата услуг</CardTitle>
        <CardDescription>
          Безопасная оплата банковской картой
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount">Сумма платежа (₽)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="cardNumber">Номер карты</Label>
            <Input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              value={formatCardNumber(formData.cardNumber)}
              onChange={(e) => handleInputChange('cardNumber', e.target.value.replace(/\s/g, ''))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cardExpiry">Срок действия</Label>
              <Input
                id="cardExpiry"
                type="text"
                placeholder="MM/YY"
                maxLength={5}
                value={formatExpiry(formData.cardExpiry)}
                onChange={(e) => handleInputChange('cardExpiry', e.target.value.replace(/\D/g, ''))}
                required
              />
            </div>
            <div>
              <Label htmlFor="cardCVC">CVC</Label>
              <Input
                id="cardCVC"
                type="text"
                placeholder="123"
                maxLength={3}
                value={formData.cardCVC}
                onChange={(e) => handleInputChange('cardCVC', e.target.value.replace(/\D/g, ''))}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            <Icon name="CreditCard" size={20} className="mr-2" />
            Оплатить
          </Button>

          <div className="flex items-center gap-2 text-sm text-gray-500 justify-center">
            <Icon name="Lock" size={16} />
            <span>Безопасная оплата через защищенное соединение</span>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
