const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const uploadRoutes = require('./src/routes/uploadRoutes');

mongoose.connect('mongodb://localhost:27017/file_upload_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use('/upload', uploadRoutes(upload));

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
