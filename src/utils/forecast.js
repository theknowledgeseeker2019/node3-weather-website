const request = require('request');  

const forecast = (latitude, longitude, callback) => {

    //'http://api.weatherstack.com/current?access_key=cbd0d60fa0921b8d0692b4799c289aaa&query=37.8267,-122.4233&units=f'
    const url = 'http://api.weatherstack.com/current?access_key=cbd0d60fa0921b8d0692b4799c289aaa&query=' + latitude + ',' + longitude + '&units=f'
    
    //console.log('url', url);

    request ({ url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to network', undefined);
        } else if(body.error){
            callback('Unable to find location', undefined);  
        } else {
            callback(undefined, 
                body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees outside.  It feels like ' + body.current.feelslike + ' degrees outside.  The humidity is ' + body.current.humidity + '.');
        }
    });
};

module.exports = forecast; 