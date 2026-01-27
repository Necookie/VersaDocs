import {Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeValues } from '@/lib/schemas/resume';


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
        marginBottom: 20,
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
        justifyContent: 'center',
        fontSize: 10,
        gap: 15,
        color: '#555555',
    }, 
    //Section Headers
    sectionTitle: {
        fontSize: 12,
        fontFamily: "Helvetica-Bold",
        textTransform: "uppercase",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
        marginTop: 15,
        marginBottom: 8,
        paddingBottom: 2,  
    },
    //Content Blocks
    jobBlock: {
        marginBottom: 10,
    },
    jobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    companyName: {
        fontFamily: "Helvetica-Bold",
        fontSize: 11,
    },
    jobDate: {
        fontSize: 10,
        color: "#666666",
        textAlign: "right",
    },
    jobRole: {
        fontFamily: "Helvetica-Oblique", // Italic
        fontSize: 10,
        marginBottom: 2,
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

export default function FormalTemplate({data}: TemplateProps) {

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.name}>{data.personalInfo.fullName}</Text>
                </View>
                <View style={styles.contactInfo}>
                    {data.personalInfo.email && <Text>{data.personalInfo.email}</Text>}
                    {data.personalInfo.phone && <Text>{data.personalInfo.phone}</Text>}
                    {data.personalInfo.linkedin && <Text>{data.personalInfo.linkedin}</Text>}
                    {data.personalInfo.website && <Text>{data.personalInfo.website}</Text>}
                </View>
            </Page>
        </Document>
    )
}
