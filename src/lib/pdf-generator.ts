import { pdf } from '@react-pdf/renderer';
import type { Resume } from '../types/resume';
import { ProfessionalTemplate } from '../components/templates/designs/ProfessionalTemplate';
import { ModernTemplate } from '../components/templates/designs/ModernTemplate';
import { MinimalistTemplate } from '../components/templates/designs/MinimalistTemplate';
import { CreativeTemplate } from '../components/templates/designs/CreativeTemplate';
import { ExecutiveTemplate } from '../components/templates/designs/ExecutiveTemplate';

/**
 * Get the appropriate template component based on template ID
 */
function getTemplateComponent(templateId: string, resume: Resume) {
  switch (templateId) {
    case 'professional':
      return ProfessionalTemplate({ resume });
    case 'modern':
      return ModernTemplate({ resume });
    case 'minimalist':
      return MinimalistTemplate({ resume });
    case 'creative':
      return CreativeTemplate({ resume });
    case 'executive':
      return ExecutiveTemplate({ resume });
    default:
      return ProfessionalTemplate({ resume });
  }
}

/**
 * Generate PDF blob from resume data
 */
export async function generateResumePDF(resume: Resume): Promise<Blob> {
  const templateId = resume.template || 'professional';
  const template = getTemplateComponent(templateId, resume);

  const blob = await pdf(template).toBlob();
  return blob;
}

/**
 * Download resume as PDF
 */
export async function downloadResumePDF(resume: Resume, filename?: string): Promise<void> {
  try {
    const blob = await generateResumePDF(resume);

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;

    // Generate filename
    const sanitizedName = resume.personalInfo.fullName
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase();
    link.download = filename || `${sanitizedName}_resume.pdf`;

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Cleanup
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
}

/**
 * Generate PDF data URL for preview
 */
export async function generateResumePDFDataURL(resume: Resume): Promise<string> {
  const blob = await generateResumePDF(resume);
  return URL.createObjectURL(blob);
}
