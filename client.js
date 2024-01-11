const mongoose = require('mongoose')
const URI='mongodb://' + process.env.MONGO_HOST + ':' + process.env.MONGO_PORT + '/test'

async function main() {
    await connect();
    await sleep();
    await disconnect();
}

main();

function connect() {
    return mongoose.connect(URI, {
        serverSelectionTimeoutMS: 5000
      }).then(() => {
        console.log("Database connected.");
    }).catch(err => console.log(err.reason));
}

function disconnect() {
    return mongoose.disconnect().then(() => {
        console.log("Database disconnected.");
    });
}


function sleep() {
    return new Promise(resolve => {
        for (let i = 3; i >= 1; i--) {
            setTimeout(() => {
                console.log('alarm in :' + i);
                if (i === 1) {
                    console.log('Wake up!');
                    resolve();
                }
            }, (3 - i) * 1000);
        }
    });
}