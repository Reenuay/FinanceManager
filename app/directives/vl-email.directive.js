/*global angular*/
(function () {
	"use strict";
	var app = angular.module("app");
	
	app.directive('vlEmail', function (defaultErrorMessageResolver) {
    defaultErrorMessageResolver.getErrorMessages().then( function (errorMessages) {
      errorMessages.vlEmail = "Please enter a valid email address";
    });
    return {
      restrict: "A",
      require: "ngModel",
      link: function(scope, element, attributes, ngModel) {
				if (!ngModel) return;
				
        ngModel.$validators.vlEmail = function(modelValue) {
          return /.+@.+\..+/.test(modelValue);
        };
  
        scope.$watch("vlEmail", function () {
          ngModel.$validate();
        });
      }
    };
  });
}());
