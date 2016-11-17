/*global angular, firebase*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.controller("CategoriesController", ["$scope", "$http", "$firebaseArray", "$userData", "Notification", function ($scope, $http, $firebaseArray, $userData, Notification) {
		//error resolver
		var error = function (error) {
			Notification.error(error.message);
		};
		//load all categories
		$scope.loadCategories = function () {
			$scope.categories.loaded = undefined;
			($scope.categories.list = $firebaseArray($userData().child("categories"))).$loaded()
			.then(function () {
				$scope.categories.loaded = true;
			})
			.catch(function (error) {
				$scope.categories.loaded = false;
				Notification.error(error.message);
			});
		};
		
    $scope.categories = {};
		$scope.categories.name = "";
		$scope.categories.color = "#000";
		$scope.loadCategories();
		
		//adds categorie
		$scope.categories.add = function () {
			if ($scope.categories.name) {
				//make name string lower case and capitalize
				var name = $scope.categories.name,
						list = $scope.categories.list;
				//Check for uniqueness
				for (var item in list) {
					if (name === list[item].name) {
						Notification.error("There is already such a categorie.");
						return;
					}
				}
				
				//add categorie
				$scope.categories.list.$add({
					name: name,
					icon: $scope.categories.icon,
					color: $scope.categories.color
				})
				.catch(error);
			} else {
				Notification.error("Name is required.");
			}
		};
		
		//removes categorie
		$scope.categories.remove = function (item) {
			//delete item
			$scope.categories.list.$remove(item)
			.then(function () {
				//and if this item was selected make selection empty
				if ($scope.categories.selected === item.$index) {
					$scope.categories.selected = undefined;
				}
			})
			.catch(error);
		};
		
		//edits categorie
		$scope.categories.edit = function (index) {
			var f = function () {
				//select current
				$scope.categories.list[index].editing = true;
				//write index
				$scope.categories.selected = index;
			};
			//if there is selected one deselect it
			if ($scope.categories.selected !== undefined) {
				$scope.categories.list[$scope.categories.selected].editing = false;
				$scope.categories.cancel().$loaded()
				.then(f)
				.catch(error);
			} else {
				f();
			}
		};
		
		//cancels categorie editing, removes any changes and returns promise
		$scope.categories.cancel = function () {
			$scope.categories.selected = undefined;
			return ($scope.categories.list = $firebaseArray($userData().child("categories")));
		};
		
		//saves changes to database
		$scope.categories.save = function (index) {
			//deselect item
			$scope.categories.selected = undefined;
			delete $scope.categories.list[index].editing;
			//save it
			$scope.categories.list.$save(index)
			.catch(error);
		};
	}]);
}());
