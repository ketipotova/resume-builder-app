import { TemplateCard } from './TemplateCard';

const templates = [
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
