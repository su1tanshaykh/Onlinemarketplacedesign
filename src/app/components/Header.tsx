import { Search, Plus, User, Menu, MessageCircle, Heart, LogOut, Globe } from 'lucide-react';
import type { User as UserType, Language } from '../types';

interface HeaderProps {
  currentUser: UserType | null;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onNavigate: (page: any) => void;
}

const translations = {
  search: { uz: 'Qidirish...', ru: 'Поиск...', en: 'Search...' },
  postAd: { uz: 'E\'lon berish', ru: 'Разместить объявление', en: 'Post Ad' },
  login: { uz: 'Kirish', ru: 'Войти', en: 'Login' },
  myAds: { uz: 'Mening e\'lonlarim', ru: 'Мои объявления', en: 'My Ads' },
  favorites: { uz: 'Sevimlilar', ru: 'Избранное', en: 'Favorites' },
  messages: { uz: 'Xabarlar', ru: 'Сообщения', en: 'Messages' },
  logout: { uz: 'Chiqish', ru: 'Выйти', en: 'Logout' },
};

export function Header({ currentUser, language, onLanguageChange, onLoginClick, onLogoutClick, onNavigate }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <button 
            onClick={() => onNavigate({ type: 'home' })}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="font-bold text-xl hidden sm:block">Marketplace</span>
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={translations.search[language]}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Language Selector */}
          <div className="hidden md:flex gap-1 bg-gray-100 rounded-lg p-1">
            {(['uz', 'ru', 'en'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={`px-3 py-1.5 rounded text-sm transition-colors ${
                  language === lang 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Post Ad Button */}
          <button
            onClick={() => onNavigate({ type: 'post-ad' })}
            className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>{translations.postAd[language]}</span>
          </button>

          {/* User Menu */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate({ type: 'chat' })}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              >
                <MessageCircle className="w-6 h-6 text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <button
                onClick={() => onNavigate({ type: 'dashboard' })}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{currentUser.name[0]}</span>
                </div>
                <span className="hidden lg:block">{currentUser.name}</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="hidden md:block">{translations.login[language]}</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden border-t border-gray-200 px-4 py-2 flex justify-around bg-white">
        <button
          onClick={() => onNavigate({ type: 'home' })}
          className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600"
        >
          <Menu className="w-5 h-5" />
          <span className="text-xs">Menu</span>
        </button>
        <button
          onClick={() => onNavigate({ type: 'post-ad' })}
          className="flex flex-col items-center gap-1 text-blue-600"
        >
          <Plus className="w-5 h-5" />
          <span className="text-xs">{translations.postAd[language]}</span>
        </button>
        {currentUser && (
          <button
            onClick={() => onNavigate({ type: 'chat' })}
            className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 relative"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs">{translations.messages[language]}</span>
            <span className="absolute top-0 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        )}
      </div>
    </header>
  );
}
