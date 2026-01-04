import { useState } from 'react';
import { ArrowLeft, Upload, X, Shield, AlertCircle } from 'lucide-react';
import type { Language, User, Listing } from '../types';
import { categories, uzbekistanRegions } from '../data/mockData';

interface PostAdFlowProps {
  language: Language;
  currentUser: User | null;
  onPostAd: (listing: Omit<Listing, 'id' | 'postedAt' | 'views'>) => void;
  onNavigate: (page: any) => void;
  onLoginRequired: () => void;
}

type Step = 'category' | 'details' | 'verification';

const translations = {
  title: { uz: 'E\'lon berish', ru: 'Разместить объявление', en: 'Post an Ad' },
  selectCategory: { uz: 'Kategoriyani tanlang', ru: 'Выберите категорию', en: 'Select Category' },
  adDetails: { uz: 'E\'lon ma\'lumotlari', ru: 'Детали объявления', en: 'Ad Details' },
  verification: { uz: 'Tasdiqlash', ru: 'Подтверждение', en: 'Verification' },
  next: { uz: 'Keyingisi', ru: 'Далее', en: 'Next' },
  back: { uz: 'Orqaga', ru: 'Назад', en: 'Back' },
  publish: { uz: 'E\'lonni joylashtirish', ru: 'Опубликовать', en: 'Publish' },
  adTitle: { uz: 'Sarlavha', ru: 'Заголовок', en: 'Title' },
  description: { uz: 'Ta\'rif', ru: 'Описание', en: 'Description' },
  price: { uz: 'Narx (so\'m)', ru: 'Цена (сум)', en: 'Price (UZS)' },
  location: { uz: 'Joylashuv', ru: 'Местоположение', en: 'Location' },
  condition: { uz: 'Holati', ru: 'Состояние', en: 'Condition' },
  new: { uz: 'Yangi', ru: 'Новый', en: 'New' },
  used: { uz: 'Ishlatilgan', ru: 'Б/у', en: 'Used' },
  photos: { uz: 'Rasmlar', ru: 'Фотографии', en: 'Photos' },
  uploadPhotos: { uz: 'Rasmlarni yuklang', ru: 'Загрузите фото', en: 'Upload Photos' },
  verificationRequired: { uz: 'MYiD tasdiqlash talab qilinadi', ru: 'Требуется подтверждение MYiD', en: 'MYiD Verification Required' },
  verificationInfo: {
    uz: 'Bu kategoriya uchun MYiD orqali shaxsingizni tasdiqlashingiz kerak. Bu xaridorlar uchun ishonch va xavfsizlikni ta\'minlaydi.',
    ru: 'Для этой категории необходимо подтвердить личность через MYiD. Это обеспечивает доверие и безопасность для покупателей.',
    en: 'This category requires MYiD identity verification. This ensures trust and safety for buyers.',
  },
  verify: { uz: 'MYiD orqali tasdiqlash', ru: 'Подтвердить через MYiD', en: 'Verify with MYiD' },
  loginRequired: { uz: 'E\'lon berish uchun tizimga kiring', ru: 'Войдите, чтобы разместить объявление', en: 'Login to post an ad' },
};

export function PostAdFlow({ language, currentUser, onPostAd, onNavigate, onLoginRequired }: PostAdFlowProps) {
  const [step, setStep] = useState<Step>('category');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [condition, setCondition] = useState<'new' | 'used'>('used');
  const [images, setImages] = useState<string[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h2 className="mb-4">{translations.loginRequired[language]}</h2>
          <button
            onClick={onLoginRequired}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {language === 'uz' ? 'Kirish' : language === 'ru' ? 'Войти' : 'Login'}
          </button>
        </div>
      </div>
    );
  }

  const highTrustCategories = ['cars', 'real-estate', 'jobs'];
  const needsVerification = selectedCategory && highTrustCategories.includes(selectedCategory) && !currentUser.myidVerified;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Simulate image upload - in real app, upload to server
      const mockImages = [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
      ];
      setImages(prev => [...prev, ...mockImages.slice(0, files.length)]);
    }
  };

  const handleSubmit = () => {
    if (needsVerification) {
      setStep('verification');
      return;
    }

    const selectedRegion = uzbekistanRegions.find(r => r.id === region);
    
    onPostAd({
      title,
      description,
      price: parseFloat(price),
      currency: 'UZS',
      category: selectedCategory,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'],
      location: {
        region: selectedRegion ? (language === 'uz' ? selectedRegion.nameUz : selectedRegion.nameRu) : 'Toshkent',
        city: city || 'Toshkent shahri',
      },
      sellerId: currentUser.id,
      condition,
    });
  };

  const handleVerify = () => {
    setIsVerifying(true);
    // Simulate MYiD verification
    setTimeout(() => {
      setIsVerifying(false);
      handleSubmit();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => step === 'category' ? onNavigate({ type: 'home' }) : setStep('category')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>{translations.title[language]}</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4">
            {(['category', 'details', needsVerification && 'verification'] as const).filter(Boolean).map((s, i, arr) => (
              <div key={s} className="flex items-center gap-4">
                <div className={`flex items-center gap-2 ${step === s ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === s ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}>
                    {i + 1}
                  </div>
                  <span className="text-sm hidden sm:block">{translations[s as keyof typeof translations][language]}</span>
                </div>
                {i < arr.length - 1 && <div className="w-12 h-0.5 bg-gray-200"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          {/* Category Selection */}
          {step === 'category' && (
            <div>
              <h2 className="mb-6">{translations.selectCategory[language]}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setStep('details');
                    }}
                    className={`p-4 border-2 rounded-xl hover:border-blue-600 transition-colors ${
                      selectedCategory === cat.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <p className="text-center">{language === 'uz' ? cat.nameUz : language === 'ru' ? cat.nameRu : cat.nameEn}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Details Form */}
          {step === 'details' && (
            <div className="space-y-6">
              <div>
                <label className="block mb-2">{translations.adTitle[language]}</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={language === 'uz' ? 'Masalan: iPhone 15 Pro Max' : language === 'ru' ? 'Например: iPhone 15 Pro Max' : 'e.g., iPhone 15 Pro Max'}
                />
              </div>

              <div>
                <label className="block mb-2">{translations.description[language]}</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder={language === 'uz' ? 'Mahsulot haqida batafsil ma\'lumot...' : language === 'ru' ? 'Подробное описание товара...' : 'Detailed description...'}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2">{translations.price[language]}</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block mb-2">{translations.condition[language]}</label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as 'new' | 'used')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="new">{translations.new[language]}</option>
                    <option value="used">{translations.used[language]}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2">{translations.location[language]} - {language === 'uz' ? 'Viloyat' : language === 'ru' ? 'Область' : 'Region'}</label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">{language === 'uz' ? 'Tanlang' : language === 'ru' ? 'Выберите' : 'Select'}</option>
                    {uzbekistanRegions.map((r) => (
                      <option key={r.id} value={r.id}>
                        {language === 'uz' ? r.nameUz : language === 'ru' ? r.nameRu : r.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2">{language === 'uz' ? 'Shahar' : language === 'ru' ? 'Город' : 'City'}</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2">{translations.photos[language]}</label>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {images.map((img, i) => (
                    <div key={i} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-600 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">{translations.uploadPhotos[language]}</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setStep('category')}
                  className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  {translations.back[language]}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!title || !description || !price}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {translations.publish[language]}
                </button>
              </div>
            </div>
          )}

          {/* Verification Step */}
          {step === 'verification' && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="mb-4">{translations.verificationRequired[language]}</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">{translations.verificationInfo[language]}</p>
              
              <button
                onClick={handleVerify}
                disabled={isVerifying}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 disabled:opacity-50 flex items-center gap-2 mx-auto"
              >
                {isVerifying ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{language === 'uz' ? 'Tasdiqlanmoqda...' : language === 'ru' ? 'Подтверждение...' : 'Verifying...'}</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>{translations.verify[language]}</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
