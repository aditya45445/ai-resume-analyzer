import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        paddingTop: 22,
        paddingBottom: 22,
        paddingLeft: 26,
        paddingRight: 26,
        fontFamily: "Helvetica",
        fontSize: 8.5,
        color: "#111827",
        lineHeight: 1.25,
    },
    header: { textAlign: "center", marginBottom: 5 },
    name: {
        fontSize: 16,
        fontFamily: "Helvetica-Bold",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        color: "#111827",
    },
    dynamicTitle: {
        fontSize: 10,
        fontFamily: "Helvetica-Bold",
        color: "#4338ca",
        marginTop: 1.5,
        letterSpacing: 0.3,
    },
    contactRow: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: 2.5,
        fontSize: 7.8,
        color: "#4b5563",
    },
    sectionTitle: {
        fontSize: 9,
        fontFamily: "Helvetica-Bold",
        textTransform: "uppercase",
        borderBottomWidth: 0.75,
        borderBottomColor: "#111827",
        paddingBottom: 1.5,
        marginTop: 4,
        marginBottom: 2.5,
        letterSpacing: 0.5,
        color: "#111827",
    },
    summaryText: {
        fontSize: 8,
        lineHeight: 1.25,
        color: "#1f2937",
        textAlign: "justify",
    },
    skillRow: { flexDirection: "row", marginBottom: 1 },
    boldLabel: { fontFamily: "Helvetica-Bold", fontSize: 8, color: "#111827" },
    entryBlock: { marginBottom: 3.5 },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
    },
    roleTitle: { fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#111827" },
    companySub: { fontSize: 7.8, fontFamily: "Helvetica-Oblique", color: "#4b5563" },
    dateText: { fontSize: 7.5, color: "#6b7280" },
    bulletList: { paddingLeft: 6, marginTop: 1 },
    bulletItem: { flexDirection: "row", marginBottom: 0.8 },
    bulletDot: { width: 7, fontSize: 7.5, color: "#374151" },
    bulletContent: { flex: 1, fontSize: 7.8, lineHeight: 1.2, color: "#374151" },
});

const safeJoin = (items, separator = ", ") =>
    Array.isArray(items) ? items.join(separator) : typeof items === "string" ? items : "";

export const ResumePDFDocument = ({ resume, targetRole }) => {
    if (!resume) return null;

    const {
        header = {},
        summary = "",
        skills = {},
        experience = [],
        freelance = [],
        projects = [],
        education = [],
        certifications = [],
        achievements = [],
    } = resume;

    const dynamicTitle =
        header.title || targetRole || resume?.optimization?.targetRole || "Full-Stack Developer";

    const hasSkills =
        skills &&
        typeof skills === "object" &&
        !Array.isArray(skills) &&
        Object.values(skills).some((val) => Array.isArray(val) && val.length > 0);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* HEADER */}
                <View style={styles.header}>
                    <Text style={styles.name}>{header.name || "ADITYA SINGH RATHOR"}</Text>
                    <Text style={styles.dynamicTitle}>{dynamicTitle}</Text>
                    <View style={styles.contactRow}>
                        {header.phone && <Text>{header.phone}</Text>}
                        {header.email && <Text>• {header.email}</Text>}
                        {header.location && <Text>• {header.location}</Text>}
                        {header.linkedin && <Text>• {header.linkedin}</Text>}
                        {header.github && <Text>• {header.github}</Text>}
                        {header.portfolio && <Text>• {header.portfolio}</Text>}
                    </View>
                </View>

                {/* SUMMARY */}
                {summary && (
                    <View>
                        <Text style={styles.sectionTitle}>Professional Summary</Text>
                        <Text style={styles.summaryText}>{summary}</Text>
                    </View>
                )}

                {/* SKILLS */}
                {hasSkills && (
                    <View>
                        <Text style={styles.sectionTitle}>Technical Skills</Text>
                        {skills.languages?.length > 0 && (
                            <View style={styles.skillRow}>
                                <Text style={styles.boldLabel}>Languages: </Text>
                                <Text>{safeJoin(skills.languages)}</Text>
                            </View>
                        )}
                        {skills.frontend?.length > 0 && (
                            <View style={styles.skillRow}>
                                <Text style={styles.boldLabel}>Frontend: </Text>
                                <Text>{safeJoin(skills.frontend)}</Text>
                            </View>
                        )}
                        {skills.backend?.length > 0 && (
                            <View style={styles.skillRow}>
                                <Text style={styles.boldLabel}>Backend: </Text>
                                <Text>{safeJoin(skills.backend)}</Text>
                            </View>
                        )}
                        {skills.databases?.length > 0 && (
                            <View style={styles.skillRow}>
                                <Text style={styles.boldLabel}>Databases: </Text>
                                <Text>{safeJoin(skills.databases)}</Text>
                            </View>
                        )}
                        {skills.tools?.length > 0 && (
                            <View style={styles.skillRow}>
                                <Text style={styles.boldLabel}>Tools: </Text>
                                <Text>{safeJoin(skills.tools)}</Text>
                            </View>
                        )}
                        {skills.other?.length > 0 && (
                            <View style={styles.skillRow}>
                                <Text style={styles.boldLabel}>Other: </Text>
                                <Text>{safeJoin(skills.other)}</Text>
                            </View>
                        )}
                    </View>
                )}

                {/* EXPERIENCE */}
                {experience.length > 0 && (
                    <View>
                        <Text style={styles.sectionTitle}>Experience</Text>
                        {experience.map((item, index) => (
                            <View key={index} style={styles.entryBlock}>
                                <View style={styles.rowBetween}>
                                    <View>
                                        <Text style={styles.roleTitle}>{item.role}</Text>
                                        <Text style={styles.companySub}>
                                            {item.company}
                                            {item.location && ` • ${item.location}`}
                                        </Text>
                                    </View>
                                    {item.dates && <Text style={styles.dateText}>{item.dates}</Text>}
                                </View>
                                {item.bullets?.length > 0 && (
                                    <View style={styles.bulletList}>
                                        {item.bullets.map((bullet, bIdx) => (
                                            <View key={bIdx} style={styles.bulletItem}>
                                                <Text style={styles.bulletDot}>•</Text>
                                                <Text style={styles.bulletContent}>{bullet}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* FREELANCE */}
                {freelance.length > 0 && (
                    <View>
                        <Text style={styles.sectionTitle}>Freelance Experience</Text>
                        {freelance.map((item, index) => (
                            <View key={index} style={styles.entryBlock}>
                                <View style={styles.rowBetween}>
                                    <View>
                                        <Text style={styles.roleTitle}>{item.role}</Text>
                                        <Text style={styles.companySub}>
                                            {item.company}
                                            {item.location && ` • ${item.location}`}
                                        </Text>
                                    </View>
                                    {item.dates && <Text style={styles.dateText}>{item.dates}</Text>}
                                </View>
                                {item.bullets?.length > 0 && (
                                    <View style={styles.bulletList}>
                                        {item.bullets.map((bullet, bIdx) => (
                                            <View key={bIdx} style={styles.bulletItem}>
                                                <Text style={styles.bulletDot}>•</Text>
                                                <Text style={styles.bulletContent}>{bullet}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* PROJECTS */}
                {projects.length > 0 && (
                    <View>
                        <Text style={styles.sectionTitle}>Projects</Text>
                        {projects.map((project, index) => (
                            <View key={index} style={styles.entryBlock}>
                                <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                                    <Text style={styles.roleTitle}>{project.name}</Text>
                                    {project.technologies?.length > 0 && (
                                        <Text style={[styles.companySub, { marginLeft: 4 }]}>
                                            | {safeJoin(project.technologies)}
                                        </Text>
                                    )}
                                </View>
                                {project.bullets?.length > 0 && (
                                    <View style={styles.bulletList}>
                                        {project.bullets.map((bullet, bIdx) => (
                                            <View key={bIdx} style={styles.bulletItem}>
                                                <Text style={styles.bulletDot}>•</Text>
                                                <Text style={styles.bulletContent}>{bullet}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* EDUCATION */}
                {education.length > 0 && (
                    <View>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {education.map((item, index) => (
                            <View key={index} style={[styles.rowBetween, { marginBottom: 3 }]}>
                                <View>
                                    <Text style={styles.roleTitle}>{item.degree}</Text>
                                    <Text style={{ fontSize: 8 }}>
                                        {item.institution}
                                        {item.location && ` • ${item.location}`}
                                    </Text>
                                    {item.details?.length > 0 && (
                                        <Text style={{ fontSize: 7.5, color: "#4b5563" }}>
                                            {safeJoin(item.details, " • ")}
                                        </Text>
                                    )}
                                </View>
                                {item.dates && <Text style={styles.dateText}>{item.dates}</Text>}
                            </View>
                        ))}
                    </View>
                )}

                {/* CERTIFICATIONS */}
                {certifications.length > 0 && (
                    <View>
                        <Text style={styles.sectionTitle}>Certifications</Text>
                        <View style={styles.bulletList}>
                            {certifications.map((item, index) => (
                                <View key={index} style={styles.bulletItem}>
                                    <Text style={styles.bulletDot}>•</Text>
                                    <Text style={styles.bulletContent}>{item}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* ACHIEVEMENTS */}
                {achievements.length > 0 && (
                    <View>
                        <Text style={styles.sectionTitle}>Achievements</Text>
                        <View style={styles.bulletList}>
                            {achievements.map((item, index) => (
                                <View key={index} style={styles.bulletItem}>
                                    <Text style={styles.bulletDot}>•</Text>
                                    <Text style={styles.bulletContent}>{item}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}
            </Page>
        </Document>
    );
};

export default ResumePDFDocument;
