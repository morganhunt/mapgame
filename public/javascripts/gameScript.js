var app = angular.module("game",[]); 
app.controller("mainCtrl", mainCtrl);
app.controller("loginCtrl", loginCtrl);
app.controller("scoreCtrl", scoreCtrl); 

/*var gameInstructions = "<h1>How well do you know the world?</h1><img id='globe-pic'src='https://openclipart.org/image/2400px/svg_to_png/218125/3d-Earth-Globe.png'/> <p>In this game you will be prompted to locate different countries on a blank map. Your mission should you accept is to make it through all five levels with as many points as possible, good luck!"; 
*/

var curPlayer;

var open = "<h1 class='levelHeaders'>LEVEL ONE</h1>"; 

var points = 0; 
var level = 1; 
var trys = 6; 
var curCountry; 
var gameStart = true;
var levelPoints = 0; 
var failed = false; 

var countryList = [
	[],
	//LEVEL ONE 
	[
		{Name:"United States of America",Played:false,Flag:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/US_flag_48_stars.svg/220px-US_flag_48_stars.svg.png"}, 
		{Name:"Australia",Played:false,Flag:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_(converted).svg/2000px-Flag_of_Australia_(converted).svg.png"}, 
		{Name:"China",Played:false,Flag:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Sample_PRC_Flag.svg/3000px-Sample_PRC_Flag.svg.png"}, 
		{Name:"Brazil",Played:false,Flag:"https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/1280px-Flag_of_Brazil.svg.png"}, 
		{Name:"Russian Federation",Played:false,Flag:"https://upload.wikimedia.org/wikipedia/en/archive/f/f3/20120812153730!Flag_of_Russia.svg"}, 
		{Name:"Canada",Played:false,Flag:"https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Flag_of_Canada.svg/1280px-Flag_of_Canada.svg.png"}, 
		{Name:"Greenland",Played:false,Flag:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_Greenland.svg/2000px-Flag_of_Greenland.svg.png"}
	], 
	//LEVEL TWO 
	[
		{Name:"India",Played:false,Flag:"http://www.mapsofindia.com/maps/india/india-flag-a4.jpg"}, 
		{Name:"Egypt",Played:false,Flag:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/2000px-Flag_of_Egypt.svg.png"},
		{Name:"Argentina",Played:false,Flag:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/2000px-Flag_of_Argentina.svg.png"},
		{Name:"Spain",Played:false,Flag:"https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/1280px-Flag_of_Spain.svg.png"},
		{Name:"France",Played:false,Flag:"https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png"},
		{Name:"Mexico",Played:false,Flag:"https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Mexico_(reverse).png"},
		{Name:"United Kingdom",Played:false,Flag:"https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1280px-Flag_of_the_United_Kingdom.svg.png"}
	],
	//LEVEL THREE
	[
		{Name:"Saudi Arabia",Played:false}, 
		{Name:"Peru",Played:false},
		{Name:"Mongolia",Played:false},
		{Name:"Norway",Played:false},
		{Name:"Italy",Played:false},
		{Name:"Turkey",Played:false}
	], 
	//LEVEL FOUR
	[
		{Name:"Kazakhstan",Played:false},
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

function loginCtrl($scope, $http){

	$scope.create = function(player){
		return $http.post('/players', player).success(function(data){
			console.log("posted!");
			curPlayer = data._id;
			console.log(curPlayer);
		});
	};

	$scope.addName = function(){
		if($scope.playername === ''){return;}
		console.log("In addName with "+$scope.playername);
		$scope.create({
			name: $scope.playername,
			score:0,
		});
		$("#overlay").slideToggle();
	};
}


function scoreCtrl ($scope, $http){
	$scope.
}


function mainCtrl ($scope,$http)
{
	$("#popup").append(open);    
	$scope.mapClick = function (eventInfo)
	{ 
		if (canClick) 
		{
			canClick = false; 
			var offset = $("#map").offset();
			console.log(eventInfo.pageX - offset.left); 
			console.log(eventInfo.pageY - offset.top);  
			var longitude = convertToLong(eventInfo.pageX -  offset.left);
			var lat = convertToLat(eventInfo.pageY - offset.top);  
			console.log("LAT " + lat); 
			console.log("LONG " + longitude); 
			var locat = getLocation(longitude, lat, $scope, $http); 
		}   
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
		canClick = true; 
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
	var toDisplay = "<div class='country-title'><h1 class='country-header'><img class='flagPic'id='leftPic' src='" + curCountry["Flag"] + "'/>LOCATE " + curCountry["Name"].toUpperCase() + "<img class='flagPic' id='rightPic' src='" + curCountry["Flag"] + "'/></h1></div>"; 
	displayCountry(toDisplay);   
}

function convertToLong(x)
{
	if ( x < 10 )
	{
		return -300;
	}
	//WESTERN HEMISPHERE
	else if ( (x >= 10) && (x <= 448) )
	{
		var a = -168.2040523;
		var b = .51106287 * x; 
		var c = -.000312765385 * Math.pow(x,2); 
		var toReturn = a + b + c; 
		console.log(toReturn); 
		return toReturn; 
	}
	//EASTER HEMISPHERE
	else if ( (x > 448) && (x <= 984) )
	{
	 	var a = -117.436; 
		var b = .24662935 * x; 
		var c = .00005142214 * Math.pow(x,2); 
		var toReturn = a + b + c; 
		console.log(toReturn); 
		return toReturn; 
	} 
	else if ( x > 984 )
	{
		return -300; 
	}
}

function convertToLat(y)
{
	if ( y < 19 )
	{
		return -300; 
	}
	else if ( (y >= 19) && (y <= 533) )
	{
		var a = 85.3780064; 
		var b = -.254887379 * y; 
		var toReturn = a + b; 
		return toReturn; 
	}
	else 
	{
		return -300; 
	}
}

function getLocation(x,y, $scope, $http)
{
	var myUrl = "http://api.opencagedata.com/geocode/v1/json?q=" + y +",+" + x + "&key=7e94b745a749cb44413754445f608f4a"; 
	$.ajax({
		url: myUrl, 
		dataType: "json", 
		success: function(parsed_json) {
			console.log(parsed_json); 
			var selection; 
			if (parsed_json.results == "")
			{
				console.log("We're coming in here 1"); 
				selection = "the ocean?";
				checkAndUpdate(selection,$scope,$http); 
			}
			else if (parsed_json.total_results == 0)
			{
				console.log("We're coming in here 2"); 
				selection = "the ocean?";
				checkAndUpdate(selection,$scope,$http); 
			}			
			else {
				selection = parsed_json.results[0].components.country; 
				console.log(selection);
				checkAndUpdate(selection, $scope,$http);  
			}
		}, 
		error: function(e) {
			console.log("Error with the ajax call " + e); 
		}
	}); 
}

function checkAndUpdate(selection, $scope, $http)
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
		console.log("Failed with " + selection); 
		failed = true; 
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
			winner($http); 
		} 
	} 
	else if (trys == 0)
	{
		loser($http); 
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
	//var upperDisplay = toDisplay.toUpperCase(); 
	$("#contain2").empty();  
	$("#contain2").append(toDisplay); 
	$("#contain2").fadeIn(250).delay(750).fadeOut(750);
}

function flashFail() 
{
	$("#chancesFlash").effect("highlight", {}, 3000); 
	failed = false; 
}

function putPoints($http){
	return $http.put('/players/' + curPlayer + '/points').success(function(data){
		console.log("putpoints worked");
		song.score = points
	})
}

function winner($http) //CALL PUT POINTS HERE 
{
	var message = "<h1>Congratulations!</h1><p>You are a geography wiz! You won with a whopping " + points + " points!</p>"; 
	gameStart = false; 
	drop(message);
	putPoints($http); 
}

function loser($http) //CALL PUT POINTS HERE 
{
	var message = "<h1>Participation Award</h1><p>Despite a valiant effort you still do not have what it takes to be considered a geography master. " + points + " points isn't bad though...Keep at it!</p>"; 
	gameStart = false;
	drop(message);  
	putPoints($http);
}


