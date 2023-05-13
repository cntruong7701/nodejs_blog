const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override')

const SortMiddleware = require('./app/middleware/sortMiddleware');

const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db/index');

db.connect();

app.use(express.static(path.join(__dirname, '/public')));

app.use(methodOverride('_method'))

app.use(express.urlencoded());
app.use(express.json());

//custom middleware
app.use(SortMiddleware);

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    engine({
        extname: 'hbs',
        helpers: require('./helpers/handlebars')
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

//routes init
route(app);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
