const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

module.exports = (upload) => {
  router.post('/', upload.array('files'), uploadController.uploadFiles);
  return router;
};
