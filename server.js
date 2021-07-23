if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// required external modules
const express = require ('express');
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');

//app variables
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`We are live on port ${PORT}`));

//app configurations
app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(express.static('/public'));
app.use(expressLayouts);
app.use('/', indexRouter);

//setup connection for the database
mongoose.connect(process.env.DATABASE_URL, { 
useNewUrlParser: true,
useUnifiedTopology: true});
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to mongoose'))