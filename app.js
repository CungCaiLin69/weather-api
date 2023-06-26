const express = require('express');
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = "381b5a312f6c01b021ba99a35dc36de6"
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData =  JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDesc = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

        res.write("<h1>The temperature in " + req.body.cityName +" is " + temp + " degrees Celsius</h1>")
        res.write("<p>the weather is " + weatherDesc);
        res.write("<img src=" + imgURL + ">");
        res.send();
    })
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})