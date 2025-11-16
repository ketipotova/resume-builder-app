import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { FileUploader } from '../components/upload/FileUploader';
import { Button } from '../components/common/Button';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useResume } from '../contexts/ResumeContext';
import { extractResumeText } from '../lib/resume-parser';
import { parseUploadedResume } from '../lib/claude-api';

export function UploadResume() {
  const navigate = useNavigate();
  const { setResume } = useResume();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setError(null);
    setIsComplete(false);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setError(null);
    setIsComplete(false);
  };

  const handleProcess = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Extract text from file
      const resumeText = await extractResumeText(selectedFile);

      if (!resumeText || resumeText.trim().length < 100) {
        throw new Error(
          'Could not extract enough text from the resume. Please make sure the file is not empty or corrupted.'
        );
      }

      // Parse with AI
      const parsedResume = await parseUploadedResume(resumeText);

      setResume(parsedResume);
      setIsComplete(true);
    } catch (err) {
      console.error('Processing error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to process resume. Please try again.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>

            {isComplete && (
              <Button onClick={() => navigate('/templates')}>
                Continue to Templates
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Upload Your Resume
            </h1>
            <p className="text-gray-600">
              Upload your existing resume and AI will extract all the information
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <FileUploader
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              onClear={handleClear}
              isProcessing={isProcessing}
            />

            {selectedFile && !isProcessing && !isComplete && (
              <div className="mt-6">
                <Button
                  onClick={handleProcess}
                  size="lg"
                  className="w-full"
                >
                  Process Resume
                </Button>
              </div>
            )}

            {isProcessing && (
              <div className="mt-8">
                <LoadingSpinner
                  size="lg"
                  message="Extracting and analyzing your resume..."
                />
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-900 mb-1">
                      Processing Error
                    </h3>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {isComplete && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-900">
                      Resume Processed Successfully!
                    </h3>
                    <p className="text-sm text-green-700">
                      Your resume has been analyzed. Click "Continue to Templates" to choose a design.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">Tips for best results:</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Use a clear, well-formatted resume (PDF or DOCX)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Avoid heavily styled or image-based resumes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Make sure the text is selectable, not scanned images</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>You can review and edit all extracted data after processing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
