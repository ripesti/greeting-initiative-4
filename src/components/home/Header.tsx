import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  onApplicationClick: () => void;
}

export default function Header({ onApplicationClick }: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/login';
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-black backdrop-blur-sm border-b-2 border-primary shadow-sm z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="https://cdn.poehali.dev/files/855a0bef-af1c-4794-9913-95fb0e695be8.png" alt="ЮР недвижимость" className="h-12 w-auto object-contain" />
        </div>
        <nav className="hidden md:flex gap-4 items-center">
          <a href="#services" className="text-white hover:text-primary transition-colors">Услуги</a>
          <a href="#faq" className="text-white hover:text-primary transition-colors">FAQ</a>
          <a href="#contacts" className="text-white hover:text-primary transition-colors">Контакты</a>
          <Button onClick={onApplicationClick} className="bg-primary hover:bg-primary/90">
            Подать заявку
          </Button>
          <Button variant="outline" className="border-2 border-secondary text-secondary bg-secondary/10 hover:bg-secondary hover:text-white transition-all duration-300 hover:scale-105 shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/60 font-semibold" onClick={handleAuthClick}>
            {isLoggedIn ? 'Личный кабинет' : 'Вход'}
          </Button>
        </nav>
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
        </Button>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-primary/20">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <a href="#services" onClick={closeMobileMenu} className="text-white hover:text-primary transition-colors py-2">Услуги</a>
            <a href="#faq" onClick={closeMobileMenu} className="text-white hover:text-primary transition-colors py-2">FAQ</a>
            <a href="#contacts" onClick={closeMobileMenu} className="text-white hover:text-primary transition-colors py-2">Контакты</a>
            <Button onClick={() => { onApplicationClick(); closeMobileMenu(); }} className="bg-primary hover:bg-primary/90 w-full">
              Подать заявку
            </Button>
            <Button variant="outline" className="border-2 border-secondary text-secondary bg-secondary/10 hover:bg-secondary hover:text-white w-full" onClick={handleAuthClick}>
              {isLoggedIn ? 'Личный кабинет' : 'Вход'}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
