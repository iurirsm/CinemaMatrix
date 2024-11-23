const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    director: [{ type: String }],
    actor: [{ type: String }],
    producer: [{ type: String }],
    distributor: { type: String },
    genre: { type: String },
    releaseYear: { type: Number },
    seen: { type: Boolean, default: false },
    favourite: { type: Boolean, default: false },
    wishlist: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Movie', movieSchema);