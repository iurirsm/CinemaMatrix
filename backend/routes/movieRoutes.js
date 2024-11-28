const express = require('express');
const Movie = require('../models/Movie');
const { protect } = require('../middlewares/authMiddleware'); 
const router = express.Router();

router.post('/add', protect, async (req, res) => {
    try {
        const movie = new Movie({...req.body, user: req.user._id,});
        await movie.save();
        res.status(201).json({ message: 'Movie added', movie });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


//Get all movies
router.get('/', protect, async (req, res) => {
    try {
        const movies = await Movie.find({ user: req.user._id }); 
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get movies by Id. 
router.get('/:id', protect, async (req, res) => {
    try {
        const movie = await Movie.findOne({ _id: req.params.id, user: req.user._id }); 
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found or not authorized' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Update a movie
router.patch('/:id', protect, async (req, res) => {
    try {
        const movie = await Movie.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id }, 
            req.body,
            { new: true }
        );

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found or not authorized' });
        }

        res.json({ message: "Patched successfully", movie });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Delete a movie
router.delete('/:id', protect, async (req, res) => {
    try {
        const movie = await Movie.findOneAndDelete({ _id: req.params.id, user: req.user._id }); 
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found or not authorized' });
        }
        res.json({ message: 'Movie deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get movies on favourite list
router.get('/status/favourite', protect, async (req, res) => {
    try {
        const favouriteMovies = await Movie.find({ favourite: true, user: req.user._id });
        res.json(favouriteMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get movies on seen list 
router.get('/status/seen', protect, async (req, res) => {
    try {
        const seenMovies = await Movie.find({ seen: true, user: req.user._id });
        res.json(seenMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get movies on wishlist
router.get('/status/wishlist', protect, async (req, res) => {
    try {
        const wishlistMovies = await Movie.find({ wishlist: true, user: req.user._id });
        res.json(wishlistMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;

