var object =

$('#query').keyup(function(){
	// All code will be inside of this block
	var value = $('#query').val();
	var rExp = new RegExp(value, "i");

$.getJSON("//autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
	console.log(data); // test for JSON received
	//begin building output
	var output = '<ol>'
	$.each(data.RESULTS, function(key, val) {
		if (val.name.search(rExp) != -1) {
			output += '<li>';
			output += '<a href="//www.wunderground.com' + val.l + '" title="See results for ' + val.name + '">' + val.name + '</a>';
			output += '</li>';
			object = data;
		}
	}); // end each
	output += '</ol>';
	$("#searchResults").html(output); // send results to the page
}); // end getJSON
}); // end onkeyup

// Intercept the menu link clicks
$("#searchResults").on("click", "a", function (evt) {
	evt.preventDefault();
	// With the text value get the needed value from the weather.json file
	var index = $(this).index("a")
	var zmw = object.RESULTS[index-5].zmw
	getData(zmw)
});

// Get weather data from wunderground.com
function getData(input) {
	// Get the data from the wunderground API
	$.ajax({
		url: "https://api.wunderground.com/api/1d3e4b307c962d62/geolookup/conditions/q/"
		+ input + ".json"
		, dataType: "jsonp"
		, success: function (data) {
			console.log(data);
			var location = data.location.city + ', ' + data.location.state;
			var temp_f = data.current_observation.temp_f;
			var cityName = data.location.city;
			var stateName = data.location.state;
			var summary = data.current_observation.weather;
			var summaryIcon = data.current_observation.icon_url;
			var tempFeels = data.current_observation.feelslike_f;
			var windSpeed = data.current_observation.wind_mph;

			console.log('Location is: ' + location);
			console.log('Temp is: ' + temp_f);

			$("#cityDisplay").text(location);
			$("title").html(location + " | Weather Center");
			$("#currentTemp").html(temp_f + " &#x2109");
			$("#summary").text(toTitleCase(data.current_observation.icon));
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
