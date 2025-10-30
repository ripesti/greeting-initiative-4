import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/e2acb26b-07e7-4439-8683-620e06ed06ef', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('user', JSON.stringify(data));
        toast.success('Вход выполнен успешно!');
        window.location.href = '/dashboard';
      } else {
        toast.error('Неверный логин или пароль');
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
        <title>Вход в личный кабинет — ЮР недвижимость</title>
        <meta name="description" content="Войдите в личный кабинет ЮР недвижимость для управления вашими заявками и консультациями по недвижимости в Воронеже" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-[#FF6600]/10 via-white to-[#FF8833]/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src="https://cdn.poehali.dev/files/855a0bef-af1c-4794-9913-95fb0e695be8.png" alt="ЮР недвижимость" className="h-16 w-auto" />
          </div>
          <CardTitle className="text-2xl">Вход в личный кабинет</CardTitle>
          <CardDescription>Введите ваш логин и пароль</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Логин</Label>
              <Input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введите логин"
              />
            </div>
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                  Вход...
                </>
              ) : (
                'Войти'
              )}
            </Button>
            <div className="text-center text-sm">
              <span className="text-gray-600">Нет аккаунта? </span>
              <a href="/register" className="text-primary hover:underline">
                Зарегистрироваться
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
