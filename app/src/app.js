const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(201).send("Hello GitHub!");
    console.log('Welcome message');
});

module.exports = app;