import { Check } from 'lucide-react';
import { TemplatePreview } from './TemplatePreview';

interface TemplateCardProps {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  color: string;
  isSelected?: boolean;
  onSelect: (id: string) => void;
}

export function TemplateCard({
  id,
  name,
  description,
  color,
  isSelected = false,
  onSelect,
}: TemplateCardProps) {
  return (
    <button
      onClick={() => onSelect(id)}
      className={`group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-4 text-left border-2 ${
        isSelected ? `border-${color} ring-2 ring-${color} ring-opacity-50` : 'border-transparent'
      }`}
    >
      {isSelected && (
        <div className={`absolute -top-2 -right-2 w-8 h-8 bg-${color} rounded-full flex items-center justify-center z-10`}>
          <Check className="w-5 h-5 text-white" />
        </div>
      )}

      {/* Template Preview */}
      <div className="aspect-[8.5/11] bg-gray-100 rounded-lg mb-4 overflow-hidden border border-gray-200">
        <TemplatePreview templateId={id} />
      </div>

      {/* Template Info */}
      <div>
        <h3 className="font-semibold text-lg text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      {/* Hover Effect */}
      <div className={`absolute inset-0 border-2 border-${color} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />
    </button>
  );
}
