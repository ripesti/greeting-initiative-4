
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <img src="https://cdn.poehali.dev/files/855a0bef-af1c-4794-9913-95fb0e695be8.png" alt="ЮР недвижимость" className="h-12 w-auto object-contain" />
            </div>
            <div className="mt-4">
              <iframe src="https://yandex.ru/sprav/widget/rating-badge/158777231552?type=rating&theme=dark" width="150" height="50" frameBorder="0" title="Рейтинг Яндекс"></iframe>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Услуги</h4>
            <div className="space-y-2 text-sm">
              <a href="#services" className="block text-gray-400 hover:text-primary transition-colors">Продать квартиру</a>
              <a href="#services" className="block text-gray-400 hover:text-primary transition-colors">Купить недвижимость</a>
              <Link to="/mobile-app" className="block text-gray-400 hover:text-primary transition-colors">Мобильное приложение</Link>
              <a href="#faq" className="block text-gray-400 hover:text-primary transition-colors">FAQ</a>
              <a href="#contacts" className="block text-gray-400 hover:text-primary transition-colors">Контакты</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Контакты</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Icon name="Phone" size={16} className="text-primary" />
                <a href="tel:+79805557580" className="hover:text-primary transition-colors">+7 980 555 75 80</a>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Mail" size={16} className="text-primary" />
                <a href="mailto:yur.nedv@mail.ru" className="hover:text-primary transition-colors">yur.nedv@mail.ru</a>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={16} className="text-primary" />
                <span>г. Воронеж, Московский пр-т д. 114 В, офис 200</span>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <a href="https://vk.com/yurnedv" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Icon name="Contact" size={20} />
                  <span className="ml-1 text-sm">VK</span>
                </a>
                <a href="https://t.me/yurnedv" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
                  <Icon name="Send" size={20} />
                  <span className="text-sm">Telegram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <p className="text-sm text-gray-500 text-center mb-4">
            © ЮР недвижимость, 2024. Все права защищены.
          </p>
          <p className="text-sm text-gray-600 text-center mb-4">
            ИНН 3662311194 • ОГРН 1243600013359
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Политика конфиденциальности</Link>
            <Link to="/user-agreement" className="hover:text-primary transition-colors">Пользовательское соглашение</Link>
            <Link to="/personal-data-consent" className="hover:text-primary transition-colors">Согласие на обработку данных</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}