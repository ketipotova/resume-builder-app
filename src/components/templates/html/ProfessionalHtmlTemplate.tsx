import type { Resume } from '../../../types/resume';

interface ProfessionalHtmlTemplateProps {
  resume: Resume;
}

export default function ProfessionalHtmlTemplate({ resume }: ProfessionalHtmlTemplateProps) {
  return (
    <div style={{
      width: '210mm',
      minHeight: '297mm',
      margin: '0 auto',
      padding: '0',
      backgroundColor: '#ffffff',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      boxSizing: 'border-box',
    }}>
      {/* Header with Dark Gradient */}
      <div style={{
        background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
        color: '#ffffff',
        padding: '40px 50px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circle */}
        <div style={{
          position: 'absolute',
          top: '-150px',
          right: '-50px',
          width: '300px',
          height: '300px',
          backgroundColor: 'rgba(255,255,255,0.05)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontSize: '36px',
            margin: '0 0 10px 0',
            letterSpacing: '1px',
            fontWeight: '400',
            color: '#ffffff',
          }}>
            {resume.personalInfo?.fullName || 'Your Name'}
          </h1>


          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            fontSize: '14px',
            marginTop: '20px',
          }}>
            {resume.personalInfo.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#667eea', fontSize: '12px', fontWeight: 'bold' }}>●</span>
                <span>{resume.personalInfo.phone}</span>
              </div>
            )}
            {resume.personalInfo.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#667eea', fontSize: '12px', fontWeight: 'bold' }}>●</span>
                <span style={{ wordBreak: 'break-all' }}>{resume.personalInfo.email}</span>
              </div>
            )}
            {resume.personalInfo.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#667eea', fontSize: '12px', fontWeight: 'bold' }}>●</span>
                <span>{resume.personalInfo.location}</span>
              </div>
            )}
            {resume.personalInfo.linkedIn && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#667eea', fontSize: '12px', fontWeight: 'bold' }}>●</span>
                <span style={{ wordBreak: 'break-all' }}>{resume.personalInfo.linkedIn}</span>
              </div>
            )}
            {resume.personalInfo.portfolio && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#667eea', fontSize: '12px', fontWeight: 'bold' }}>●</span>
                <span style={{ wordBreak: 'break-all' }}>{resume.personalInfo.portfolio}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '50px' }}>
        {/* Professional Summary */}
        {resume.summary && resume.summary.trim().length > 0 && (
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
              textAlign: 'justify',
            }}>
              {resume.summary}
            </p>
          </div>
        )}

        {/* Skills */}
        {(resume.skills && ((resume.skills.technical && resume.skills.technical.length > 0) ||
          (resume.skills.soft && resume.skills.soft.length > 0))) && (
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '15px',
            }}>
              {resume.skills && resume.skills.technical && resume.skills.technical.slice(0, 6).map((skill, index) => (
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
                    fontSize: '14px',
                    flexShrink: 0,
                  }}>●</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontWeight: '600',
                      color: '#2d3748',
                      marginBottom: '3px',
                      fontSize: '14px',
                      wordBreak: 'break-word',
                    }}>{skill}</div>
                    <div style={{ fontSize: '13px', color: '#718096' }}>Technical expertise</div>
                  </div>
                </div>
              ))}
              {resume.skills && resume.skills.soft && resume.skills.soft.slice(0, 2).map((skill, index) => (
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
                    fontSize: '14px',
                    flexShrink: 0,
                  }}>●</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontWeight: '600',
                      color: '#2d3748',
                      marginBottom: '3px',
                      fontSize: '14px',
                      wordBreak: 'break-word',
                    }}>{skill}</div>
                    <div style={{ fontSize: '13px', color: '#718096' }}>Key strength</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {resume.experience && resume.experience.length > 0 && (
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
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}>
                  <div style={{ flex: '1 1 300px', minWidth: 0 }}>
                    <div style={{
                      fontSize: '18px',
                      color: '#2d3748',
                      fontWeight: '600',
                      marginBottom: '3px',
                      wordBreak: 'break-word',
                    }}>
                      {exp.position}
                    </div>
                    <div style={{
                      color: '#667eea',
                      fontSize: '16px',
                      fontWeight: '500',
                      wordBreak: 'break-word',
                    }}>
                      {exp.company} {exp.location && `| ${exp.location}`}
                    </div>
                  </div>
                  <div style={{
                    backgroundColor: '#edf2f7',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: '#4a5568',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
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
                      Key Achievements & Responsibilities:
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
                            fontSize: '14px',
                            flexShrink: 0,
                          }}>▸</span>
                          <span style={{
                            color: '#4a5568',
                            fontSize: '14px',
                            flex: 1,
                            minWidth: 0,
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
        {resume.education && resume.education.length > 0 && (
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
              }}>
                <div style={{
                  fontWeight: '600',
                  color: '#2d3748',
                  fontSize: '16px',
                  marginBottom: '5px',
                  wordBreak: 'break-word',
                }}>
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </div>
                <div style={{
                  color: '#718096',
                  fontSize: '14px',
                  wordBreak: 'break-word',
                }}>
                  {edu.institution} | {edu.graduationDate}
                  {edu.gpa && ` | GPA: ${edu.gpa}`}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {resume.skills && resume.skills.certifications && resume.skills.certifications.length > 0 && (
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
              CERTIFICATIONS
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
              {resume.skills.certifications.map((cert, index) => (
                <div key={index} style={{
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
                    fontSize: '14px',
                    flexShrink: 0,
                  }}>▸</div>
                  <div style={{
                    fontWeight: '600',
                    color: '#2d3748',
                    fontSize: '15px',
                    wordBreak: 'break-word',
                    flex: 1,
                  }}>
                    {cert}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}