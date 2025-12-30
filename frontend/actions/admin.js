'use server'
import * as ThirdParty from "@/lib/auth";
import { getAccessToken } from "@/lib/server-utils";
import axios from "axios";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export async function getAdminStats() {
    try {
        const cookies = await getAccessToken();
        if (!cookies) {
            return {
                success: false,
                message: "Not authenticated"
            };
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.value}`
        };

        const response = await axios.get(`${BACKEND_BASE_URL}/api/admin/stats/`, { headers });

        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        const status = error?.response?.status;
        return {
            success: false,
            message: status === 403 ? "Access denied. Admins only!" : "Failed to fetch stats",
            statusCode: status
        };
    }
}

export async function getAdminFeedback() {
    try {
        const cookies = await getAccessToken();
        if (!cookies) {
            return { success: false, message: "Not authenticated" };
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.value}`
        };

        const response = await axios.get(`${BACKEND_BASE_URL}/api/admin/feedback/`, { headers });

        return {
            success: true,
            data: response.data.feedback
        };
    } catch (error) {
        console.error('Error fetching admin feedback:', error);
        return {
            success: false,
            message: "Failed to fetch feedback"
        };
    }
}

export async function deleteFeedback(feedbackId) {
    try {
        const cookies = await getAccessToken();
        if (!cookies) {
            return { success: false, message: "Not authenticated" };
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.value}`
        };

        const response = await axios.delete(`${BACKEND_BASE_URL}/api/admin/feedback/?id=${feedbackId}`, { headers });

        return {
            success: true,
            message: response.data.message || 'Feedback deleted'
        };
    } catch (error) {
        console.error('Error deleting feedback:', error);
        return {
            success: false,
            message: "Failed to delete feedback"
        };
    }
}
