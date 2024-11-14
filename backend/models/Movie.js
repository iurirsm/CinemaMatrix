const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    director: [{ type: String }],
    producer: [{ type: String }],
    distributor: { type: String },
    genre: { type: String },
    releaseYear: { type: Number },
    seen: { type: Boolean, default: false },
    favourite: { type: Boolean, default: false },
    wishlist: { type: Boolean, default: false }
});

module.exports = mongoose.model('Movie', movieSchema);