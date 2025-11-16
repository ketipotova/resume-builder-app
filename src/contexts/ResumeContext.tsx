import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Resume, JobPosting } from '../types/resume';

interface ResumeContextType {
  resume: Resume | null;
  setResume: (resume: Resume | null) => void;
  jobPosting: JobPosting | null;
  setJobPosting: (jobPosting: JobPosting | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>;
  setConversationHistory: (
    history: Array<{ role: 'user' | 'assistant'; content: string }>
  ) => void;
  resetContext: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resume, setResume] = useState<Resume | null>(null);
  const [jobPosting, setJobPosting] = useState<JobPosting | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationHistory, setConversationHistory] = useState<
    Array<{ role: 'user' | 'assistant'; content: string }>
  >([]);

  const resetContext = () => {
    setResume(null);
    setJobPosting(null);
    setIsLoading(false);
    setError(null);
    setConversationHistory([]);
  };

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setResume,
        jobPosting,
        setJobPosting,
        isLoading,
        setIsLoading,
        error,
        setError,
        conversationHistory,
        setConversationHistory,
        resetContext,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
