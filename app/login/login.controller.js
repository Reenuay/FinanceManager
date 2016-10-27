/*global angular*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.controller("LoginController", function ($scope) {
		$scope.login = {};
		$scope.login.login = "Yahoo!";
		$scope.login.password = "Yehaa!";
	});
}());