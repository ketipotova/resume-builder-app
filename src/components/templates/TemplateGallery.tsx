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
    id: 'student',
    name: 'Student',
    description: 'Entry-level template with gray sidebar and yellow border. Perfect for students and fresh graduates.',
    thumbnail: 'from-yellow-50 to-gray-100',
    color: 'yellow-500',
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
    description: 'Elegant serif design with warm gold accents. Ideal for senior leadership roles.',
    thumbnail: 'from-amber-50 to-amber-100',
    color: 'amber-600',
  },
  {
    id: 'boldcreative',
    name: 'Bold Creative',
    description: 'Vibrant design with numbered sections and orange accents. Stand out from the crowd.',
    thumbnail: 'from-orange-50 to-red-100',
    color: 'orange-600',
  },
  {
    id: 'minimalnordic',
    name: 'Minimal Nordic',
    description: 'Ultra-minimal monochrome design. Calm, refined, and sophisticated.',
    thumbnail: 'from-slate-50 to-gray-50',
    color: 'slate-700',
  },
  {
    id: 'modernsidebar',
    name: 'Modern Sidebar',
    description: 'Contemporary dark sidebar with cyan accents. Tech-forward and bold.',
    thumbnail: 'from-cyan-50 to-slate-100',
    color: 'cyan-600',
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
