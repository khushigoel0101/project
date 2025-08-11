// api/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const serverless = require('serverless-http');

const connectDB = require('../config/db');
const userRoutes = require('../routes/userRoutes');
const productRoutes = require('../routes/ProductRoutes');
const cartRoutes = require('../routes/cartRoutes');
const checkoutRoutes = require('../routes/checkoutRoutes');
const orderRoutes = require('../routes/orderRoutes');
const uploadRoutes = require('../routes/uploadRoutes');
const subscribeRoutes = require('../routes/subscriberRoutes');
const adminRoutes = require("../routes/adminRoutes");
const productAdminRoutes = require("../routes/productAdminRoutes");
const adminOrderRoutes = require("../routes/adminOrderRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to API');
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api', subscribeRoutes);
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

module.exports = serverless(app);
