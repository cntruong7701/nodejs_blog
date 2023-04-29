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
    
}

module.exports = new CourseController();