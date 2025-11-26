import type { Resume } from '../../../types/resume';

// --- Minimal Nordic Theme: Calm & Refined ---
const theme = {
  colors: {
    text: '#111827',          // Almost black
    textSecondary: '#6b7280', // Warm grey
    textTertiary: '#9ca3af',  // Light grey
    accent: '#111827',        // Same as text (monochrome)
    background: '#ffffff',
    line: '#e5e7eb',          // Subtle divider
    highlight: '#fafafa',     // Off-white
  },
  fonts: {
    heading: '"Libre Baskerville", "Lora", Georgia, serif',
    body: '"Source Sans Pro", "Open Sans", sans-serif',
  }
};

// --- Components ---
const SectionDivider = () => (
  <div style={{
    width: '100%',
    height: '1px',
    backgroundColor: theme.colors.line,
    margin: '36px 0',
  }} />
);

const SectionTitle = ({ title }: { title: string }) => (
  <h2 style={{
    fontFamily: theme.fonts.heading,
    fontSize: '12px',
    fontWeight: '400',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: theme.colors.textSecondary,
    marginBottom: '24px',
    marginTop: 0,
  }}>
    {title}
  </h2>
);

// --- Main Template ---
interface MinimalNordicTemplateProps {
  resume: Resume;
}

export default function MinimalNordicTemplate({ resume }: MinimalNordicTemplateProps) {
  const hasArray = (arr: any[]) => Array.isArray(arr) && arr.length > 0;

  return (
    <div className="resume-container" style={{
      width: '210mm',
      minHeight: '297mm',
      margin: '0 auto',
      backgroundColor: theme.colors.background,
      fontFamily: theme.fonts.body,
      color: theme.colors.text,
      lineHeight: '1.75',
      boxSizing: 'border-box',
      padding: '70px 65px',
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+Pro:wght@300;400;600;700&display=swap');
        
        @media print {
          @page { margin: 0; size: A4; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-break { break-inside: avoid; page-break-inside: avoid; }
        }
      `}} />

      {/* Header - Extremely Minimal */}
      <header style={{ marginBottom: '50px' }}>
        <h1 style={{
          fontFamily: theme.fonts.heading,
          fontSize: '32px',
          fontWeight: '400',
          margin: '0 0 12px 0',
          letterSpacing: '1px',
          color: theme.colors.text,
        }}>
          {resume.personalInfo?.fullName || 'Your Name'}
        </h1>

        {/* Contact - Single Line */}
        <div style={{
          fontSize: '13px',
          color: theme.colors.textSecondary,
          fontWeight: '400',
        }}>
          {[
            resume.personalInfo?.email,
            resume.personalInfo?.phone,
            resume.personalInfo?.location,
          ].filter(Boolean).join('  ·  ')}
          {(resume.personalInfo?.linkedIn || resume.personalInfo?.portfolio) && (
            <span>
              {'  ·  '}
              {resume.personalInfo?.linkedIn && (
                <a href={resume.personalInfo.linkedIn} style={{ color: theme.colors.text, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                  LinkedIn
                </a>
              )}
              {resume.personalInfo?.linkedIn && resume.personalInfo?.portfolio && '  ·  '}
              {resume.personalInfo?.portfolio && (
                <a href={resume.personalInfo.portfolio} style={{ color: theme.colors.text, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                  Portfolio
                </a>
              )}
            </span>
          )}
        </div>
      </header>

      <SectionDivider />

      {/* Summary */}
      {resume.summary && (
        <>
          <section className="no-break">
            <p style={{
              margin: 0,
              fontSize: '14px',
              fontWeight: '300',
              color: theme.colors.text,
              lineHeight: '1.9',
              maxWidth: '100%',
            }}>
              {resume.summary}
            </p>
          </section>
          <SectionDivider />
        </>
      )}

      {/* Experience */}
      {hasArray(resume.experience) && (
        <section>
          <SectionTitle title="Experience" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {resume.experience.map((exp, index) => (
              <div key={exp.id || index} className="no-break" style={{
                display: 'grid',
                gridTemplateColumns: '140px 1fr',
                gap: '30px',
              }}>
                {/* Left: Date & Company */}
                <div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: theme.colors.textTertiary,
                    marginBottom: '6px',
                  }}>
                    {exp.startDate} — {exp.endDate}
                  </div>
                  <div style={{ 
                    fontSize: '13px',
                    fontWeight: '600',
                    color: theme.colors.textSecondary,
                  }}>
                    {exp.company}
                  </div>
                  {exp.location && (
                    <div style={{ fontSize: '12px', color: theme.colors.textTertiary }}>
                      {exp.location}
                    </div>
                  )}
                </div>

                {/* Right: Position & Achievements */}
                <div>
                  <h3 style={{ 
                    fontFamily: theme.fonts.heading,
                    fontSize: '15px', 
                    fontWeight: '400', 
                    color: theme.colors.text, 
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
                          marginBottom: '8px',
                          fontSize: '13px',
                          fontWeight: '300',
                          color: theme.colors.text,
                          paddingLeft: '16px',
                          position: 'relative',
                        }}>
                          <span style={{
                            position: 'absolute',
                            left: 0,
                            top: '0.5em',
                          }}>—</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
          <SectionDivider />
        </section>
      )}

      {/* Skills */}
      {hasArray(resume.skills?.technical) && (
        <>
          <section className="no-break">
            <SectionTitle title="Skills" />
            <p style={{ 
              margin: 0, 
              fontSize: '13px',
              fontWeight: '300',
              color: theme.colors.text,
              lineHeight: '2.2',
            }}>
              {resume.skills.technical.join(',  ')}
            </p>
          </section>
          <SectionDivider />
        </>
      )}

      {/* Two Column Footer: Education & Projects */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '60px',
      }}>
        
        {/* Education */}
        {hasArray(resume.education) && (
          <section className="no-break">
            <SectionTitle title="Education" />
            {resume.education.map((edu, index) => (
              <div key={edu.id || index} style={{ marginBottom: '20px' }}>
                <div style={{ 
                  fontFamily: theme.fonts.heading,
                  fontSize: '14px', 
                  fontWeight: '400', 
                  color: theme.colors.text,
                  marginBottom: '4px',
                }}>
                  {edu.degree}{edu.field && ` in ${edu.field}`}
                </div>
                <div style={{ fontSize: '13px', color: theme.colors.textSecondary, fontWeight: '300' }}>
                  {edu.institution}
                </div>
                <div style={{ fontSize: '12px', color: theme.colors.textTertiary }}>
                  {edu.graduationDate}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {resume.projects && hasArray(resume.projects) && (
          <section className="no-break">
            <SectionTitle title="Projects" />
            {resume.projects.map((proj, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <div style={{
                  fontFamily: theme.fonts.heading,
                  fontSize: '14px',
                  fontWeight: '400',
                  color: theme.colors.text,
                  marginBottom: '4px',
                }}>
                  {proj.name}
                  {proj.link && (
                    <a href={proj.link} style={{
                      marginLeft: '10px',
                      fontSize: '12px',
                      color: theme.colors.textTertiary,
                      textDecoration: 'none',
                    }}>↗</a>
                  )}
                </div>
                <p style={{
                  fontSize: '13px',
                  margin: 0,
                  color: theme.colors.textSecondary,
                  fontWeight: '300',
                  lineHeight: '1.6',
                }}>
                  {proj.description}
                </p>
              </div>
            ))}
          </section>
        )}
      </div>

    </div>
  );
}