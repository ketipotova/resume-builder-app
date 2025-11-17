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
          <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-8">
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-700 text-white px-12 py-10">
              <h2 className="text-4xl font-bold mb-3 tracking-tight">
                {resume.personalInfo.fullName}
              </h2>
              <div className="text-sm opacity-95 space-y-1">
                <p>{resume.personalInfo.email} • {resume.personalInfo.phone}</p>
                <p>{resume.personalInfo.location}</p>
                {resume.personalInfo.linkedIn && (
                  <p>{resume.personalInfo.linkedIn}</p>
                )}
              </div>
            </div>

            <div className="p-10 space-y-6">

              {/* Summary */}
              {resume.summary && (
                <div>
                  <h3 className="text-lg font-bold text-indigo-600 mb-3 pb-2 border-b-2 border-indigo-600">Professional Summary</h3>
                  <p className="text-gray-700 leading-relaxed text-justify">{resume.summary}</p>
                </div>
              )}

              {/* Experience */}
              {resume.experience.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-indigo-600 mb-4 pb-2 border-b-2 border-indigo-600">Professional Experience</h3>
                  <div className="space-y-5">
                    {resume.experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="font-semibold text-gray-900 text-base">{exp.position}</h4>
                          <span className="text-xs text-gray-500 italic">
                            {exp.startDate} - {exp.endDate}
                          </span>
                        </div>
                        <p className="text-sm text-indigo-600 font-medium mb-2">
                          {exp.company} • {exp.location}
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
                  <h3 className="text-lg font-bold text-indigo-600 mb-4 pb-2 border-b-2 border-indigo-600">Education</h3>
                  <div className="space-y-4">
                    {resume.education.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex justify-between items-baseline">
                          <h4 className="font-semibold text-gray-900">
                            {edu.degree} in {edu.field}
                          </h4>
                          <span className="text-xs text-gray-500 italic">{edu.graduationDate}</span>
                        </div>
                        <p className="text-sm text-indigo-600 font-medium">{edu.institution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {(resume.skills?.technical?.length > 0 || resume.skills?.soft?.length > 0) && (
                <div>
                  <h3 className="text-lg font-bold text-indigo-600 mb-3 pb-2 border-b-2 border-indigo-600">Skills</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {resume.skills?.technical && resume.skills.technical.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Technical Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {resume.skills.technical.map((skill, index) => (
                            <span key={index} className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-sm font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {resume.skills?.soft && resume.skills.soft.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Soft Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {resume.skills.soft.map((skill, index) => (
                            <span key={index} className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-sm font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
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
