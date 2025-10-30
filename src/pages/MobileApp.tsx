import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';

export default function MobileApp() {
  const features = [
    {
      icon: 'Home',
      title: 'Поиск недвижимости',
      description: 'Просматривайте объявления и подбирайте квартиры прямо в приложении'
    },
    {
      icon: 'Bell',
      title: 'Push-уведомления',
      description: 'Получайте мгновенные уведомления об изменении статуса заявки'
    },
    {
      icon: 'MessageCircle',
      title: 'Чат со специалистом',
      description: 'Общайтесь с персональным менеджером в любое время'
    },
    {
      icon: 'CreditCard',
      title: 'Онлайн-оплата',
      description: 'Оплачивайте услуги безопасно прямо из приложения'
    },
    {
      icon: 'FileText',
      title: 'Личный кабинет',
      description: 'Следите за статусом заявок и храните все документы в одном месте'
    },
    {
      icon: 'Phone',
      title: 'Быстрая связь',
      description: 'Звоните специалистам в один клик без ввода номера'
    }
  ];

  const screenshots = [
    {
      title: 'Главный экран',
      image: 'https://cdn.poehali.dev/files/7d330913-0577-479e-bd95-ea105020552c.jpeg'
    },
    {
      title: 'Личный кабинет',
      image: 'https://cdn.poehali.dev/files/7d330913-0577-479e-bd95-ea105020552c.jpeg'
    },
    {
      title: 'Чат',
      image: 'https://cdn.poehali.dev/files/7d330913-0577-479e-bd95-ea105020552c.jpeg'
    }
  ];

  const handleDownloadIOS = () => {
    window.open('https://apps.apple.com', '_blank');
  };

  const handleDownloadAndroid = () => {
    window.open('https://play.google.com', '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Мобильное приложение — ЮР недвижимость</title>
        <meta name="description" content="Скачайте мобильное приложение ЮР недвижимость для iOS и Android. Управляйте заявками, общайтесь со специалистами и оплачивайте услуги прямо с телефона" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header onApplicationClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })} />
        
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Мобильное приложение</h1>
            <p className="text-xl text-gray-600 mb-8">
              Управляйте недвижимостью в любое время и в любом месте
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" onClick={handleDownloadIOS} className="bg-black hover:bg-gray-800">
                <Icon name="Apple" size={24} className="mr-2" />
                App Store
              </Button>
              <Button size="lg" onClick={handleDownloadAndroid} className="bg-green-600 hover:bg-green-700">
                <Icon name="Smartphone" size={24} className="mr-2" />
                Google Play
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Возможности приложения</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name={feature.icon} size={32} className="text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Скриншоты приложения</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {screenshots.map((screenshot, index) => (
                <div key={index} className="text-center">
                  <img
                    src={screenshot.image}
                    alt={screenshot.title}
                    className="rounded-lg shadow-xl mb-4 w-full h-auto"
                  />
                  <p className="font-medium text-gray-700">{screenshot.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Скачайте приложение прямо сейчас</h2>
            <p className="text-xl text-gray-600 mb-8">
              Доступно бесплатно для iOS и Android
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" onClick={handleDownloadIOS} className="bg-black hover:bg-gray-800">
                <Icon name="Apple" size={24} className="mr-2" />
                Скачать для iOS
              </Button>
              <Button size="lg" onClick={handleDownloadAndroid} className="bg-green-600 hover:bg-green-700">
                <Icon name="Smartphone" size={24} className="mr-2" />
                Скачать для Android
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
