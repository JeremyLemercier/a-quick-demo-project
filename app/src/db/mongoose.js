const mongoose = require('mongoose');

// Connection to MongoDB without Automated Tests
async () => {
    process.env.ENV !== 'ci' ? await connect(process.env.MONGO_LOCAL_URI) : null;
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

module.exports = { connect, disconnect }
