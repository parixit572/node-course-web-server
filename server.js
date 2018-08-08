const express = require('express');
const ejs = require('ejs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

app.set('view engine', 'ejs');

app.locals.viewHelpers = {
    getCurrentYear() {
        return new Date().getFullYear();
    },
    scremIt(text) {
        return text.toUpperCase();
    }
};


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFileSync('server.log', log + '\n');
    next();
});

/* app.use((req, res, next) => {
    res.render('maintenance.ejs');
}); */

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.render('home.ejs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.ejs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Unable to handle request"
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});