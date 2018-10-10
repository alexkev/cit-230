$(function () {
	// Get the data from the wunderground API
//	function getData(lat, long){
		$.ajax({
			url : "https://api.wunderground.com/api/1d3e4b307c962d62/geolookup/conditions/q/34.852619,-82.394012.json",
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
	$("#currentTemp").html(temp_f + " &#x2109");
	$("#summary").html(summary + ' <img src = "' + summaryIcon +'" alt = "summary">');
	$("#feelsLike").html("Feels like: " + tempFeels + " &#x2109");
	$("#wind").html("Wind Speed: " + windSpeed + " mph");
	console.log(data)
	$("#cover").fadeOut(250);
			}
		});

	// A function for changing a string to TitleCase
	function toTitleCase(str){
		return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
});
