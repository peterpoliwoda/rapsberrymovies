'use strict';

//// Get a database reference to our posts
var raspberryMovies = angular.module('raspberryMovies', ['ui.router','firebase']);

    // configure our routes
    raspberryMovies.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            // routes for the home page
            .state('home', {
                url: '/',
                templateUrl : 'pages/home.html',
                controller  : 'MainCtrl as mainCtrl'
            })

            .state('homepage', {
                url: '/home',
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
        chooseCtrl.message = 'Choose the next movie for your girlfriend.';

        $scope.watchThis = function(title, poster, overview) {
            console.log('watch this movie:' + poster);
            var playLink = 'https://play.google.com/store/search?q=' + title + '&c=movies';
            Raspberry.ref.child('flashled').set(true);
            Raspberry.ref.child('movie').set({title: title, poster: poster, link: playLink, overview: overview},function(){
                console.log('Set stuff');
            });
        };

        $http({
              method: 'GET',
              url: 'https://api.themoviedb.org/3/movie/popular?api_key=bc94cbdbf16a0bc39441827885a21f97'
            }).then(function successCallback(response) {
                console.log(response);
                chooseCtrl.movies = response.data.results;
                // this callback will be called asynchronously
                // when the response is available

                // Then do some housekeeping, remove dates and put a nice star rating
                angular.forEach(chooseCtrl.movies, function(value, key) {
                    chooseCtrl.movies[key].year = value.release_date.split('-')[0];

                    // var half-stars = [0,0,0,0,0,0,0,0,0,0];
                    //
                    // if(chooseCtrl.movies[key].vote_average = 10)
                    //   half-stars[9] = 1;
                    // if(chooseCtrl.movies[key].vote_average >= 9.0)
                    //   half-stars[8] = 1;
                    // if(chooseCtrl.movies[key].vote_average >= 8.0)
                    //   half-stars[7] = 1;
                    // if(chooseCtrl.movies[key].vote_average >= 7.0)
                    //   half-stars[6] = 1;
                    // if(chooseCtrl.movies[key].vote_average >= 6.0)
                    //   half-stars[5] = 1;
                    // if(chooseCtrl.movies[key].vote_average >= 5.0)
                    //   half-stars[4] = 1;
                    // if(chooseCtrl.movies[key].vote_average >= 4.0)
                    //   half-stars[3] = 1;
                    // if(chooseCtrl.movies[key].vote_average >= 3.0)
                    //   half-stars[2] = 1;
                    // if(chooseCtrl.movies[key].vote_average >= 2.0)
                    //   half-stars[1] = 1;
                    // if(chooseCtrl.movies[key].vote_average >= 1.0)
                    //   half-stars[0] = 1;
                    //
                    // angular.forEach(half-stars, function(value, key) {
                    //
                    // });

                  });

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
                watchCtrl.message = 'There\'s a movie waiting for you.';
                watchCtrl.icon = true;
                watchCtrl.movie = null;
            }
            else{
                 watchCtrl.message = 'Watch your movie here.';
                 watchCtrl.movie = snapshot.val().movie;
                 watchCtrl.icon = false;
            }

            return watchCtrl.message;

        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });

    });
