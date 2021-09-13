$(document).ready(function () {
 
  
  //var city;
  function searchweather(city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7de72314249ebce4535755d73b07b7fa&units=imperial`;
    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
          console.log(data);
          let card= $("<div class='card shadow-lg text-white bg-primary'>").addClass("card")
          let name=$("<h1>").addClass("card-text").text(`${data.name} (${new Date().toLocaleDateString()})`);
          const icon = $('<img>').attr('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`);

          let temp=$("<p>").addClass("card-text").text(`Temp: ${data.main.temp}`)
          let wind=$("<p>").addClass("card-text").text(`wind: ${data.wind.speed}`)
          let humidity=$("<p>").addClass("card-text").text(`humidity: ${data.main.humidity}`)
          
          name.append(icon);
          card.append(name, temp, wind, humidity);
          $(".subtitle").append(card);
          const lat=data.coord.lat;
          const lon=data.coord.lon;
          searchUv(lat, lon);
          fiveDay(city);
      })
      
      .catch(function(err){
        console.err(err);
      })
  }
  function searchUv(lat,lon){
      let url=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=7de72314249ebce4535755d73b07b7fa`;
      fetch(url)
        .then(function(response){
          return response.json();
        })
        .then(function(data){
          let uvi=$("<p>").addClass("card-text").text(`UV Index: ${data.current.uvi}`)
          $(".subtitle .card").append(uvi)
         
          
        })
  }
  

  function fiveDay(city){
    let url=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=7de72314249ebce4535755d73b07b7fa`
    fetch(url)
        .then(function(response){
          return response.json();
        })
        .then(function(data){
          
          for (let i = 0; i < data.list.length; i += 8) {

            let fiveForcast = $("<div class='card shadow-lg text-white bg-primary mx-auto  h3' style='width: 15rem; height: 20rem;'>");
            let date = data.list[i].dt_txt;
            let setDate = date.substr(0,10)
            let temp = data.list[i].main.temp;
            let winds = data.list[i].wind.speed;
            let humd = data.list[i].main.humidity;
            let weather = data.list[i].weather[0].main
            

            if (weather === "Rain") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
                icon.attr("style", "height: 40px; width: 40px");
            } else if (weather === "Clouds") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
                icon.attr("style", "height: 40px; width: 40px");
            } 
             else if (weather === "Clear") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
                icon.attr("style", "height: 40px; width: 40px");
            }
             else if (weather === "Drizzle") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
                icon.attr("style", "height: 40px; width: 40px");
            }
             else if (weather === "Snow") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
                icon.attr("style", "height: 50px; width: 40px");
            }

            let fiveDayDate = $("<h2 class='card-title'>").text(setDate);
            let Temp = $("<p class='card-text'>").text("Temp: " + temp);
            let windSpeed = $("<p class='card-text'>").text("Wind: " + winds);
            let humid = $("<p class='card-text'>").text("Humidity: " + humd);
            
            
          

            fiveForcast.append(fiveDayDate);
            fiveForcast.append(icon);
            fiveForcast.append(Temp);
            fiveForcast.append(windSpeed);
            fiveForcast.append(humid);
            
           
            $("#city-container").append(fiveForcast);
          }
        })

    }
    $("#search-btn").on("click", function(e){
      e.preventDefault();
      let cityName=$("#cityname").val().trim();
      searchweather(cityName);
      var arrayS=[];
      arrayS.push(cityName);
      localStorage.setItem("cityName", JSON.stringify(arrayS))
      searchJistory ();
      
    })
    function searchJistory () {
      var lastSearch = JSON.parse(localStorage.getItem("cityName"));
      var searchDiv = $("<button class='btn border text-muted mt-1 shadow-sm bg-white rounded' style='width: 12rem;'>").text(lastSearch);
      $("#cards").append(searchDiv);
  }
  
 

});