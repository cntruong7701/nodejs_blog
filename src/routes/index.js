const newsRouter = require('./news');
const coursesRouter = require('./courses');
const siteRouter = require('./site');

function route(app) {
    
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);

    app.use('/search', siteRouter);

    app.use('/', siteRouter);
}

module.exports = route;
