// CRUD - Create Read Update Delete
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_LOCAL_URI).then(() => {
    console.log("Database connected.");
});