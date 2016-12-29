/*global angular, firebase*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.controller("CategoriesController", ["$scope", "$http", "$firebaseArray", "$userData", "Notification", function ($scope, $http, $firebaseArray, $userData, Notification) {
		/*local variables*/
		//error resolver
		var error = function (error) {
			Notification.error(error.message);
		};
		
		//array to tree restructurer
		var listToTree = function (list, root) {
			//if type of root is not object make root empty object
			if (typeof root !== "object") {
				root = {};	
			}
			
			//if root object field 'children' is not array make it empty array
			if (!Array.isArray(root.children)) {
				root.children = [];
			}
			
			//for each category in list
			for (var i = 0; i < list.length; i++) {
				//if parent of category is current root object
				if (list[i].parent === root.$id) {
					var el = list[i];
					//add label to element
					el.label = el.name;
					//push it into children list of root object
					root.children.push(el);
					//then scan list for children of pushed element
					listToTree(list, el);
				}
			}
			return root;
		};
		
		/*scope fields*/
		//categories loader
		$scope.loadCategories = function () {
			$scope.categories.loaded = undefined;
			var list;
			(list = $firebaseArray($userData().child("categories"))).$loaded()
			.then(function () {
				$scope.categories.loaded = true;
				$scope.categories = listToTree(list);
			})
			.catch(function (error) {
				$scope.categories.loaded = false;
				Notification.error(error.message);
			});
		};
		
		
		$scope.categories = [];
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
		
		//removes category
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
		$scope.categories.edit = function (category) {
			//selector function
			var f = function () {
				//select list item and make selected item editing
				$scope.categories.selected = category.$id;
				$scope.categories.list.$getRecord($scope.categories.selected).editing = true;
			};
			
			//if there is selected one, deselect it, cancel its changes and select new
			if ($scope.categories.selected !== undefined) {
				delete $scope.categories.list.$getRecord($scope.categories.selected).editing;
				$scope.categories.selected = undefined;
				$scope.categories.cancel().$loaded()
				.then(f)
				.catch(error);
			} else {
				//else just select new
				f();
			}
		};
		
		//cancels categorie editing, removes any changes and returns promise
		$scope.categories.cancel = function () {
			$scope.categories.selected = undefined;
			return ($scope.categories.list = $firebaseArray($userData().child("categories")));
		};
		
		//saves changes to database
		$scope.categories.save = function (category) {
			//deselect item
			$scope.categories.selected = undefined;
			//delete editing property because database will not accept it
			delete category.editing;
			//save it
			$scope.categories.list.$save(category)
			.catch(error);
		};
	}]);
}());
