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
    padding: 50,
    fontFamily: 'Times-Roman',
  },
  header: {
    borderBottomWidth: 3,
    borderBottomColor: '#d97706',
    paddingBottom: 15,
    marginBottom: 25,
  },
  name: {
    fontSize: 32,
    fontFamily: 'Times-Bold',
    color: '#374151',
    marginBottom: 5,
    letterSpacing: 1,
  },
  contactInfo: {
    fontSize: 10,
    color: '#6b7280',
    flexDirection: 'row',
    gap: 15,
  },
  contactItem: {
    marginRight: 20,
  },
  summarySection: {
    backgroundColor: '#fef3c7',
    padding: 20,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: '#d97706',
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Times-Bold',
    color: '#d97706',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  summary: {
    fontSize: 12,
    lineHeight: 1.7,
    color: '#374151',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 25,
  },
  experienceItem: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 13,
    fontFamily: 'Times-Bold',
    color: '#111827',
  },
  company: {
    fontSize: 12,
    color: '#d97706',
    fontFamily: 'Times-Bold',
    marginBottom: 3,
  },
  date: {
    fontSize: 10,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  location: {
    fontSize: 10,
    color: '#6b7280',
  },
  achievementHighlight: {
    fontSize: 11,
    color: '#374151',
    marginTop: 5,
    marginLeft: 15,
    lineHeight: 1.6,
    fontFamily: 'Times-Bold',
  },
  bulletPoint: {
    fontSize: 11,
    color: '#4b5563',
    marginTop: 3,
    marginLeft: 15,
    lineHeight: 1.6,
  },
  twoColumn: {
    flexDirection: 'row',
    gap: 30,
  },
  column: {
    flex: 1,
  },
  educationItem: {
    marginBottom: 15,
  },
  degree: {
    fontSize: 12,
    fontFamily: 'Times-Bold',
    color: '#111827',
  },
  institution: {
    fontSize: 11,
    color: '#4b5563',
    marginTop: 2,
  },
  skillCategory: {
    marginBottom: 12,
  },
  skillCategoryTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    color: '#d97706',
    marginBottom: 4,
  },
  skillsList: {
    fontSize: 10,
    color: '#4b5563',
    lineHeight: 1.5,
  },
});

interface ExecutiveTemplateProps {
  resume: Resume;
}

export function ExecutiveTemplate({ resume }: ExecutiveTemplateProps) {
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

        {/* Executive Summary */}
        {summary && (
          <View style={styles.summarySection}>
            <Text style={styles.summary}>{summary}</Text>
          </View>
        )}

        {/* Professional Experience */}
        {experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {experience.map((exp, index) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.jobHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.jobTitle}>{exp.position}</Text>
                    <Text style={styles.company}>{exp.company}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.date}>
                      {parseDate(exp.startDate)} - {exp.endDate === 'Present' ? 'Present' : parseDate(exp.endDate)}
                    </Text>
                    <Text style={styles.location}>{exp.location}</Text>
                  </View>
                </View>
                {exp.achievements.map((achievement, achIndex) => (
                  <Text
                    key={achIndex}
                    style={achIndex === 0 ? styles.achievementHighlight : styles.bulletPoint}
                  >
                    • {achievement}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education & Skills */}
        <View style={styles.twoColumn}>
          {/* Education */}
          {education.length > 0 && (
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu) => (
                <View key={edu.id} style={styles.educationItem}>
                  <Text style={styles.degree}>
                    {edu.degree}
                  </Text>
                  <Text style={styles.institution}>{edu.field}</Text>
                  <Text style={styles.institution}>{edu.institution}</Text>
                  <Text style={styles.date}>{edu.graduationDate}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Skills */}
          {(skills.technical.length > 0 || skills.soft.length > 0) && (
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>Core Competencies</Text>
              {skills.technical.length > 0 && (
                <View style={styles.skillCategory}>
                  <Text style={styles.skillCategoryTitle}>Technical</Text>
                  <Text style={styles.skillsList}>
                    {skills.technical.join(', ')}
                  </Text>
                </View>
              )}
              {skills.soft.length > 0 && (
                <View style={styles.skillCategory}>
                  <Text style={styles.skillCategoryTitle}>Leadership</Text>
                  <Text style={styles.skillsList}>
                    {skills.soft.join(', ')}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
