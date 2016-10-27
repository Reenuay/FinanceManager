/*global angular*/
(function () {
  "use strict";
  var app = angular.module("app", ["ui.router"]);
	
	app.config(function ($locationProvider, $stateProvider) {
		//Enable HTML5 mode for URLs
		//$locationProvider.html5Mode(true);
		
		//Create routes
		$stateProvider.state({
			name: "login",
			url: "/login",
			templateUrl: "app/login/login.template.html",
			controller: "LoginController"
		});
	});
}());
