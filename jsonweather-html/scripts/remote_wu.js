// Current Location Scripts
$(function () {

  var status = $('#status');

  (function getGeoLocation() {
	status.text('Getting Location...');
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(function (position) {
		var lat = position.coords.latitude;
		var long = position.coords.longitude;

		// Call the getData function, send the lat and long
		getData(lat, long);

	  });
	} else {
	  status.text("Your browser doesn't support Geolocation or it is not enabled!");
	}

  })();

  // Get the data from the wunderground API
  function getData(lat, long){
	  $.ajax({
url : "https://api.wunderground.com/api/1d3e4b307c962d62/geolookup/conditions/q/"+lat+","+long+".json",
			  dataType : "jsonp",
			  success : function(data) {
				  var cityName = data.location.city;
				  var stateName = data.location.state;
				  var temp_f = data.current_observation.temp_f;
				  var summary = data.current_observation.weather;
				  var summaryIcon = data.current_observation.icon_url;
				  var tempFeels = data.current_observation.feelslike_f;
				  var windSpeed = data.current_observation.wind_mph;
				  console.log("Current temperature in " + cityName + " is: " + temp_f);
$("#tilePage").html(cityName + ", " + stateName + " Weather");
$("#cityDisplay").html(cityName + ", " + stateName);
$("#currentTemp").html(temp_f + " &#x2109");
$("#summary").html(summary + ' <img src = "' + summaryIcon +'" alt = "summary">');
$("#feelsLike").html("Feels like: " + tempFeels + " &#x2109");
$("#wind").html("Wind Speed: " + windSpeed + " mph");
				  console.log(data)
	  $("#cover").fadeOut(250);
	}
		   });
  }

  // A function for changing a string to TitleCase
  function toTitleCase(str){
	return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
});
