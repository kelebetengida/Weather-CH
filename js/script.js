$(document).ready(function(){



var city;

function searchweather(city){
    var queryURL=   `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7de72314249ebce4535755d73b07b7fa&units=imperial`
    fetch(queryURL)
    .then(function(response) {
      return response.json();
    })
    .then(function(data){
      console.log(data);
      
    })

     
    
       


}
searchweather("Portland")
})


