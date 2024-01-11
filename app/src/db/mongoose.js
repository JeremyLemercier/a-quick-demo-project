// CRUD - Create Read Update Delete
const mongoose = require('mongoose');
// connect();
// mongoose.connect(process.env.MONGO_LOCAL_URI).then(() => {
//     console.log("Database connected.");
// });

function connect() {
    return mongoose.connect(process.env.MONGO_LOCAL_URI).then(() => {
        console.log("Database connected.");
    });
}

//  Teardown method for jest
function disconnect() {
    return mongoose.disconnect().then(() => {
        console.log("Database disconnected.");
    });
}

module.exports = { connect, disconnect }
