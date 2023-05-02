const Course = require('../models/Courses'); 
const { multipleMongooseToOject } = require('../../util/mongoose');

class MeController {
    //[GET] /me/stored/courses
    storeCourses(req, res, next) {
        Course.find({})
            .then(courses => res.render('me/stored-courses',{
                courses: multipleMongooseToOject(courses)
            }))
            .catch(next);
    }
    
}

module.exports = new MeController();
