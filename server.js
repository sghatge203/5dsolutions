/**
 * @author [Sagar Ghatge]
 * @email [sagarghatge203@gmail.com
 * @create date 2020-10-15 20:58:41
 * @modify date 2020-10-15 20:58:41
 * @desc [Bootstraping the Node server]
 */

//  import require modules
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');
var passport = require('passport');
var mongo = require('mongodb').MongoClient;
require('dotenv').config();

var db = require('./models/index.model');

// Setup the MongoDB Connection
db.mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to db');
}).catch((error) => {
    console.log('Connecttion Err', error);
    process.exit();
});

// View Engine Setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'pug');

// Use MiddleWares
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
require('./routes/auth.routes')(app);
require('./routes/moment.routes')(app)

// Create server
const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});