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
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    backgroundColor: '#14b8a6',
    marginLeft: -40,
    marginRight: -40,
    marginTop: -40,
    padding: 30,
    marginBottom: 25,
  },
  name: {
    fontSize: 32,
    fontFamily: 'Helvetica-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 10,
    color: '#FFFFFF',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  contactItem: {
    marginRight: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#14b8a6',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#14b8a6',
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#374151',
  },
  experienceItem: {
    marginBottom: 15,
    paddingLeft: 15,
    borderLeftWidth: 3,
    borderLeftColor: '#14b8a6',
  },
  jobTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    marginBottom: 3,
  },
  company: {
    fontSize: 11,
    color: '#14b8a6',
    fontFamily: 'Helvetica-Bold',
  },
  date: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 2,
  },
  bulletPoint: {
    fontSize: 10,
    color: '#374151',
    marginTop: 4,
    marginLeft: 10,
    lineHeight: 1.5,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    backgroundColor: '#e0f2f1',
    color: '#14b8a6',
    fontSize: 9,
    padding: '5 10',
    borderRadius: 12,
    fontFamily: 'Helvetica-Bold',
  },
  educationItem: {
    marginBottom: 12,
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

interface ModernTemplateProps {
  resume: Resume;
}

export function ModernTemplate({ resume }: ModernTemplateProps) {
  const { personalInfo, summary, experience, education, skills } = resume;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactItem}>{personalInfo.email}</Text>
            <Text style={styles.contactItem}>{personalInfo.phone}</Text>
            <Text style={styles.contactItem}>{personalInfo.location}</Text>
          </View>
        </View>

        {/* Summary */}
        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <Text style={styles.summary}>{summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{exp.position}</Text>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.date}>
                  {parseDate(exp.startDate)} - {exp.endDate === 'Present' ? 'Present' : parseDate(exp.endDate)} • {exp.location}
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

        {/* Skills */}
        {(skills.technical.length > 0 || skills.soft.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsGrid}>
              {[...skills.technical, ...skills.soft].map((skill, index) => (
                <Text key={index} style={styles.skillTag}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <Text style={styles.degree}>
                  {edu.degree} in {edu.field}
                </Text>
                <Text style={styles.institution}>{edu.institution}</Text>
                <Text style={styles.date}>{edu.graduationDate}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
