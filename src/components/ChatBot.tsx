import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Message {
  text: string;
  isBot: boolean;
}

const chatKnowledgeBase: Record<string, string> = {
  'чем вы занимаетесь': 'ЮР Недвижимость - это полный комплекс услуг на рынке недвижимости Воронежа: купля-продажа, аренда, ипотека, юридическое сопровождение.',
  'где вы находитесь': 'Наш офис: Московский проспект, д. 114 В, офис 200, Воронеж. Работаем ежедневно с 10:00 до 20:00.',
  'адрес': 'Московский проспект, д. 114 В, офис 200, Воронеж.',
  'как добраться': 'Мы находимся по адресу: Московский проспект, д. 114 В, офис 200. Удобная транспортная развязка, парковка рядом.',
  'телефон': 'Наш телефон: +7 980 555 75 80. Звоните, мы всегда рады помочь!',
  'почта': 'Email: yur.nedv@mail.ru. Также мы в VK (https://vk.com/yur.nedv) и Telegram (https://t.me/yur_nedv).',
  'контакты': 'Телефон: +7 980 555 75 80, Email: yur.nedv@mail.ru, VK: vk.com/yur.nedv, Telegram: t.me/yur_nedv',
  'график работы': 'Мы работаем ежедневно с 10:00 до 20:00. Заявки принимаем онлайн круглосуточно.',
  'юр расшифровка': 'ЮР - это Юрист Риэлтор. Мы объединяем риэлторские услуги с полной юридической поддержкой.',
  
  'продать квартиру': 'Мы поможем быстро и выгодно продать вашу квартиру: оценка, подготовка документов, поиск покупателей, юридическое сопровождение.',
  'сколько стоит продажа': 'Стоимость услуг по продаже зависит от объекта. Первая консультация бесплатная. Позвоните +7 980 555 75 80 для расчета.',
  'документы для продажи': 'Для продажи нужны: паспорт, правоустанавливающие документы, выписка ЕГРН, согласие супруга (если есть), справка об отсутствии долгов.',
  'как быстро продать': 'Срок продажи зависит от объекта и цены. В среднем 1-3 месяца. Мы ускоряем процесс благодаря большой базе покупателей.',
  
  'купить квартиру': 'Подберем квартиру под ваши пожелания, проверим документы, организуем осмотры и сопроводим сделку.',
  'ипотека': 'Помогаем с оформлением ипотеки: подбор банка, сбор документов, одобрение кредита. Работаем со всеми крупными банками.',
  'юридическое сопровождение': 'Проверка документов, юридическая чистота сделки, составление договоров, сопровождение в Росреестре.',
  'сдать квартиру': 'Поможем найти надежных арендаторов, оформим договор аренды, проведем проверку потенциальных жильцов.',
  
  'цена услуг': 'Стоимость зависит от услуги. Первая консультация бесплатная. Позвоните +7 980 555 75 80 для уточнения.',
  'сколько стоит': 'Стоимость зависит от услуги. Первая консультация бесплатная. Позвоните +7 980 555 75 80 для уточнения.',
  'тариф': 'Стоимость зависит от услуги. Первая консультация бесплатная. Позвоните +7 980 555 75 80 для уточнения.',
  
  'привет': 'Здравствуйте! Я виртуальный помощник ЮР Недвижимость. Чем могу помочь?',
  'здравствуйте': 'Здравствуйте! Я виртуальный помощник ЮР Недвижимость. Чем могу помочь?',
  'помощь': 'Спрашивайте о наших услугах, ценах, контактах, графике работы. Я постараюсь помочь!',
  'что ты умеешь': 'Я могу рассказать о наших услугах, ответить на вопросы о документах, ценах, контактах и графике работы.',
  
  'спасибо': 'Пожалуйста! Если у вас есть еще вопросы - пишите или звоните +7 980 555 75 80',
  'благодарю': 'Всегда пожалуйста! Рады помочь!',
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Здравствуйте! Я виртуальный помощник ЮР Недвижимость. Задайте мне вопрос о наших услугах.', isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const findAnswer = (question: string): string => {
    const normalizedQuestion = question.toLowerCase().trim();
    
    for (const [key, value] of Object.entries(chatKnowledgeBase)) {
      if (normalizedQuestion.includes(key)) {
        return value;
      }
    }
    
    return 'Извините, я не нашел ответ на ваш вопрос. Пожалуйста, позвоните нам по телефону +7 980 555 75 80 или напишите на yur.nedv@mail.ru';
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = { text: inputValue, isBot: false };
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const answer = findAnswer(inputValue);
      const botMessage: Message = { text: answer, isBot: true };
      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 w-14 h-14 rounded-full bg-secondary hover:bg-secondary/90 shadow-lg z-50 p-0"
          aria-label="Открыть чат"
        >
          <Icon name="MessageCircle" size={28} className="text-white" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 left-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
            <CardTitle className="text-lg flex items-center gap-2">
              <Icon name="MessageCircle" className="text-secondary" />
              Чат-помощник
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <Icon name="X" size={20} />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.isBot
                          ? 'bg-gray-100 text-gray-900'
                          : 'bg-secondary text-white'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Напишите ваш вопрос..."
                  className="flex-1"
                />
                <Button onClick={handleSend} size="icon" className="bg-secondary hover:bg-secondary/90">
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
