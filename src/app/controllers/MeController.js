const Course = require('../models/Courses'); 
const { multipleMongooseToOject } = require('../../util/mongoose');

class MeController {
    //[GET] /me/stored/courses
    storeCourses(req, res, next) {

        const courseQuery = Course.find({});

        if (req.query.hasOwnProperty('_sort')) {
            res.json({message: 'thanhcoong'});
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deleteCount]) => 
                res.render('me/stored-courses', {
                    deleteCount,
                    courses: multipleMongooseToOject(courses),
                })
            )
            .catch(next);
    }


    //[GET] /me/trash/courses
    trashCourses(req,res,next){
        Course.findDeleted({})
            .then(courses => res.render('me/trash-courses',{
                courses: multipleMongooseToOject(courses)
            }))
            .catch(next);
    }
    
}

module.exports = new MeController();
