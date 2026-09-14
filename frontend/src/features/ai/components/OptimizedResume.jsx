import React from "react";

const safeJoin = (items, separator = ", ") => {
    if (Array.isArray(items)) return items.join(separator);
    if (typeof items === "string") return items;
    return "";
};

const SectionTitle = ({ children }) => (
    <h2 className="mt-2 mb-1 border-b border-gray-900 pb-0.5 text-[11px] font-bold uppercase tracking-wider text-gray-900">
        {children}
    </h2>
);

const OptimizedResume = ({ resume, targetRole }) => {
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

    // Derived dynamic title matching target JD
    const dynamicTitle =
        header.title ||
        targetRole ||
        resume?.optimization?.targetRole ||
        "Full-Stack Developer";

    const hasSkills =
        skills &&
        typeof skills === "object" &&
        !Array.isArray(skills) &&
        Object.values(skills).some(
            (value) => Array.isArray(value) && value.length > 0
        );

    return (
        <div
            id="optimized-resume"
            className="resume-a4-page mx-auto bg-white text-gray-900 shadow-2xl transition-all"
            style={{
                width: "210mm",
                height: "297mm",
                maxHeight: "297mm",
                padding: "12mm 14mm",
                overflow: "hidden",
                boxSizing: "border-box",
                fontFamily: "Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: "10pt",
                lineHeight: "1.25",
                color: "#111827",
            }}
        >
            {/* INLINE PRINT STYLES FOR EXACT SINGLE-PAGE PRINTING */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    @page {
                        size: A4;
                        margin: 0;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        background: #fff !important;
                    }
                    .resume-a4-page {
                        box-shadow: none !important;
                        margin: 0 !important;
                        width: 210mm !important;
                        height: 297mm !important;
                        max-height: 297mm !important;
                        page-break-inside: avoid !important;
                        page-break-after: avoid !important;
                        overflow: hidden !important;
                    }
                }
                `
            }} />

            {/* ================= 1. HEADER ================= */}
            <header className="text-center pb-1">
                <h1 className="text-[17pt] font-extrabold uppercase tracking-tight text-gray-900 leading-none">
                    {header.name || "ADITYA SINGH RATHOR"}
                </h1>

                {/* Dynamic Job Title Header matching target JD */}
                <div className="mt-1 text-[11pt] font-semibold tracking-wide text-indigo-700">
                    {dynamicTitle}
                </div>

                {/* Exact Contact Line */}
                <div className="mt-1 flex flex-wrap justify-center items-center gap-x-2 text-[9pt] text-gray-600">
                    {header.phone && <span>{header.phone}</span>}
                    {header.email && <span>• {header.email}</span>}
                    {header.location && <span>• {header.location}</span>}
                    {header.linkedin && <span>• {header.linkedin}</span>}
                    {header.github && <span>• {header.github}</span>}
                    {header.portfolio && <span>• {header.portfolio}</span>}
                </div>
            </header>

            {/* ================= 2. PROFESSIONAL SUMMARY ================= */}
            {summary && (
                <section className="mt-1.5">
                    <SectionTitle>Professional Summary</SectionTitle>
                    <p className="text-[9.5pt] leading-[1.3] text-gray-700 text-justify">
                        {summary}
                    </p>
                </section>
            )}

            {/* ================= 3. TECHNICAL SKILLS ================= */}
            {hasSkills && (
                <section className="mt-1.5">
                    <SectionTitle>Technical Skills</SectionTitle>
                    <div className="space-y-[2px] text-[9.5pt] leading-[1.3]">
                        {skills.languages?.length > 0 && (
                            <div>
                                <strong className="font-semibold text-gray-900">Languages:</strong>{" "}
                                <span className="text-gray-700">{safeJoin(skills.languages)}</span>
                            </div>
                        )}
                        {skills.frontend?.length > 0 && (
                            <div>
                                <strong className="font-semibold text-gray-900">Frontend:</strong>{" "}
                                <span className="text-gray-700">{safeJoin(skills.frontend)}</span>
                            </div>
                        )}
                        {skills.backend?.length > 0 && (
                            <div>
                                <strong className="font-semibold text-gray-900">Backend:</strong>{" "}
                                <span className="text-gray-700">{safeJoin(skills.backend)}</span>
                            </div>
                        )}
                        {skills.databases?.length > 0 && (
                            <div>
                                <strong className="font-semibold text-gray-900">Databases:</strong>{" "}
                                <span className="text-gray-700">{safeJoin(skills.databases)}</span>
                            </div>
                        )}
                        {skills.tools?.length > 0 && (
                            <div>
                                <strong className="font-semibold text-gray-900">Tools & DevOps:</strong>{" "}
                                <span className="text-gray-700">{safeJoin(skills.tools)}</span>
                            </div>
                        )}
                        {skills.other?.length > 0 && (
                            <div>
                                <strong className="font-semibold text-gray-900">Soft Skills / Core:</strong>{" "}
                                <span className="text-gray-700">{safeJoin(skills.other)}</span>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* ================= 4. PROFESSIONAL EXPERIENCE ================= */}
            {(experience.length > 0 || freelance.length > 0) && (
                <section className="mt-1.5">
                    <SectionTitle>
                        {experience.length > 0 ? "Professional Experience" : "Freelance Experience"}
                    </SectionTitle>

                    {(experience.length > 0 ? experience : freelance).slice(0, 2).map((item, index) => (
                        <div key={index} className="mb-2">
                            <div className="flex justify-between items-baseline">
                                <div>
                                    <span className="text-[10pt] font-bold text-gray-900">
                                        {item.role}
                                    </span>
                                    <span className="text-[9.5pt] text-gray-700">
                                        {" — "}
                                        <span className="font-medium">{item.company}</span>
                                        {item.location && <span className="text-gray-500"> ({item.location})</span>}
                                    </span>
                                </div>
                                {item.dates && (
                                    <span className="whitespace-nowrap text-[9pt] font-medium text-gray-500">
                                        {item.dates}
                                    </span>
                                )}
                            </div>

                            <ul className="mt-0.5 list-disc pl-4 space-y-[1px] text-[9pt] leading-[1.25] text-gray-700">
                                {item.bullets?.slice(0, 3).map((bullet, bulletIndex) => (
                                    <li key={bulletIndex}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* ================= 5. KEY PROJECTS ================= */}
            {projects.length > 0 && (
                <section className="mt-1.5">
                    <SectionTitle>Key Projects</SectionTitle>

                    {projects.slice(0, 2).map((project, index) => (
                        <div key={index} className="mb-2">
                            <div className="flex justify-between items-baseline">
                                <div className="flex flex-wrap items-baseline gap-1.5">
                                    <span className="text-[10pt] font-bold text-gray-900">
                                        {project.name}
                                    </span>
                                    {project.technologies?.length > 0 && (
                                        <span className="text-[8.5pt] font-medium text-indigo-700">
                                            | {safeJoin(project.technologies)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <ul className="mt-0.5 list-disc pl-4 space-y-[1px] text-[9pt] leading-[1.25] text-gray-700">
                                {project.bullets?.slice(0, 3).map((bullet, bulletIndex) => (
                                    <li key={bulletIndex}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* ================= 6. EDUCATION ================= */}
            {education.length > 0 && (
                <section className="mt-1.5">
                    <SectionTitle>Education</SectionTitle>

                    {education.slice(0, 2).map((item, index) => (
                        <div key={index} className="mb-1 flex justify-between items-baseline text-[9.5pt]">
                            <div>
                                <span className="font-bold text-gray-900">{item.degree}</span>
                                <span className="text-gray-700">
                                    {" — "}{item.institution}
                                    {item.location && <span className="text-gray-500">, {item.location}</span>}
                                </span>
                                {item.details?.length > 0 && (
                                    <span className="text-gray-600 text-[9pt]">
                                        {" "}({safeJoin(item.details, " • ")})
                                    </span>
                                )}
                            </div>

                            {item.dates && (
                                <span className="whitespace-nowrap text-[9pt] font-medium text-gray-500">
                                    {item.dates}
                                </span>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* ================= 7. CERTIFICATIONS & ACHIEVEMENTS ================= */}
            {(certifications.length > 0 || achievements.length > 0) && (
                <section className="mt-1">
                    <SectionTitle>Certifications & Achievements</SectionTitle>
                    <ul className="list-disc pl-4 space-y-[1px] text-[9pt] leading-[1.2] text-gray-700">
                        {certifications.slice(0, 2).map((item, index) => (
                            <li key={`cert-${index}`}>
                                <span className="font-semibold text-gray-900">Certification:</span> {item}
                            </li>
                        ))}
                        {achievements.slice(0, 2).map((item, index) => (
                            <li key={`ach-${index}`}>
                                <span className="font-semibold text-gray-900">Achievement:</span> {item}
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
};

export default OptimizedResume;