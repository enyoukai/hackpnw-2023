const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    resolved: { type: Boolean, required: true },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }
});

module.exports = mongoose.model('Post', postSchema);