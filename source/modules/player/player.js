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

            .when( "/days/:days", {
                templateUrl: "modules/player/templates/daily.html",
                controller: "DailyCtrl",
                controllerAs: "player",
                resolve: {
                    days: [ "$route", "$location", function ( $route, $location )
                    {
                        var d = Number( $route.current.params.days );
                        if( d !== Math.ceil( d ) )
                        {
                            $location.path( "/days/" + Math.ceil( d ) );
                        }
                    } ]
                }
            } )
            .when( "/daily", { redirectTo: "/days/1" } )
            .when( "/weekly", { redirectTo: "/days/7" } )

            .when( "/player/:id", {
                templateUrl: "modules/player/templates/detail.html",
                controller: "PlayerDetailCtrl",
                controllerAs: "detail"
            } );
    }
] );

angular.module( "App" ).requires.push( "Player" );
