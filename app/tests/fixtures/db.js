const mongoose = require('mongoose');
const Contact = require('../../src/models/contact');
const env = process.env.ENV;
const host = process.env.MONGO_HOST ? env == 'ci' : process.env.MONGO_LOCAL_HOST
const port = process.env.MONGO_PORT ? env == 'ci' : process.env.MONGO_LOCAL_PORT


function setMongoURI() {
    const uri = 'mongodb://'+ host + ':' + port + '/my-app';
    return uri;
}

const clearDatabase = async () => {
    await Contact.deleteMany();
}

module.exports = {
    clearDatabase,
    setMongoURI
}