const fs = require('fs');
const File = require('../models/File');

exports.uploadFiles = async (req, res) => {
  try {
    const files = req.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const existingFile = await File.findOne({ originalName: file.originalname });

      if (existingFile) {
        // Delete the existing file from the file system
        fs.unlinkSync(`uploads/${existingFile.filename}`);
        // Delete the existing file from the database
        await File.deleteOne({ _id: existingFile._id });
      }

      const newFile = new File({
        filename: file.filename,
        originalName: file.originalname,
        size: file.size,
      });

      // Save the new file to the database
      await newFile.save();
    }

    console.log('Files uploaded successfully');

    res.send('Files uploaded successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
