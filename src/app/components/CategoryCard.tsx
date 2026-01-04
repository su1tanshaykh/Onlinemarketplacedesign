import * as Icons from 'lucide-react';
import type { Category, Language } from '../types';

interface CategoryCardProps {
  category: Category;
  language: Language;
  onClick: () => void;
}

export function CategoryCard({ category, language, onClick }: CategoryCardProps) {
  const Icon = Icons[category.icon as keyof typeof Icons] as any;
  
  const name = language === 'uz' ? category.nameUz : language === 'ru' ? category.nameRu : category.nameEn;

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all"
    >
      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
        {Icon && <Icon className="w-6 h-6 text-blue-600" />}
      </div>
      <span className="text-center text-sm">{name}</span>
    </button>
  );
}
