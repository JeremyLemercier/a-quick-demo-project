const mongoose = require('mongoose');
const Contact = require('../../src/models/contact');

const clearDatabase = async () => {
    await Contact.deleteMany();
}

module.exports = {
    clearDatabase
}