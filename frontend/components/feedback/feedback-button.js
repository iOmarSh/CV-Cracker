'use client';

import { useState } from 'react';
import { FaComment, FaTimes, FaBug, FaLightbulb, FaHeart, FaQuestion } from 'react-icons/fa';
import { submitFeedback } from '@/actions/feedback';

const FEEDBACK_TYPES = [
    { id: 'bug', label: 'Bug Report', icon: FaBug, color: 'text-red-400' },
    { id: 'suggestion', label: 'Suggestion', icon: FaLightbulb, color: 'text-yellow-400' },
    { id: 'praise', label: 'Praise', icon: FaHeart, color: 'text-pink-400' },
    { id: 'other', label: 'Other', icon: FaQuestion, color: 'text-blue-400' },
];

export default function FeedbackButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [feedbackType, setFeedbackType] = useState('suggestion');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setIsSubmitting(true);
        const result = await submitFeedback({ feedbackType, message, email });
        setIsSubmitting(false);

        if (result.success) {
            setSubmitted(true);
            setTimeout(() => {
                setIsOpen(false);
                setSubmitted(false);
                setMessage('');
                setFeedbackType('suggestion');
            }, 2000);
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 p-4 bg-[#2EFF8A] text-[#0f1113] rounded-full shadow-lg hover:scale-110 hover:shadow-[0_0_20px_rgba(46,255,138,0.5)] transition-all duration-300"
                aria-label="Send Feedback"
            >
                <FaComment className="text-xl" />
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="relative w-full max-w-md bg-[#111316] border border-[#2a2d32] rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-[#9AA3A8] hover:text-white transition-colors"
                        >
                            <FaTimes />
                        </button>

                        {submitted ? (
                            <div className="text-center py-8">
                                <div className="text-5xl mb-4">🎉</div>
                                <h3 className="text-xl font-bold text-[#2EFF8A]">Thank you!</h3>
                                <p className="text-[#9AA3A8] mt-2">Your feedback has been submitted.</p>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-xl font-bold text-[#E6E9EB] mb-4">Send Feedback</h3>
                                <p className="text-[#9AA3A8] text-sm mb-6">
                                    Found a bug? Have a suggestion? We&apos;d love to hear from you!
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Feedback Type */}
                                    <div>
                                        <label className="text-[#9AA3A8] text-sm mb-2 block">Type</label>
                                        <div className="grid grid-cols-4 gap-2">
                                            {FEEDBACK_TYPES.map(({ id, label, icon: Icon, color }) => (
                                                <button
                                                    key={id}
                                                    type="button"
                                                    onClick={() => setFeedbackType(id)}
                                                    className={`p-3 rounded-xl border transition-all flex flex-col items-center gap-1 ${feedbackType === id
                                                            ? 'border-[#2EFF8A] bg-[#2EFF8A]/10'
                                                            : 'border-[#2a2d32] hover:border-[#2EFF8A]/50'
                                                        }`}
                                                >
                                                    <Icon className={color} />
                                                    <span className="text-xs text-[#9AA3A8]">{label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Email (Optional) */}
                                    <div>
                                        <label className="text-[#9AA3A8] text-sm mb-2 block">
                                            Email <span className="text-[#6b7280]">(optional)</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="your@email.com"
                                            className="w-full bg-[#0f1113] border border-[#2a2d32] rounded-xl px-4 py-3 text-[#E6E9EB] placeholder-[#6b7280] focus:border-[#2EFF8A] focus:outline-none transition-colors"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="text-[#9AA3A8] text-sm mb-2 block">Message</label>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Tell us what's on your mind..."
                                            rows={4}
                                            required
                                            className="w-full bg-[#0f1113] border border-[#2a2d32] rounded-xl px-4 py-3 text-[#E6E9EB] placeholder-[#6b7280] focus:border-[#2EFF8A] focus:outline-none transition-colors resize-none"
                                        />
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !message.trim()}
                                        className="w-full py-3 bg-[#2EFF8A] text-[#0f1113] font-bold rounded-xl hover:bg-[#26d975] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Feedback'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
