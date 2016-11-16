/*global angular, firebase*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.controller("CategoriesController", ["$scope", "$http", "$firebaseArray", "$userData", "Notification", function ($scope, $http, $firebaseArray, $userData, Notification) {
    $scope.categories = {};
		$scope.categories.name = "";
		$scope.categories.list = $firebaseArray($userData().child("categories"));
		$scope.categories.color = "#000";
		
		$scope.categories.add = function () {
			if ($scope.categories.name) {
				$scope.categories.list.$add({
					name: $scope.categories.name,
					icon: $scope.categories.icon,
					color: $scope.categories.color
				});
			} else {
				Notification.error("Name is required.");
			}
		};
		
		$scope.categories.remove = function (item) {
			$scope.categories.list.$remove(item);
		};
	}]);
}());
