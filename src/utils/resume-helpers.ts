import type { Resume } from '../types/resume';

/**
 * Create an empty resume template
 */
export function createEmptyResume(): Resume {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: {
      technical: [],
      soft: [],
      languages: [],
      certifications: [],
    },
    projects: [],
    template: 'professional',
  };
}

/**
 * Format date to YYYY-MM format
 */
export function formatDate(date: Date | string): string {
  if (typeof date === 'string') {
    return date;
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

/**
 * Parse date string to readable format
 */
export function parseDate(dateStr: string): string {
  if (!dateStr || dateStr === 'Present') return dateStr || 'Present';

  // If it doesn't contain a dash, return as-is
  if (!dateStr.includes('-')) return dateStr;

  const [year, month] = dateStr.split('-');

  // Validate we have both year and month
  if (!year || !month) return dateStr;

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const monthIndex = parseInt(month) - 1;

  // Validate month is in valid range
  if (isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) {
    return dateStr;
  }

  return `${months[monthIndex]} ${year}`;
}

/**
 * Validate resume completeness
 */
export function validateResume(resume: Resume): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!resume.personalInfo.fullName) {
    errors.push('Full name is required');
  }
  if (!resume.personalInfo.email) {
    errors.push('Email is required');
  }
  if (!resume.personalInfo.phone) {
    errors.push('Phone number is required');
  }
  if (resume.experience.length === 0) {
    errors.push('At least one work experience is required');
  }
  if (resume.education.length === 0) {
    errors.push('At least one education entry is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Save resume to localStorage
 */
export function saveResumeToStorage(resume: Resume): void {
  localStorage.setItem('current-resume', JSON.stringify(resume));
}

/**
 * Load resume from localStorage
 */
export function loadResumeFromStorage(): Resume | null {
  const stored = localStorage.getItem('current-resume');
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Clear resume from localStorage
 */
export function clearResumeFromStorage(): void {
  localStorage.removeItem('current-resume');
}

/**
 * Normalize AI response data to match Resume schema
 * Handles legacy formats or AI mistakes
 */
export function normalizeResumeData(data: any): Resume {
  const base = createEmptyResume();

  // Handle personalInfo
  const personalInfo = data.personalInfo || {};

  // Fix fullName if AI used wrong field name
  if (!personalInfo.fullName && (personalInfo.name || personalInfo.firstName)) {
    personalInfo.fullName = personalInfo.name ||
      `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`.trim();
  }

  // Handle skills - convert array to object if needed
  let skills = data.skills || base.skills;
  if (Array.isArray(skills)) {
    // AI returned flat array instead of object
    skills = {
      technical: skills,
      soft: [],
      languages: [],
      certifications: [],
    };
  } else if (skills && typeof skills === 'object') {
    // Ensure all required arrays exist
    skills = {
      technical: Array.isArray(skills.technical) ? skills.technical : [],
      soft: Array.isArray(skills.soft) ? skills.soft : [],
      languages: Array.isArray(skills.languages) ? skills.languages : [],
      certifications: Array.isArray(skills.certifications) ? skills.certifications : [],
    };
  }

  return {
    ...base,
    ...data,
    personalInfo: {
      ...base.personalInfo,
      ...personalInfo,
      fullName: personalInfo.fullName || '',
    },
    skills,
  };
}
