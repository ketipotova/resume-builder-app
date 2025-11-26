import React from 'react';
import type { Resume } from '../../../types/resume';

// --- Modern Sidebar Theme: Bold & Contemporary ---
const theme = {
  colors: {
    sidebar: '#0f172a',       // Deep slate
    sidebarText: '#e2e8f0',   // Light slate
    sidebarMuted: '#94a3b8',  // Muted slate
    accent: '#06b6d4',        // Cyan accent
    accentSoft: '#22d3ee',    // Lighter cyan
    text: '#1e293b',          // Dark text
    textMuted: '#64748b',     // Muted text
    background: '#ffffff',
    cardBg: '#f8fafc',        // Subtle card bg
  },
  fonts: {
    display: '"Space Grotesk", "DM Sans", sans-serif',
    body: '"DM Sans", "Nunito Sans", sans-serif',
  }
};

// --- Icons (More geometric/modern) ---
const Icons = {
  Phone: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>,
  Mail: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>,
  Location: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>,
  Link: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>,
};

// --- Components ---
const SidebarSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div style={{ marginBottom: '28px' }}>
    <h3 style={{
      fontSize: '10px',
      textTransform: 'uppercase',
      letterSpacing: '2.5px',
      fontWeight: '600',
      color: theme.colors.accent,
      marginBottom: '14px',
      paddingBottom: '8px',
      borderBottom: `1px solid rgba(6, 182, 212, 0.3)`,
    }}>
      {title}
    </h3>
    {children}
  </div>
);

const MainSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div style={{ marginBottom: '32px' }}>
    <h2 style={{
      fontSize: '11px',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      fontWeight: '700',
      color: theme.colors.accent,
      marginBottom: '18px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    }}>
      <span style={{
        width: '24px',
        height: '2px',
        backgroundColor: theme.colors.accent,
      }} />
      {title}
    </h2>
    {children}
  </div>
);

const ContactItem = ({ icon, text, href }: { icon: React.ReactNode, text: string, href?: string }) => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '10px', 
    fontSize: '12px', 
    color: theme.colors.sidebarText,
    marginBottom: '10px',
  }}>
    <span style={{ color: theme.colors.accent, display: 'flex' }}>{icon}</span>
    {href ? (
      <a href={href} style={{ color: 'inherit', textDecoration: 'none', wordBreak: 'break-all' }}>{text}</a>
    ) : (
      <span>{text}</span>
    )}
  </div>
);

const SkillBar = ({ skill, level = 85 }: { skill: string, level?: number }) => (
  <div style={{ marginBottom: '12px' }}>
    <div style={{ 
      fontSize: '12px', 
      color: theme.colors.sidebarText, 
      marginBottom: '5px',
      fontWeight: '500',
    }}>
      {skill}
    </div>
    <div style={{
      height: '3px',
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderRadius: '2px',
      overflow: 'hidden',
    }}>
      <div style={{
        width: `${level}%`,
        height: '100%',
        background: `linear-gradient(90deg, ${theme.colors.accent}, ${theme.colors.accentSoft})`,
        borderRadius: '2px',
      }} />
    </div>
  </div>
);

// --- Main Template ---
interface ModernSidebarTemplateProps {
  resume: Resume;
}

export default function ModernSidebarTemplate({ resume }: ModernSidebarTemplateProps) {
  const hasArray = (arr: any[]) => Array.isArray(arr) && arr.length > 0;

  return (
    <div className="resume-container" style={{
      width: '210mm',
      minHeight: '297mm',
      margin: '0 auto',
      backgroundColor: theme.colors.background,
      fontFamily: theme.fonts.body,
      color: theme.colors.text,
      lineHeight: '1.6',
      boxSizing: 'border-box',
      display: 'grid',
      gridTemplateColumns: '75mm 1fr',
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        
        @media print {
          @page { margin: 0; size: A4; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-break { break-inside: avoid; page-break-inside: avoid; }
        }
      `}} />

      {/* Left Sidebar */}
      <aside style={{
        backgroundColor: theme.colors.sidebar,
        padding: '40px 28px',
        minHeight: '297mm',
      }}>
        {/* Profile Photo Placeholder */}
        <div style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentSoft})`,
          margin: '0 auto 25px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '36px',
          fontWeight: '700',
          color: theme.colors.sidebar,
          fontFamily: theme.fonts.display,
        }}>
          {resume.personalInfo?.fullName?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'YN'}
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: theme.fonts.display,
          fontSize: '22px',
          fontWeight: '700',
          color: '#fff',
          textAlign: 'center',
          margin: '0 0 6px 0',
          letterSpacing: '-0.5px',
        }}>
          {resume.personalInfo?.fullName || 'Your Name'}
        </h1>

        {resume.personalInfo?.jobTitle && (
          <div style={{
            fontSize: '12px',
            color: theme.colors.accent,
            textAlign: 'center',
            marginBottom: '30px',
            fontWeight: '500',
            letterSpacing: '0.5px',
          }}>
            {resume.personalInfo.jobTitle}
          </div>
        )}

        {/* Contact */}
        <SidebarSection title="Contact">
          {resume.personalInfo?.phone && <ContactItem icon={<Icons.Phone />} text={resume.personalInfo.phone} />}
          {resume.personalInfo?.email && <ContactItem icon={<Icons.Mail />} text={resume.personalInfo.email} href={`mailto:${resume.personalInfo.email}`} />}
          {resume.personalInfo?.location && <ContactItem icon={<Icons.Location />} text={resume.personalInfo.location} />}
          {resume.personalInfo?.linkedIn && <ContactItem icon={<Icons.Link />} text="LinkedIn" href={resume.personalInfo.linkedIn} />}
          {resume.personalInfo?.portfolio && <ContactItem icon={<Icons.Link />} text="Portfolio" href={resume.personalInfo.portfolio} />}
        </SidebarSection>

        {/* Skills */}
        {hasArray(resume.skills?.technical) && (
          <SidebarSection title="Skills">
            {resume.skills.technical.slice(0, 8).map((skill, i) => (
              <SkillBar key={i} skill={skill} level={95 - (i * 5)} />
            ))}
          </SidebarSection>
        )}

        {/* Education */}
        {hasArray(resume.education) && (
          <SidebarSection title="Education">
            {resume.education.map((edu, index) => (
              <div key={edu.id || index} style={{ marginBottom: '16px' }}>
                <div style={{ 
                  fontSize: '12px', 
                  fontWeight: '600', 
                  color: '#fff',
                  marginBottom: '3px',
                }}>
                  {edu.degree}
                </div>
                {edu.field && (
                  <div style={{ fontSize: '11px', color: theme.colors.accent, marginBottom: '2px' }}>
                    {edu.field}
                  </div>
                )}
                <div style={{ fontSize: '11px', color: theme.colors.sidebarMuted }}>
                  {edu.institution}
                </div>
                <div style={{ fontSize: '10px', color: theme.colors.sidebarMuted, opacity: 0.8 }}>
                  {edu.graduationDate}
                </div>
              </div>
            ))}
          </SidebarSection>
        )}
      </aside>

      {/* Main Content */}
      <main style={{ padding: '40px 45px' }}>
        
        {/* Summary */}
        {resume.summary && (
          <div className="no-break" style={{ marginBottom: '35px' }}>
            <div style={{
              padding: '20px 24px',
              backgroundColor: theme.colors.cardBg,
              borderRadius: '8px',
              borderLeft: `3px solid ${theme.colors.accent}`,
            }}>
              <p style={{
                margin: 0,
                fontSize: '13px',
                color: theme.colors.text,
                lineHeight: '1.7',
              }}>
                {resume.summary}
              </p>
            </div>
          </div>
        )}

        {/* Experience */}
        {hasArray(resume.experience) && (
          <MainSection title="Professional Experience">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {resume.experience.map((exp, index) => (
                <div key={exp.id || index} className="no-break">
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    marginBottom: '8px',
                  }}>
                    <div>
                      <h3 style={{ 
                        fontFamily: theme.fonts.display,
                        fontSize: '15px', 
                        fontWeight: '600', 
                        color: theme.colors.text, 
                        margin: 0,
                      }}>
                        {exp.position}
                      </h3>
                      <div style={{ 
                        fontSize: '13px',
                        fontWeight: '600',
                        color: theme.colors.accent,
                        marginTop: '3px',
                      }}>
                        {exp.company}
                        {exp.location && <span style={{ color: theme.colors.textMuted, fontWeight: '400' }}> · {exp.location}</span>}
                      </div>
                    </div>
                    <span style={{ 
                      fontSize: '11px', 
                      color: theme.colors.textMuted,
                      backgroundColor: theme.colors.cardBg,
                      padding: '4px 10px',
                      borderRadius: '12px',
                      whiteSpace: 'nowrap',
                    }}>
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>

                  {hasArray(exp.achievements) && (
                    <ul style={{ 
                      margin: '12px 0 0', 
                      paddingLeft: '0',
                      listStyle: 'none',
                    }}>
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} style={{ 
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          marginBottom: '6px',
                          fontSize: '13px',
                          color: theme.colors.text,
                        }}>
                          <span style={{
                            width: '5px',
                            height: '5px',
                            backgroundColor: theme.colors.accent,
                            borderRadius: '50%',
                            marginTop: '7px',
                            flexShrink: 0,
                          }} />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </MainSection>
        )}

        {/* Projects */}
        {hasArray(resume.projects) && (
          <MainSection title="Key Projects">
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '16px',
            }}>
              {resume.projects.map((proj, index) => (
                <div key={index} style={{
                  padding: '16px',
                  backgroundColor: theme.colors.cardBg,
                  borderRadius: '8px',
                  border: `1px solid ${theme.colors.cardBg}`,
                }}>
                  <div style={{ 
                    fontFamily: theme.fonts.display,
                    fontWeight: '600', 
                    fontSize: '13px', 
                    color: theme.colors.text,
                    marginBottom: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    {proj.name}
                    {proj.url && (
                      <a href={proj.url} style={{ color: theme.colors.accent, fontSize: '11px', textDecoration: 'none' }}>↗</a>
                    )}
                  </div>
                  <p style={{ fontSize: '12px', margin: 0, color: theme.colors.textMuted, lineHeight: '1.5' }}>
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </MainSection>
        )}

      </main>
    </div>
  );
}