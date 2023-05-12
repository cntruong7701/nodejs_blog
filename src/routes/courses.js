var express = require('express');
var router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.post('/store', courseController.store);
router.get('/create', courseController.create);
router.get('/:id/edit', courseController.edit);
router.post('/handle-form-actions', courseController.handleFormActions);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.destroy);
router.delete('/:id/force', courseController.forceDestroy);
router.get('/:slug', courseController.index);

module.exports = router;
