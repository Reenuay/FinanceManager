/*global angular*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.controller("EmailactionController", ["$scope", "$firebaseAuth", "Notification", function ($scope, $firebaseAuth, Notification) {
		$scope.emailaction = {};
		$scope.emailaction.mode = "changepassword";
		$scope.emailaction.newpassword = "";
		$scope.emailaction.confirmpassword = "";
	}]);
}());
