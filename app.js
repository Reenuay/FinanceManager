/*global angular, firebase*/
(function () {
  "use strict";
	//Initialize Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyDA88bCzk34u7ILqrj4fBljJs7WemmU3BA",
    //authDomain: "financemanager-42340.firebaseapp.com",
    databaseURL: "https://financemanager-42340.firebaseio.com",
    storageBucket: "financemanager-42340.appspot.com",
    messagingSenderId: "172763067741"
  });
	
  var app = angular.module("app", ["firebase", "ui.router", "ui.bootstrap", "ui-notification", "jcs-autoValidate"]);
	
	/*app config*/
	app.config(["$stateProvider", "$urlRouterProvider", "NotificationProvider",
	function ($stateProvider, $urlRouterProvider, NotificationProvider) {
		$stateProvider
		.state({
			name: "entrypoint",
			url: ""
		})
		.state({
			name: "login",
			url: "/login",
			templateUrl: "app/login/login.template.html",
			controller: "LoginController"
		})
		.state({
			name: "forgotpassword",
			url: "/forgotpassword",
			templateUrl: "app/forgotpassword/forgotpassword.template.html",
			controller: "ForgotpasswordController"
		})
		.state({
			name: "emailaction",
			url: "/emailaction?mode&oobCode&apiKey",
			templateUrl: "app/emailaction/emailaction.template.html",
			controller: "EmailactionController"
		})
		.state("main", {
			url: "/",
			abstract: true,
			templateUrl: "app/main/main.template.html",
			controller: "MainController"
		})
		.state("main.categories", {
			url: "categories",
			templateUrl: "app/main/categories/categories.template.html",
			controller: "CategoriesController"
		});
		
		NotificationProvider.setOptions({
			delay: 10000,
			startTop: 20,
			startRight: 10,
			verticalSpacing: 10,
			horizontalSpacing: 20,
			positionX: "left",
			positionY: "bottom",
			maxCount: 5
		});
	}]);
	
	app.run(['bootstrap3ElementModifier', function (bootstrap3ElementModifier) {
		bootstrap3ElementModifier.enableValidationStateIcons(true);
	}]);
	
	app.run( function ($rootScope, $location, $state, $firebaseAuth) {
		//Routing rules
		$rootScope.$on( '$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
			if (["entrypoint"].indexOf(toState.name) > -1) {
				e.preventDefault();
				$state.go("login");
			} else {
				if (["login", "forgotpassword", "emailaction"].indexOf(toState.name) > -1) {
					if ($firebaseAuth().$getAuth()) {
						e.preventDefault();
						$state.go('main.categories');
					}
				} else {
					if (!$firebaseAuth().$getAuth()) {
						e.preventDefault();
						$state.go('login');
					}
				}
			}
		});
		
		//When authentication state changed to "signed in" go to main
		$firebaseAuth().$onAuthStateChanged( function (firebaseUser) {
      if (firebaseUser) {
				$state.go('main.categories');
			}
    });
	});
}());
