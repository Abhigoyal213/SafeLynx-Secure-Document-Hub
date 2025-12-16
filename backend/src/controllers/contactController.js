const Contact = require('../models/Contact');

// Public: Submit contact form
const submitContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const contact = await Contact.create({
            name,
            email,
            message,
        });

        return res.status(201).json({ message: 'Message sent successfully', contact });
    } catch (err) {
        return res.status(500).json({ message: 'Failed to send message', error: err.message });
    }
};

// Admin: Get all contacts
const getContacts = async (req, res) => {
    try {
        // Basic role check if not handled by middleware
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admin only' });
        }

        const contacts = await Contact.find().sort({ createdAt: -1 });
        return res.json({ contacts });
    } catch (err) {
        return res.status(500).json({ message: 'Failed to fetch contacts', error: err.message });
    }
};

// Admin: Mark as read
const markAsRead = async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });

        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );
        if (!contact) return res.status(404).json({ message: 'Message not found' });
        return res.json({ message: 'Marked as read', contact });
    } catch (err) {
        return res.status(500).json({ message: 'Update failed', error: err.message });
    }
};

// Admin: Delete message
const deleteContact = async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });

        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Message not found' });
        return res.json({ message: 'Message deleted' });
    } catch (err) {
        return res.status(500).json({ message: 'Delete failed', error: err.message });
    }
};

module.exports = {
    submitContact,
    getContacts,
    markAsRead,
    deleteContact
};
