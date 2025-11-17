import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import type { Resume } from '../../../types/resume';
import { parseDate } from '../../../utils/resume-helpers';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: 0,
    fontFamily: 'Helvetica',
  },
  sidebar: {
    backgroundColor: '#8b5cf6',
    width: '35%',
    padding: 30,
    minHeight: '100%',
  },
  mainContent: {
    width: '65%',
    padding: 30,
  },
  layout: {
    flexDirection: 'row',
  },
  name: {
    fontSize: 26,
    fontFamily: 'Helvetica-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 9,
    color: '#FFFFFF',
    marginBottom: 4,
    opacity: 0.9,
  },
  sidebarSection: {
    marginTop: 25,
  },
  sidebarTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  skillItem: {
    fontSize: 10,
    color: '#FFFFFF',
    marginBottom: 6,
    opacity: 0.95,
  },
  skillBar: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginTop: 3,
    borderRadius: 2,
  },
  skillBarFill: {
    height: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: '#8b5cf6',
    marginBottom: 12,
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#374151',
  },
  experienceItem: {
    marginBottom: 18,
    position: 'relative',
  },
  timeline: {
    position: 'absolute',
    left: -15,
    top: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8b5cf6',
  },
  jobTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    marginBottom: 3,
  },
  company: {
    fontSize: 11,
    color: '#8b5cf6',
    fontFamily: 'Helvetica-Bold',
  },
  date: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 2,
    marginBottom: 5,
  },
  bulletPoint: {
    fontSize: 10,
    color: '#374151',
    marginTop: 3,
    marginLeft: 10,
    lineHeight: 1.5,
  },
  educationItem: {
    marginBottom: 15,
  },
  degree: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  institution: {
    fontSize: 10,
    color: '#4b5563',
    marginTop: 2,
  },
});

interface CreativeTemplateProps {
  resume: Resume;
}

export function CreativeTemplate({ resume }: CreativeTemplateProps) {
  const { personalInfo, summary, experience, education, skills } = resume;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.layout}>
          {/* Sidebar */}
          <View style={styles.sidebar}>
            <Text style={styles.name}>{personalInfo.fullName}</Text>
            <Text style={styles.contactInfo}>{personalInfo.email}</Text>
            <Text style={styles.contactInfo}>{personalInfo.phone}</Text>
            <Text style={styles.contactInfo}>{personalInfo.location}</Text>
            {personalInfo.linkedIn && (
              <Text style={styles.contactInfo}>{personalInfo.linkedIn}</Text>
            )}

            {/* Skills */}
            {skills.technical.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Technical Skills</Text>
                {skills.technical.map((skill, index) => (
                  <View key={index} style={{ marginBottom: 12 }}>
                    <Text style={styles.skillItem}>{skill}</Text>
                    <View style={styles.skillBar}>
                      <View style={{ ...styles.skillBarFill, width: '85%' }} />
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Soft Skills */}
            {skills.soft.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Soft Skills</Text>
                {skills.soft.map((skill, index) => (
                  <Text key={index} style={styles.skillItem}>
                    • {skill}
                  </Text>
                ))}
              </View>
            )}

            {/* Education */}
            {education.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Education</Text>
                {education.map((edu) => (
                  <View key={edu.id} style={{ marginBottom: 12 }}>
                    <Text style={{ ...styles.skillItem, fontFamily: 'Helvetica-Bold' }}>
                      {edu.degree}
                    </Text>
                    <Text style={styles.skillItem}>{edu.field}</Text>
                    <Text style={styles.skillItem}>{edu.institution}</Text>
                    <Text style={styles.skillItem}>{edu.graduationDate}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            {/* Summary */}
            {summary && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>
                <Text style={styles.summary}>{summary}</Text>
              </View>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {experience.map((exp) => (
                  <View key={exp.id} style={styles.experienceItem}>
                    <View style={styles.timeline} />
                    <Text style={styles.jobTitle}>{exp.position}</Text>
                    <Text style={styles.company}>{exp.company}</Text>
                    <Text style={styles.date}>
                      {parseDate(exp.startDate)} - {exp.endDate === 'Present' ? 'Present' : parseDate(exp.endDate)}
                    </Text>
                    {exp.achievements && exp.achievements.map((achievement, index) => (
                      <Text key={index} style={styles.bulletPoint}>
                        • {achievement}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
