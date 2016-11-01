/*global angular*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.controller("ForgotpasswordController", ["$scope", "$firebaseAuth", "Notification", function ($scope, $firebaseAuth, Notification) {
		$scope.forgotpassword = {};
		$scope.forgotpassword.email = "";
		$scope.forgotpassword.send = false;
		$scope.forgotpassword.send = function () {
			$firebaseAuth().$sendPasswordResetEmail($scope.forgotpassword.email)
			.then( function () {
				$scope.forgotpassword.send = true;
			}).catch( function (error) {
				Notification.error(error.message);
			});
		};
	}]);
}());
