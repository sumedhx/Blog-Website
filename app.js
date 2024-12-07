require('dotenv').config();

const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const expressLayout = require('express-ejs-layouts')
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const connectDB = require('./server/config/db');
const { isActiveRoute } = require('./server/helpers/routeHelpers');


const app = express();
const PORT = 5000 || process.env.PORT;

// Connect to DB
connectDB();

// To Send data for searchBar functionality
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// ----- -----

app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    }),
}));

app.use(express.static('public')); 

// Templating Engine
app.use(expressLayout);
app.set('layout', './layout/main');
app.set('view engine', 'ejs');
 
app.locals.isActiveRoute = isActiveRoute;


app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));



app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})

