
import React from 'react'
import { Document, Page, Text, View, StyleSheet, } from '@react-pdf/renderer'

const styles = StyleSheet.create({
    page: {
        paddingTop: 40,
        paddingBottom: 45,
        paddingHorizontal: 42,
        fontFamily: 'Helvetica',
        backgroundColor: '#ffffff',
        color: '#172033',
    },

    header: {
        marginBottom: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#dfe4ee',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 10,
        color: '#667085',
        lineHeight: 1.5,
    },

    section: {
        marginBottom: 20,
    },

    sectionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 5,
    },

    sectionDescription: {
        fontSize: 9,
        color: '#667085',
        marginBottom: 10,
        lineHeight: 1.5,
    },

    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,
        backgroundColor: '#f5f7ff',
        borderWidth: 1,
        borderColor: '#dfe4ff',
        borderRadius: 8,
        marginBottom: 10,
    },

    scoreBox: {
        width: 95,
        height: 95,
        borderRadius: 48,
        backgroundColor: '#eef2ff',
        borderWidth: 5,
        borderColor: '#6366f1',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 22,
    },

    score: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#4f46e5',
    },

    scorePercent: {
        fontSize: 8,
        color: '#667085',
        marginTop: 2,
    },

    scoreInfo: {
        flex: 1,
    },

    scoreTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 6,
    },

    scoreDescription: {
        fontSize: 9,
        lineHeight: 1.5,
        color: '#667085',
    },

    card: {
        padding: 13,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#e4e7ec',
        borderRadius: 7,
        backgroundColor: '#ffffff',
    },

    questionRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },

    questionNumber: {
        width: 30,
        fontSize: 9,
        fontWeight: 'bold',
        color: '#4f46e5',
    },

    question: {
        flex: 1,
        fontSize: 10,
        fontWeight: 'bold',
        lineHeight: 1.5,
        color: '#111827',
    },

    label: {
        fontSize: 8,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },

    intentionBox: {
        padding: 9,
        backgroundColor: '#f5f3ff',
        borderRadius: 5,
        marginBottom: 7,
    },

    intentionLabel: {
        color: '#7c3aed',
    },

    answerBox: {
        padding: 9,
        backgroundColor: '#ecfdf3',
        borderRadius: 5,
    },

    answerLabel: {
        color: '#059669',
    },

    bodyText: {
        fontSize: 9,
        lineHeight: 1.55,
        color: '#475467',
    },

    skillGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    skillCard: {
        width: '48%',
        marginRight: '2%',
        marginBottom: 8,
        padding: 10,
        borderWidth: 1,
        borderColor: '#e4e7ec',
        borderRadius: 6,
    },

    skillName: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 6,
    },

    severity: {
        alignSelf: 'flex-start',
        paddingVertical: 3,
        paddingHorizontal: 7,
        borderRadius: 10,
        fontSize: 7,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },

    low: {
        backgroundColor: '#ecfdf3',
        color: '#039855',
    },

    medium: {
        backgroundColor: '#fffaeb',
        color: '#dc6803',
    },

    high: {
        backgroundColor: '#fef3f2',
        color: '#d92d20',
    },

    preparationCard: {
        flexDirection: 'row',
        padding: 12,
        marginBottom: 9,
        borderWidth: 1,
        borderColor: '#e4e7ec',
        borderRadius: 7,
    },

    dayBox: {
        width: 45,
        height: 45,
        borderRadius: 7,
        backgroundColor: '#eef2ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    dayText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#4f46e5',
    },

    preparationContent: {
        flex: 1,
    },

    dayLabel: {
        fontSize: 7,
        color: '#6366f1',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 3,
    },

    focus: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 4,
    },

    task: {
        fontSize: 9,
        lineHeight: 1.5,
        color: '#667085',
    },

    footer: {
        position: 'absolute',
        bottom: 20,
        left: 42,
        right: 42,
        paddingTop: 7,
        borderTopWidth: 1,
        borderTopColor: '#e4e7ec',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    footerText: {
        fontSize: 7,
        color: '#98a2b3',
    },

    empty: {
        fontSize: 9,
        color: '#98a2b3',
        padding: 10,
    },
})

const getSeverityStyle = (severity) => {
    const value = severity?.toLowerCase()

    if (value === 'low') return styles.low
    if (value === 'medium') return styles.medium

    return styles.high
}

const getScoreText = (score) => {
    if (score >= 80) return 'Excellent Alignment'
    if (score >= 60) return 'Good Alignment'

    return 'Needs Improvement'
}

const ReportAnalysisPDF = ({ data }) => {
    const report = data?.interviewReport || data || {}

    const {
        matchScore = 0,
        technicalQuestions = [],
        behavioralQuestions = [],
        skillGaps = [],
        preparationPlan = [],
    } = report

    return (
        <Document
            title="Resume Analysis Report"
            author="AI Resume Analyzer"
            subject="Resume analysis based on job description"
        >
            <Page size="A4" style={styles.page} wrap>

                {/* HEADER */}
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Resume Analysis Report
                    </Text>

                    <Text style={styles.subtitle}>
                        AI-powered resume analysis and interview preparation
                        based on the provided job description.
                    </Text>
                </View>

                {/* MATCH SCORE */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>
                        Overall Match Score
                    </Text>

                    <Text style={styles.sectionDescription}>
                        Your resume and profile have been evaluated against
                        the requirements provided in the job description.
                    </Text>

                    <View style={styles.scoreContainer}>

                        <View style={styles.scoreBox}>
                            <Text style={styles.score}>
                                {matchScore}
                            </Text>

                            <Text style={styles.scorePercent}>
                                PERCENT
                            </Text>
                        </View>

                        <View style={styles.scoreInfo}>
                            <Text style={styles.scoreTitle}>
                                {getScoreText(matchScore)}
                            </Text>

                            <Text style={styles.scoreDescription}>
                                The match score represents the overall
                                alignment between your profile and the
                                requirements of the target role.
                            </Text>
                        </View>

                    </View>
                </View>

                {/* SKILL GAPS */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>
                        Skill Gaps
                    </Text>

                    <Text style={styles.sectionDescription}>
                        Skills and technologies that may require additional
                        preparation before the interview.
                    </Text>

                    {skillGaps.length > 0 ? (
                        <View style={styles.skillGrid}>
                            {skillGaps.map((gap, index) => (
                                <View
                                    key={index}
                                    style={styles.skillCard}
                                >
                                    <Text style={styles.skillName}>
                                        {gap.skill || 'Unnamed Skill'}
                                    </Text>

                                    <Text
                                        style={[
                                            styles.severity,
                                            getSeverityStyle(gap.severity),
                                        ]}
                                    >
                                        {gap.severity || 'High'}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <Text style={styles.empty}>
                            No significant skill gaps were identified.
                        </Text>
                    )}
                </View>

                {/* TECHNICAL QUESTIONS */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>
                        Technical Interview Questions
                    </Text>

                    <Text style={styles.sectionDescription}>
                        Technical questions generated from the role
                        requirements and your profile.
                    </Text>

                    {technicalQuestions.length > 0 ? (
                        technicalQuestions.map((item, index) => (
                            <View
                                key={index}
                                style={styles.card}
                                wrap={false}
                            >
                                <View style={styles.questionRow}>
                                    <Text style={styles.questionNumber}>
                                        Q{index + 1}
                                    </Text>

                                    <Text style={styles.question}>
                                        {item.question}
                                    </Text>
                                </View>

                                <View style={styles.intentionBox}>
                                    <Text
                                        style={[
                                            styles.label,
                                            styles.intentionLabel,
                                        ]}
                                    >
                                        Intention
                                    </Text>

                                    <Text style={styles.bodyText}>
                                        {item.intention}
                                    </Text>
                                </View>

                                <View style={styles.answerBox}>
                                    <Text
                                        style={[
                                            styles.label,
                                            styles.answerLabel,
                                        ]}
                                    >
                                        Suggested Answer
                                    </Text>

                                    <Text style={styles.bodyText}>
                                        {item.answer}
                                    </Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.empty}>
                            No technical questions were generated.
                        </Text>
                    )}
                </View>

                {/* BEHAVIORAL QUESTIONS */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>
                        Behavioral Interview Questions
                    </Text>

                    <Text style={styles.sectionDescription}>
                        Questions designed to evaluate communication,
                        teamwork, ownership, and problem-solving.
                    </Text>

                    {behavioralQuestions.length > 0 ? (
                        behavioralQuestions.map((item, index) => (
                            <View
                                key={index}
                                style={styles.card}
                                wrap={false}
                            >
                                <View style={styles.questionRow}>
                                    <Text
                                        style={[
                                            styles.questionNumber,
                                            { color: '#7c3aed' },
                                        ]}
                                    >
                                        Q{index + 1}
                                    </Text>

                                    <Text style={styles.question}>
                                        {item.question}
                                    </Text>
                                </View>

                                <View style={styles.intentionBox}>
                                    <Text
                                        style={[
                                            styles.label,
                                            styles.intentionLabel,
                                        ]}
                                    >
                                        Intention
                                    </Text>

                                    <Text style={styles.bodyText}>
                                        {item.intention}
                                    </Text>
                                </View>

                                <View style={styles.answerBox}>
                                    <Text
                                        style={[
                                            styles.label,
                                            styles.answerLabel,
                                        ]}
                                    >
                                        Suggested Answer
                                    </Text>

                                    <Text style={styles.bodyText}>
                                        {item.answer}
                                    </Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.empty}>
                            No behavioral questions were generated.
                        </Text>
                    )}
                </View>

                {/* PREPARATION PLAN */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>
                        Interview Preparation Plan
                    </Text>

                    <Text style={styles.sectionDescription}>
                        Follow this personalized roadmap to prepare for the
                        interview.
                    </Text>

                    {preparationPlan.length > 0 ? (
                        preparationPlan.map((item, index) => (
                            <View
                                key={item._id || item.day || index}
                                style={styles.preparationCard}
                                wrap={false}
                            >
                                <View style={styles.dayBox}>
                                    <Text style={styles.dayText}>
                                        {item.day || index + 1}
                                    </Text>
                                </View>

                                <View style={styles.preparationContent}>
                                    <Text style={styles.dayLabel}>
                                        Day {item.day || index + 1}
                                    </Text>

                                    <Text style={styles.focus}>
                                        Focus: {item.focus}
                                    </Text>

                                    <Text style={styles.task}>
                                        Task: {item.task}
                                    </Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.empty}>
                            No preparation plan was generated.
                        </Text>
                    )}
                </View>

                {/* FOOTER */}
                <View
                    style={styles.footer}
                    fixed
                >
                    <Text style={styles.footerText}>
                        AI Resume Analyzer
                    </Text>

                    <Text
                        style={styles.footerText}
                        render={({ pageNumber, totalPages }) =>
                            `Page ${pageNumber} of ${totalPages}`
                        }
                    />
                </View>

            </Page>
        </Document>
    )
}

export default ReportAnalysisPDF
