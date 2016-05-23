//MODULE
var weatherApp = angular.module("weatherApp",["ngRoute","ngResource"]);

//routes
weatherApp.config(function($routeProvider,$locationProvider){
    $routeProvider
    .when('/',{
       templateUrl: 'views/pages/home.html',
       controller: 'homeController'
    })
    .when('/forecast',{
        templateUrl:'views/pages/forecast.html',
        controller:'forecastController'
    })
    .when('/forecast/:days',{
        templateUrl:'views/pages/forecast.html',
        controller:'forecastController'
    });

    $locationProvider.html5Mode(true);
});

//services
weatherApp.service('cityService',function(){
	this.city = "New York, NY";
});

//controller
weatherApp.controller('homeController',['$scope','cityService',function($scope,cityService){
    $scope.city = cityService.city;

    $scope.$watch('city',function(){
    	cityService.city = $scope.city;
    });
}]);

weatherApp.controller('forecastController',['$scope','cityService','$resource','$routeParams',function($scope,cityService,$resource,$routeParams){
     $scope.city = cityService.city;
     $scope.days = $routeParams.days || '2';
     $scope.weatherAPI =  
     $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=72d3c608021518fdc39259ca050f750b",
     	{callback: "JSON_CALLBACK"},{get:{method:"JSONP"}});
     $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days  });

     $scope.convertToFah = function(degk){
     	return Math.round((1.8 * (degk-273))+32);
     }

     $scope.convertToDate = function(dt){
     	return new Date(dt*1000);
     };
}]);

weatherApp.directive('weatherReport',function(){
	return {
		restrict: 'E',
		templateUrl: 'views/directives/weatherReport.html',
		replace: true,
		scope: {
			weatherDay : "=",
			convertToFah: "&",
			convertToDate: "&",
			dateFormat: "@"
		}
	};
});


