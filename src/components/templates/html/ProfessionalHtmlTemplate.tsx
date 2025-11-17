import type { Resume } from '../../../types/resume';

interface ProfessionalHtmlTemplateProps {
  resume: Resume;
}

export function ProfessionalHtmlTemplate({ resume }: ProfessionalHtmlTemplateProps) {
  return (
    <div style={{
      width: '210mm',
      minHeight: '297mm',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontSize: '11pt',
      lineHeight: '1.6',
      color: '#2c3e50',
      padding: 0,
    }}>
      {/* Header with Gradient Background */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px 50px',
        color: '#ffffff',
        marginBottom: '0',
      }}>
        <h1 style={{
          fontSize: '36pt',
          fontWeight: '700',
          margin: '0 0 12px 0',
          letterSpacing: '-0.5px',
        }}>
          {resume.personalInfo.fullName}
        </h1>
        <div style={{
          fontSize: '11pt',
          opacity: '0.95',
          lineHeight: '1.8',
        }}>
          <div style={{ marginBottom: '4px' }}>
            {resume.personalInfo.email} • {resume.personalInfo.phone}
          </div>
          <div style={{ marginBottom: '4px' }}>
            {resume.personalInfo.location}
          </div>
          {resume.personalInfo.linkedIn && (
            <div>{resume.personalInfo.linkedIn}</div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '40px 50px' }}>
        {/* Professional Summary */}
        {resume.summary && (
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '18pt',
              fontWeight: '700',
              color: '#667eea',
              marginBottom: '12px',
              paddingBottom: '8px',
              borderBottom: '2px solid #667eea',
            }}>
              Professional Summary
            </h2>
            <p style={{
              margin: '0',
              textAlign: 'justify',
              lineHeight: '1.7',
            }}>
              {resume.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {resume.experience.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '18pt',
              fontWeight: '700',
              color: '#667eea',
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: '2px solid #667eea',
            }}>
              Professional Experience
            </h2>
            {resume.experience.map((exp, index) => (
              <div key={exp.id} style={{
                marginBottom: index < resume.experience.length - 1 ? '24px' : '0',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '6px',
                }}>
                  <h3 style={{
                    fontSize: '13pt',
                    fontWeight: '600',
                    color: '#2c3e50',
                    margin: '0',
                  }}>
                    {exp.position}
                  </h3>
                  <span style={{
                    fontSize: '10pt',
                    color: '#7f8c8d',
                    fontStyle: 'italic',
                  }}>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <div style={{
                  fontSize: '11pt',
                  color: '#667eea',
                  fontWeight: '500',
                  marginBottom: '8px',
                }}>
                  {exp.company} • {exp.location}
                </div>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul style={{
                    margin: '8px 0 0 20px',
                    padding: '0',
                    listStyleType: 'disc',
                  }}>
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} style={{
                        marginBottom: '6px',
                        lineHeight: '1.6',
                      }}>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '18pt',
              fontWeight: '700',
              color: '#667eea',
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: '2px solid #667eea',
            }}>
              Education
            </h2>
            {resume.education.map((edu, index) => (
              <div key={edu.id} style={{
                marginBottom: index < resume.education.length - 1 ? '16px' : '0',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}>
                  <h3 style={{
                    fontSize: '12pt',
                    fontWeight: '600',
                    color: '#2c3e50',
                    margin: '0 0 4px 0',
                  }}>
                    {edu.degree} in {edu.field}
                  </h3>
                  <span style={{
                    fontSize: '10pt',
                    color: '#7f8c8d',
                    fontStyle: 'italic',
                  }}>
                    {edu.graduationDate}
                  </span>
                </div>
                <div style={{
                  fontSize: '11pt',
                  color: '#667eea',
                  fontWeight: '500',
                }}>
                  {edu.institution}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {(resume.skills.technical.length > 0 || resume.skills.soft.length > 0) && (
          <div style={{ marginBottom: '0' }}>
            <h2 style={{
              fontSize: '18pt',
              fontWeight: '700',
              color: '#667eea',
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: '2px solid #667eea',
            }}>
              Skills
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: resume.skills.technical.length > 0 && resume.skills.soft.length > 0 ? '1fr 1fr' : '1fr',
              gap: '20px',
            }}>
              {resume.skills.technical.length > 0 && (
                <div>
                  <h3 style={{
                    fontSize: '12pt',
                    fontWeight: '600',
                    color: '#2c3e50',
                    marginBottom: '8px',
                  }}>
                    Technical Skills
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}>
                    {resume.skills.technical.map((skill, index) => (
                      <span key={index} style={{
                        backgroundColor: '#f0f4ff',
                        color: '#667eea',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '10pt',
                        fontWeight: '500',
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {resume.skills.soft.length > 0 && (
                <div>
                  <h3 style={{
                    fontSize: '12pt',
                    fontWeight: '600',
                    color: '#2c3e50',
                    marginBottom: '8px',
                  }}>
                    Soft Skills
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}>
                    {resume.skills.soft.map((skill, index) => (
                      <span key={index} style={{
                        backgroundColor: '#f9f0ff',
                        color: '#764ba2',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '10pt',
                        fontWeight: '500',
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
