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
				//make name string lower case and capitalize
				var name = $scope.categories.name.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
						length = $scope.categories.list.length,
						list = $scope.categories.list;
				//Check for uniqueness
				for (var item in list) {
					if (name === list[item].name) {
						Notification.error("There is already such a categorie.");
						return;
					}
				}
				$scope.categories.list.$add({
					name: name,
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
		
		$scope.categories.select = function (index) {
		};
	}]);
}());
