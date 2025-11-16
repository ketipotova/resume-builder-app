import type { Resume } from '../types/resume';
import { v4 as uuidv4 } from 'uuid';

/**
 * Create an empty resume template
 */
export function createEmptyResume(): Resume {
  return {
    id: uuidv4(),
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
  if (dateStr === 'Present') return 'Present';

  const [year, month] = dateStr.split('-');
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  return `${months[parseInt(month) - 1]} ${year}`;
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
