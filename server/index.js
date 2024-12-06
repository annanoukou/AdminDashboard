const express = require('express');
const axios = require('axios');
const md5 = require('md5');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const authorize = require('./authMiddleware');

require('dotenv').config();

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

const API_KEY = process.env.MAILCHIMP_API_KEY;
const LIST_ID = process.env.MAILCHIMP_LIST_ID;
const DATA_CENTER = API_KEY.split('-')[1];
const API_BASE_URL = `https://${DATA_CENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}`;
const headers = { Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}` };

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

const users = [
  { email: 'admin@gmail.com', password: 'password', role: 'admin' },
  { email: 'user@gmail.com', password: 'password', role: 'user' },
];

const handleError = (res, error) => {
  const status = error.response?.status || 500;
  const message = error.response?.data || 'Internal server error';
  res.status(status).json({ error: message });
};

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1d' });
  res.cookie('authToken', token, { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 86400000 });
  res.json({ message: 'Login successful', role: user.role, token });
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('authToken');
  res.json({ message: 'Logged out' });
});

app.get('/api/admin', authorize('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin' });
});

app.get('/api/user', authorize(['admin', 'user']), (req, res) => {
  res.json({ message: `Welcome, ${req.user.role}` });
});

app.get('/api/check-auth', (req, res) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const user = jwt.verify(token, SECRET_KEY);
    res.json({ username: user.email, role: user.role });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

app.get('/api/subscribers', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/members`, { headers });
    res.json(response.data.members);
  } catch (error) {
    handleError(res, error);
  }
});

app.post('/api/subscribers', async (req, res) => {
  const { email_address, status = 'subscribed', merge_fields = {} } = req.body;
  try {
    const response = await axios.post(`${API_BASE_URL}/members`, { email_address, status, merge_fields }, { headers });
    res.json(response.data);
  } catch (error) {
    handleError(res, error);
  }
});

app.post('/api/subscribers/delete', async (req, res) => {
  const email = req.body.email.toLowerCase();
  const subscriberHash = md5(email);
  try {
    await axios.post(`${API_BASE_URL}/members/${subscriberHash}/actions/delete-permanent`, {}, { headers });
    res.status(204).send();
  } catch (error) {
    handleError(res, error);
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
