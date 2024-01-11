const request = require('supertest');
const app = require('../src/app');
const Contact = require('../src/models/contact');
const clearDatabase = require('./fixtures/db');

async () => {
    await clearDatabase();
}

test('Should add a new contact', async () => {
    const response = await request(app)
        .post('/api/contact')
        .send({
            name: 'Jeremy',
            email: 'jeremy@example.com',
        }).expect(201);

    // Assert that the database has changed correctly
    const contact = await Contact.findById(response.body._id)
    expect(contact).not.toBeNull()
}, 10000);

test('Should not add a new contact', async () => {
    const response = await request(app)
        .post('/api/contact')
        .send({
            name: 'Alice',
            phone: '04423212651',
        }).expect(500);

    // Assert that the database has not changed correctly
    const contact = await Contact.findById(response.body._id)
    expect(contact).toBeNull()
}, 10000);
