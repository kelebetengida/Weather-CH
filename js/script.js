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
          let card= $("<div>").addClass("card")
          let name=$("<h3>").addClass("card-text").text(`${data.name} (${new Date().toLocaleDateString()})`);
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
    let qUrl=`api.openweathermap.org/data/2.5/forecast?q=${city}&appid=7de72314249ebce4535755d73b07b7fa`
    fetch(url)
        .then(function(response){
          return response.json();
        })
        .then(function(data){
          for(i=1;i<6;i++){
            
          }
        })

    }
    $("#search-btn").on("click", function(e){
      e.preventDefault();
      let cityName=$("#cityname").val();
      
      searchweather(cityName);
      
    })
  // var arraySearch = [];
  // function showHistory() {
  //   if (JSON.parse(localStorage.getItem("#btn")) !== null) {
  //     arraySearch = JSON.parse(localStorage.getItem("#btn"))
  //     $("#btn").empty();
  //     $("#btn").append();
  //     for (let i = 0; i < arraySearch.length; i++) {
  //       $("#btn").append(`<section id="search">${arraySearch[i]}</section>`)
  //     }
  //   }

  // }
  // function pageIntiaize() {
  //   if (JSON.parse(localStorage.getItem("#btn")) !== null) {
  //     showHistory()
  //   }
  // }
  // searchweather("Portland");
});