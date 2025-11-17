import type { Resume } from '../../../types/resume';

interface MinimalistHtmlTemplateProps {
  resume: Resume;
}

export default function MinimalistHtmlTemplate({ resume }: MinimalistHtmlTemplateProps) {
  return (
    <div style={{
      width: '210mm',
      minHeight: '297mm',
      margin: '0 auto',
      padding: '60px 70px',
      backgroundColor: '#ffffff',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      boxSizing: 'border-box',
      color: '#1a1a1a',
    }}>
      {/* Simple Header */}
      <div style={{ marginBottom: '50px' }}>
        <h1 style={{
          fontSize: '42px',
          margin: '0 0 8px 0',
          fontWeight: '300',
          color: '#000000',
          letterSpacing: '-0.5px',
        }}>
          {resume.personalInfo?.fullName || 'Your Name'}
        </h1>

        <div style={{
          fontSize: '14px',
          color: '#666666',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          marginTop: '15px',
        }}>
          {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
          {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
          {resume.personalInfo.location && <span>{resume.personalInfo.location}</span>}
          {resume.personalInfo.linkedIn && <span>{resume.personalInfo.linkedIn}</span>}
          {resume.personalInfo.portfolio && <span>{resume.personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {resume.summary && resume.summary.trim().length > 0 && (
        <div style={{ marginBottom: '45px' }}>
          <h2 style={{
            fontSize: '13px',
            color: '#000000',
            marginBottom: '15px',
            marginTop: '0',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
          }}>
            About
          </h2>
          <div style={{
            height: '1px',
            backgroundColor: '#000000',
            marginBottom: '20px',
            width: '50px',
          }} />
          <p style={{
            lineHeight: '1.7',
            color: '#444444',
            fontSize: '15px',
            margin: '0',
            fontWeight: '300',
          }}>
            {resume.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {resume.experience && resume.experience.length > 0 && (
        <div style={{ marginBottom: '45px' }}>
          <h2 style={{
            fontSize: '13px',
            color: '#000000',
            marginBottom: '15px',
            marginTop: '0',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
          }}>
            Experience
          </h2>
          <div style={{
            height: '1px',
            backgroundColor: '#000000',
            marginBottom: '25px',
            width: '50px',
          }} />

          {resume.experience.map((exp, index) => (
            <div key={exp.id} style={{
              marginBottom: index < resume.experience.length - 1 ? '35px' : '0',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '8px',
                gap: '20px',
              }}>
                <div>
                  <div style={{
                    fontSize: '17px',
                    color: '#000000',
                    fontWeight: '500',
                    marginBottom: '4px',
                  }}>
                    {exp.position}
                  </div>
                  <div style={{
                    color: '#666666',
                    fontSize: '15px',
                    fontWeight: '300',
                  }}>
                    {exp.company} {exp.location && `• ${exp.location}`}
                  </div>
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#999999',
                  whiteSpace: 'nowrap',
                  fontWeight: '300',
                }}>
                  {exp.startDate} — {exp.endDate}
                </div>
              </div>

              {exp.achievements && exp.achievements.length > 0 && (
                <div style={{ marginTop: '12px', paddingLeft: '0' }}>
                  {exp.achievements.map((achievement, idx) => (
                    <div key={idx} style={{
                      marginBottom: '6px',
                      lineHeight: '1.6',
                      color: '#444444',
                      fontSize: '14px',
                      fontWeight: '300',
                      paddingLeft: '20px',
                      position: 'relative',
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: '0',
                        color: '#cccccc',
                      }}>—</span>
                      {achievement}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <div style={{ marginBottom: '45px' }}>
          <h2 style={{
            fontSize: '13px',
            color: '#000000',
            marginBottom: '15px',
            marginTop: '0',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
          }}>
            Education
          </h2>
          <div style={{
            height: '1px',
            backgroundColor: '#000000',
            marginBottom: '20px',
            width: '50px',
          }} />
          {resume.education.map((edu, index) => (
            <div key={edu.id} style={{
              marginBottom: index < resume.education.length - 1 ? '20px' : '0',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: '20px',
              }}>
                <div>
                  <div style={{
                    fontWeight: '500',
                    color: '#000000',
                    fontSize: '16px',
                    marginBottom: '3px',
                  }}>
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </div>
                  <div style={{
                    color: '#666666',
                    fontSize: '14px',
                    fontWeight: '300',
                  }}>
                    {edu.institution}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </div>
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#999999',
                  whiteSpace: 'nowrap',
                  fontWeight: '300',
                }}>
                  {edu.graduationDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {(resume.skills && ((resume.skills.technical && resume.skills.technical.length > 0) ||
        (resume.skills.soft && resume.skills.soft.length > 0))) && (
        <div style={{ marginBottom: '45px' }}>
          <h2 style={{
            fontSize: '13px',
            color: '#000000',
            marginBottom: '15px',
            marginTop: '0',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
          }}>
            Skills
          </h2>
          <div style={{
            height: '1px',
            backgroundColor: '#000000',
            marginBottom: '20px',
            width: '50px',
          }} />
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
          }}>
            {resume.skills?.technical && Array.isArray(resume.skills.technical) && resume.skills.technical.map((skill, index) => (
              <span key={`tech-${index}`} style={{
                fontSize: '14px',
                color: '#444444',
                fontWeight: '300',
              }}>
                {skill}{index < resume.skills.technical.length - 1 || (resume.skills.soft && resume.skills.soft.length > 0) ? ' •' : ''}
              </span>
            ))}
            {resume.skills?.soft && Array.isArray(resume.skills.soft) && resume.skills.soft.map((skill, index) => (
              <span key={`soft-${index}`} style={{
                fontSize: '14px',
                color: '#444444',
                fontWeight: '300',
              }}>
                {skill}{index < resume.skills.soft.length - 1 ? ' •' : ''}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {resume.skills && resume.skills.certifications && resume.skills.certifications.length > 0 && (
        <div style={{ marginBottom: '35px' }}>
          <h2 style={{
            fontSize: '13px',
            color: '#000000',
            marginBottom: '15px',
            marginTop: '0',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
          }}>
            Certifications
          </h2>
          <div style={{
            height: '1px',
            backgroundColor: '#000000',
            marginBottom: '20px',
            width: '50px',
          }} />
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
          }}>
            {resume.skills.certifications.map((cert, index) => (
              <span key={index} style={{
                fontSize: '14px',
                color: '#444444',
                fontWeight: '300',
              }}>
                {cert}{index < resume.skills.certifications.length - 1 ? ' •' : ''}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
