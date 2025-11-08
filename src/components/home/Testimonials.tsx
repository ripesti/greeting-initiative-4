import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import ReviewForm from '@/components/ReviewForm';

export default function Testimonials() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  const testimonials = [
    {
      name: 'Ольга Алексеевна',
      service: 'Продажа и покупка квартиры',
      rating: 5,
      text: 'Коваленко Ольга, большое спасибо за помощь, продажи и покупки квартиры. Специалист хороший, грамотная как юрист, культурна в общении, всегда объяснит, и успокоит, и отвечает на звонки сразу. Быстрая сделка, довольны на 150 процентов, можно доверять. Оля удачи и здоровья тебе дорогая.',
      date: '29.08.2025'
    },
    {
      name: 'Анвар',
      service: 'Покупка и юридическое сопровождение',
      rating: 5,
      text: 'Ольга настоящий профессионал своего дела. Те услуги которые вам могут предложить в крупных риэлторских фирмах за баснословные деньги, Ольга делает за гораздо более низкую цену. Заключал договор на проверку документов недвижимости и ведение всего процесса до заключения договора и помощи в оформлении ипотеки. В первый же день оградила от мошеннических махинаций риэлтора со стороны продавца одной из выбранных мною квартир. Далее помогла в поисках квартиры, смогла сторговать очень хорошую скидку. Все маленькие хитрости которые могли использовать риэлторы со стороны продавца знает наперёд и прописывала все в ДКП. Отстаивает интересы клиента до конца. Пунктуальна. Никогда не опаздывала на встречи. Мне очень повезло, что обратился именно к ней. Спасибо. Однозначно буду рекомендовать своим знакомым.',
      date: '24.08.2024'
    },
    {
      name: 'Александр',
      service: 'Покупка квартиры',
      rating: 5,
      text: 'Несмотря на очень сложную ситуацию с покупкой квартиры, множество подводных камней и постоянно меняющиеся обстоятельства, Оля всегда была на связи, помогла решить все возникающие вопросы. Профессиональный подход, четкое планирование и соблюдение всех договоренностей. Рекомендую!',
      date: '15.07.2024'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 animate-on-scroll">Отзывы клиентов</h2>
        <p className="text-center text-gray-600 mb-12 animate-on-scroll">Что говорят о нас наши клиенты</p>
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="hover:shadow-xl transition-shadow animate-on-scroll">
              <CardContent className="pt-6">
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <Icon key={index} name="Star" className="text-yellow-400 fill-yellow-400" size={20} />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.service}</p>
                  <p className="text-xs text-gray-400 mt-1">{testimonial.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center space-y-4">
          <Button 
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-primary hover:bg-primary/90"
          >
            {showReviewForm ? 'Скрыть форму' : 'Оставить отзыв'}
          </Button>
          <div>
            <a 
              href="https://www.avito.ru/brands/i158777231552/all/otzyvy?src=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <Icon name="ExternalLink" size={20} />
              Посмотреть все отзывы на Авито
            </a>
          </div>
        </div>
        {showReviewForm && <ReviewForm />}
      </div>
    </section>
  );
}