import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye } from 'lucide-react';
import { Button } from '../components/common/Button';
import { TemplateGallery } from '../components/templates/TemplateGallery';
import { useResume } from '../contexts/ResumeContext';

export function TemplateSelector() {
  const navigate = useNavigate();
  const { resume, setResume } = useResume();
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    // If no resume data, redirect back
    if (!resume) {
      navigate('/');
    }
  }, [resume, navigate]);

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    // Update resume with selected template
    if (resume) {
      setResume({
        ...resume,
        template: templateId,
      });
    }
  };

  const handleContinue = () => {
    navigate('/enhance');
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

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2"
              >
                <Eye className="w-5 h-5" />
                {showPreview ? 'Hide' : 'Show'} Preview
              </Button>
              <Button onClick={handleContinue}>
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Choose Your Template
            </h1>
            <p className="text-gray-600">
              Select a professional template that matches your style and industry
            </p>
          </div>

          <TemplateGallery
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleSelectTemplate}
          />

          {/* Selected Template Info */}
          {selectedTemplate && (
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Selected: {selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)}
                  </h3>
                  <p className="text-gray-600">
                    Your resume will use this template design
                  </p>
                </div>
                <Button onClick={handleContinue}>
                  Continue to Enhancement
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
