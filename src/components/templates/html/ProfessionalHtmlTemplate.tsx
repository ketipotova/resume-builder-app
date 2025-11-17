import type { Resume } from '../../../types/resume';

interface ProfessionalHtmlTemplateProps {
  resume: Resume;
}

export function ProfessionalHtmlTemplate({ resume }: ProfessionalHtmlTemplateProps) {
  return (
    <div style={{
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      minHeight: '100vh',
    }}>
      <div style={{
        maxWidth: '210mm',
        margin: '0 auto',
        background: 'white',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
          color: 'white',
          padding: '40px 50px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            content: '""',
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '300px',
            height: '300px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '50%',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{
              fontSize: '36px',
              marginBottom: '10px',
              letterSpacing: '1px',
              fontWeight: '400',
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
                <span style={{ color: '#667eea', fontSize: '8px' }}>●</span>
                {resume.personalInfo.phone}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#667eea', fontSize: '8px' }}>●</span>
                {resume.personalInfo.email}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#667eea', fontSize: '8px' }}>●</span>
                {resume.personalInfo.location}
              </div>
              {resume.personalInfo.linkedIn && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#667eea', fontSize: '8px' }}>●</span>
                  {resume.personalInfo.linkedIn}
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
                paddingBottom: '10px',
                borderBottom: '3px solid #667eea',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontWeight: '600',
              }}>
                Professional Profile
              </h2>
              <p style={{
                lineHeight: '1.8',
                color: '#4a5568',
                fontSize: '15px',
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
                paddingBottom: '10px',
                borderBottom: '3px solid #667eea',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontWeight: '600',
              }}>
                Key Competencies
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '15px',
              }}>
                {resume.skills?.technical && resume.skills.technical.map((skill, index) => (
                  <div key={`tech-${index}`} style={{
                    display: 'flex',
                    alignItems: 'start',
                    gap: '10px',
                    padding: '12px',
                    background: '#f7fafc',
                    borderRadius: '8px',
                    borderLeft: '3px solid #667eea',
                  }}>
                    <div style={{ color: '#667eea', fontWeight: 'bold', marginTop: '2px' }}>●</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', color: '#2d3748', marginBottom: '3px' }}>{skill}</div>
                      <div style={{ fontSize: '13px', color: '#718096' }}>Professional expertise</div>
                    </div>
                  </div>
                ))}
                {resume.skills?.soft && resume.skills.soft.map((skill, index) => (
                  <div key={`soft-${index}`} style={{
                    display: 'flex',
                    alignItems: 'start',
                    gap: '10px',
                    padding: '12px',
                    background: '#f7fafc',
                    borderRadius: '8px',
                    borderLeft: '3px solid #667eea',
                  }}>
                    <div style={{ color: '#667eea', fontWeight: 'bold', marginTop: '2px' }}>●</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', color: '#2d3748', marginBottom: '3px' }}>{skill}</div>
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
                paddingBottom: '10px',
                borderBottom: '3px solid #667eea',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontWeight: '600',
              }}>
                Professional Experience
              </h2>

              {resume.experience.map((exp, index) => (
                <div key={exp.id} style={{ marginBottom: index < resume.experience.length - 1 ? '30px' : '0' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '12px',
                  }}>
                    <div>
                      <div style={{
                        fontSize: '18px',
                        color: '#2d3748',
                        fontWeight: '600',
                      }}>
                        {exp.position}
                      </div>
                      <div style={{
                        color: '#667eea',
                        fontSize: '16px',
                        marginTop: '3px',
                      }}>
                        {exp.company} | {exp.location}
                      </div>
                    </div>
                    <div style={{
                      background: '#edf2f7',
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
                      <ul style={{
                        listStyle: 'none',
                        paddingLeft: '0',
                      }}>
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} style={{
                            paddingLeft: '25px',
                            position: 'relative',
                            marginBottom: '8px',
                            lineHeight: '1.6',
                            color: '#4a5568',
                            fontSize: '14px',
                          }}>
                            <span style={{
                              position: 'absolute',
                              left: '8px',
                              color: '#667eea',
                              fontWeight: 'bold',
                            }}>▸</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
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
                paddingBottom: '10px',
                borderBottom: '3px solid #667eea',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontWeight: '600',
              }}>
                Education
              </h2>
              {resume.education.map((edu, index) => (
                <div key={edu.id} style={{ marginBottom: index < resume.education.length - 1 ? '20px' : '0' }}>
                  <div style={{
                    fontWeight: '600',
                    color: '#2d3748',
                    fontSize: '16px',
                  }}>
                    {edu.degree} in {edu.field}
                  </div>
                  <div style={{
                    color: '#718096',
                    fontSize: '14px',
                    marginTop: '5px',
                  }}>
                    {edu.institution} | {edu.graduationDate}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
