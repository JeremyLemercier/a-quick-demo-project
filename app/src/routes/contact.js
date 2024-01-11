const express = require('express');
const Contact = require('../models/contact');
const router = new express.Router();

// Routes
router.post('/api/contact', postNewContact);


// Create a new Contact
async function postNewContact(req, res) {

    const queryObjects = Object.keys(req.body);
    const isEmail = queryObjects.includes('email');
    const isPhone = queryObjects.includes('phone');

    if (isEmail) {
        const isUniqueEmail = await Contact.isUniqueEmail(req.body.email);
        if (!isUniqueEmail) {
            return res.status(409).send({ error: 'Sorry, a contact is already registred with this email.'});
        }
    } else if (isPhone) {
        const isUniquePhone = await Contact.isUniquePhone(req.body.phone);
        if (!isUniquePhone) {
            return res.status(409).send({ error: 'Sorry, this phone number is already taken. Please, check it.'})
        }
    }
    
    const contact = new Contact(req.body);

    try {
        await contact.save();
        res.status(201).send(contact);
    } catch(e) {
        res.status(500).send(e);
    }
};

module.exports = router;