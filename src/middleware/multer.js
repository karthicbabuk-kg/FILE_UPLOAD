const express = require('express');
const multer = require('multer');

const uploadMiddleware = (upload) => {
  const router = express.Router();
  router.use(upload.array('files'));

  // Add any additional middleware logic here

  return router;
};

module.exports = uploadMiddleware;
