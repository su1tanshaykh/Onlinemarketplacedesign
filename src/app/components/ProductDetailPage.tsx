import { useState } from 'react';
import { ArrowLeft, Heart, Share2, Eye, MapPin, Clock, Phone, MessageCircle, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Listing, Language, User } from '../types';
import { formatPrice, formatTimeAgo } from '../utils/formatters';
import { mockUsers } from '../data/mockData';

interface ProductDetailPageProps {
  productId: string;
  language: Language;
  listings: Listing[];
  currentUser: User | null;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onNavigate: (page: any) => void;
  onLoginRequired: () => void;
  onSendMessage: (listingId: string, text: string) => void;
}

const translations = {
  back: { uz: 'Orqaga', ru: 'Назад', en: 'Back' },
  description: { uz: 'Ta\'rif', ru: 'Описание', en: 'Description' },
  seller: { uz: 'Sotuvchi', ru: 'Продавец', en: 'Seller' },
  verified: { uz: 'Tasdiqlangan', ru: 'Подтвержден', en: 'Verified' },
  memberSince: { uz: 'A\'zo:', ru: 'Участник с:', en: 'Member since:' },
  callSeller: { uz: 'Qo\'ng\'iroq qilish', ru: 'Позвонить', en: 'Call' },
  chatSeller: { uz: 'Xabar yuborish', ru: 'Написать', en: 'Chat' },
  location: { uz: 'Joylashuv', ru: 'Местоположение', en: 'Location' },
  category: { uz: 'Kategoriya', ru: 'Категория', en: 'Category' },
  condition: { uz: 'Holati', ru: 'Состояние', en: 'Condition' },
  new: { uz: 'Yangi', ru: 'Новый', en: 'New' },
  used: { uz: 'Ishlatilgan', ru: 'Б/у', en: 'Used' },
  views: { uz: 'Ko\'rishlar', ru: 'Просмотры', en: 'Views' },
  loginRequired: { uz: 'Kirish talab qilinadi', ru: 'Требуется вход', en: 'Login Required' },
};

export function ProductDetailPage({
  productId,
  language,
  listings,
  currentUser,
  isFavorite,
  onToggleFavorite,
  onNavigate,
  onLoginRequired,
  onSendMessage,
}: ProductDetailPageProps) {
  const listing = listings.find(l => l.id === productId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [messageText, setMessageText] = useState('');

  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">Listing not found</p>
      </div>
    );
  }

  const seller = mockUsers.find(u => u.id === listing.sellerId);

  const handleSendMessage = () => {
    if (!currentUser) {
      onLoginRequired();
      return;
    }
    if (messageText.trim()) {
      onSendMessage(listing.id, messageText);
      setMessageText('');
      setShowMessageBox(false);
      onNavigate({ type: 'chat' });
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % listing.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={() => onNavigate({ type: 'home' })}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{translations.back[language]}</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {/* Main Image */}
              <div className="relative aspect-[4/3] bg-gray-100">
                <ImageWithFallback
                  src={listing.images[currentImageIndex]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
                
                {listing.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {listing.images.length > 1 && (
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 text-white text-sm rounded-full">
                    {currentImageIndex + 1} / {listing.images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {listing.images.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {listing.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-blue-600' : 'border-transparent'
                      }`}
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`${listing.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
              <h3 className="mb-4">{translations.description[language]}</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{listing.description}</p>
              
              {/* Details */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{translations.category[language]}</p>
                  <p>{listing.category}</p>
                </div>
                {listing.condition && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{translations.condition[language]}</p>
                    <p>{translations[listing.condition][language]}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500 mb-1">{translations.views[language]}</p>
                  <p>{listing.views}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{translations.location[language]}</p>
                  <p>{listing.location.city}, {listing.location.region}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Seller & Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Price & Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-blue-600 mb-2">{formatPrice(listing.price, language)}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatTimeAgo(listing.postedAt, language)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{listing.views}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onToggleFavorite(listing.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Share2 className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-4 h-4" />
                  <span>{listing.location.city}, {listing.location.region}</span>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => currentUser ? seller && alert(`Call: ${seller.phone}`) : onLoginRequired()}
                    className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    <span>{translations.callSeller[language]}</span>
                  </button>
                  <button
                    onClick={() => currentUser ? setShowMessageBox(true) : onLoginRequired()}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{translations.chatSeller[language]}</span>
                  </button>
                </div>
              </div>

              {/* Seller Info */}
              {seller && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="mb-4">{translations.seller[language]}</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">{seller.name[0]}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p>{seller.name}</p>
                        {seller.myidVerified && (
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                            <Shield className="w-3 h-3" />
                            <span>{translations.verified[language]}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {translations.memberSince[language]} {new Date(seller.memberSince).getFullYear()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{seller.location}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showMessageBox && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="mb-4">{translations.chatSeller[language]}</h3>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={language === 'uz' ? 'Xabaringizni yozing...' : language === 'ru' ? 'Напишите сообщение...' : 'Write your message...'}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowMessageBox(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {language === 'uz' ? 'Bekor qilish' : language === 'ru' ? 'Отмена' : 'Cancel'}
              </button>
              <button
                onClick={handleSendMessage}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {language === 'uz' ? 'Yuborish' : language === 'ru' ? 'Отправить' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
