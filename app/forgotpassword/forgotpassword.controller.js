/*global angular*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.controller("ForgotpasswordController", ["$scope", "$state","$firebaseAuth", "Notification", function ($scope, $state, $firebaseAuth, Notification) {
		$scope.forgotpassword = {};
		$scope.forgotpassword.email = "";
		
		$scope.forgotpassword.send = function () {
			$firebaseAuth().$sendPasswordResetEmail($scope.forgotpassword.email)
			.then( function () {
				Notification.success("Email has been successfully sent.	Please check your email box.");
				$state.go("login");
			}).catch( function (error) {
				Notification.error(error.message);
			});
		};
	}]);
}());
