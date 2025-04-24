const express = require('express');
const otplib = require('otplib');
const app = express();

app.get('/api/totp', (req, res) => {
  const secret = req.query.secret;
  if (!secret) return res.status(400).send('Missing secret');
  const token = otplib.authenticator.generate(secret);
  res.send(token);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('TOTP API running');
});
