/*global angular*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.factory('$colorList', [function () {
 		return function () {
			return [
				"#ff8989",//0
				"#ffa35e",//1
				"#ffca51",//2
				"#fffc51",//3
				"#c2ff51",//4
				"#1bc61b",//5
				"#51ff5c",//6
				"#51ffa2",//7
				"#51fff6",//8
				"#51b9ff",//9
				"#517cff",//10
				"#4e3aff",//11
				"#b051ff",//12
				"#ff6be1",//13
				"#ff6a8d",//14
				"#000000",//15
				"#8e8e8e",//16
				"#a08066"//17
			];
		};
 }]);
}());
