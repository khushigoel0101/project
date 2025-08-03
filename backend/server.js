const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/ProductRoutes');

dotenv.config();  // Load env first

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to API');
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
