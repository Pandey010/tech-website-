require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postsRouter = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit for base64 images

// Routes
app.use('/api/posts', postsRouter);

// Database Connection
const startServer = async () => {
  try {
    const defaultUri = 'mongodb://127.0.0.1:27017/techflow';
    let mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        console.warn('⚠️  Warning: MONGO_URI not found in backend/.env');
        console.warn(`⚠️  Falling back to local MongoDB: ${defaultUri}`);
        mongoUri = defaultUri;
    }

    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    if (err.code === 8000 || (err.message && err.message.includes('bad auth'))) {
      console.error('\n❌ AUTHENTICATION ERROR: Login Failed.');
      console.error('----------------------------------------------------');
      console.error('The username or password in backend/.env is incorrect.');
      console.error('\nCHECKLIST:');
      console.error('1. Did you create the user in MongoDB Atlas (Database Access tab)?');
      console.error('2. Did you copy the password correctly?');
      console.error('3. Is your Cluster URL correct? (It should NOT be "cluster.mongodb.net")');
      console.error(`   Current Host: ${process.env.MONGO_URI.split('@')[1]?.split('/')[0] || 'Unknown'}`);
      console.error('\n👉 FIX: Update MONGO_URI in backend/.env with the correct credentials.\n');
    } else if (err.name === 'MongooseServerSelectionError' && err.message.includes('ECONNREFUSED')) {
      console.error('\n❌ CONNECTION ERROR: Server Not Reachable.');
      console.error('----------------------------------------------------');
      console.error('1. You do not have a local MongoDB server running.');
      console.error('2. Your backend/.env file is missing the correct MONGO_URI.');
      console.error('\n👉 ACTION REQUIRED: Open "backend/.env" and paste your MongoDB Connection String there.');
    } else if (err.code === 'ENOTFOUND') {
      console.error('\n❌ DNS ERROR: Invalid Hostname.');
      console.error('----------------------------------------------------');
      console.error('The hostname in your MONGO_URI is incorrect.');
      console.error('\n👉 FIX: Use the exact connection string from MongoDB Atlas > Connect > Drivers.\n');
    } else {
      console.error('❌ Database connection error:', err);
    }
  }
};

startServer();