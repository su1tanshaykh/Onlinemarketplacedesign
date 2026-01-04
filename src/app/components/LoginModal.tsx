import { X, Shield, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import type { Language } from '../types';
import { mockUsers } from '../data/mockData';

interface LoginModalProps {
  language: Language;
  onClose: () => void;
  onLogin: (user: any) => void;
}

const translations = {
  title: {
    uz: 'MYiD orqali kirish',
    ru: 'Войти через MYiD',
    en: 'Login with MYiD',
  },
  subtitle: {
    uz: 'Xavfsiz va tez autentifikatsiya',
    ru: 'Безопасная и быстрая аутентификация',
    en: 'Secure and Fast Authentication',
  },
  whyMyid: {
    uz: 'Nima uchun MYiD?',
    ru: 'Почему MYiD?',
    en: 'Why MYiD?',
  },
  benefit1: {
    uz: 'Shaxsingizni tasdiqlang',
    ru: 'Подтвердите свою личность',
    en: 'Verify your identity',
  },
  benefit2: {
    uz: 'Ishonchli foydalanuvchilar',
    ru: 'Доверенные пользователи',
    en: 'Trusted users',
  },
  benefit3: {
    uz: 'Xavfsiz bitimlar',
    ru: 'Безопасные сделки',
    en: 'Secure transactions',
  },
  benefit4: {
    uz: 'Tezkor ro\'yxatdan o\'tish',
    ru: 'Быстрая регистрация',
    en: 'Quick registration',
  },
  loginButton: {
    uz: 'MYiD orqali davom etish',
    ru: 'Продолжить через MYiD',
    en: 'Continue with MYiD',
  },
  privacy: {
    uz: 'Figma Make shaxsiy ma\'lumotlar yig\'ish uchun mo\'ljallanmagan. Bu faqat demo.',
    ru: 'Figma Make не предназначен для сбора личных данных. Это только демо.',
    en: 'Figma Make is not intended for collecting personal data. This is demo only.',
  },
};

export function LoginModal({ language, onClose, onLogin }: LoginModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleMyidLogin = () => {
    setIsLoading(true);
    
    // Simulate MYiD authentication
    setTimeout(() => {
      onLogin(mockUsers[0]); // Login as first user
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="mb-2">{translations.title[language]}</h2>
          <p className="text-gray-600">{translations.subtitle[language]}</p>
        </div>

        {/* Benefits */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="mb-3">{translations.whyMyid[language]}</p>
          <div className="space-y-2">
            {[translations.benefit1, translations.benefit2, translations.benefit3, translations.benefit4].map((benefit, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-sm">{benefit[language]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MYiD Login Button */}
        <button
          onClick={handleMyidLogin}
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>
                {language === 'uz' && 'Yuklanmoqda...'}
                {language === 'ru' && 'Загрузка...'}
                {language === 'en' && 'Loading...'}
              </span>
            </>
          ) : (
            <>
              <Shield className="w-5 h-5" />
              <span>{translations.loginButton[language]}</span>
            </>
          )}
        </button>

        {/* Privacy Notice */}
        <p className="text-xs text-gray-500 text-center mt-4">
          {translations.privacy[language]}
        </p>
      </div>
    </div>
  );
}
