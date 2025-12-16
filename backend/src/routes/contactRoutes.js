const express = require('express');
const {
    submitContact,
    getContacts,
    markAsRead,
    deleteContact
} = require('../controllers/contactController');
const auth = require('../middleware/auth');

const router = express.Router();

// Public route
router.post('/', submitContact);

// Admin routes (protected)
router.get('/', auth, getContacts);
router.patch('/:id/read', auth, markAsRead);
router.delete('/:id', auth, deleteContact);

module.exports = router;
