import { useNavigate } from 'react-router-dom';
import { MessageSquare, Upload, Sparkles, FileText, Target } from 'lucide-react';
import { Button } from '../components/common/Button';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Build Your Perfect Resume with{' '}
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              AI
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Create professional resumes in minutes using Claude AI. Chat to build from scratch,
            upload existing resumes, or tailor your resume to specific job postings.
          </p>

          {/* CTA Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
            <button
              onClick={() => navigate('/chat')}
              className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-primary-600 text-left"
            >
              <MessageSquare className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                Create from Scratch
              </h3>
              <p className="text-gray-600">
                Have a conversation with AI to build your resume step by step
              </p>
            </button>

            <button
              onClick={() => navigate('/upload')}
              className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-accent-600 text-left"
            >
              <Upload className="w-12 h-12 text-accent-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-accent-600 transition-colors">
                Upload Resume
              </h3>
              <p className="text-gray-600">
                Upload your existing resume (PDF/DOCX) and let AI extract the data
              </p>
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI Enhancement
              </h3>
              <p className="text-gray-600">
                Improve your resume with AI-powered suggestions and optimizations
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 rounded-full mb-4">
                <Target className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Job Tailoring
              </h3>
              <p className="text-gray-600">
                Paste a job URL and AI will adapt your resume to match the requirements
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                5 Professional Templates
              </h3>
              <p className="text-gray-600">
                Choose from beautiful, ATS-friendly templates for every industry
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Start with Chat or Upload
                </h4>
                <p className="text-gray-600">
                  Create a new resume through conversation or upload an existing one
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Choose a Template
                </h4>
                <p className="text-gray-600">
                  Select from 5 professionally designed templates with live preview
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Enhance and Tailor
                </h4>
                <p className="text-gray-600">
                  Use AI to improve your resume or tailor it to a specific job posting
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Download and Apply
                </h4>
                <p className="text-gray-600">
                  Export your polished resume as a PDF and start applying
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Build Your Resume?
          </h2>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/chat')}
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/upload')}
            >
              Upload Resume
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-24 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>Powered by Claude AI • Built with React + TypeScript</p>
        </div>
      </footer>
    </div>
  );
}
