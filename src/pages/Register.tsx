import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const loginRegex = /^[a-zA-Z0-9_-]+$/;
    if (!loginRegex.test(formData.username)) {
      toast.error('Логин может содержать только латинские буквы, цифры, дефис и подчеркивание');
      return;
    }

    if (formData.username.length < 3) {
      toast.error('Логин должен быть не менее 3 символов');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Пароли не совпадают');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Пароль должен быть не менее 6 символов');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/e2acb26b-07e7-4439-8683-620e06ed06ef', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          register: true
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('user', JSON.stringify({
          user_id: data.user_id,
          username: data.username,
          role: data.role
        }));
        toast.success('Регистрация успешна! Перенаправляем в личный кабинет...');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        toast.error(data.message || 'Ошибка регистрации');
      }
    } catch (error) {
      toast.error('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Регистрация — ЮР недвижимость</title>
        <meta name="description" content="Зарегистрируйтесь в личном кабинете ЮР недвижимость для доступа к персональным услугам по недвижимости в Воронеже" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-[#FF6600]/10 via-white to-[#FF8833]/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src="https://cdn.poehali.dev/files/855a0bef-af1c-4794-9913-95fb0e695be8.png" alt="ЮР недвижимость" className="h-16 w-auto" />
          </div>
          <CardTitle className="text-2xl">Регистрация</CardTitle>
          <CardDescription>Создайте личный кабинет</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="username">Логин *</Label>
              <Input
                id="username"
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Латинские буквы, цифры, дефис"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@mail.ru"
              />
            </div>
            <div>
              <Label htmlFor="password">Пароль *</Label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Минимум 6 символов"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Подтвердите пароль *</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Повторите пароль"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                  Регистрация...
                </>
              ) : (
                'Зарегистрироваться'
              )}
            </Button>
            <div className="text-center text-sm">
              <span className="text-gray-600">Уже есть аккаунт? </span>
              <a href="/login" className="text-primary hover:underline">
                Войти
              </a>
            </div>
            <div className="text-center">
              <a href="/" className="text-sm text-gray-600 hover:text-primary">
                Вернуться на главную
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
      </div>
    </>
  );
}
