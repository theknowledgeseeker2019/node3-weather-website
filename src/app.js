const path = require('path');
const express = require('express');  
const hbs = require('hbs'); 
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();  

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Kirk'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Robot',
        name: 'Short Circuit Robot'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page', 
        message: 'Call 911 if it is an emergency', 
        name: 'Kirk'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide a location'
        });
    }

    const address = req.query.address;   

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            //return console.log(error);
            return res.send({
                error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                // return console.log(error);
                return res.send({
                    error
                });
            }
            
            // console.log(location); 
            // console.log(forecastData);
            res.send({
                forecast: forecastData,
                location,
                address
            });
        });
    });

    // res.send({
    //     address: req.query.address,
    //     forecast: 'It is snowing.',
    //     location: 'Boston'
    // });
});

app.get('/products', (req, res) => {
    

    if (!req.query.search){
        return res.send({
            error: 'Your must provide a search term.'
        })
    }

    res.send({
        products: []
    })
});


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404', 
        message: 'No article found in help.', 
        name: 'Kirk'
    })
});



app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        message: 'Page not found.', 
        name: 'Kirk'
    })

});

app.listen(3000, () => {
    console.log('Server is up and running on port 3000.');
});

