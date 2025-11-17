import { TemplateCard } from './TemplateCard';

const templates = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean two-column layout with navy blue headers. Perfect for corporate roles.',
    thumbnail: 'from-blue-50 to-blue-100',
    color: 'blue-600',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Bold section headers with teal accents. Great for tech and creative industries.',
    thumbnail: 'from-teal-50 to-teal-100',
    color: 'teal-600',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Single column with maximum whitespace. Clean typography focus.',
    thumbnail: 'from-gray-50 to-gray-100',
    color: 'gray-700',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Two-column layout with dark blue sidebar and golden accents. Modern and professional.',
    thumbnail: 'from-blue-50 to-amber-100',
    color: 'blue-900',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Professional summary emphasis with gold accents. Ideal for senior roles.',
    thumbnail: 'from-amber-50 to-amber-100',
    color: 'amber-600',
  },
];

interface TemplateGalleryProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

export function TemplateGallery({
  selectedTemplate,
  onSelectTemplate,
}: TemplateGalleryProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          {...template}
          isSelected={selectedTemplate === template.id}
          onSelect={onSelectTemplate}
        />
      ))}
    </div>
  );
}
