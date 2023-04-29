const Course = require('../models/Courses'); 
const { multipleMongooseToOject } = require('../../util/mongoose');

class SiteController {
    //[GET] / Site
    index(req, res, next) {
        Course.find({})
            .then(courses => {
                res.render('home',{ 
                    courses: multipleMongooseToOject(courses)
                })
            })
            .catch(error => next(error));
        // res.json({
        //     name: 'test'
        // })
        //res.render('home');
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
