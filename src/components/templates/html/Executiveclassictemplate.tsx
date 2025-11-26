import type { Resume } from '../../../types/resume';

// --- Executive Classic Theme: Timeless Elegance ---
const theme = {
  colors: {
    primary: '#1a1a2e',      // Deep navy
    accent: '#c9a227',       // Warm gold
    text: '#2d2d2d',         // Rich charcoal
    textMuted: '#6b6b6b',    // Refined grey
    background: '#fefefe',
    cream: '#f9f7f3',        // Warm cream accent
    border: '#d4d0c8',       // Warm border
  },
  fonts: {
    serif: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    sans: '"Raleway", "Lato", sans-serif',
  }
};

// --- Decorative Elements ---
const Divider = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    margin: '28px 0',
  }}>
    <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, transparent, ${theme.colors.border})` }} />
    <div style={{ 
      width: '6px', 
      height: '6px', 
      backgroundColor: theme.colors.accent,
      transform: 'rotate(45deg)',
    }} />
    <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, transparent, ${theme.colors.border})` }} />
  </div>
);

const SectionHeader = ({ title }: { title: string }) => (
  <div style={{ marginBottom: '20px', marginTop: '32px' }}>
    <h2 style={{
      fontFamily: theme.fonts.serif,
      fontSize: '13px',
      textTransform: 'uppercase',
      letterSpacing: '4px',
      fontWeight: '600',
      color: theme.colors.accent,
      margin: 0,
      paddingBottom: '8px',
      borderBottom: `1px solid ${theme.colors.border}`,
    }}>
      {title}
    </h2>
  </div>
);

// --- Main Template ---
interface ExecutiveClassicTemplateProps {
  resume: Resume;
}

export default function ExecutiveClassicTemplate({ resume }: ExecutiveClassicTemplateProps) {
  const hasArray = (arr: any[]) => Array.isArray(arr) && arr.length > 0;

  return (
    <div className="resume-container" style={{
      width: '210mm',
      minHeight: '297mm',
      margin: '0 auto',
      backgroundColor: theme.colors.background,
      fontFamily: theme.fonts.sans,
      color: theme.colors.text,
      lineHeight: '1.7',
      boxSizing: 'border-box',
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Raleway:wght@300;400;500;600&display=swap');
        
        @media print {
          @page { margin: 0; size: A4; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-break { break-inside: avoid; page-break-inside: avoid; }
        }
      `}} />

      {/* Elegant Header */}
      <header style={{
        padding: '55px 60px 45px',
        textAlign: 'center',
        borderBottom: `3px double ${theme.colors.border}`,
        backgroundColor: theme.colors.cream,
      }}>
        <h1 style={{
          fontFamily: theme.fonts.serif,
          fontSize: '38px',
          fontWeight: '600',
          margin: '0 0 8px 0',
          letterSpacing: '3px',
          color: theme.colors.primary,
          textTransform: 'uppercase',
        }}>
          {resume.personalInfo?.fullName || 'Your Name'}
        </h1>

        {/* Contact Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '8px 28px',
          fontSize: '12px',
          color: theme.colors.textMuted,
          letterSpacing: '0.5px',
        }}>
          {resume.personalInfo?.phone && (
            <span>{resume.personalInfo.phone}</span>
          )}
          {resume.personalInfo?.email && (
            <a href={`mailto:${resume.personalInfo.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>
              {resume.personalInfo.email}
            </a>
          )}
          {resume.personalInfo?.location && (
            <span>{resume.personalInfo.location}</span>
          )}
          {resume.personalInfo?.linkedIn && (
            <a href={resume.personalInfo.linkedIn} style={{ color: theme.colors.accent, textDecoration: 'none' }}>
              LinkedIn
            </a>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div style={{ padding: '35px 60px 50px' }}>
        
        {/* Executive Summary */}
        {resume.summary && (
          <div className="no-break">
            <Divider />
            <p style={{
              margin: 0,
              fontFamily: theme.fonts.serif,
              fontSize: '15px',
              fontStyle: 'italic',
              textAlign: 'center',
              color: theme.colors.text,
              maxWidth: '85%',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: '1.9',
            }}>
              "{resume.summary}"
            </p>
            <Divider />
          </div>
        )}

        {/* Experience */}
        {hasArray(resume.experience) && (
          <section>
            <SectionHeader title="Professional Experience" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {resume.experience.map((exp, index) => (
                <div key={exp.id || index} className="no-break">
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'baseline',
                    marginBottom: '6px'
                  }}>
                    <h3 style={{ 
                      fontFamily: theme.fonts.serif,
                      fontSize: '17px', 
                      fontWeight: '600', 
                      color: theme.colors.primary, 
                      margin: 0,
                    }}>
                      {exp.position}
                    </h3>
                    <span style={{ 
                      fontSize: '12px', 
                      color: theme.colors.textMuted,
                      fontStyle: 'italic',
                    }}>
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  
                  <div style={{ 
                    fontSize: '13px',
                    fontWeight: '500',
                    color: theme.colors.accent,
                    marginBottom: '10px',
                    letterSpacing: '0.5px',
                  }}>
                    {exp.company}
                    {exp.location && <span style={{ color: theme.colors.textMuted, fontWeight: '400' }}> · {exp.location}</span>}
                  </div>

                  {hasArray(exp.achievements) && (
                    <ul style={{ 
                      margin: 0, 
                      paddingLeft: '20px',
                      listStyle: 'none',
                    }}>
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} style={{ 
                          position: 'relative', 
                          marginBottom: '5px',
                          fontSize: '13px',
                          color: theme.colors.text,
                        }}>
                          <span style={{ 
                            position: 'absolute', 
                            left: '-16px', 
                            top: '8px',
                            width: '5px',
                            height: '1px',
                            backgroundColor: theme.colors.accent,
                          }} />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {hasArray(resume.skills?.technical) && (
          <div className="no-break">
            <SectionHeader title="Areas of Expertise" />
            <p style={{ 
              margin: 0, 
              fontSize: '13px',
              color: theme.colors.text,
              lineHeight: '2',
            }}>
              {resume.skills.technical.join('  ·  ')}
            </p>
          </div>
        )}

        {/* Education & Projects Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '10px' }}>
          
          {/* Education */}
          {hasArray(resume.education) && (
            <div className="no-break">
              <SectionHeader title="Education" />
              {resume.education.map((edu, index) => (
                <div key={edu.id || index} style={{ marginBottom: '15px' }}>
                  <div style={{ 
                    fontFamily: theme.fonts.serif,
                    fontWeight: '600', 
                    fontSize: '14px', 
                    color: theme.colors.primary 
                  }}>
                    {edu.degree}{edu.field && `, ${edu.field}`}
                  </div>
                  <div style={{ fontSize: '12px', color: theme.colors.textMuted, marginTop: '3px' }}>
                    {edu.institution} · {edu.graduationDate}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {resume.projects && hasArray(resume.projects) && (
            <div className="no-break">
              <SectionHeader title="Notable Projects" />
              {resume.projects.map((proj, index) => (
                <div key={index} style={{ marginBottom: '15px' }}>
                  <div style={{
                    fontFamily: theme.fonts.serif,
                    fontWeight: '600',
                    fontSize: '14px',
                    color: theme.colors.primary
                  }}>
                    {proj.name}
                    {proj.link && (
                      <a href={proj.link} style={{
                        marginLeft: '8px',
                        color: theme.colors.accent,
                        fontSize: '11px',
                        textDecoration: 'none',
                      }}>↗</a>
                    )}
                  </div>
                  <p style={{ fontSize: '12px', margin: '3px 0 0', color: theme.colors.textMuted }}>
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}