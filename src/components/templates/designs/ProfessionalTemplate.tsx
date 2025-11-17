import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import type { Resume } from '../../../types/resume';
import { parseDate } from '../../../utils/resume-helpers';

// Register fonts (using default fonts for now)
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#1e3a8a',
    paddingBottom: 10,
  },
  name: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: '#1e3a8a',
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 10,
    color: '#374151',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  contactItem: {
    marginRight: 15,
  },
  twoColumn: {
    flexDirection: 'row',
    gap: 20,
  },
  leftColumn: {
    width: '30%',
  },
  rightColumn: {
    width: '70%',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#1e3a8a',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#374151',
  },
  experienceItem: {
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  company: {
    fontSize: 10,
    color: '#4b5563',
    marginTop: 2,
  },
  date: {
    fontSize: 9,
    color: '#6b7280',
    marginTop: 2,
  },
  bulletPoint: {
    fontSize: 10,
    color: '#374151',
    marginTop: 3,
    marginLeft: 10,
    lineHeight: 1.4,
  },
  skillItem: {
    fontSize: 10,
    color: '#374151',
    marginBottom: 4,
  },
  educationItem: {
    marginBottom: 10,
  },
  degree: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  institution: {
    fontSize: 10,
    color: '#4b5563',
    marginTop: 2,
  },
});

interface ProfessionalTemplateProps {
  resume: Resume;
}

export function ProfessionalTemplate({ resume }: ProfessionalTemplateProps) {
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
            {personalInfo.linkedIn && (
              <Text style={styles.contactItem}>{personalInfo.linkedIn}</Text>
            )}
          </View>
        </View>

        <View style={styles.twoColumn}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Skills */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              {skills.technical.length > 0 && (
                <View style={{ marginBottom: 8 }}>
                  <Text style={{ ...styles.skillItem, fontFamily: 'Helvetica-Bold' }}>
                    Technical
                  </Text>
                  {skills.technical.map((skill, index) => (
                    <Text key={index} style={styles.skillItem}>
                      • {skill}
                    </Text>
                  ))}
                </View>
              )}
              {skills.soft.length > 0 && (
                <View style={{ marginBottom: 8 }}>
                  <Text style={{ ...styles.skillItem, fontFamily: 'Helvetica-Bold' }}>
                    Soft Skills
                  </Text>
                  {skills.soft.map((skill, index) => (
                    <Text key={index} style={styles.skillItem}>
                      • {skill}
                    </Text>
                  ))}
                </View>
              )}
            </View>

            {/* Education */}
            {education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {education.map((edu) => (
                  <View key={edu.id} style={styles.educationItem}>
                    <Text style={styles.degree}>{edu.degree}</Text>
                    <Text style={styles.institution}>{edu.field}</Text>
                    <Text style={styles.institution}>{edu.institution}</Text>
                    <Text style={styles.date}>{edu.graduationDate}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Summary */}
            {summary && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Professional Summary</Text>
                <Text style={styles.summary}>{summary}</Text>
              </View>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {experience.map((exp) => (
                  <View key={exp.id} style={styles.experienceItem}>
                    <Text style={styles.jobTitle}>{exp.position}</Text>
                    <Text style={styles.company}>
                      {exp.company} • {exp.location}
                    </Text>
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
