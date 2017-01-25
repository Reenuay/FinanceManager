/*global angular, firebase*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.controller("CategoriesController", ["$scope", "$http", "$firebaseArray", "$userData", "Notification", "$error", function ($scope, $http, $firebaseArray, $userData, Notification, $error) {
		//this is intermediate array that will be used in js but never seen by user
		var tempList = [];
		
		//returns the parent count of given category
		function parentCount($item) {
			if (!$item)
				return 0;
			//get the parent of given item
			var $parent = tempList.$getRecord($item.parent);
			//if parent exists look for its parent
			return $parent ? 1 + parentCount($parent) : 0;
		}
		
		//this function will load categories. raw version will be stored in tempList and sorted will be in $scope.categories for user purposes
		function loadCategories() {
			(tempList = $firebaseArray($userData().child("categories")))
			.$loaded().catch($error);
		}
		
		//sorts list so that the children elements follow after their parents
		function sortLikeTree(list) {
			if (!Array.isArray(list))
				return;
			if (list.length < 2)
				return list;
			list = list.slice(0, list.length);
			list.sort(function (a, b) {
				var _a = a.level,
						_b = b.level;
				return (_a > _b) - (_a < _b);
			});
			return list;
		}
			
		//this function also needed in template
		$scope.loadCategories = loadCategories;
		//invoke this function to load categories at first time
		loadCategories();
		//watch the changes of the list
		tempList.$watch(function () {
			$scope.categories = sortLikeTree(tempList.map(function (el) {
				return {
					name: el.name,
					color: el.color,
					icon: el.icon,
					level: parentCount(el)
				};
			}));
		});
	}]);
}());
