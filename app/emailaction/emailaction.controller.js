/*global angular, firebase*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	//This controller is using firebase directly without any service. This must be improved in future when in angularfire $firebaseAuth service will be added proper functionality.
	app.controller("EmailactionController", ["$scope", "$state", "$stateParams", "Notification", 
	function ($scope, $state, $stateParams,  Notification) {
		$scope.emailaction = {};
		$scope.emailaction.mode = $stateParams.mode;
		$scope.emailaction.email = "";
		$scope.emailaction.verified = false;
		
		//Verify oobCode and exit if is not valid. oobCode must be string type. Undefined is not allowed.
		firebase.auth().verifyPasswordResetCode($stateParams.oobCode || "")
		.then( function (email) {
			$scope.$apply( function () {
				$scope.emailaction.verified = true;
				$scope.emailaction.email = email;
			});
		})
		.catch( function () {
			$state.go("login");
		});
		
		//Reset Password
		$scope.emailaction.rp = {};
		$scope.emailaction.rp.newpassword = "";
		$scope.emailaction.rp.confirmpassword = "";
		$scope.emailaction.rp.show = false;
		$scope.emailaction.rp.type = "password";
		$scope.emailaction.rp.toggle = function () {
			if ($scope.emailaction.rp.show) {
				$scope.emailaction.rp.type = "text";
			} else {
				$scope.emailaction.rp.type = "password";
			}
		};
		$scope.emailaction.rp.change = function () {
			firebase.auth().confirmPasswordReset($stateParams.oobCode, $scope.emailaction.confirmpassword)
			.then( function () {
				Notification.success("Your password has been successfully changed");
				$state.go("login");
			})
			.catch( function (error) {
				Notification.error(error.message);
			});
		};
	}]);
}());
