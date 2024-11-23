const express = require('express');
const Movie = require('../models/Movie');
const { protect } = require('../middlewares/authMiddleware'); // Import middleware
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

//Get by Genre 
router.get('/genre/:genre', protect, async (req, res) => {
    try {
        const moviesByGenre = await Movie.find({
            genre: new RegExp(req.params.genre, 'i'),
            user: req.user._id,
        });
        res.json(moviesByGenre);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get by director name
router.get('/director/:name', protect, async (req, res) => {
    try {
        const moviesByDirector = await Movie.find({
            director: new RegExp(req.params.name, 'i'),
            user: req.user._id,
        });
        res.json(moviesByDirector);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get by producer name
router.get('/producer/:name', protect, async (req, res) => {
    try {
        const moviesByProducer = await Movie.find({
            producer: new RegExp(req.params.name, 'i'),
            user: req.user._id,
        });
        res.json(moviesByProducer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get by movie name
router.get('/search/:name', protect, async (req, res) => {
    try {
        const moviesByName = await Movie.find({
            name: new RegExp(req.params.name, 'i'),
            user: req.user._id,
        });
        res.json(moviesByName);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get by distributor
router.get('/distributor/:name', protect, async (req, res) => {
    try {
        const moviesByDistributor = await Movie.find({
            distributor: new RegExp(req.params.name, 'i'),
            user: req.user._id,
        });
        res.json(moviesByDistributor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get by actor 
router.get('/actor/:name', protect, async (req, res) => { 
    try {
        const moviesByActor = await Movie.find({ 
            actor: new RegExp(req.params.name, 'i'), 
            user: req.user._id, 
        });
        res.json(moviesByActor); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

/*
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

// Get all movies
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

// Get all movies marked as favourite
router.get('/status/favourite', async (req, res) => {
    try {
        const favouriteMovies = await Movie.find({ favourite: true });
        res.json(favouriteMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all movies marked as seen
router.get('/status/seen', async (req, res) => {
    try {
        const seenMovies = await Movie.find({ seen: true });
        res.json(seenMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all movies marked as wishlist
router.get('/status/wishlist', async (req, res) => {
    try {
        const wishlistMovies = await Movie.find({ wishlist: true });
        res.json(wishlistMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get all movies by genre.
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

// Delete a movie by id
router.delete('/:id', async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.json({ message: 'Movie deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;

*/