import { useState } from "react";
import { optimizeResume } from "../services/ai.api.js";
import OptimizedResume from "./OptimizedResume.jsx";

const ResumeOptimizer = ({
    resume,
    jobDescription,
    analysisReport
}) => {

    const [optimizedResume, setOptimizedResume] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleOptimize = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await optimizeResume({
                resume,
                jobDescription,
                analysisReport
            });

            setOptimizedResume(
                response.data.data.resume
            );

        } catch (error) {

            console.error(
                "Resume optimization error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to optimize resume."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="mt-6">

            <button
                onClick={handleOptimize}
                disabled={loading}
                className="rounded-lg bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading
                    ? "Improving Resume..."
                    : "✨ Improve Resume"
                }
            </button>

            {error && (
                <p className="mt-3 text-sm text-red-500">
                    {error}
                </p>
            )}

            {optimizedResume && (
                <div className="mt-8 overflow-auto rounded-xl bg-gray-100 p-6">

                    <OptimizedResume
                        resume={optimizedResume}
                    />

                </div>
            )}

        </div>
    );
};

export default ResumeOptimizer;