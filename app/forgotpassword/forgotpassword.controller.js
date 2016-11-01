/*global angular*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.controller("ForgotpasswordController", ["$scope", "$firebaseAuth", "Notification", "$state", function ($scope, $firebaseAuth, Notification, $state) {
		$scope.forgotpassword = {};
		$scope.forgotpassword.email = "";
	}]);
}());
