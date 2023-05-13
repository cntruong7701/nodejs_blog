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
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
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

    //[DELETE] courses/:id
    destroy(req, res, next) {
        Course.delete({_id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[DELETE] courses/:id/force
    forceDestroy(req, res, next){
        Course.deleteOne({_id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[PATCH] courses/:id/restore
    restore(req, res, next) {
        Course.restore({_id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[POST] courses/handle-form-action
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case "delete":
              Course.delete({ _id: { $in: req.body.courseIds } })
                .then(() => res.redirect("back"))
                .catch(next);
              break;
            default:
              res.json({ message: "action invalid" });
          }
    }
    
}

module.exports = new CourseController();
