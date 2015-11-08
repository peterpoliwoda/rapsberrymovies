'use strict';

//// Get a database reference to our posts
var raspberryMovies = angular.module('raspberryMovies', ['ui.router','firebase']);

    // configure our routes
    raspberryMovies.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            // route for the home page
            .state('home', {
                url: '/',
                templateUrl : 'pages/home.html',
                controller  : 'MainCtrl as mainCtrl'
            })

            // route for the choose page
            .state('choose', {
                url: '/choose',
                templateUrl : 'pages/choose.html',
                controller  : 'ChooseCtrl as chooseCtrl'
            })

            // route for the watch page
            .state('watch', {
                url: '/watch',
                templateUrl : 'pages/watch.html',
                controller  : 'WatchCtrl as watchCtrl'
            });
        $urlRouterProvider.otherwise('/');
    });

raspberryMovies.constant('FirebaseUrl', 'https://raspberrymovies.firebaseio.com/');


raspberryMovies.factory('Raspberry',function($firebaseArray, $firebaseObject,FirebaseUrl) {
    var raspberryRef = new Firebase(FirebaseUrl+'/raspberry');
    var raspberry = $firebaseArray(raspberryRef);
    
    var Raspberry = {
        all: raspberry,
        ref: raspberryRef
    };
    
    return Raspberry;
});



    // create the controller and inject Angular's $scope
    raspberryMovies.controller('MainCtrl', function() {
        var mainCtrl = this;
        // create a message to display in our view
        mainCtrl.message = 'Raspberry Movies home page!';
    });

    raspberryMovies.controller('ChooseCtrl', function($state, $scope, $http, Raspberry) {
        var chooseCtrl = this;
        $scope.message = 'Choose your next movie for your friend.';
        
        $scope.watchThis = function(title,poster) {
            console.log('watch this movie:' + poster);
            var playLink = 'https://play.google.com/store/search?q=' + title + '&c=movies';
            Raspberry.ref.child('flashled').set(true);
            Raspberry.ref.child('movie').set({title: title, poster: poster, link: playLink},function(){
                console.log('Set stuff');
            });
//            Raspberry.ref.child('movie').child('poster').set(poster);
//            Raspberry.ref.child('movie').child('link').set(playLink);
        };
        
        $http({
              method: 'GET',
              url: 'https://api.themoviedb.org/3/movie/popular?api_key=bc94cbdbf16a0bc39441827885a21f97'
            }).then(function successCallback(response) {
                console.log(response);
                chooseCtrl.movies = response.data.results;
                // this callback will be called asynchronously
                // when the response is available
              }, function errorCallback(response) {
                  console.log(response);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              });
    });

    raspberryMovies.controller('WatchCtrl', function(Raspberry,$firebaseObject,$scope) {
        
        var watchCtrl = this;        
        
        Raspberry.ref.on('value', function(snapshot) {
          console.log(snapshot.val());
          var message;
            
            if(snapshot.val().flashled){
                console.log('bay1 is: ' + snapshot.val().flashled);
                //$scope.message = 'You have a movie waiting. Press the button on the Raspberry Pi to show it.';
                watchCtrl.message = 'You have a movie waiting. Press the button on the Raspberry Pi to show it.';
                watchCtrl.icon = '<i class="fa fa-pointer-o"></i>';
                watchCtrl.movie = null;
            }
            else{
                console.log('bay1 is: ' + snapshot.val().flashled);
                watchCtrl.message = 'Watch your movie here.' + snapshot.val().movie.title;
                watchCtrl.movie = snapshot.val().movie;
                 watchCtrl.movie = snapshot.val().movie;
            }
            
            return watchCtrl.message;
            
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
    
    });