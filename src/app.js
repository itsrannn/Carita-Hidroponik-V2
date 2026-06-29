const express = require('express');
const cors = require('cors');

const app = express();


const securityHeaders = (_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
};

const paymentRoutes = require('../routes/payment.routes');
const profileRoutes = require('../routes/profile.routes');
const shippingRoutes = require('../routes/shipping.routes');
const growLabRoutes = require('../routes/grow-lab.routes');

const corsOptions = {
  origin: 'https://itsrannn.github.io',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(securityHeaders);
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

app.use('/api/payment', paymentRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/order', paymentRoutes);
app.use('/api', paymentRoutes);
app.use('/api', profileRoutes);
app.use('/api/shipping', shippingRoutes);
app.use('/api/grow-lab', growLabRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'online' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found.' });
});

app.use((err, req, res, _next) => {
  console.error('[API] Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error.' });
});

module.exports = app;
