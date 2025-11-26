import type { Resume } from '../../types/resume';
import BoldCreativeTemplate from './html/Boldcreativetemplate';
import ExecutiveClassicTemplate from './html/Executiveclassictemplate';
import MinimalNordicTemplate from './html/Minimalnordictemplate';
import ModernSidebarTemplate from './html/Modernsidebartemplate';

const sampleResume: Resume = {
  id: 'preview',
  createdAt: new Date(),
  updatedAt: new Date(),
  personalInfo: {
    fullName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    location: 'New York, NY',
    linkedIn: 'linkedin.com/in/johnsmith',
  },
  summary: 'Experienced professional with 8+ years in software development and team leadership. Proven track record of delivering high-impact projects and driving innovation.',
  experience: [
    {
      id: '1',
      company: 'Tech Solutions Inc',
      position: 'Senior Software Engineer',
      location: 'New York, NY',
      startDate: '2020-01',
      endDate: 'Present',
      description: '',
      achievements: [
        'Led development of microservices architecture serving 2M+ users',
        'Reduced system latency by 40% through performance optimization',
        'Mentored team of 5 junior developers',
      ],
    },
    {
      id: '2',
      company: 'Digital Innovations',
      position: 'Software Engineer',
      location: 'Boston, MA',
      startDate: '2018-06',
      endDate: '2020-01',
      description: '',
      achievements: [
        'Built scalable APIs using Node.js and PostgreSQL',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
      ],
    },
  ],
  education: [
    {
      id: '1',
      institution: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Boston, MA',
      graduationDate: '2018',
      gpa: '3.8',
    },
  ],
  skills: {
    technical: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'],
    soft: ['Leadership', 'Communication', 'Problem Solving'],
    languages: [],
    certifications: [],
  },
  template: 'executive',
};

interface TemplatePreviewProps {
  templateId: string;
}

export function TemplatePreview({ templateId }: TemplatePreviewProps) {
  const getTemplateComponent = () => {
    const resume = { ...sampleResume, template: templateId };

    switch (templateId) {
      case 'boldcreative':
        return <BoldCreativeTemplate resume={resume} />;
      case 'executive':
        return <ExecutiveClassicTemplate resume={resume} />;
      case 'minimalnordic':
        return <MinimalNordicTemplate resume={resume} />;
      case 'modernsidebar':
        return <ModernSidebarTemplate resume={resume} />;
      default:
        return <ExecutiveClassicTemplate resume={resume} />;
    }
  };

  return (
    <div
      className="w-full h-full overflow-hidden bg-white"
      style={{
        transform: 'scale(0.35)',
        transformOrigin: 'top left',
        width: '285%',
        height: '285%',
      }}
    >
      {getTemplateComponent()}
    </div>
  );
}
