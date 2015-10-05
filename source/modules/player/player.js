/* Application module */

angular.module( "Player", [
    "ngRoute",
    "vokal.API"
] )

.config( [ "$routeProvider",
    function ( $routeProvider )
    {
        "use strict";

        $routeProvider
            .when( "/", {
                templateUrl: "modules/player/templates/leaderboard.html",
                controller: "LeaderboardCtrl",
                controllerAs: "player"
            } )
            .when( "/daily", {
                templateUrl: "modules/player/templates/daily.html",
                controller: "DailyCtrl",
                controllerAs: "player"
            } )
            .when( "/player/:id", {
                templateUrl: "modules/player/templates/detail.html",
                controller: "PlayerDetailCtrl",
                controllerAs: "detail"
            } );
    }
] );

angular.module( "App" ).requires.push( "Player" );
