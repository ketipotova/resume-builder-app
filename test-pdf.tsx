import { pdf } from '@react-pdf/renderer';
import { ProfessionalTemplate } from './src/components/templates/designs/ProfessionalTemplate';
import { ModernTemplate } from './src/components/templates/designs/ModernTemplate';
import type { Resume } from './src/types/resume';
import { writeFileSync } from 'fs';

// Create test resume data
const testResume: Resume = {
  id: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
  personalInfo: {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
  },
  summary: 'Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, TypeScript, and Node.js. Proven track record of building scalable applications and leading cross-functional teams.',
  experience: [
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2020-01-01',
      endDate: 'Present',
      achievements: [
        'Led development of microservices architecture serving 1M+ users',
        'Reduced API response time by 40% through optimization',
        'Mentored team of 5 junior developers',
        'Implemented CI/CD pipeline reducing deployment time by 60%',
      ],
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      location: 'Remote',
      startDate: '2018-06-01',
      endDate: '2019-12-31',
      achievements: [
        'Built real-time chat feature using WebSocket technology',
        'Developed RESTful APIs handling 100K+ requests daily',
        'Integrated third-party payment systems (Stripe, PayPal)',
      ],
    },
  ],
  education: [
    {
      id: '1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      graduationDate: '2018',
    },
  ],
  skills: {
    technical: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'],
    soft: ['Leadership', 'Problem Solving', 'Communication', 'Team Collaboration', 'Agile Methodologies'],
  },
  projects: [
    {
      id: '1',
      name: 'E-Commerce Platform',
      description: 'Built full-stack e-commerce solution with React, Node.js, and PostgreSQL',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      link: 'https://github.com/johndoe/ecommerce',
    },
  ],
};

async function testPDFGeneration() {
  console.log('Testing PDF generation...');

  try {
    // Test Professional Template
    console.log('Generating Professional template...');
    const professionalBlob = await pdf(<ProfessionalTemplate resume={testResume} />).toBlob();
    const professionalBuffer = await professionalBlob.arrayBuffer();
    writeFileSync('./test-professional.pdf', Buffer.from(professionalBuffer));
    console.log('✓ Professional template generated successfully: test-professional.pdf');

    // Test Modern Template
    console.log('Generating Modern template...');
    const modernBlob = await pdf(<ModernTemplate resume={testResume} />).toBlob();
    const modernBuffer = await modernBlob.arrayBuffer();
    writeFileSync('./test-modern.pdf', Buffer.from(modernBuffer));
    console.log('✓ Modern template generated successfully: test-modern.pdf');

    console.log('\n✅ All PDF tests passed!');
  } catch (error) {
    console.error('❌ PDF generation failed:', error);
    process.exit(1);
  }
}

testPDFGeneration();
