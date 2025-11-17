import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Edit, CheckCircle } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useResume } from '../contexts/ResumeContext';
import { downloadResumePDF } from '../lib/pdf-generator';

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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Resume is Ready!
            </h1>
            <p className="text-gray-600">
              Review your resume below and download when ready
            </p>
          </div>

          {/* Resume Preview Card */}
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <div className="space-y-6">
              {/* Header */}
              <div className="border-b-2 border-primary-600 pb-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {resume.personalInfo.fullName}
                </h2>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{resume.personalInfo.email} • {resume.personalInfo.phone}</p>
                  <p>{resume.personalInfo.location}</p>
                  {resume.personalInfo.linkedIn && (
                    <p>{resume.personalInfo.linkedIn}</p>
                  )}
                </div>
              </div>

              {/* Summary */}
              {resume.summary && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Summary</h3>
                  <p className="text-gray-700">{resume.summary}</p>
                </div>
              )}

              {/* Experience */}
              {resume.experience.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Experience</h3>
                  <div className="space-y-4">
                    {resume.experience.map((exp) => (
                      <div key={exp.id}>
                        <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                        <p className="text-sm text-gray-600">
                          {exp.company} • {exp.location}
                        </p>
                        <p className="text-xs text-gray-500 mb-2">
                          {exp.startDate} - {exp.endDate}
                        </p>
                        {exp.achievements && exp.achievements.length > 0 && (
                          <ul className="list-disc list-inside space-y-1">
                            {exp.achievements.map((achievement, index) => (
                              <li key={index} className="text-sm text-gray-700">
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {resume.education.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Education</h3>
                  <div className="space-y-3">
                    {resume.education.map((edu) => (
                      <div key={edu.id}>
                        <h4 className="font-semibold text-gray-900">
                          {edu.degree} in {edu.field}
                        </h4>
                        <p className="text-sm text-gray-600">{edu.institution}</p>
                        <p className="text-xs text-gray-500">{edu.graduationDate}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {(resume.skills.technical.length > 0 || resume.skills.soft.length > 0) && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Skills</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {resume.skills.technical.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Technical</h4>
                        <p className="text-sm text-gray-700">
                          {resume.skills.technical.join(', ')}
                        </p>
                      </div>
                    )}
                    {resume.skills.soft.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Soft Skills</h4>
                        <p className="text-sm text-gray-700">
                          {resume.skills.soft.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Template Info */}
              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Template: <span className="font-semibold capitalize">{resume.template || 'professional'}</span>
                </p>
              </div>
            </div>
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
                  className="text-primary-600 hover:underline"
                >
                  Change Template
                </button>
                <button
                  onClick={() => navigate('/enhance')}
                  className="text-primary-600 hover:underline"
                >
                  Enhance Resume
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="text-primary-600 hover:underline"
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
