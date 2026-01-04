import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { ListingCard } from './ListingCard';
import type { Language, Listing } from '../types';
import { categories } from '../data/mockData';

interface CategoryPageProps {
  categoryId: string;
  language: Language;
  listings: Listing[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onNavigate: (page: any) => void;
}

export function CategoryPage({
  categoryId,
  language,
  listings,
  favorites,
  onToggleFavorite,
  onNavigate,
}: CategoryPageProps) {
  const category = categories.find(c => c.id === categoryId);
  const categoryListings = listings.filter(l => l.category === categoryId);
  const [showFilters, setShowFilters] = useState(false);

  if (!category) {
    return null;
  }

  const categoryName = language === 'uz' ? category.nameUz : language === 'ru' ? category.nameRu : category.nameEn;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => onNavigate({ type: 'home' })}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{language === 'uz' ? 'Orqaga' : language === 'ru' ? 'Назад' : 'Back'}</span>
          </button>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>{language === 'uz' ? 'Filtrlar' : language === 'ru' ? 'Фильтры' : 'Filters'}</span>
          </button>
        </div>

        <h1 className="mb-6">{categoryName}</h1>

        {/* Results */}
        <div className="mb-4 text-gray-600">
          {categoryListings.length} {language === 'uz' ? 'ta e\'lon' : language === 'ru' ? 'объявлений' : 'listings'}
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryListings.map((listing) => (
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

        {categoryListings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {language === 'uz' ? 'Bu kategoriyada e\'lonlar yo\'q' : language === 'ru' ? 'В этой категории нет объявлений' : 'No listings in this category'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
