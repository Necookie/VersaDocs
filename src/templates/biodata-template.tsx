import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { ResumeValues } from '@/lib/schemas/resume';

/**
 * StyleSheet defining the aesthetic properties of the Filipino Biodata document.
 * Matches traditional layout with light blue headers and explicit data fields.
 */
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Helvetica',
        fontSize: 10,
        lineHeight: 1.5,
        color: '#000000',
    },
    titleBlock: {
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Helvetica-Bold',
        backgroundColor: '#b4c7e7',
        padding: "4px 8px",
        textTransform: 'uppercase',
    },
    headerText: {
        paddingLeft: 8,
        marginTop: 2,
        fontSize: 10,
    },
    sectionHeader: {
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
        backgroundColor: '#b4c7e7',
        padding: "4px 8px",
        marginTop: 15,
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 3,
        paddingLeft: 8,
    },
    label: {
        width: 150,
    },
    colon: {
        width: 20,
        textAlign: 'center',
    },
    value: {
        flex: 1,
        fontFamily: 'Helvetica-Bold',
    },
    // Sub-section styles for nested arrays
    nestedRow: {
        flexDirection: 'row',
        marginBottom: 6,
        paddingLeft: 8,
    },
    nestedLabel: {
        width: 150,
    },
    nestedValueGroup: {
        flex: 1,
    },
    nestedValueTitle: {
        fontFamily: 'Helvetica-Bold',
        marginBottom: 2,
    },
    nestedSubText: {
        fontSize: 9,
    },
    certifyText: {
        marginTop: 30,
        textIndent: 30,
        textAlign: 'justify',
    }
});

interface TemplateProps {
    data: ResumeValues;
}

export default function BiodataTemplate({ data }: TemplateProps) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* TOP HEADER */}
                <View style={styles.titleBlock}>
                    <Text style={styles.title}>{data.personalInfo.fullName || "Name"}</Text>
                    <Text style={styles.headerText}>Address: {data.personalInfo.location || ""}</Text>
                    <Text style={styles.headerText}>Contact #: {data.personalInfo.phone || ""}</Text>
                </View>

                {/* PERSONAL INFORMATION */}
                <Text style={styles.sectionHeader}>PERSONAL INFORMATION</Text>
                <View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Age</Text><Text style={styles.colon}>:</Text><Text style={styles.value}>{data.personalInfo.age || ""}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Date of Birth</Text><Text style={styles.colon}>:</Text><Text style={styles.value}>{data.personalInfo.dateOfBirth || ""}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Place of Birth</Text><Text style={styles.colon}>:</Text><Text style={styles.value}>{data.personalInfo.placeOfBirth || ""}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Civil Status</Text><Text style={styles.colon}>:</Text><Text style={styles.value}>{data.personalInfo.civilStatus || ""}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Religion</Text><Text style={styles.colon}>:</Text><Text style={styles.value}>{data.personalInfo.religion || ""}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Height</Text><Text style={styles.colon}>:</Text><Text style={styles.value}>{data.personalInfo.height || ""}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Weight</Text><Text style={styles.colon}>:</Text><Text style={styles.value}>{data.personalInfo.weight || ""}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Citizenship</Text><Text style={styles.colon}>:</Text><Text style={styles.value}>{data.personalInfo.citizenship || ""}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Father&apos;s Name</Text><Text style={styles.colon}>:</Text><Text style={styles.value}>{data.personalInfo.fathersName || ""}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Occupation</Text><Text style={styles.colon}>:</Text><Text style={styles.value}>{data.personalInfo.fathersOccupation || ""}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Mother&apos;s Name</Text><Text style={styles.colon}>:</Text><Text style={styles.value}>{data.personalInfo.mothersName || ""}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Occupation</Text><Text style={styles.colon}>:</Text><Text style={styles.value}>{data.personalInfo.mothersOccupation || ""}</Text>
                    </View>
                </View>

                {/* EDUCATIONAL ATTAINMENT */}
                <Text style={styles.sectionHeader}>EDUCATIONAL ATTAINMENT</Text>
                <View>
                    {data.education && data.education.length > 0 ? (
                        data.education.map((edu, index) => (
                            <View key={index} style={styles.nestedRow}>
                                <Text style={styles.nestedLabel}>{edu.degree || "Degree"}</Text>
                                <Text style={styles.colon}>:</Text>
                                <View style={styles.nestedValueGroup}>
                                    <Text style={styles.nestedValueTitle}>{edu.institution || ""}</Text>
                                    <Text style={styles.nestedSubText}>S.Y. {edu.startDate} - {edu.current ? "Present" : edu.endDate || ""}</Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <View style={styles.row}>
                            <Text style={styles.label}>Education</Text><Text style={styles.colon}>:</Text><Text style={styles.value}></Text>
                        </View>
                    )}
                </View>

                {/* WORK EXPERIENCE */}
                <Text style={styles.sectionHeader}>WORK EXPERIENCE</Text>
                <View>
                    {data.experience && data.experience.length > 0 ? (
                        data.experience.map((exp, index) => (
                            <View key={index} style={styles.nestedRow}>
                                <Text style={styles.nestedLabel}>{exp.role || "Position"}</Text>
                                <Text style={styles.colon}>:</Text>
                                <View style={styles.nestedValueGroup}>
                                    <Text style={styles.nestedValueTitle}>{exp.company || ""}</Text>
                                    <Text style={styles.nestedSubText}>{exp.startDate} - {exp.current ? "Present" : exp.endDate || ""}</Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <View>
                            <View style={styles.row}><Text style={styles.label}>Company</Text><Text style={styles.colon}>:</Text><Text style={styles.value}></Text></View>
                            <View style={styles.row}><Text style={styles.label}>Positions</Text><Text style={styles.colon}>:</Text><Text style={styles.value}></Text></View>
                            <View style={styles.row}><Text style={styles.label}>Year</Text><Text style={styles.colon}>:</Text><Text style={styles.value}></Text></View>
                        </View>
                    )}
                </View>

                {/* CHARACTER REFERENCE */}
                <Text style={styles.sectionHeader}>CHARACTER REFERENCE</Text>
                <View>
                    {data.characterReferences && data.characterReferences.length > 0 ? (
                        data.characterReferences.map((ref, index) => (
                            <View key={index} style={{ marginBottom: 5 }}>
                                <Text style={styles.nestedValueTitle}>{ref.name || ""}</Text>
                                <Text style={styles.nestedSubText}>{ref.occupation || ""}</Text>
                                <Text style={styles.nestedSubText}>{ref.address || ""}</Text>
                            </View>
                        ))
                    ) : (
                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.nestedValueTitle}>Name</Text>
                            <Text style={styles.nestedSubText}>Occupation</Text>
                            <Text style={styles.nestedSubText}>Address</Text>
                        </View>
                    )}
                </View>

                {/* CERTIFICATION */}
                <Text style={styles.certifyText}>
                    I hereby certify that the above information is true and correct to the best of my knowledge and belief.
                </Text>

            </Page>
        </Document>
    );
}
