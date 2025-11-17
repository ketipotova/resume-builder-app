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
    padding: 60,
    fontFamily: 'Helvetica',
  },
  name: {
    fontSize: 36,
    fontFamily: 'Helvetica-Bold',
    color: '#000000',
    marginBottom: 5,
    letterSpacing: -0.5,
  },
  contactInfo: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 30,
  },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#cccccc',
    marginVertical: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#000000',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.7,
    color: '#333333',
  },
  experienceItem: {
    marginBottom: 15,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  jobTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#000000',
  },
  date: {
    fontSize: 10,
    color: '#666666',
  },
  company: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 5,
  },
  bulletPoint: {
    fontSize: 10,
    color: '#333333',
    marginTop: 3,
    lineHeight: 1.6,
  },
  educationItem: {
    marginBottom: 12,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  degree: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#000000',
  },
  institution: {
    fontSize: 10,
    color: '#666666',
    marginTop: 2,
  },
  skillsList: {
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.6,
  },
});

interface MinimalistTemplateProps {
  resume: Resume;
}

export function MinimalistTemplate({ resume }: MinimalistTemplateProps) {
  const { personalInfo, summary, experience, education, skills } = resume;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View>
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          <Text style={styles.contactInfo}>
            {personalInfo.email} • {personalInfo.phone} • {personalInfo.location}
            {personalInfo.linkedIn && ` • ${personalInfo.linkedIn}`}
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Summary */}
        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <Text style={styles.summary}>{summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((exp, index) => (
              <View key={exp.id}>
                <View style={styles.experienceItem}>
                  <View style={styles.jobHeader}>
                    <Text style={styles.jobTitle}>{exp.position}</Text>
                    <Text style={styles.date}>
                      {parseDate(exp.startDate)} - {exp.endDate === 'Present' ? 'Present' : parseDate(exp.endDate)}
                    </Text>
                  </View>
                  <Text style={styles.company}>
                    {exp.company}, {exp.location}
                  </Text>
                  {exp.achievements && exp.achievements.map((achievement, achIndex) => (
                    <Text key={achIndex} style={styles.bulletPoint}>
                      {achievement}
                    </Text>
                  ))}
                </View>
                {index < experience.length - 1 && <View style={{ marginBottom: 10 }} />}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <View style={styles.educationHeader}>
                  <Text style={styles.degree}>
                    {edu.degree}, {edu.field}
                  </Text>
                  <Text style={styles.date}>{edu.graduationDate}</Text>
                </View>
                <Text style={styles.institution}>{edu.institution}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {(skills.technical.length > 0 || skills.soft.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.skillsList}>
              {[...skills.technical, ...skills.soft].join(' • ')}
            </Text>
          </View>
        )}
      </Page>
    </Document>
  );
}
