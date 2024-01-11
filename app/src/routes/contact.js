const express = require('express');
const Contact = require('../models/contact');
const router = new express.Router();

// Routes
router.post('/api/contact', postNewContact);


// Create a new Contact
async function postNewContact(req, res) {
    const contact = new Contact(req.body);

    try {
        await contact.save();
        res.status(201).send(contact);
    } catch(e) {
        res.status(500).send(e);
    }
};

module.exports = router;