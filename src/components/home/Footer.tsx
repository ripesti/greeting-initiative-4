
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
            <h4 className="font-semibold mb-4">Услуги</h4>
            <div className="space-y-2 text-sm">
              <a href="#services" className="block text-gray-400 hover:text-primary transition-colors">Продать квартиру</a>
              <a href="#services" className="block text-gray-400 hover:text-primary transition-colors">Купить недвижимость</a>
              <Link to="/app" className="block text-gray-400 hover:text-primary transition-colors">Мобильное приложение</Link>
              <a href="#faq" className="block text-gray-400 hover:text-primary transition-colors">FAQ</a>
              <a href="#contacts" className="block text-gray-400 hover:text-primary transition-colors">Контакты</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="space-y-3 text-sm text-gray-400">
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
                <span>Московский пр-т, 114 В, офис 200</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center">
          <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm text-gray-400">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Политика конфиденциальности</Link>
            <Link to="/user-agreement" className="hover:text-primary transition-colors">Пользовательское соглашение</Link>
            <Link to="/personal-data-consent" className="hover:text-primary transition-colors">Согласие на обработку данных</Link>
          </div>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ООО ЮРИЭЛТИ (ИНН 3662311194). Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
