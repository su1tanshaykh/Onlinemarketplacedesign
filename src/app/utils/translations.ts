export type Language = 'uz' | 'ru' | 'en';

export const translations = {
  // Common
  search: { uz: 'Qidirish...', ru: 'Поиск...', en: 'Search...' },
  login: { uz: 'Kirish', ru: 'Войти', en: 'Login' },
  logout: { uz: 'Chiqish', ru: 'Выйти', en: 'Logout' },
  back: { uz: 'Orqaga', ru: 'Назад', en: 'Back' },
  next: { uz: 'Keyingisi', ru: 'Далее', en: 'Next' },
  cancel: { uz: 'Bekor qilish', ru: 'Отмена', en: 'Cancel' },
  save: { uz: 'Saqlash', ru: 'Сохранить', en: 'Save' },
  delete: { uz: 'O\'chirish', ru: 'Удалить', en: 'Delete' },
  edit: { uz: 'Tahrirlash', ru: 'Редактировать', en: 'Edit' },
  
  // Home
  heroTitle: { uz: 'Oson xarid qiling va soting', ru: 'Покупайте и продавайте легко', en: 'Buy and Sell with Ease' },
  heroSubtitle: { uz: 'O\'zbekistonning ishonchli onlayn bozori', ru: 'Надежный онлайн-рынок Узбекистана', en: 'Uzbekistan\'s Trusted Online Marketplace' },
  
  // Categories
  categories: { uz: 'Kategoriyalar', ru: 'Категории', en: 'Categories' },
  electronics: { uz: 'Elektronika', ru: 'Электроника', en: 'Electronics' },
  cars: { uz: 'Avtomobillar', ru: 'Автомобили', en: 'Cars' },
  realEstate: { uz: 'Ko\'chmas mulk', ru: 'Недвижимость', en: 'Real Estate' },
  jobs: { uz: 'Ish o\'rinlari', ru: 'Вакансии', en: 'Jobs' },
  services: { uz: 'Xizmatlar', ru: 'Услуги', en: 'Services' },
  fashion: { uz: 'Moda', ru: 'Мода', en: 'Fashion' },
  homeGarden: { uz: 'Uy va bog\'', ru: 'Дом и сад', en: 'Home & Garden' },
  
  // Listings
  featured: { uz: 'Tanlangan e\'lonlar', ru: 'Избранные объявления', en: 'Featured Listings' },
  recent: { uz: 'Oxirgi e\'lonlar', ru: 'Последние объявления', en: 'Recent Listings' },
  viewAll: { uz: 'Barchasini ko\'rish', ru: 'Смотреть все', en: 'View All' },
  
  // Product
  description: { uz: 'Ta\'rif', ru: 'Описание', en: 'Description' },
  price: { uz: 'Narx', ru: 'Цена', en: 'Price' },
  location: { uz: 'Joylashuv', ru: 'Местоположение', en: 'Location' },
  condition: { uz: 'Holati', ru: 'Состояние', en: 'Condition' },
  new: { uz: 'Yangi', ru: 'Новый', en: 'New' },
  used: { uz: 'Ishlatilgan', ru: 'Б/у', en: 'Used' },
  
  // User
  myProfile: { uz: 'Mening profilim', ru: 'Мой профиль', en: 'My Profile' },
  myAds: { uz: 'Mening e\'lonlarim', ru: 'Мои объявления', en: 'My Ads' },
  favorites: { uz: 'Sevimlilar', ru: 'Избранное', en: 'Favorites' },
  messages: { uz: 'Xabarlar', ru: 'Сообщения', en: 'Messages' },
  settings: { uz: 'Sozlamalar', ru: 'Настройки', en: 'Settings' },
  
  // MYiD
  myidVerified: { uz: 'MYiD tasdiqlangan', ru: 'Подтверждено MYiD', en: 'MYiD Verified' },
  verifyWithMyid: { uz: 'MYiD orqali tasdiqlash', ru: 'Подтвердить через MYiD', en: 'Verify with MYiD' },
  
  // Post Ad
  postAd: { uz: 'E\'lon berish', ru: 'Разместить объявление', en: 'Post Ad' },
  publish: { uz: 'E\'lonni joylashtirish', ru: 'Опубликовать', en: 'Publish' },
};

export function t(key: keyof typeof translations, language: Language): string {
  return translations[key][language];
}
