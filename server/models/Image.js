const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
	filename: String,
	filePath: String,
});

module.exports = mongoose.model('Image', imageSchema);