// BUILD YOUR SERVER HERE
const express = require('express');
const usersModel = require("./users/model.js");
const server = express();

server.use(express.json());



server.get('/', (req, res) => {
    res.status(200).send('<h1>Hello World!</h1>');
});

server.get('/api/users', (req, res) => {
    usersModel.find()
        .then(users => {
            res.status(200).json({ message: "Here are a list of users", users });
        })
        .catch(() => {
            res.status(500).json({ message: "There was an error while saving the user to the database" })
        })

});

server.post('/api/users', (req, res) => {
    const newUser = req.body;
    if (!newUser.name || !newUser.bio) {
        return res.status(400).json({ message: "Please provide name and bio for the user" })
    }
    usersModel.insert(newUser)
        .then(createdUser => {
            res.status(201).json({ message: "Created user successfully", createdUser })
        })
        .catch(() => {
            res.status(500).json({ message: "There was an error while saving the user to the database" })
        })
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    usersModel.findById(id)
        .then(findId => {
            if (!findId) {
                return res.status(404).json({ message: "The user with the specified ID does not exist" })
            }
            return res.status(200).json({ message: "Found user successfully", findId })
        })
        .catch(() => {
            return res.status(500).json({ message: "The user information could not be retrieved" })
        })
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    usersModel.remove(id)
        .then(id => {
            if (!id) {
                return res.status(404).json({ message: "The user with the specified ID does not exist" })
            }
            res.status(200).json({ message: "User deleted successfully", id })
        })
        .catch(() => {
            res.status(500).json({ message: "The user could not be removed" })
        })

})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    if (!changes.name || !changes.bio) {
        return res.status(400).json({ message: "Please provide name and bio for the user" })
    }
    usersModel.update(id, changes)
        .then(updateUser => {
            if (!updateUser) {
                return res.status(404).json({ message: "The user with the specified ID does not exist" })
            }
            return res.status(200).json(updateUser)
        })
        .catch(() => {
            return res.status(500).json({ message: "The user information could not be modified" })
        })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
