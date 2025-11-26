import type { Resume } from '../../../types/resume';

// --- Bold Creative Theme: Vibrant & Distinctive ---
const theme = {
  colors: {
    primary: '#0d0d0d',       // Rich black
    accent: '#ff5722',        // Vibrant orange-red
    accentAlt: '#ff8a65',     // Lighter accent
    text: '#1a1a1a',          
    textMuted: '#666666',     
    background: '#ffffff',
    cardBg: '#fafafa',
    highlight: '#fff3e0',     // Warm highlight
  },
  fonts: {
    display: '"Syne", "Unbounded", sans-serif',
    body: '"Work Sans", "IBM Plex Sans", sans-serif',
    mono: '"JetBrains Mono", "Fira Code", monospace',
  }
};

// --- Components ---
const Badge = ({ text }: { text: string }) => (
  <span style={{
    display: 'inline-block',
    padding: '8px 18px',
    backgroundColor: theme.colors.primary,
    color: '#fff',
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    borderRadius: '2px',
  }}>
    {text}
  </span>
);

const SectionHeader = ({ title, number }: { title: string, number: string }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '28px',
    marginTop: '45px',
  }}>
    <span style={{
      fontFamily: theme.fonts.mono,
      fontSize: '14px',
      fontWeight: '500',
      color: theme.colors.accent,
    }}>
      {number}
    </span>
    <h2 style={{
      fontFamily: theme.fonts.display,
      fontSize: '24px',
      fontWeight: '700',
      color: theme.colors.primary,
      margin: 0,
      letterSpacing: '-0.5px',
    }}>
      {title}
    </h2>
    <div style={{
      flex: 1,
      height: '2px',
      backgroundColor: theme.colors.primary,
    }} />
  </div>
);

const SkillTag = ({ skill }: { skill: string }) => (
  <span style={{
    display: 'inline-block',
    padding: '10px 20px',
    border: `2px solid ${theme.colors.primary}`,
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '0.5px',
    borderRadius: '0',
    transition: 'all 0.2s',
  }}>
    {skill}
  </span>
);

// --- Main Template ---
interface BoldCreativeTemplateProps {
  resume: Resume;
}

export default function BoldCreativeTemplate({ resume }: BoldCreativeTemplateProps) {
  const hasArray = (arr: any[]) => Array.isArray(arr) && arr.length > 0;

  return (
    <div className="resume-container" style={{
      width: '210mm',
      minHeight: '297mm',
      margin: '0 auto',
      backgroundColor: theme.colors.background,
      fontFamily: theme.fonts.body,
      color: theme.colors.text,
      lineHeight: '1.65',
      boxSizing: 'border-box',
      position: 'relative',
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Syne:wght@400;500;600;700;800&family=Work+Sans:wght@300;400;500;600;700&display=swap');
        
        @media print {
          @page { margin: 0; size: A4; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-break { break-inside: avoid; page-break-inside: avoid; }
        }
      `}} />

      {/* Decorative Top Bar */}
      <div style={{
        height: '8px',
        background: `linear-gradient(90deg, ${theme.colors.accent} 0%, ${theme.colors.accent} 40%, ${theme.colors.primary} 40%, ${theme.colors.primary} 100%)`,
      }} />

      {/* Header */}
      <header style={{ padding: '50px 55px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{
              fontFamily: theme.fonts.display,
              fontSize: '48px',
              fontWeight: '800',
              margin: '0 0 12px 0',
              letterSpacing: '-2px',
              color: theme.colors.primary,
              lineHeight: '1.1',
            }}>
              {resume.personalInfo?.fullName?.split(' ').map((word, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {i === 0 ? word : <span style={{ color: theme.colors.accent }}>{word}</span>}
                </span>
              )) || 'Your Name'}
            </h1>
          </div>

          {/* Contact Block */}
          <div style={{
            textAlign: 'right',
            fontFamily: theme.fonts.mono,
            fontSize: '12px',
            color: theme.colors.textMuted,
            lineHeight: '2',
          }}>
            {resume.personalInfo?.email && <div>{resume.personalInfo.email}</div>}
            {resume.personalInfo?.phone && <div>{resume.personalInfo.phone}</div>}
            {resume.personalInfo?.location && <div>{resume.personalInfo.location}</div>}
            {resume.personalInfo?.linkedIn && (
              <a href={resume.personalInfo.linkedIn} style={{ color: theme.colors.accent, textDecoration: 'none' }}>
                linkedin ↗
              </a>
            )}
          </div>
        </div>

        {/* Summary as big quote */}
        {resume.summary && (
          <div style={{
            marginTop: '40px',
            paddingLeft: '25px',
            borderLeft: `4px solid ${theme.colors.accent}`,
          }}>
            <p style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: '400',
              color: theme.colors.text,
              lineHeight: '1.8',
              fontStyle: 'italic',
            }}>
              {resume.summary}
            </p>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div style={{ padding: '0 55px 50px' }}>
        
        {/* Experience */}
        {hasArray(resume.experience) && (
          <section>
            <SectionHeader title="Experience" number="01" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
              {resume.experience.map((exp, index) => (
                <div key={exp.id || index} className="no-break" style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: '35px',
                }}>
                  {/* Left Column */}
                  <div style={{
                    paddingTop: '4px',
                  }}>
                    <div style={{
                      fontFamily: theme.fonts.mono,
                      fontSize: '11px',
                      color: theme.colors.accent,
                      marginBottom: '8px',
                      fontWeight: '500',
                    }}>
                      {exp.startDate} → {exp.endDate}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: theme.colors.primary,
                    }}>
                      {exp.company}
                    </div>
                    {exp.location && (
                      <div style={{ 
                        fontSize: '12px', 
                        color: theme.colors.textMuted,
                        marginTop: '2px',
                      }}>
                        {exp.location}
                      </div>
                    )}
                  </div>

                  {/* Right Column */}
                  <div>
                    <h3 style={{
                      fontFamily: theme.fonts.display,
                      fontSize: '18px',
                      fontWeight: '600',
                      color: theme.colors.primary,
                      margin: '0 0 12px 0',
                    }}>
                      {exp.position}
                    </h3>

                    {hasArray(exp.achievements) && (
                      <ul style={{
                        margin: 0,
                        paddingLeft: '0',
                        listStyle: 'none',
                      }}>
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px',
                            marginBottom: '8px',
                            fontSize: '13px',
                            color: theme.colors.text,
                          }}>
                            <span style={{
                              fontFamily: theme.fonts.mono,
                              color: theme.colors.accent,
                              fontWeight: '600',
                              fontSize: '12px',
                              marginTop: '1px',
                            }}>+</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {hasArray(resume.skills?.technical) && (
          <section className="no-break">
            <SectionHeader title="Skills" number="02" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {resume.skills.technical.map((skill, i) => (
                <SkillTag key={i} skill={skill} />
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {resume.projects && hasArray(resume.projects) && (
          <section>
            <SectionHeader title="Projects" number="03" />
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px',
            }}>
              {resume.projects.map((proj, index) => (
                <div key={index} style={{
                  padding: '24px',
                  backgroundColor: index % 2 === 0 ? theme.colors.cardBg : theme.colors.highlight,
                  borderRadius: '0',
                  border: `1px solid ${theme.colors.primary}`,
                }}>
                  <div style={{
                    fontFamily: theme.fonts.display,
                    fontSize: '15px',
                    fontWeight: '700',
                    color: theme.colors.primary,
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    {proj.name}
                    {proj.link && (
                      <a href={proj.link} style={{
                        color: theme.colors.accent,
                        fontSize: '12px',
                        textDecoration: 'none',
                        fontFamily: theme.fonts.mono,
                      }}>view ↗</a>
                    )}
                  </div>
                  <p style={{
                    fontSize: '12px',
                    margin: 0,
                    color: theme.colors.textMuted,
                    lineHeight: '1.6',
                  }}>
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {hasArray(resume.education) && (
          <section className="no-break">
            <SectionHeader title="Education" number="04" />
            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              {resume.education.map((edu, index) => (
                <div key={edu.id || index} style={{ flex: '1 1 250px' }}>
                  <div style={{
                    fontFamily: theme.fonts.display,
                    fontSize: '15px',
                    fontWeight: '700',
                    color: theme.colors.primary,
                    marginBottom: '4px',
                  }}>
                    {edu.degree}
                  </div>
                  {edu.field && (
                    <div style={{
                      fontSize: '13px',
                      color: theme.colors.accent,
                      fontWeight: '500',
                      marginBottom: '6px',
                    }}>
                      {edu.field}
                    </div>
                  )}
                  <div style={{ fontSize: '13px', color: theme.colors.textMuted }}>
                    {edu.institution}
                  </div>
                  <div style={{
                    fontFamily: theme.fonts.mono,
                    fontSize: '11px',
                    color: theme.colors.textMuted,
                    marginTop: '4px',
                  }}>
                    {edu.graduationDate}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Footer Accent */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '4px',
        backgroundColor: theme.colors.accent,
      }} />
    </div>
  );
}