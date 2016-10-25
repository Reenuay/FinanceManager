/*
 Firebase and AngularJS based Finance Manager
*/
(function () {
  "use strict";
  /*global angular*/
  var app = angular.module("app", ["ui.router"]);
	
	app.config(function ($stateProvider) {
		$stateProvider.state({
			name: "login",
			url: "/login",
			templateUrl: "app/login/login.template.url"
		})
	});
}());
