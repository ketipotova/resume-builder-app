import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Edit, CheckCircle } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useResume } from '../contexts/ResumeContext';
import { downloadResumePDF } from '../lib/pdf-generator';
import BoldCreativeTemplate from '../components/templates/html/Boldcreativetemplate';
import ExecutiveClassicTemplate from '../components/templates/html/Executiveclassictemplate';
import MinimalNordicTemplate from '../components/templates/html/Minimalnordictemplate';
import ModernSidebarTemplate from '../components/templates/html/Modernsidebartemplate';

export function FinalPreview() {
  const navigate = useNavigate();
  const { resume } = useResume();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  useEffect(() => {
    if (!resume) {
      navigate('/');
    }
  }, [resume, navigate]);

  const handleDownload = async () => {
    if (!resume) return;

    setIsDownloading(true);
    setDownloadComplete(false);

    try {
      await downloadResumePDF(resume);
      setDownloadComplete(true);
      setTimeout(() => setDownloadComplete(false), 3000);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (!resume) {
    return null;
  }

  // Get the template component based on resume.template
  const getTemplateComponent = () => {
    const templateId = resume.template || 'executive';

    switch (templateId) {
      case 'boldcreative':
        return <BoldCreativeTemplate resume={resume} />;
      case 'executive':
        return <ExecutiveClassicTemplate resume={resume} />;
      case 'minimalnordic':
        return <MinimalNordicTemplate resume={resume} />;
      case 'modernsidebar':
        return <ModernSidebarTemplate resume={resume} />;
      default:
        return <ExecutiveClassicTemplate resume={resume} />;
    }
  };

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
                onClick={() => navigate('/templates')}
                className="flex items-center gap-2"
              >
                <Edit className="w-5 h-5" />
                Change Template
              </Button>
              <Button
                onClick={handleDownload}
                isLoading={isDownloading}
                className="flex items-center gap-2"
              >
                {downloadComplete ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Downloaded!
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Download PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div style={{ maxWidth: '210mm', margin: '0 auto' }}>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Resume is Ready!
            </h1>
            <p className="text-gray-600">
              Review your resume below and download when ready
            </p>
          </div>

          {/* Dynamic Resume Preview */}
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden mb-8" style={{ maxWidth: '210mm', margin: '0 auto' }}>
            {getTemplateComponent()}
          </div>

          {/* Actions */}
          <div className="flex flex-col items-center gap-4">
            <Button
              onClick={handleDownload}
              size="lg"
              isLoading={isDownloading}
              className="w-full md:w-auto"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume PDF
            </Button>

            <div className="text-center text-sm text-gray-600 space-y-2">
              <p>Your resume is ready to download!</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => navigate('/templates')}
                  className="text-primary-600 hover:underline font-medium"
                >
                  Change Template
                </button>
                <button
                  onClick={() => navigate('/enhance')}
                  className="text-primary-600 hover:underline font-medium"
                >
                  Enhance Resume
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="text-primary-600 hover:underline font-medium"
                >
                  Start New Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
