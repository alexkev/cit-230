$(function () {
	$("#content").css("display", "none")
});

$.getJSON("../acme/js/acme.json", function (data) {
	console.log(data);
	var items = [];
	var i = 0;
	$.each(data, function (key, val) {
		items.push("<li id='" + key + "'><a href ='#'>" + key + "</a></li>");
		i++
	});

	$("<ul/>", {
		"id": "nav",
		"html": items.join("")
	}).appendTo("nav");
});

$("#nav").on("click", "a", function (evt) {
	evt.preventDefault();

	var linkName = $(this).text();
	console.log(linkName);
	if (linkName == 'Home'){
		$("#home").css("display", "block")
		$("#content").css("display", "none")
	}
	else {
		$("#home").css("display", "none")
		$("#content").css("display", "block")
	}

	$.getJSON("../acme/js/acme.json", function (data) {
		console.log(data);
		console.log(data[linkName]);

		var name = data[linkName].name;
		var path = data[linkName].path;
		var description = data[linkName].description;
		var made = data[linkName].manufacturer;
		var reviews = data[linkName].reviews;
		var price = data[linkName].price;

		$("#title").html("ACME - " + name)
		$("#name").html("<strong>"+ name + "</strong>");
		$("#path").html("<img src='" + path + "' alt='product'>");
		$("#description").html(description);
		$("#made").html("<strong>Manufacturer: </strong>" + made);
		$("#reviews").html("<strong>Reviews: </strong>" + reviews);
		$("#price").html("<strong>Price: </strong>" + price);
	});
});
