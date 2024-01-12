const express = require('express');
require('./db/mongoose');
const contactRoutes = require('./routes/contact')
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(201).send("Hello GitHub!");
    console.log('Welcome message');
});

// Router
app.use(contactRoutes);

module.exports = app;