import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Message {
  id: number;
  text: string;
  sender: 'client' | 'specialist';
  timestamp: Date;
}

export default function ClientSupport() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackTime, setCallbackTime] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Здравствуйте! Я ваш персональный специалист. Чем могу помочь?',
      sender: 'specialist',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone) {
      toast.error('Укажите номер телефона');
      return;
    }
    toast.success('Заявка принята!', {
      description: 'Мы перезвоним вам в ближайшее время'
    });
    setCallbackPhone('');
    setCallbackTime('');
    setIsCallbackOpen(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'client',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setNewMessage('');

    setTimeout(() => {
      const autoReply: Message = {
        id: messages.length + 2,
        text: 'Спасибо за ваше сообщение! Специалист ответит вам в ближайшее время.',
        sender: 'specialist',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, autoReply]);
    }, 1000);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Phone" className="text-primary" />
            Заказать обратный звонок
          </CardTitle>
          <CardDescription>
            Мы перезвоним вам в удобное время
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setIsCallbackOpen(true)} className="w-full">
            <Icon name="PhoneCall" size={20} className="mr-2" />
            Заказать звонок
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="MessageCircle" className="text-primary" />
            Чат со специалистом
          </CardTitle>
          <CardDescription>
            Задайте вопрос в онлайн-чате
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setIsChatOpen(true)} className="w-full" variant="outline">
            <Icon name="MessageSquare" size={20} className="mr-2" />
            Открыть чат
          </Button>
        </CardContent>
      </Card>

      <Dialog open={isCallbackOpen} onOpenChange={setIsCallbackOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Заказать обратный звонок</DialogTitle>
            <DialogDescription>
              Укажите ваш номер телефона и удобное время для звонка
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCallbackSubmit} className="space-y-4">
            <div>
              <Label htmlFor="callback-phone">Номер телефона *</Label>
              <Input
                id="callback-phone"
                type="tel"
                required
                value={callbackPhone}
                onChange={(e) => setCallbackPhone(e.target.value)}
                placeholder="+7 (999) 123-45-67"
              />
            </div>
            <div>
              <Label htmlFor="callback-time">Удобное время (необязательно)</Label>
              <Input
                id="callback-time"
                type="text"
                value={callbackTime}
                onChange={(e) => setCallbackTime(e.target.value)}
                placeholder="Например: сегодня после 18:00"
              />
            </div>
            <Button type="submit" className="w-full">
              Отправить заявку
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="max-w-2xl h-[600px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Чат со специалистом</DialogTitle>
            <DialogDescription>
              Задайте ваш вопрос, и мы ответим в ближайшее время
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto space-y-4 p-4 border rounded-lg bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'client' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === 'client'
                      ? 'bg-primary text-white'
                      : 'bg-white border'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'client' ? 'text-white/70' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Введите ваше сообщение..."
              className="flex-1"
              rows={2}
            />
            <Button type="submit" size="icon">
              <Icon name="Send" size={20} />
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
