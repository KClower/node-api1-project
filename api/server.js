// BUILD YOUR SERVER HERE
const express = require('express');

const server = express();

let users = [
    {
        id: "1", // String, required
        name: "Jane Doe",  // String, required
        bio: "Having fun", // String, required
    },
    {
        id: "2",
        name: "Kevin Smith",
        bio: "Loves dogs",
    },
    {
        id: "3",
        name: "Connie Barry",
        bio: "Loves cats",
    },
    {
        id: "4",
        name: "Oscar Cruz",
        bio: "Is a great person",
    },
];

server.get('/', (req, res) => {
    res.status(200).send('<h1>Hello World!</h1>')
})

server.get('/api/users', (req, res) => {
    res.status(200).json(users)
})

server.post('/api/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
})




module.exports = server; // EXPORT YOUR SERVER instead of {}
