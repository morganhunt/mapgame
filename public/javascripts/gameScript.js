var app = angular.module("game",[]); 
app.controller("mainCtrl", mainCtrl); 

/*var gameInstructions = "<h1>How well do you know the world?</h1><img id='globe-pic'src='https://openclipart.org/image/2400px/svg_to_png/218125/3d-Earth-Globe.png'/> <p>In this game you will be prompted to locate different countries on a blank map. Your mission should you accept is to make it through all five levels with as many points as possible, good luck!"; 
*/

var open = "<h1 class='levelHeaders'>LEVEL ONE</h1>"; 

var points = 0; 
var level = 1; 
var trys = 6; 
var curCountry; 
var gameStart = true;
var levelPoints = 0;   

var countryList = [
	[],
	//LEVEL ONE 
	[
		{Name:"United States of America",Played:false}, 
		{Name:"Australia",Played:false}, 
		{Name:"China",Played:false}, 
		{Name:"Brazil",Played:false}, 
		{Name:"Russian Federation",Played:false}, 
		{Name:"Canada",Played:false}, 
		{Name:"Greenland",Played:false}
	], 
	//LEVEL TWO 
	[
		{Name:"India",Played:false}, 
		{Name:"Egypt",Played:false},
		{Name:"Argentina",Played:false},
		{Name:"Spain",Played:false},
		{Name:"France",Played:false},
		{Name:"Mexico",Played:false},
		{Name:"United Kingdom",Played:false}
	],
	//LEVEL THREE
	[
		{Name:"Saudi Arabia",Played:false}, 
		{Name:"Peru",Played:false},
		{Name:"Mongolia",Played:false},
		{Name:"Chile",Played:false},
		{Name:"Norway",Played:false},
		{Name:"Italy",Played:false},
		{Name:"Turkey",Played:false}
	], 
	//LEVEL FOUR
	[
		{Name:"Kazackhastan",Played:false},
		{Name:"Finland",Played:false},
		{Name:"Sweden",Played:false},
		{Name:"Indonesia",Played:false},
		{Name:"Morocco",Played:false},
		{Name:"Libya",Played:false},
		{Name:"Algeria",Played:false}
	], 
	//LEVEL FIVE 
	[
		{Name:"Pakistan",Played:false}, 
		{Name:"Afghanistan",Played:false},
		{Name:"Islamic Republic of Iran",Played:false}, 
		{Name:"Myanmar",Played:false},
		{Name:"Bolivia",Played:false}, 
		{Name:"Sudan",Played:false}, 
		{Name:"Ethiopia",Played:false}
	]
]; 
	

function mainCtrl ($scope)
{
	$("#popup").append(open);    
	$scope.mapClick = function (eventInfo)
	{ 
		var offset = $("#map").offset();
		console.log(eventInfo.pageX - offset.left); 
		console.log(eventInfo.pageY - offset.top);  
		var longitude = convertToLong(eventInfo.pageX -  offset.left);
		var lat = convertToLat(eventInfo.pageY - offset.top);  
		console.log("LAT " + lat); 
		console.log("LONG " + longitude); 
		var locat = getLocation(longitude, lat, $scope);    
	}
	$scope.hidePopup = function ()
	{ 
		if (gameStart == true)
		{
			countrySelect(); 
			$scope.curLevel = level; 
			$scope.curPoints = points;
			$scope.trysLeft = trys;  
			$scope.curToFind = curCountry["Name"];  
		}
		else 
		{
			location.reload(); 
		}
		$("#popup").slideToggle(); 
		$("#contain").slideToggle(); 
		$("#overlay-div").slideToggle();
	} 
}

function countrySelect()
{
	var checked = true; 
	var index = 0; 
	while (checked == true)
	{
		index = Math.floor(Math.random() * 7);
		curCountry = countryList[level][index]; 
		checked = curCountry["Played"];
	}
	countryList[level][index]["Played"] = true; 
	var toDisplay = "<h1>Locate " + curCountry["Name"] + "</h1>"; 
	displayCountry(toDisplay);   
}

function convertToLong(x)
{
	//Out of bounds 
	if (x <= 10)
	{
		return -1; 
	}
	else if (x >= 988)
	{
		return -1; 
	}
	//Western Hemisphere
	else if ((x > 10) && (x <=455))
	{
		var factor = 170/455; 
		var toReturn = (152 - (factor * x)); 
		return -Math.abs(toReturn);  
	}
	//Eastern Hemisphere
	else
	{
		var factor = 176/460;
		var toReturn = factor * x; 
		return (toReturn - 176);  
	}
}

function convertToLat(y)
{ 
	if (y <= 18)
	{
		return -300;
	}
	else if (y >= 560)
	{
		return -300; 
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

function getLocation(x,y, $scope)
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
				checkAndUpdate(selection, $scope);  
			}
		}
	}); 
}

function checkAndUpdate(selection, $scope)
{
	$scope.$apply(function () {
	if (selection == curCountry["Name"])
	{
		levelPoints++; 
		addPoint();
		correct(selection);   	
	}
	else 
	{
		trys--;
		incorrect(selection);  
	}
	$scope.curPoints = points; 
	$scope.trysLeft = trys; 
	if (levelPoints == 5)
	{
		levelPoints = 0; 
		level++; 
		if (level == 6)
		{
			winner(); 
		} 
	} 
	else if (trys == 0)
	{
		loser(); 
	} 
	});
}

function correct(selection)
{
	var message = "<h1 class='levelHeaders'>Good Job!</h1>"; 
	drop(message); 
}

function incorrect(selection, $scope)
{
	var message = "<h1 class='levelHeaders'>Sorry!</h1><p>You picked " + selection + ", but we were looking for " + curCountry["Name"] + "!</p>"; 
	drop(message); 
}

function addPoint()
{
	if (level == 1)
	{
		points++;
	}
	else if (level == 2)
	{
		points = points + 2; 
	}
	else if (level == 3)
	{
		points = points + 3; 
	}	
	else if (level = 4)
	{
		points = points + 4; 
	}
	else 
	{
		points = points + 5; 
	}
}

function drop (toDisplay)
{  
	$("#popup").empty();  
	$("#overlay-div").slideToggle(); 
	$("#contain").slideToggle();    
	$("#popup").slideToggle() 
		.append(toDisplay);  
}

function displayCountry (toDisplay)
{
	$("#contain2").empty();  
	$("#contain2").append(toDisplay); 
	$("#contain2").fadeIn(250).delay(750).fadeOut(750);
}

function winner() //CALL PUT POINTS HERE 
{
	var message = "<h1>Congratulations!</h1><p>You are a geography wiz! You won with a whopping " + points + " points!</p>"; 
	gameStart = false; 
	drop(message); 
}

function loser() //CALL PUT POINTS HERE 
{
	var message = "<h1>Participation Award</h1><p>Despite a valiant effort you still do not have what it takes to be considered a geography master. " + points + " points isn't bad though...Keep at it!</p>"; 
	gameStart = false;
	drop(message);  
}
