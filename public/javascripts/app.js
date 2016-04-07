angular.module('app',[])
	.controller('loginCtrl', loginCtrl)
;


function loginCtrl($scope, $http){
	
	$scope.create = function(player){
		return $http.post('/players', player).success(function(data){
			console.log("posted!")
		});
	};

	$scope.addName = function(){
		if($scope.playername === ''){return;}
		console.log("In addName with "+$scope.playername);
		$scope.create({
			name: $scope.playername,
			score:0,
		});
	};
}