import { categories } from '../data/mockData';
import { CategoryCard } from './CategoryCard';
import { ListingCard } from './ListingCard';
import type { Language, Listing } from '../types';
import * as Icons from 'lucide-react';

interface HomePageProps {
  language: Language;
  listings: Listing[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onNavigate: (page: any) => void;
}

const translations = {
  hero: {
    uz: 'Oson xarid qiling va soting',
    ru: 'Покупайте и продавайте легко',
    en: 'Buy and Sell with Ease',
  },
  subtitle: {
    uz: 'O\'zbekistonning ishonchli onlayn bozori',
    ru: 'Надежный онлайн-рынок Узбекистана',
    en: 'Uzbekistan\'s Trusted Online Marketplace',
  },
  categories: {
    uz: 'Kategoriyalar',
    ru: 'Категории',
    en: 'Categories',
  },
  featured: {
    uz: 'Tanlangan e\'lonlar',
    ru: 'Избранные объявления',
    en: 'Featured Listings',
  },
  recent: {
    uz: 'Oxirgi e\'lonlar',
    ru: 'Последние объявления',
    en: 'Recent Listings',
  },
  viewAll: {
    uz: 'Barchasini ko\'rish',
    ru: 'Смотреть все',
    en: 'View All',
  },
};

export function HomePage({ language, listings, favorites, onToggleFavorite, onNavigate }: HomePageProps) {
  const featuredListings = listings.filter(l => l.featured).slice(0, 6);
  const recentListings = listings.slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="mb-4">{translations.hero[language]}</h1>
          <p className="text-xl opacity-90">{translations.subtitle[language]}</p>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="mb-6">{translations.categories[language]}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              language={language}
              onClick={() => onNavigate({ type: 'category', categoryId: category.id })}
            />
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      {featuredListings.length > 0 && (
        <section className="bg-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2>{translations.featured[language]}</h2>
              <button className="text-blue-600 hover:text-blue-700">
                {translations.viewAll[language]}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  language={language}
                  isFavorite={favorites.includes(listing.id)}
                  onToggleFavorite={onToggleFavorite}
                  onClick={() => onNavigate({ type: 'product', productId: listing.id })}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Listings */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2>{translations.recent[language]}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentListings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              language={language}
              isFavorite={favorites.includes(listing.id)}
              onToggleFavorite={onToggleFavorite}
              onClick={() => onNavigate({ type: 'product', productId: listing.id })}
            />
          ))}
        </div>
      </section>

      {/* Trust & Safety Banner */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <Icons.Shield className="w-10 h-10 text-blue-600" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="mb-2">
                {language === 'uz' && 'MYiD bilan xavfsizlik'}
                {language === 'ru' && 'Безопасность с MYiD'}
                {language === 'en' && 'Security with MYiD'}
              </h3>
              <p className="text-gray-600">
                {language === 'uz' && 'Barcha foydalanuvchilar MYiD orqali tasdiqlangan. Ishonchli va xavfsiz savdo.'}
                {language === 'ru' && 'Все пользователи подтверждены через MYiD. Надежная и безопасная торговля.'}
                {language === 'en' && 'All users verified through MYiD. Trusted and secure trading.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
