import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { ResumeValues } from '@/lib/schemas/resume';

/**
 * StyleSheet defining the aesthetic properties of the PDF document.
 * React-PDF uses a subset of CSS mapped to Yoga layout engine properties.
 */
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 12,
        lineHeight: 1.5,
        color: '#333333',
    },
    // Header Section Styles
    header: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#000000",
        paddingBottom: 10,
        alignItems: "center"
    },
    name: {
        fontSize: 24,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    contactInfo: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 15,
        fontFamily: "Helvetica",
        fontSize: 10,
        gap: 5,
        color: '#555555',
    },
    separator: {
        marginHorizontal: 4,
    },
    // Section Header Styles
    sectionTitle: {
        fontSize: 10,
        fontFamily: "Helvetica-Bold",
        textTransform: "uppercase",
        borderBottomWidth: 1,
        borderBottomColor: "#000000",
        marginTop: 8,
        marginBottom: 8,
        paddingBottom: 2,
    },
    // Content Block Styles (Used for Jobs, Education, and Projects)
    jobBlock: {
        marginBottom: 3,
    },
    jobHeader: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    companyName: {
        fontFamily: "Helvetica-Oblique", // Italic font variant
        fontSize: 7,
    },
    jobDate: {
        fontSize: 10,
        color: "#666666",
        textAlign: "right",
    },
    jobRole: {
        fontFamily: "Helvetica",
        fontSize: 11,
        fontWeight: "bold",
    },
    JobDescription: {
        flexDirection: 'column',
        marginTop: 4,
    },
    // Skills Section Constraints
    skills: {
        fontFamily: "Helvetica-Bold"
    },
    // Bullet Point Formatting
    bulletPoint: {
        flexDirection: "row",
        marginBottom: 1,
        paddingLeft: 5,
    },
    bulletDot: {
        width: 10,
        fontSize: 10,
    },
    bulletText: {
        flex: 1,
        fontSize: 10,
    },
});

/**
 * Props for the FormalTemplate component containing the entire populated resume configuration.
 */
interface TemplateProps {
    data: ResumeValues;
}

/**
 * Functional component rendering a small dot to separate contact elements.
 */
const Separator = () => {
    return <Text style={styles.separator}>•</Text>;
}

/**
 * FormalTemplate - The core PDF layout for parsing `ResumeValues` into a styled document.
 * Note: React-PDF requires strict `<Document>`, `<Page>`, `<View>`, and `<Text>` wrappers. 
 * Standard HTML elements like `<div>` and `<span>` will crash the PDF renderer.
 */
export default function FormalTemplate({ data }: TemplateProps) {
    // Collect contact items into an array, filtering out any empty or null values
    const contactItems = [
        data.personalInfo.phone,
        data.personalInfo.email,
        data.personalInfo.linkedin,
        data.personalInfo.website,
        data.personalInfo.location,
    ].filter(Boolean);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* 1. Header Section: Contains Name and mapped contact links */}
                <View style={styles.header}>
                    <Text style={styles.name}>{data.personalInfo.fullName}</Text>
                    <View style={styles.contactInfo}>
                        {contactItems.map((item, index) => (
                            <View key={index} style={{ flexDirection: 'row' }}>
                                <Text>{item}</Text>
                                {/* Only render separator if it's not the last element */}
                                {index < contactItems.length - 1 && <Separator />}
                            </View>
                        ))}
                    </View>
                </View>

                {/* 2. Summary Section: Only renders header and content if a summary is provided */}
                <View style={data.personalInfo.summary ? styles.sectionTitle : undefined}>
                    <Text>{data.personalInfo.summary ? "Summary" : ""}</Text>
                </View>

                <Text>{data.personalInfo.summary}</Text>
                <View style={styles.jobBlock}></View>

                {/* 3. Experience Section: Iterates over jobs array to build experience layout */}
                <View style={data.experience && data.experience.length ? styles.sectionTitle : undefined}>
                    <Text>{data.experience && data.experience.length ? "Experience" : ""}</Text>
                </View>

                <View style={styles.jobHeader}>
                    {data.experience.map((job) => (
                        <View key={job.id} style={styles.jobBlock}>
                            <View style={styles.jobHeader}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={styles.jobRole}>{job.role}</Text>
                                    <Text style={styles.jobDate}>
                                        {job.startDate} - {job.current ? "Present" : job.endDate || ""}
                                    </Text>
                                </View>
                                <Text style={styles.companyName}>{job.company}</Text>
                            </View>
                            <View style={styles.JobDescription}>
                                {job.description.map((point, index) => (
                                    <View key={index} style={styles.bulletPoint}>
                                        <Text style={styles.bulletDot}>•</Text>
                                        <Text style={styles.bulletText}>{point}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>

                {/* 4. Education Section: Formats academic constraints based on data entries */}
                <View style={data.education && data.education.length ? styles.sectionTitle : undefined}>
                    <Text>{data.education && data.education.length ? "Education" : ""}</Text>
                </View>

                <View style={styles.jobHeader}>
                    {data.education.map((edu) => (
                        <View key={edu.id} style={styles.jobBlock}>
                            <View style={styles.jobHeader}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={styles.jobRole}>{edu.degree}</Text>
                                    <Text style={styles.jobDate}>
                                        {edu.startDate} - {edu.current ? "Present" : edu.endDate || ""}
                                    </Text>
                                </View>
                                <Text style={styles.companyName}>{edu.institution}</Text>
                            </View>
                            <View style={styles.JobDescription}>
                                {edu.description.map((point, index) => (
                                    <View key={index} style={styles.bulletPoint}>
                                        <Text style={styles.bulletDot}>•</Text>
                                        <Text style={styles.bulletText}>{point}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>

                {/* 5. Skills Section: Multi-column wrapping wrapper built using flexWrap */}
                <View style={data.skills && data.skills.length ? styles.sectionTitle : undefined}>
                    <Text>{data.skills && data.skills.length ? "Skills" : ""}</Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 4, }}>
                    {data.skills && data.skills.map((skill, index) => (
                        <View key={index} style={{ flexDirection: 'row', width: '30%' }}>
                            <Text style={styles.bulletDot}>•</Text>
                            <Text style={styles.skills}>{skill.skills}</Text>
                        </View>
                    ))}
                </View>

                {/* 6. Projects Section: Formats standalone technical or academic projects */}
                <View style={data.projects && data.projects.length ? styles.sectionTitle : undefined}>
                    <Text>{data.projects && data.projects.length ? "Projects" : ""}</Text>
                </View>

                <View style={styles.jobHeader}>
                    {data.projects.map((project) => (
                        <View key={project.id} style={styles.jobBlock}>
                            <View style={styles.jobHeader}>
                                <View style={{ flexDirection: "row", }}>
                                    <Text style={styles.jobRole}>{project.title} <Text> | </Text> </Text>
                                    <Text style={styles.jobDate}>{project.startDate}</Text>
                                </View>
                                <Text style={styles.companyName}>{project.role}</Text>
                            </View>
                            <View style={styles.JobDescription}>
                                {project.description.map((point, index) => (
                                    <View key={index} style={styles.bulletPoint}>
                                        <Text style={styles.bulletDot}>•</Text>
                                        <Text style={styles.bulletText}>{point}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>

            </Page>
        </Document>
    );
}
