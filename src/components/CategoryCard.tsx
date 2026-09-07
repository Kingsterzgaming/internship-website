import React from 'react';
import { 
  Laptop, 
  HeartPulse, 
  Cog, 
  LineChart, 
  Palette, 
  Megaphone, 
  FlaskConical, 
  Scale, 
  Briefcase 
} from 'lucide-react';

interface CategoryCardProps {
  name: string;
  count?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  count,
  isSelected,
  onClick
}) => {
  const getIcon = (catName: string) => {
    switch (catName.toLowerCase()) {
      case 'technology':
        return <Laptop className="w-6 h-6 text-indigo-600" />;
      case 'healthcare':
        return <HeartPulse className="w-6 h-6 text-rose-600" />;
      case 'engineering':
        return <Cog className="w-6 h-6 text-amber-600" />;
      case 'finance':
        return <LineChart className="w-6 h-6 text-emerald-600" />;
      case 'design':
        return <Palette className="w-6 h-6 text-violet-600" />;
      case 'marketing':
        return <Megaphone className="w-6 h-6 text-orange-600" />;
      case 'science':
        return <FlaskConical className="w-6 h-6 text-teal-600" />;
      case 'law':
        return <Scale className="w-6 h-6 text-sky-600" />;
      default:
        return <Briefcase className="w-6 h-6 text-slate-600" />;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`group p-5 rounded-2xl border transition-all duration-200 cursor-pointer bg-white text-left ${
        isSelected
          ? 'border-indigo-600 ring-2 ring-indigo-500/20 shadow-md bg-indigo-50/20'
          : 'border-slate-200/80 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5'
      }`}
    >
      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
        {getIcon(name)}
      </div>
      <h3 className="font-semibold text-gray-900 text-base group-hover:text-indigo-600 transition-colors">
        {name}
      </h3>
      <p className="text-xs text-slate-500 mt-1">
        {count !== undefined ? `${count} Career Paths` : 'Explore Paths'}
      </p>
    </div>
  );
};

export default CategoryCard;
