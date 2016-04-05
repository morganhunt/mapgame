var app = angular.module("game",[]); 
app.controller("mainCtrl", mainCtrl); 

var gameInstructions = "<h1>How well do you know the world?</h1><img id='globe-pic'src='https://openclipart.org/image/2400px/svg_to_png/218125/3d-Earth-Globe.png'/> <p>In this game you will be prompted to locate different countries on a blank map. Your mission should you accept is to make it through all five levels with as many points as possible, good luck!"; 

function mainCtrl ($scope)
{
	$scope.curLevel = 1; 
	$scope.curPoints = 0; 
	$scope.trysLeft = 3; 
	$scope.curToFind = "USA"; 
	//drop(gameInstructions); 
	$scope.mapClick = function (eventInfo)
	{ 
		var offset = $("#map").offset();
		console.log(eventInfo.pageX - offset.left); 
		console.log(eventInfo.pageY - offset.top);  
		var lat = convertToLat(eventInfo.pageX - offset.left);
		var longitude = convertToLong(eventInfo.pageY - offset.top);  
		console.log("LAT " + lat); 
		console.log("LONG " + longitude); 
		var locat = getLocation(lat, longitude);    
	}
}

function convertToLat(x)
{
	if (x <= 20)
	{
		return -1;
	}
	else if (x >= 990)
	{
		return -1;
	}
	else if ((x > 20) && (x < 446))
	{
		var factor = 180/426;
		var toReturn = (180 - (factor * x));
		return -toReturn;
	}
	else if ((x >= 443) && (x <= 448))
	{
		return 0;
	}
	else 
	{
		var factor = 360/986;
		var toReturn = factor * x;
		return (toReturn - 180);
	}
}

function convertToLong(y)
{ 
	if (y <= 18)
	{
		return -1;
	}
	else if (y >= 560)
	{
		return -1;
	}
	else if ((y > 10) && (y < 335))
	{
		var factor = 90/335; 
		var toReturn = 90 - (factor * y);
		return toReturn;
	} 
	else 
	{
		var factor = 60/225;
		var toReturn = factor * (y - 335);
		return -toReturn;
	}
}

function getLocation(x,y)
{
	var myUrl = "http://api.opencagedata.com/geocode/v1/json?q=" + y +",+" + x + "&key=7e94b745a749cb44413754445f608f4a"; 
	$.ajax({
		url: myUrl, 
		dataType: "json", 
		success: function(parsed_json) {
			var selection; 
			if (parsed_json.results == ""){selection = "undefined";}			else {
				selection = parsed_json.results[0].components.country; 
				console.log(selection); 
				return selection; 
			}
		}
	}); 
}

function drop (toDisplay)
{ 
	$("#overlay-div").slideToggle(); 
	$("#contain").slideToggle(); 
	$("#popup").append(toDisplay) 
		.slideToggle();   
}
