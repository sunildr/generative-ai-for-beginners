// starter code
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})


// (Prompt 1) find 3 improvements to the code and apply
// Below are three improvements and the updated code:
// Use an environment variable for the port: Instead of hardcoding port 3000, use the PORT environment variable with a fallback.
// Enable JSON body parsing: Add the express.json() middleware to automatically parse JSON request bodies.
// Add a generic error-handling middleware: This middleware catches errors from the app and sends a standardized response while logging the error.

// Improved code
'use strict';
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Generic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});


// (Prompt 2) improve the code and make it more secure
//
// Below are three security improvements:
// Use Helmet: This middleware securely sets various HTTP headers.
// Implement Rate Limiting: Use a rate limiter to protect against brute-force and DDoS attacks.
// Hide Error Stack in Production: Modify the error handler to avoid exposing sensitive error details when running in production.
//
// Below is the updated code:
'use strict';
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Use Helmet to set secure HTTP headers
app.use(helmet());

// Rate limiter middleware to limit repeated requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests, please try again later.'
});
app.use(limiter);

// Middleware to parse JSON request bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Generic error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  const errorResponse = process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.stack;
  res.status(500).send(errorResponse);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});