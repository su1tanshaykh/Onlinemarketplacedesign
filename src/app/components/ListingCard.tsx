import { Heart, MapPin, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Listing, Language } from '../types';
import { formatPrice, formatTimeAgo } from '../utils/formatters';

interface ListingCardProps {
  listing: Listing;
  language: Language;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: () => void;
}

export function ListingCard({ listing, language, isFavorite, onToggleFavorite, onClick }: ListingCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(listing.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>

        {/* Featured Badge */}
        {listing.featured && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
            {language === 'uz' && 'Top'}
            {language === 'ru' && 'Топ'}
            {language === 'en' && 'Featured'}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2">{listing.title}</h3>
        <p className="text-blue-600 mb-3">{formatPrice(listing.price, language)}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{listing.location.city}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{formatTimeAgo(listing.postedAt, language)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
