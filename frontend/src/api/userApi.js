import { api } from './client';

export const userApi = {
    // Upload profile image
    uploadProfileImage: async (file) => {
        const formData = new FormData();
        formData.append('profileImage', file);

        const { data } = await api.post('/users/upload-profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    },

    // Delete profile image
    deleteProfileImage: async () => {
        const { data } = await api.delete('/users/profile-image');
        return data;
    },

    // Get user profile
    getUserProfile: async () => {
        const { data } = await api.get('/users/profile');
        return data;
    },

    // Update user profile
    updateUserProfile: async (userData) => {
        const { data } = await api.put('/users/profile', userData);
        return data;
    },
};
