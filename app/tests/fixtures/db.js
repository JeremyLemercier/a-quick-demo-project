const mongoose = require('mongoose');
const Contact = require('../../src/models/contact');
const env = process.env.ENV;
const host = (env == 'ci') ? process.env.MONGO_HOST : process.env.MONGO_LOCAL_HOST
const port = (env == 'ci') ? process.env.MONGO_PORT : process.env.MONGO_LOCAL_PORT

console.log('[INFO] -- MONGO_HOST: ' + host + '\n' + '[INFO] -- MONGO_PORT: ' + port)

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