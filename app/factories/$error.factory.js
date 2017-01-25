/*global angular*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.factory('$error', ["Notification", function (Notification) {
 		return function (error) {
			Notification.error(error.message);
		};
 }]);
}());
