import { useState } from 'react';
import { Package, Heart, MessageCircle, Settings, Shield, Plus } from 'lucide-react';
import { ListingCard } from './ListingCard';
import type { Language, User, Listing, Message } from '../types';
import { mockUsers } from '../data/mockData';

interface UserDashboardProps {
  user: User;
  language: Language;
  listings: Listing[];
  favorites: string[];
  messages: Message[];
  onNavigate: (page: any) => void;
  onToggleFavorite: (id: string) => void;
}

type Tab = 'ads' | 'favorites' | 'messages' | 'settings';

const translations = {
  dashboard: { uz: 'Shaxsiy kabinet', ru: 'Личный кабинет', en: 'Dashboard' },
  myAds: { uz: 'Mening e\'lonlarim', ru: 'Мои объявления', en: 'My Ads' },
  favorites: { uz: 'Sevimlilar', ru: 'Избранное', en: 'Favorites' },
  messages: { uz: 'Xabarlar', ru: 'Сообщения', en: 'Messages' },
  settings: { uz: 'Sozlamalar', ru: 'Настройки', en: 'Settings' },
  verified: { uz: 'MYiD tasdiqlangan', ru: 'Подтверждено MYiD', en: 'MYiD Verified' },
  memberSince: { uz: 'A\'zo:', ru: 'Участник с:', en: 'Member since:' },
  postNewAd: { uz: 'Yangi e\'lon', ru: 'Новое объявление', en: 'Post New Ad' },
  noAds: { uz: 'Sizda hali e\'lonlar yo\'q', ru: 'У вас еще нет объявлений', en: 'You have no ads yet' },
  noFavorites: { uz: 'Sevimlilar ro\'yxati bo\'sh', ru: 'Список избранного пуст', en: 'No favorites yet' },
  noMessages: { uz: 'Xabarlar yo\'q', ru: 'Нет сообщений', en: 'No messages' },
};

export function UserDashboard({
  user,
  language,
  listings,
  favorites,
  messages,
  onNavigate,
  onToggleFavorite,
}: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('ads');

  const userListings = listings.filter(l => l.sellerId === user.id);
  const favoriteListings = listings.filter(l => favorites.includes(l.id));
  const userMessages = messages.filter(m => m.senderId === user.id || m.receiverId === user.id);
  
  // Group messages by chat
  const chats = userMessages.reduce((acc, msg) => {
    const chatId = msg.chatId;
    if (!acc[chatId]) {
      acc[chatId] = [];
    }
    acc[chatId].push(msg);
    return acc;
  }, {} as Record<string, Message[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-2xl font-medium">{user.name[0]}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2>{user.name}</h2>
                {user.myidVerified && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                    <Shield className="w-4 h-4" />
                    <span>{translations.verified[language]}</span>
                  </div>
                )}
              </div>
              <p className="text-gray-600 mb-2">{user.phone}</p>
              <p className="text-sm text-gray-500">
                {translations.memberSince[language]} {new Date(user.memberSince).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => onNavigate({ type: 'post-ad' })}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden md:block">{translations.postNewAd[language]}</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {[
              { id: 'ads' as Tab, icon: Package, label: translations.myAds, count: userListings.length },
              { id: 'favorites' as Tab, icon: Heart, label: translations.favorites, count: favoriteListings.length },
              { id: 'messages' as Tab, icon: MessageCircle, label: translations.messages, count: Object.keys(chats).length },
              { id: 'settings' as Tab, icon: Settings, label: translations.settings, count: null },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label[language]}</span>
                {tab.count !== null && tab.count > 0 && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-sm rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* My Ads Tab */}
            {activeTab === 'ads' && (
              <div>
                {userListings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userListings.map((listing) => (
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
                ) : (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">{translations.noAds[language]}</p>
                    <button
                      onClick={() => onNavigate({ type: 'post-ad' })}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {translations.postNewAd[language]}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div>
                {favoriteListings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteListings.map((listing) => (
                      <ListingCard
                        key={listing.id}
                        listing={listing}
                        language={language}
                        isFavorite={true}
                        onToggleFavorite={onToggleFavorite}
                        onClick={() => onNavigate({ type: 'product', productId: listing.id })}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">{translations.noFavorites[language]}</p>
                  </div>
                )}
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div>
                {Object.keys(chats).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(chats).map(([chatId, msgs]) => {
                      const lastMessage = msgs[msgs.length - 1];
                      const otherUserId = lastMessage.senderId === user.id ? lastMessage.receiverId : lastMessage.senderId;
                      const otherUser = mockUsers.find(u => u.id === otherUserId);
                      const listing = listings.find(l => l.id === lastMessage.listingId);
                      
                      return (
                        <button
                          key={chatId}
                          onClick={() => onNavigate({ type: 'chat', chatId })}
                          className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-medium">{otherUser?.name[0]}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium">{otherUser?.name}</p>
                              <span className="text-sm text-gray-500">
                                {new Date(lastMessage.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{lastMessage.text}</p>
                            {listing && (
                              <p className="text-xs text-gray-500 mt-1 truncate">{listing.title}</p>
                            )}
                          </div>
                          {!lastMessage.read && lastMessage.receiverId === user.id && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">{translations.noMessages[language]}</p>
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="mb-2">
                    {language === 'uz' ? 'Shaxsiy ma\'lumotlar' : language === 'ru' ? 'Личные данные' : 'Personal Information'}
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-500">
                        {language === 'uz' ? 'Ism' : language === 'ru' ? 'Имя' : 'Name'}
                      </label>
                      <p>{user.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">
                        {language === 'uz' ? 'Telefon' : language === 'ru' ? 'Телефон' : 'Phone'}
                      </label>
                      <p>{user.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">
                        {language === 'uz' ? 'Joylashuv' : language === 'ru' ? 'Местоположение' : 'Location'}
                      </label>
                      <p>{user.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
