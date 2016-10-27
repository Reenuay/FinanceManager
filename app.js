/*global angular*/
(function () {
  "use strict";
  var app = angular.module("app", ["ui.router", "ui.bootstrap"]);
	
	/*app config*/
	app.config(function ($stateProvider) {
		$stateProvider.state({
			name: "login",
			url: "/login",
			templateUrl: "app/login/login.template.html",
			controller: "LoginController"
		});
	});
}());
