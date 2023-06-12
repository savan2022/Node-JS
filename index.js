const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

// Secret key used to sign the JWT
const secretKey = 'Infosys@#';

// Login route
app.post('/login', (req, res) => {
  // Assume a successful authentication
  const user = {
    id: 1,
    username: 'john.doe',
    email: 'john@example.com'
  };

  // Generate a JWT token
  const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

  // Send the token as a response
  res.json({ token });
});

// Protected route
app.get('/protected', (req, res) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization;

  // Verify the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      // Token is invalid or expired
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Token is valid, access granted
    res.json({ message: 'Protected resource accessed', user: decoded });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
