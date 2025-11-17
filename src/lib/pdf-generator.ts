import React from 'react';
import ReactDOMServer from 'react-dom/server';
import html2pdf from 'html2pdf.js';
import type { Resume } from '../types/resume';
import ProfessionalHtmlTemplate from '../components/templates/html/ProfessionalHtmlTemplate';

/**
 * Get the appropriate template component based on template ID
 */
function getTemplateComponent(templateId: string, resume: Resume) {
  switch (templateId) {
    case 'professional':
      return React.createElement(ProfessionalHtmlTemplate, { resume });
    case 'modern':
      // Will be created later
      return React.createElement(ProfessionalHtmlTemplate, { resume });
    case 'minimalist':
      // Will be created later
      return React.createElement(ProfessionalHtmlTemplate, { resume });
    case 'creative':
      // Will be created later
      return React.createElement(ProfessionalHtmlTemplate, { resume });
    case 'executive':
      // Will be created later
      return React.createElement(ProfessionalHtmlTemplate, { resume });
    default:
      return React.createElement(ProfessionalHtmlTemplate, { resume });
  }
}

/**
 * Convert React component to HTML string
 */
function renderToHTML(component: React.ReactElement): string {
  return ReactDOMServer.renderToStaticMarkup(component);
}

/**
 * Generate PDF blob from resume data using html2pdf.js
 */
export async function generateResumePDF(resume: Resume): Promise<Blob> {
  const templateId = resume.template || 'professional';
  const component = getTemplateComponent(templateId, resume);
  const htmlString = renderToHTML(component);

  console.log('Generating PDF for resume:', resume.personalInfo?.fullName || 'Unknown');

  // Create a temporary container
  const container = document.createElement('div');
  container.innerHTML = htmlString;
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  document.body.appendChild(container);

  try {
    // Get the element to convert
    const element = container.firstElementChild as HTMLElement;
    if (!element) {
      throw new Error('Failed to create template element');
    }

    console.log('Template element created, generating PDF...');

    // Configure html2pdf options
    const opt = {
      margin: 0,
      filename: 'resume.pdf',
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: {
        unit: 'mm' as const,
        format: 'a4' as const,
        orientation: 'portrait' as const
      },
    };

    // Generate PDF
    const pdfBlob = await html2pdf()
      .set(opt)
      .from(element)
      .output('blob');

    console.log('PDF generated successfully');
    return pdfBlob;
  } catch (error) {
    console.error('Error in generateResumePDF:', error);
    throw error;
  } finally {
    // Cleanup
    document.body.removeChild(container);
  }
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
    const sanitizedName = (resume.personalInfo?.fullName || 'resume')
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
