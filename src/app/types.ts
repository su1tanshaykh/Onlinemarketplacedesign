export type Language = 'uz' | 'ru' | 'en';

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  myidVerified: boolean;
  memberSince: string;
  location: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: 'UZS';
  category: string;
  subcategory?: string;
  images: string[];
  location: {
    region: string;
    city: string;
  };
  sellerId: string;
  postedAt: string;
  views: number;
  condition?: 'new' | 'used' | 'refurbished';
  featured?: boolean;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  read: boolean;
  listingId?: string;
}

export interface Category {
  id: string;
  nameUz: string;
  nameRu: string;
  nameEn: string;
  icon: string;
  subcategories?: {
    id: string;
    nameUz: string;
    nameRu: string;
    nameEn: string;
  }[];
}
