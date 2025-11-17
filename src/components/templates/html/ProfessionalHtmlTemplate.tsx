import type { Resume } from '../../../types/resume';

interface ProfessionalHtmlTemplateProps {
  resume: Resume;
}

export function ProfessionalHtmlTemplate({ resume }: ProfessionalHtmlTemplateProps) {
  return (
    <div style={{
      width: '210mm',
      minHeight: '297mm',
      margin: '0',
      padding: '0',
      backgroundColor: '#ffffff',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    }}>
      {/* Header with Dark Gradient */}
      <div style={{
        background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
        color: '#ffffff',
        padding: '40px 50px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circle - using actual div instead of pseudo-element */}
        <div style={{
          position: 'absolute',
          top: '-150px',
          right: '-50px',
          width: '300px',
          height: '300px',
          backgroundColor: 'rgba(255,255,255,0.05)',
          borderRadius: '50%',
        }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontSize: '36px',
            margin: '0 0 10px 0',
            letterSpacing: '1px',
            fontWeight: '400',
            color: '#ffffff',
          }}>
            {resume.personalInfo.fullName}
          </h1>

          <div style={{
            fontSize: '18px',
            color: '#a0aec0',
            marginBottom: '20px',
            fontWeight: '300',
          }}>
            Professional Title
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '25px',
            fontSize: '14px',
            marginTop: '20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#667eea', fontSize: '12px', fontWeight: 'bold' }}>●</span>
              <span>{resume.personalInfo.phone}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#667eea', fontSize: '12px', fontWeight: 'bold' }}>●</span>
              <span>{resume.personalInfo.email}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#667eea', fontSize: '12px', fontWeight: 'bold' }}>●</span>
              <span>{resume.personalInfo.location}</span>
            </div>
            {resume.personalInfo.linkedIn && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#667eea', fontSize: '12px', fontWeight: 'bold' }}>●</span>
                <span>{resume.personalInfo.linkedIn}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '50px' }}>
        {/* Professional Summary */}
        {resume.summary && (
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{
              fontSize: '20px',
              color: '#2d3748',
              marginBottom: '20px',
              marginTop: '0',
              paddingBottom: '10px',
              borderBottom: '3px solid #667eea',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: '600',
            }}>
              PROFESSIONAL PROFILE
            </h2>
            <p style={{
              lineHeight: '1.8',
              color: '#4a5568',
              fontSize: '15px',
              margin: '0',
            }}>
              {resume.summary}
            </p>
          </div>
        )}

        {/* Skills */}
        {(resume.skills?.technical?.length > 0 || resume.skills?.soft?.length > 0) && (
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{
              fontSize: '20px',
              color: '#2d3748',
              marginBottom: '20px',
              marginTop: '0',
              paddingBottom: '10px',
              borderBottom: '3px solid #667eea',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: '600',
            }}>
              KEY COMPETENCIES
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '15px',
            }}>
              {resume.skills?.technical && resume.skills.technical.map((skill, index) => (
                <div key={`tech-${index}`} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '12px',
                  backgroundColor: '#f7fafc',
                  borderRadius: '8px',
                  borderLeft: '3px solid #667eea',
                }}>
                  <div style={{
                    color: '#667eea',
                    fontWeight: 'bold',
                    marginTop: '2px',
                    fontSize: '14px'
                  }}>●</div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontWeight: '600',
                      color: '#2d3748',
                      marginBottom: '3px',
                      fontSize: '14px'
                    }}>{skill}</div>
                    <div style={{ fontSize: '13px', color: '#718096' }}>Professional expertise</div>
                  </div>
                </div>
              ))}
              {resume.skills?.soft && resume.skills.soft.map((skill, index) => (
                <div key={`soft-${index}`} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '12px',
                  backgroundColor: '#f7fafc',
                  borderRadius: '8px',
                  borderLeft: '3px solid #667eea',
                }}>
                  <div style={{
                    color: '#667eea',
                    fontWeight: 'bold',
                    marginTop: '2px',
                    fontSize: '14px'
                  }}>●</div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontWeight: '600',
                      color: '#2d3748',
                      marginBottom: '3px',
                      fontSize: '14px'
                    }}>{skill}</div>
                    <div style={{ fontSize: '13px', color: '#718096' }}>Key strength</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {resume.experience.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{
              fontSize: '20px',
              color: '#2d3748',
              marginBottom: '20px',
              marginTop: '0',
              paddingBottom: '10px',
              borderBottom: '3px solid #667eea',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: '600',
            }}>
              PROFESSIONAL EXPERIENCE
            </h2>

            {resume.experience.map((exp, index) => (
              <div key={exp.id} style={{
                marginBottom: index < resume.experience.length - 1 ? '30px' : '0',
                pageBreakInside: 'avoid'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px',
                }}>
                  <div style={{ flex: 1, paddingRight: '20px' }}>
                    <div style={{
                      fontSize: '18px',
                      color: '#2d3748',
                      fontWeight: '600',
                      marginBottom: '3px',
                    }}>
                      {exp.position}
                    </div>
                    <div style={{
                      color: '#667eea',
                      fontSize: '16px',
                      fontWeight: '500',
                    }}>
                      {exp.company} | {exp.location}
                    </div>
                  </div>
                  <div style={{
                    backgroundColor: '#edf2f7',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: '#4a5568',
                    whiteSpace: 'nowrap',
                  }}>
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>

                {exp.achievements && exp.achievements.length > 0 && (
                  <div style={{ marginTop: '15px' }}>
                    <div style={{
                      fontWeight: '600',
                      color: '#2d3748',
                      marginBottom: '8px',
                      fontSize: '14px',
                    }}>
                      Key Responsibilities:
                    </div>
                    <div style={{ paddingLeft: '0' }}>
                      {exp.achievements.map((achievement, idx) => (
                        <div key={idx} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          marginBottom: '8px',
                          lineHeight: '1.6',
                        }}>
                          <span style={{
                            color: '#667eea',
                            fontWeight: 'bold',
                            marginRight: '10px',
                            marginTop: '2px',
                            fontSize: '14px'
                          }}>▸</span>
                          <span style={{
                            color: '#4a5568',
                            fontSize: '14px',
                            flex: 1,
                          }}>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{
              fontSize: '20px',
              color: '#2d3748',
              marginBottom: '20px',
              marginTop: '0',
              paddingBottom: '10px',
              borderBottom: '3px solid #667eea',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: '600',
            }}>
              EDUCATION
            </h2>
            {resume.education.map((edu, index) => (
              <div key={edu.id} style={{
                marginBottom: index < resume.education.length - 1 ? '20px' : '0',
                pageBreakInside: 'avoid'
              }}>
                <div style={{
                  fontWeight: '600',
                  color: '#2d3748',
                  fontSize: '16px',
                  marginBottom: '5px',
                }}>
                  {edu.degree} in {edu.field}
                </div>
                <div style={{
                  color: '#718096',
                  fontSize: '14px',
                }}>
                  {edu.institution} | {edu.graduationDate}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
