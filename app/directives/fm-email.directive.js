/*global angular*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.directive('fmEmail', function (defaultErrorMessageResolver) {
    defaultErrorMessageResolver.getErrorMessages().then( function (errorMessages) {
      errorMessages.fmEmail = "Please enter a valid email address";
    });
    return {
      restrict: "A",
      require: "ngModel",
      link: function(scope, element, attributes, ngModel) {
        ngModel.$validators.fmEmail = function(modelValue) {
          return /.+@.+\..+/.test(modelValue);
        };
  
        scope.$watch("fmEmail", function () {
          ngModel.$validate();
        });
      }
    };
  });
}());
