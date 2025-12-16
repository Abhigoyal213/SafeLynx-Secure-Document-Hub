import { api } from './client';

export const submitContactForm = (data) => api.post('/contact', data);
export const fetchContacts = () => api.get('/contact');
export const markContactRead = (id) => api.patch(`/contact/${id}/read`);
export const deleteContact = (id) => api.delete(`/contact/${id}`);
