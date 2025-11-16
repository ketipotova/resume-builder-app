import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Target, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { Button } from '../components/common/Button';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useResume } from '../contexts/ResumeContext';
import { enhanceResume, tailorResumeToJob } from '../lib/claude-api';
import { scrapeJobPosting } from '../lib/supabase';

export function Enhancement() {
  const navigate = useNavigate();
  const { resume, setResume, jobPosting, setJobPosting } = useResume();
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isTailoring, setIsTailoring] = useState(false);
  const [jobUrl, setJobUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showJobInput, setShowJobInput] = useState(false);

  useEffect(() => {
    if (!resume) {
      navigate('/');
    }
  }, [resume, navigate]);

  const handleGeneralEnhancement = async () => {
    if (!resume) return;

    setIsEnhancing(true);
    setError(null);

    try {
      const enhancedResume = await enhanceResume(resume);
      setResume(enhancedResume);
      alert('Resume enhanced successfully!');
    } catch (err) {
      console.error('Enhancement error:', err);
      setError('Failed to enhance resume. Please try again.');
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleJobTailoring = async () => {
    if (!resume || !jobUrl) return;

    setIsTailoring(true);
    setError(null);

    try {
      // Scrape job posting
      const scrapedJobPosting = await scrapeJobPosting(jobUrl);
      setJobPosting(scrapedJobPosting);

      // Tailor resume
      const result = await tailorResumeToJob(resume, scrapedJobPosting);
      setResume(result.resume);

      // Show match results
      alert(`Resume tailored successfully!\nMatch Score: ${result.explanation.matchScore}\n\nKey Changes:\n${result.explanation.keyChanges.join('\n')}`);
    } catch (err) {
      console.error('Tailoring error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to tailor resume. Please check the job URL and try again.'
      );
    } finally {
      setIsTailoring(false);
    }
  };

  if (!resume) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            <Button onClick={() => navigate('/preview')}>
              Continue to Preview
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Enhance Your Resume
            </h1>
            <p className="text-gray-600">
              Use AI to improve your resume or tailor it to a specific job posting
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Error</h3>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Enhancement Options */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* General Enhancement */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-transparent hover:border-primary-600 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  General Enhancement
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                AI will improve your resume's overall quality by enhancing bullet points,
                adding metrics, and optimizing for ATS.
              </p>
              <Button
                onClick={handleGeneralEnhancement}
                isLoading={isEnhancing}
                disabled={isEnhancing || isTailoring}
                className="w-full"
              >
                {isEnhancing ? 'Enhancing...' : 'Enhance Resume'}
              </Button>
            </div>

            {/* Job-Specific Tailoring */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-transparent hover:border-accent-600 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-accent-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Tailor to Job
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Paste a job posting URL and AI will analyze requirements and adapt
                your resume to match.
              </p>

              {!showJobInput ? (
                <Button
                  onClick={() => setShowJobInput(true)}
                  variant="secondary"
                  disabled={isEnhancing || isTailoring}
                  className="w-full"
                >
                  Enter Job URL
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      value={jobUrl}
                      onChange={(e) => setJobUrl(e.target.value)}
                      placeholder="https://example.com/job-posting"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                      disabled={isTailoring}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleJobTailoring}
                      variant="secondary"
                      isLoading={isTailoring}
                      disabled={!jobUrl || isEnhancing || isTailoring}
                      className="flex-1"
                    >
                      {isTailoring ? 'Tailoring...' : 'Tailor Resume'}
                    </Button>
                    <Button
                      onClick={() => {
                        setShowJobInput(false);
                        setJobUrl('');
                      }}
                      variant="ghost"
                      disabled={isTailoring}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Loading State */}
          {(isEnhancing || isTailoring) && (
            <div className="mt-8">
              <LoadingSpinner
                size="lg"
                message={
                  isEnhancing
                    ? 'Enhancing your resume...'
                    : 'Analyzing job posting and tailoring resume...'
                }
              />
            </div>
          )}

          {/* Skip Enhancement */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Happy with your resume as is?
            </p>
            <Button
              variant="outline"
              onClick={() => navigate('/preview')}
              disabled={isEnhancing || isTailoring}
            >
              Skip Enhancement
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
