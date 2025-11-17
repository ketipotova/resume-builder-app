import type { Resume } from '../../../types/resume';

interface CreativeHtmlTemplateProps {
  resume: Resume;
}

export default function CreativeHtmlTemplate({ resume }: CreativeHtmlTemplateProps) {
  return (
    <div style={{
      width: '210mm',
      minHeight: '297mm',
      margin: '0 auto',
      padding: '0',
      backgroundColor: '#ffffff',
      fontFamily: '"Poppins", "Helvetica Neue", sans-serif',
      boxSizing: 'border-box',
      display: 'flex',
    }}>
      {/* Left Sidebar */}
      <div style={{
        width: '35%',
        backgroundColor: '#1e3a5f',
        color: '#ffffff',
        padding: '50px 30px',
        boxSizing: 'border-box',
      }}>
        {/* Name in sidebar */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '28px',
            margin: '0',
            fontWeight: '600',
            lineHeight: '1.2',
            wordBreak: 'break-word',
          }}>
            {resume.personalInfo?.fullName || 'Your Name'}
          </h1>
        </div>

        {/* Contact Info */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{
            fontSize: '14px',
            margin: '0 0 20px 0',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            color: '#fbbf24',
          }}>
            Contact
          </h3>
          <div style={{ fontSize: '12px', lineHeight: '1.8' }}>
            {resume.personalInfo.phone && (
              <div style={{ marginBottom: '12px', wordBreak: 'break-word' }}>
                <div style={{ color: '#94a3b8', marginBottom: '3px', fontSize: '11px' }}>Phone</div>
                <div>{resume.personalInfo.phone}</div>
              </div>
            )}
            {resume.personalInfo.email && (
              <div style={{ marginBottom: '12px', wordBreak: 'break-word' }}>
                <div style={{ color: '#94a3b8', marginBottom: '3px', fontSize: '11px' }}>Email</div>
                <div>{resume.personalInfo.email}</div>
              </div>
            )}
            {resume.personalInfo.location && (
              <div style={{ marginBottom: '12px', wordBreak: 'break-word' }}>
                <div style={{ color: '#94a3b8', marginBottom: '3px', fontSize: '11px' }}>Location</div>
                <div>{resume.personalInfo.location}</div>
              </div>
            )}
            {resume.personalInfo.linkedIn && (
              <div style={{ marginBottom: '12px', wordBreak: 'break-word' }}>
                <div style={{ color: '#94a3b8', marginBottom: '3px', fontSize: '11px' }}>LinkedIn</div>
                <div>{resume.personalInfo.linkedIn}</div>
              </div>
            )}
            {resume.personalInfo.portfolio && (
              <div style={{ marginBottom: '12px', wordBreak: 'break-word' }}>
                <div style={{ color: '#94a3b8', marginBottom: '3px', fontSize: '11px' }}>Portfolio</div>
                <div>{resume.personalInfo.portfolio}</div>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {resume.skills && (
          <>
            {resume.skills.technical && resume.skills.technical.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{
                  fontSize: '14px',
                  margin: '0 0 20px 0',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  color: '#fbbf24',
                }}>
                  Technical Skills
                </h3>
                <div style={{ fontSize: '13px', lineHeight: '1.8' }}>
                  {resume.skills.technical.map((skill, index) => (
                    <div key={`tech-${index}`} style={{
                      marginBottom: '10px',
                      paddingLeft: '15px',
                      position: 'relative',
                    }}>
                      <div style={{
                        position: 'absolute',
                        left: '0',
                        top: '6px',
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#fbbf24',
                        borderRadius: '50%',
                      }} />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resume.skills.soft && resume.skills.soft.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{
                  fontSize: '14px',
                  margin: '0 0 20px 0',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  color: '#fbbf24',
                }}>
                  Soft Skills
                </h3>
                <div style={{ fontSize: '13px', lineHeight: '1.8' }}>
                  {resume.skills.soft.map((skill, index) => (
                    <div key={`soft-${index}`} style={{
                      marginBottom: '10px',
                      paddingLeft: '15px',
                      position: 'relative',
                    }}>
                      <div style={{
                        position: 'absolute',
                        left: '0',
                        top: '6px',
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#fbbf24',
                        borderRadius: '50%',
                      }} />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resume.skills.certifications && resume.skills.certifications.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{
                  fontSize: '14px',
                  margin: '0 0 20px 0',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  color: '#fbbf24',
                }}>
                  Certifications
                </h3>
                <div style={{ fontSize: '12px', lineHeight: '1.8' }}>
                  {resume.skills.certifications.map((cert, index) => (
                    <div key={index} style={{
                      marginBottom: '10px',
                      paddingLeft: '15px',
                      position: 'relative',
                    }}>
                      <div style={{
                        position: 'absolute',
                        left: '0',
                        top: '6px',
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#fbbf24',
                        borderRadius: '50%',
                      }} />
                      {cert}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Right Content Area */}
      <div style={{
        width: '65%',
        padding: '50px 45px',
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
      }}>
        {/* Professional Summary */}
        {resume.summary && resume.summary.trim().length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{
              fontSize: '18px',
              color: '#1e3a5f',
              marginBottom: '15px',
              marginTop: '0',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              position: 'relative',
              paddingBottom: '12px',
            }}>
              Profile
              <div style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '40px',
                height: '3px',
                backgroundColor: '#fbbf24',
              }} />
            </h2>
            <p style={{
              lineHeight: '1.7',
              color: '#4b5563',
              fontSize: '14px',
              margin: '0',
              textAlign: 'justify',
            }}>
              {resume.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {resume.experience && resume.experience.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{
              fontSize: '18px',
              color: '#1e3a5f',
              marginBottom: '25px',
              marginTop: '0',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              position: 'relative',
              paddingBottom: '12px',
            }}>
              Experience
              <div style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '40px',
                height: '3px',
                backgroundColor: '#fbbf24',
              }} />
            </h2>

            {resume.experience.map((exp, index) => (
              <div key={exp.id} style={{
                marginBottom: index < resume.experience.length - 1 ? '30px' : '0',
                position: 'relative',
                paddingLeft: '25px',
                borderLeft: '2px solid #e5e7eb',
              }}>
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute',
                  left: '-6px',
                  top: '5px',
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#fbbf24',
                  borderRadius: '50%',
                  border: '2px solid #ffffff',
                }} />

                <div style={{ marginBottom: '10px' }}>
                  <div style={{
                    fontSize: '16px',
                    color: '#1e3a5f',
                    fontWeight: '600',
                    marginBottom: '5px',
                  }}>
                    {exp.position}
                  </div>
                  <div style={{
                    color: '#6b7280',
                    fontSize: '14px',
                    fontWeight: '500',
                  }}>
                    {exp.company} {exp.location && `| ${exp.location}`}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#9ca3af',
                    marginTop: '3px',
                  }}>
                    {exp.startDate} — {exp.endDate}
                  </div>
                </div>

                {exp.achievements && exp.achievements.length > 0 && (
                  <div style={{ marginTop: '12px' }}>
                    {exp.achievements.map((achievement, idx) => (
                      <div key={idx} style={{
                        marginBottom: '8px',
                        lineHeight: '1.6',
                        color: '#4b5563',
                        fontSize: '13px',
                        paddingLeft: '15px',
                        position: 'relative',
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: '0',
                          color: '#fbbf24',
                          fontWeight: 'bold',
                        }}>→</span>
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
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{
              fontSize: '18px',
              color: '#1e3a5f',
              marginBottom: '25px',
              marginTop: '0',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              position: 'relative',
              paddingBottom: '12px',
            }}>
              Education
              <div style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '40px',
                height: '3px',
                backgroundColor: '#fbbf24',
              }} />
            </h2>
            {resume.education.map((edu, index) => (
              <div key={edu.id} style={{
                marginBottom: index < resume.education.length - 1 ? '20px' : '0',
                paddingLeft: '25px',
                position: 'relative',
                borderLeft: '2px solid #e5e7eb',
              }}>
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute',
                  left: '-6px',
                  top: '5px',
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#fbbf24',
                  borderRadius: '50%',
                  border: '2px solid #ffffff',
                }} />

                <div style={{
                  fontWeight: '600',
                  color: '#1e3a5f',
                  fontSize: '15px',
                  marginBottom: '5px',
                }}>
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </div>
                <div style={{
                  color: '#6b7280',
                  fontSize: '13px',
                }}>
                  {edu.institution}
                  {edu.gpa && ` | GPA: ${edu.gpa}`}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  marginTop: '3px',
                }}>
                  {edu.graduationDate}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
