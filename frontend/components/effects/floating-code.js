'use client';

// Floating code snippets background component with funny developer humor
export default function FloatingCode() {
    const codeSnippets = [
        "while(unemployed) { apply(); }",
        "// TODO: Get hired",
        "git push --force 💪",
        "npm install job",
        "console.log('Please hire me');",
        "if (cv.ats_score > 90) { celebrate(); }",
        "try { getJob(); } catch { cry(); }",
        "rm -rf student_loans",
        "sudo give-me-job --please",
        "recruiter.ghost(me); // 404",
        "experience.required = 10; // for junior role",
        "cv.optimize();",
    ];

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {codeSnippets.map((snippet, index) => (
                <div
                    key={index}
                    className="absolute text-[#2EFF8A]/10 font-mono text-sm whitespace-nowrap animate-pulse"
                    style={{
                        left: `${(index * 17) % 90}%`,
                        top: `${(index * 23) % 90}%`,
                        transform: `rotate(${-15 + (index % 6) * 5}deg)`,
                    }}
                >
                    {snippet}
                </div>
            ))}
        </div>
    );
}
