const express = require('express');
const bodyParser = require('body-parser');
const webPush = require('web-push');
const cors = require('cors');
const data = require('./data.json');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const publicKey = 'BC5LtMo7gB_9dqHCD6XtGgzkI80jUJRQKS9rbXhuRH9HGWbLLzhT9Oh5-1YB0kppbFSFNci5u0aLnoyQT5T0XLA';
const privateKeys = 'n_JbAB3oDLLUZrjZmGf9W0JafDF5-DM8sBhtGoeuo-k';

webPush.setVapidDetails('mailto:test@test.com', publicKey, privateKeys);

// Middleware to parse JSON requests

// Routes
app.post('/subscribe', (req, res) => {
  console.log("Here....");
  const subscribtion = req.body;
  res.status(201).json({});

  const payload = JSON.stringify({ title: 'Push Test' });

  webPush.sendNotification(subscribtion, payload).catch(err => console.error(err));
});

// Get all Coffees
app.get('/coffees', (req, res) => {
  res.json(data);
});

// Get a specific coffee by ID
app.get('/coffee/:id', (req, res) => {
  const coffeeId = parseInt(req.params.id);
  const coffee = data.find(d => d.id === coffeeId);

  if (coffee) {
    res.json(coffee);
  } else {
    res.status(404).json({ error: 'Coffee not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
