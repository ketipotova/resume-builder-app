export interface Resume {
  id: string;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;

  // Personal Information
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedIn?: string;
    portfolio?: string;
    github?: string;
  };

  // Professional Summary
  summary: string;

  // Work Experience
  experience: Array<{
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string; // "YYYY-MM" format
    endDate: string | "Present";
    description: string;
    achievements: string[];
  }>;

  // Education
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    location: string;
    graduationDate: string;
    gpa?: string;
    honors?: string;
  }>;

  // Skills
  skills: {
    technical: string[];
    soft: string[];
    languages: Array<{ name: string; proficiency: string }>;
    certifications: string[];
  };

  // Projects (Optional)
  projects?: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;

  // Additional Sections
  volunteering?: Array<{
    organization: string;
    role: string;
    period: string;
    description: string;
  }>;

  awards?: string[];

  // Metadata
  template: string; // template ID
  targetJobTitle?: string;
  targetJobUrl?: string;
}

export interface JobPosting {
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: {
    required: string[];
    preferred: string[];
  };
  responsibilities: string[];
  skills: string[];
  keywords: string[];
  experienceLevel: string;
  url: string;
}

export interface TailoringResult {
  resume: Resume;
  explanation: {
    matchScore: string;
    keyChanges: string[];
    matchedRequirements: string[];
    missingRequirements: string[];
  };
}
