/*global angular, firebase*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.controller("CategoriesController", ["$scope", "$http", "$firebaseArray", "$userData", "Notification", "$error", function ($scope, $http, $firebaseArray, $userData, Notification, $error) {
		($scope.LoadCategories = function () {
			($scope.categories = $firebaseArray($userData().child("categories")))
			.$loaded().then(function () {
				$scope.categories.forEach(function (value, index, array) {
					value.level = ParentCount(value);
				});
			}).catch($error);
		}());
		
		//sorts list so that the children elements follow after their parents
		$scope.Sort = function (list) {
			if (!Array.isArray(list))
				return;
			if (list.length < 2)
				return list;
			//copy array
			list = list.slice(0, list.length);
			//sort by level
			list.sort(function (a, b) {
				var _a = a.level,
						_b = b.level;
				return (_a > _b) - (_a < _b);
			});
			//sort like tree
			for (var i = 0; i < list.length; i++) {
				for (var j = i + 1; j < list.length; j++) {
					if (list[j].level !== list[i].level + 1)
						continue;
					list.splice(i + 1, 0, list.splice(j, 1)[0]);
				}
			}
			return list;
		};
		
		//returns the count of parents of given category
		function ParentCount($item) {
			if (!$item)
				return 0;
			//get the parent of given item
			var $parent = $scope.categories.$getRecord($item.parent);
			//if parent exists look for its parent
			return $parent ? 1 + ParentCount($parent) : 0;
		}
	}]);
}());
