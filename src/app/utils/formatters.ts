import type { Language } from '../types';

export function formatPrice(price: number, language: Language): string {
  const formatted = new Intl.NumberFormat('uz-UZ').format(price);
  
  if (language === 'uz') {
    return `${formatted} so'm`;
  } else if (language === 'ru') {
    return `${formatted} сум`;
  } else {
    return `${formatted} UZS`;
  }
}

export function formatTimeAgo(dateString: string, language: Language): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 60) {
    if (language === 'uz') return `${diffInMinutes} daqiqa oldin`;
    if (language === 'ru') return `${diffInMinutes} минут назад`;
    return `${diffInMinutes} min ago`;
  } else if (diffInHours < 24) {
    if (language === 'uz') return `${diffInHours} soat oldin`;
    if (language === 'ru') return `${diffInHours} часов назад`;
    return `${diffInHours} hours ago`;
  } else if (diffInDays < 30) {
    if (language === 'uz') return `${diffInDays} kun oldin`;
    if (language === 'ru') return `${diffInDays} дней назад`;
    return `${diffInDays} days ago`;
  } else {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
}
