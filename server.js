const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", (req,res)=>{
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req,res)=>{
  const city = req.body.city;

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=e6379befbf5a1cea53b8086fa84c2fc8&units=metric";
  https.get(url,(response)=>{

    response.on("data", (data)=>{
      const weatherData = JSON.parse(data);
      if(weatherData.message=="city not found"){
        res.sendFile(__dirname+"/error.html");
      }
      else{
        const mode = weatherData.weather[0].description;
        const temp = weatherData.main.temp;
        const icon = weatherData.weather[0].icon;
        const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@4x.png";
        res.write("<h1>Weather is "+mode+" and temp is "+temp+"</h1>");
        res.write("<img src="+imageUrl+">");
        res.send();
      }
    });

  });
});

app.listen(process.env.PORT || 3000,()=>{
  console.log("Server has started on port 3000");
});



//e6379befbf5a1cea53b8086fa84c2fc8
//api.openweathermap.org/data/2.5/weather?q=London&appid=e6379befbf5a1cea53b8086fa84c2fc8
