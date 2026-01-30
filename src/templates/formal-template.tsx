import {Page, Text, View, Document, StyleSheet} from '@react-pdf/renderer';
import { ResumeValues } from '@/lib/schemas/resume';
import { JobDescription } from '@/components/Jobdescription';

//make styles for the pdf document
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 12,
        lineHeight: 1.5,
        color: '#333333',
    },
    //header section
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
    //Section Headers
    sectionTitle: {
        fontSize: 10,
        fontFamily: "Helvetica-Bold",
        textTransform: "uppercase",
        borderBottomWidth: 1,
        borderBottomColor: "#000000",
        marginTop: 15,
        marginBottom: 8,
        paddingBottom: 2,  
    },
    //Content Blocks
    jobBlock: {
        marginBottom: 10,
    },
    jobHeader: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    companyName: {
        fontFamily: "Helvetica-Oblique", // Italic
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
})

interface TemplateProps {
    data: ResumeValues;
}

const Separator = () => {
    return <Text style={styles.separator}>•</Text>;
}
export default function FormalTemplate({data}: TemplateProps) {
    const contactItems = [
        data.personalInfo.phone,
        data.personalInfo.email,
        data.personalInfo.linkedin,
        data.personalInfo.website,
        data.personalInfo.location,
    ].filter(Boolean); // Remove undefined or empty items
    
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.name}>{data.personalInfo.fullName}</Text>
                    <View style={styles.contactInfo}>
                        {contactItems.map((item, index) => (
                            <View key={index} style ={{flexDirection: 'row'}}>
                                <Text>{item}</Text>
                                {index < contactItems.length -1 && <Separator />}
                            </View>
                        ))}
                    </View>
                </View>
                {/* Summary Section */}
                <View style ={styles.sectionTitle}>
                    <Text>Summary</Text>
                </View>

                <Text>{data.personalInfo.summary}</Text>
                <View style = {styles.jobBlock}></View>

                 {/* Experience Section */}
                <View style = {styles.sectionTitle}>
                    <Text>Experience</Text>
                </View>

                <View style = {styles.jobHeader}>
                    {data.experience.map((job) => (
                        <View key={job.id} style = {styles.jobBlock}>
                            <View style={styles.jobHeader}>
                                <View style={{flexDirection: "row", justifyContent: "space-between"}}> 
                                <Text style={styles.jobRole}>{job.role}</Text>
                                <Text style={styles.jobDate}>
                                    {job.startDate} - {job.current ? "Present" : job.endDate || ""}
                                </Text>
                                </View>
                                <Text style={styles.companyName}>{job.company}</Text>
                            </View>
                            <View style= {styles.JobDescription}>
                                {job.description.map((point, index) => (
                                    <View key = {index} style= {styles.bulletPoint}>
                                        <Text style={styles.bulletDot}>•</Text>
                                        <Text style={styles.bulletText}>{point}</Text>
                                    </View>
                                ))}
                           </View>
                        </View>
                    ))
                    }
                </View>
                
            </Page>
        </Document>
    )
}
