// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = []; // In-memory user storage

// Get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Add a new user
app.post('/api/users', (req, res) => {
  const { name, email, dateOfBirth } = req.body;
  const id = users.length + 1;
  const newUser = { id, name, email, dateOfBirth };
  users.push(newUser);
  res.json(newUser);
});

// Update user
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, dateOfBirth } = req.body;
  const user = users.find(user => user.id == id);
  if (user) {
    user.name = name;
    user.email = email;
    user.dateOfBirth = dateOfBirth;
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  users = users.filter(user => user.id != id);
  res.status(204).send();
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
