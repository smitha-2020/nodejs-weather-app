// Dear Customer!


// Thank you for subscribing to Free OpenWeatherMap!

// API key:
// - Your API key is f1a4672ed7a0f6cca0e85b33d7030e44
// - Within the next couple of hours, it will be activated and ready to use
// - You can later create more API keys on your account page
// - Please, always use your API key in each API call

// Endpoint:
// - Please, use the endpoint api.openweathermap.org for your API calls
// - Example of API call:
// api.openweathermap.org/data/2.5/weather?q=Helsinki&APPID=f1a4672ed7a0f6cca0e85b33d7030e44

// Useful links:
// - API documentation https://openweathermap.org/api
// - Details of your plan https://openweathermap.org/price
// - Please, note that 16-days daily forecast and History API are not available for Free subscribe


const http = require('http');

 
var requests = require('requests');

const fs = require('fs');

const frontpage = fs.readFileSync('home.html','utf-8');
const replaceVal = (page,ele) => {
    var replacedVal = page.replace('{%temp%}',Math.ceil(ele.main.temp-273.15));
    var replacedVal = replacedVal.replace('{%location%}',ele.name);
    var replacedVal = replacedVal.replace('{%country%}',ele.sys.country);
    
    return replacedVal;
}
const server = http.createServer((req,res) => {
    if(req.url == '/'){
        //console.log(frontpage);
        requests('http://api.openweathermap.org/data/2.5/weather?q=Helsinki&APPID=f1a4672ed7a0f6cca0e85b33d7030e44')
            .on('data', function (chunk) {
            const obj = [JSON.parse(chunk)];
            const val = obj.map((eleObj) => replaceVal(frontpage,eleObj)).join("");
            res.write(val);
            //console.log(val);
            
               
            })
            .on('end', function (err) {
            if (err) return console.log('connection closed due to errors', err);
            res.end();
            });
    }

});


server.listen(8000,'127.0.0.1',()=>{
    console.log('Listening');

});


