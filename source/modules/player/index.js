"use strict";

angular.module( "Player", [
    "ngRoute",
    "vokal.API"
] )

.config( [ "$routeProvider",
    function ( $routeProvider )
    {
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
] )

.controller( "DailyCtrl", require( "./controllers/daily" ) )
.controller( "PlayerDetailCtrl", require( "./controllers/detail" ) )
.controller( "LeaderboardCtrl", require( "./controllers/leaderboard" ) )
.directive( "leaderboardCard", require( "./directives/leaderboardCard" ) )
.filter( "defaultIcon", require( "./filters/defaultIcon" ) )
.filter( "playerMins", require( "./filters/playerMins" ) )
.service( "DailySrvc", require( "./services/daily" ) )
.service( "PlayerSrvc", require( "./services/player" ) )

.value( "ClassMap", require( "./values/classMap" ) )
.value( "DestructionAttrs", require( "./values/destructionAttrs" ) )
.value( "TauntAttrs", require( "./values/tauntAttrs" ) )
.value( "WeaponMap", require( "./values/weaponMap" ) );

angular.module( "App" ).requires.push( "Player" );
