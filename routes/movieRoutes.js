const express = require('express');
const Movie = require('../models/Movie');
const router = express.Router();

//Add a new movie 
router.post('/add', async (req, res) => {
    try {
        const movie = new Movie(req.body);
        await movie.save();
        res.status(201).json({ message: 'Movie added', movie });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Get all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get a single movie by its id
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get all movies marked as favourite
router.get('/status/favourite', async (req, res) => {
    try {
        const favouriteMovies = await Movie.find({ "status.favourite": true });
        res.json(favouriteMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get all movies marked as seen
router.get('/status/seen', async (req, res) => {
    try {
        const seenMovies = await Movie.find({ "status.seen": true });
        res.json(seenMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get all movies marked as wishlist
router.get('/status/wishlist', async (req, res) => {
    try {
        const wishlistMovies = await Movie.find({ "status.wishlist": true });
        res.json(wishlistMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/*Get all movies by genre. The new RegExp creates a regular expression, and the "i" is a flag 
meaning case-insensitive. 
*/
router.get('/genre/:genre', async (req, res) => {
    try {
        const moviesByGenre = await Movie.find({ genre: new RegExp(req.params.genre, 'i') });
        res.json(moviesByGenre);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get movies by director
router.get('/director/:name', async (req, res) => {
    try {
        const moviesByDirector = await Movie.find({ director: new RegExp(req.params.name, 'i') });
        res.json(moviesByDirector);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get movies by producer
router.get('/producer/:name', async (req, res) => {
    try {
        const moviesByProducer = await Movie.find({ producer: new RegExp(req.params.name, 'i') });
        res.json(moviesByProducer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get movies by name 
router.get('/search/:name', async (req, res) => {
    try {
        const moviesByName = await Movie.find({ name: new RegExp(req.params.name, 'i') });
        res.json(moviesByName);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get movies by distributor
router.get('/distributor/:name', async (req, res) => {
    try {
        const moviesByDistributor = await Movie.find({ distributor: new RegExp(req.params.name, 'i') });
        res.json(moviesByDistributor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//update movie's details by id. 
router.patch('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Patched successfully", movie });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//delete a movie by id. 
router.delete('/:id', async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.json({ message: 'Movie deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;