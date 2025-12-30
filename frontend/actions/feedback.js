'use server';
import axios from 'axios';

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export async function submitFeedback({ feedbackType, message, email }) {
    try {
        const response = await axios.post(`${BACKEND_BASE_URL}/api/feedback/`, {
            feedback_type: feedbackType,
            message,
            email
        });

        return {
            success: true,
            message: response.data.message || 'Feedback submitted successfully!'
        };
    } catch (error) {
        console.error('Error submitting feedback:', error);
        return {
            success: false,
            message: error?.response?.data?.error || 'Failed to submit feedback'
        };
    }
}
