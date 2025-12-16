import { api } from './client';

export const notificationApi = {
    // Get all notifications
    getNotifications: async () => {
        const { data } = await api.get('/notifications');
        return data;
    },

    // Mark all as read
    markAllAsRead: async () => {
        const { data } = await api.patch('/notifications/mark-all-read');
        return data;
    },

    // Mark single notification as read
    markAsRead: async (id) => {
        const { data } = await api.patch(`/notifications/${id}/read`);
        return data;
    }
};
