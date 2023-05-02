const Course = require('../models/Courses'); 
const { mongooseToOject } = require('../../util/mongoose');

class CourseController {
    //[GET] courses/:slug
    index(req, res, next) {
        Course.findOne({ slug: req.params.slug }).lean()
            .then(course =>
                res.render('courses/index', { course })
            )
            .catch(next);
    }

    //[GET] courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[POST] courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${formData.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        course.save()
            .then(() => res.redirect('/'))
            .catch(error => {

            });
    }

    //[GET] courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id).lean()
            .then(courses => res.render('courses/edit', { courses }))
            .catch(next);
    }

    //[PUT] courses/:id
    update(req, res, next) {
        Course.updateOne({_id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
    
}

module.exports = new CourseController();
