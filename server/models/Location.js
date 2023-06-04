const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
	latitude: Number,
	longitude: Number,
	addressName: String
});

module.exports = mongoose.model('Location', locationSchema);