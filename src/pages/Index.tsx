import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/home/Header';
import HeroSection from '@/components/home/HeroSection';
import AboutUs from '@/components/home/AboutUs';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ServicesSection from '@/components/home/ServicesSection';
import Testimonials from '@/components/home/Testimonials';
import GuaranteeSection from '@/components/home/GuaranteeSection';
import StepsSection from '@/components/home/StepsSection';
import ApplicationForm from '@/components/home/ApplicationForm';
import FAQSection from '@/components/home/FAQSection';
import ContactsSection from '@/components/home/ContactsSection';
import Footer from '@/components/home/Footer';
import ServiceModal from '@/components/home/ServiceModal';
import ChatBot from '@/components/ChatBot';


const services = [
  { id: 'sale', title: 'Продать квартиру', icon: 'Home', description: 'Поможем быстро и выгодно продать вашу недвижимость' },
  { id: 'buy', title: 'Купить недвижимость', icon: 'Key', description: 'Подберем идеальный вариант под ваши требования' },
  { id: 'mortgage', title: 'Оформление ипотеки', icon: 'CreditCard', description: 'Одобрение ипотеки в ведущих банках' },
  { id: 'legal', title: 'Юридическое сопровождение', icon: 'Scale', description: 'Полная юридическая чистота сделки' },
  { id: 'rent', title: 'Сдать квартиру', icon: 'Building', description: 'Поиск надежных арендаторов' },
  { id: 'insurance', title: 'Страхование ипотеки', icon: 'Shield', description: 'Выгодные условия страхования' },
  { id: 'pledge', title: 'Деньги под залог', icon: 'Wallet', description: 'Быстрое получение средств под залог недвижимости' },
  { id: 'contract', title: 'Оформить договор купли-продажи', icon: 'FileText', description: 'Юридически грамотное составление договоров' },
  { id: 'newbuilding', title: 'Новостройки без комиссии', icon: 'Building2', description: 'Прямые продажи от застройщиков' }
];

const faqs = [
  { 
    q: 'Сколько стоят ваши услуги?', 
    a: 'Стоимость зависит от конкретной услуги. Первая консультация всегда бесплатная. Позвоните нам по телефону +7 980 555 75 80 для уточнения цен.' 
  },
  { 
    q: 'Как долго продается квартира?', 
    a: 'Средний срок продажи квартиры составляет 1-3 месяца. Мы ускоряем процесс благодаря большой базе покупателей и активному продвижению.' 
  },
  { 
    q: 'Нужно ли мне присутствовать на всех этапах?', 
    a: 'Ваше присутствие обязательно только при подписании основных документов. Остальные вопросы мы решаем самостоятельно, регулярно информируя вас о ходе работы.' 
  },
  { 
    q: 'Какие документы нужны для продажи квартиры?', 
    a: 'Базовый пакет: паспорт, правоустанавливающие документы, выписка из ЕГРН, справка об отсутствии долгов. Полный список зависит от ситуации.' 
  },
  { 
    q: 'Работаете ли вы с ипотекой?', 
    a: 'Да, мы помогаем с оформлением ипотеки во всех крупных банках, сопровождаем процесс от подачи заявки до получения одобрения.' 
  },
  { 
    q: 'Как проверить юридическую чистоту квартиры?', 
    a: 'Мы проводим полную проверку документов, истории сделок, наличия обременений и прав третьих лиц. Предоставляем подробный отчет.' 
  }
];

export default function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const handleServiceClick = (service: typeof services[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleApplicationClick = () => {
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>ЮР недвижимость — Юрист и риэлтор в Воронеже</title>
        <meta name="description" content="ЮР недвижимость — Юрист и риэлтор для эффективного решения Ваших задач. Продажа и покупка недвижимости в Воронеже. Более 900 успешных сделок с 2012 года." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header onApplicationClick={handleApplicationClick} />
        <HeroSection onConsultationClick={handleApplicationClick} />
        <AboutUs />
        <WhyChooseUs />
        <ServicesSection services={services} onServiceClick={handleServiceClick} />
        <Testimonials />
        <GuaranteeSection />
        <StepsSection />
        <ApplicationForm services={services} />
        <FAQSection faqs={faqs} />
        <ContactsSection />
        <Footer />
        <ServiceModal 
          isOpen={isModalOpen} 
          onOpenChange={setIsModalOpen} 
          selectedService={selectedService} 
        />
        <ChatBot />
      </div>
    </>
  );
}
