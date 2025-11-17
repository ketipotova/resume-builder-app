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

  // Diagnostic logging
  console.log('=== RESUME DATA DEBUG ===');
  console.log('Full Name:', resume.personalInfo?.fullName);
  console.log('Personal Info:', resume.personalInfo);
  console.log('Skills Object:', resume.skills);
  console.log('Technical Skills:', resume.skills?.technical);
  console.log('Soft Skills:', resume.skills?.soft);
  console.log('========================');

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

          {/* Resume Preview Card */}
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden mb-8" style={{ maxWidth: '210mm', margin: '0 auto' }}>
            {/* Header with Dark Gradient */}
            <div style={{
              background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
              position: 'relative',
              overflow: 'hidden'
            }} className="text-white px-12 py-10">
              {/* Decorative circle */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-10%',
                width: '300px',
                height: '300px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '50%'
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 className="text-4xl mb-3" style={{ letterSpacing: '1px', fontWeight: '400' }}>
                  {resume.personalInfo.fullName}
                </h2>
                <div className="text-sm flex flex-wrap gap-6" style={{ marginTop: '20px' }}>
                  {resume.personalInfo.phone && (
                    <div className="flex items-center gap-2">
                      <span style={{ color: '#667eea', fontSize: '8px' }}>●</span>
                      {resume.personalInfo.phone}
                    </div>
                  )}
                  {resume.personalInfo.email && (
                    <div className="flex items-center gap-2">
                      <span style={{ color: '#667eea', fontSize: '8px' }}>●</span>
                      {resume.personalInfo.email}
                    </div>
                  )}
                  {resume.personalInfo.location && (
                    <div className="flex items-center gap-2">
                      <span style={{ color: '#667eea', fontSize: '8px' }}>●</span>
                      {resume.personalInfo.location}
                    </div>
                  )}
                  {resume.personalInfo.linkedIn && (
                    <div className="flex items-center gap-2">
                      <span style={{ color: '#667eea', fontSize: '8px' }}>●</span>
                      {resume.personalInfo.linkedIn}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-12 space-y-9">
              {/* Summary */}
              {resume.summary && (
                <div>
                  <h3 className="text-xl font-semibold mb-5 pb-2.5" style={{
                    color: '#2d3748',
                    borderBottom: '3px solid #667eea',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                  }}>
                    Professional Profile
                  </h3>
                  <p className="leading-relaxed" style={{ color: '#4a5568', fontSize: '15px' }}>
                    {resume.summary}
                  </p>
                </div>
              )}

              {/* Skills */}
              {(resume.skills?.technical?.length > 0 || resume.skills?.soft?.length > 0) && (
                <div>
                  <h3 className="text-xl font-semibold mb-5 pb-2.5" style={{
                    color: '#2d3748',
                    borderBottom: '3px solid #667eea',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                  }}>
                    Key Competencies
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {resume.skills?.technical && resume.skills.technical.map((skill, index) => (
                      <div key={`tech-${index}`} className="flex items-start gap-2.5 p-3 rounded-lg" style={{
                        background: '#f7fafc',
                        borderLeft: '3px solid #667eea'
                      }}>
                        <div style={{ color: '#667eea', fontWeight: 'bold', marginTop: '2px' }}>●</div>
                        <div className="flex-1">
                          <div className="font-semibold" style={{ color: '#2d3748', marginBottom: '3px' }}>{skill}</div>
                          <div className="text-xs" style={{ color: '#718096' }}>Professional expertise</div>
                        </div>
                      </div>
                    ))}
                    {resume.skills?.soft && resume.skills.soft.map((skill, index) => (
                      <div key={`soft-${index}`} className="flex items-start gap-2.5 p-3 rounded-lg" style={{
                        background: '#f7fafc',
                        borderLeft: '3px solid #667eea'
                      }}>
                        <div style={{ color: '#667eea', fontWeight: 'bold', marginTop: '2px' }}>●</div>
                        <div className="flex-1">
                          <div className="font-semibold" style={{ color: '#2d3748', marginBottom: '3px' }}>{skill}</div>
                          <div className="text-xs" style={{ color: '#718096' }}>Key strength</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience */}
              {resume.experience?.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-5 pb-2.5" style={{
                    color: '#2d3748',
                    borderBottom: '3px solid #667eea',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                  }}>
                    Professional Experience
                  </h3>
                  <div className="space-y-8">
                    {resume.experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-lg font-semibold" style={{ color: '#2d3748' }}>
                              {exp.position}
                            </h4>
                            <p className="text-base font-medium mt-1" style={{ color: '#667eea' }}>
                              {exp.company} | {exp.location}
                            </p>
                          </div>
                          <span className="text-xs px-3 py-1.5 rounded whitespace-nowrap" style={{
                            background: '#edf2f7',
                            color: '#4a5568'
                          }}>
                            {exp.startDate} - {exp.endDate}
                          </span>
                        </div>
                        {exp.achievements && exp.achievements.length > 0 && (
                          <div className="mt-4">
                            <div className="font-semibold mb-2 text-sm" style={{ color: '#2d3748' }}>
                              Key Responsibilities:
                            </div>
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm" style={{ color: '#4a5568' }}>
                                  <span style={{ color: '#667eea', fontWeight: 'bold', marginTop: '2px' }}>▸</span>
                                  <span className="flex-1">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {resume.education?.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-5 pb-2.5" style={{
                    color: '#2d3748',
                    borderBottom: '3px solid #667eea',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                  }}>
                    Education
                  </h3>
                  <div className="space-y-5">
                    {resume.education.map((edu) => (
                      <div key={edu.id}>
                        <div className="font-semibold text-base" style={{ color: '#2d3748' }}>
                          {edu.degree}{edu.field && ` in ${edu.field}`}
                        </div>
                        <div className="text-sm mt-1.5" style={{ color: '#718096' }}>
                          {edu.institution} | {edu.graduationDate}
                          {edu.gpa && ` | GPA: ${edu.gpa}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
