// CRUD - Create Read Update Delete
const mongoose = require('mongoose');
const env = process.env.ENV; 
const MONGO_URI = setEnvConfig();

async () => {
    env !== 'ci' ? await connect(MONGO_URI) : null;
}


function setEnvConfig(env) {
    if(env !== 'ci') {
        uri = process.env.MONGO_LOCAL_URI;
    } else if (env == 'ci') {
        uri = 'mongodb://'+ process.env.MONGO_HOST + ':' + process.env.MONGO_PORT + '/my-app';
    }
    return uri;
}

function connect(uri) {
    return mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000
      }).then(() => {
        console.log("Database connected.");
    }).catch(err => console.log(err.reason));
}

//  Teardown method for jest
function disconnect() {
    return mongoose.disconnect().then(() => {
        console.log("Database disconnected.");
    });
}

module.exports = { connect, disconnect, MONGO_URI }
