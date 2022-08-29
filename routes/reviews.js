const express = require('express');
const router = express.Router({ mergeParams: true });

// Models
const Campground = require('../models/campground');
const Review = require('../models/review');

// Controllers
const reviews = require('../controllers/reviews');

// Joi form validation schema
const { reviewSchema } = require('../schemas.js');

// Middleware
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')

// Utilities
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

// Routes
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;