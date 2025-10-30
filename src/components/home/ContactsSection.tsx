import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function ContactsSection() {
  const isWorkingHours = () => {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 10 && hour < 20;
  };

  return (
    <section id="contacts" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-foreground animate-on-scroll">Наши контакты</h2>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 animate-on-scroll">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Icon name="Phone" className="text-primary" />
                  Телефон
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href="tel:+79805557580" className="text-xl font-semibold text-primary hover:underline">
                  +7 980 555 75 80
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Icon name="Mail" className="text-secondary" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href="mailto:yur.nedv@mail.ru" className="text-xl font-semibold text-secondary hover:underline">
                  yur.nedv@mail.ru
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Icon name="MapPin" className="text-primary" />
                  Адрес
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">Московский пр-т, д. 114 В, офис 200</p>
                <p className="text-gray-600">Воронеж, Россия</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Icon name="Clock" className="text-secondary" />
                  График работы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">Ежедневно: 10:00 — 20:00</p>
                {isWorkingHours() ? (
                  <p className="text-green-600 font-medium mt-2 flex items-center gap-2">
                    <Icon name="CheckCircle" size={16} />
                    Сейчас открыто
                  </p>
                ) : (
                  <p className="text-red-600 font-medium mt-2 flex items-center gap-2">
                    <Icon name="XCircle" size={16} />
                    Сейчас закрыто
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Icon name="Users" className="text-primary" />
                  Социальные сети
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <a href="https://vk.com/yur.nedv" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                    VK
                  </a>
                  <a href="https://t.me/yur_nedv" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                    Telegram
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
