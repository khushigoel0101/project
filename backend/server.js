const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/ProductRoutes');
const cartRoutes = require('./routes/cartRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const subscribeRoutes = require('./routes/subscriberRoutes');
const adminRoutes = require("./routes/adminRoutes")

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
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes)
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api', subscribeRoutes);

//admin routes
app.use("/api/admin/users", adminRoutes)


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
