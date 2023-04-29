var express = require('express');
var router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.post('/store', courseController.store);
router.get('/create', courseController.create);
router.get('/:slug', courseController.index);

module.exports = router;
