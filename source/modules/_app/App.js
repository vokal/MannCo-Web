/* Application module */

angular.module( "App", [
    "ngRoute",
    "ngTouch",
    "ngSanitize",
    "ngMessages",
    "ngAnimate",
    "vokal.API"
] )

.config( [ "$routeProvider", "$locationProvider", "$sceDelegateProvider",
    function ( $routeProvider, $locationProvider, $sceDelegateProvider )
    {
        "use strict";

        $routeProvider
            .when( "/", {
                templateUrl: "modules/player/templates/leaderboard.html",
                controller: "LeaderboardCtrl",
                controllerAs: "player"
            } )
            .otherwise( {
                redirectTo: "/"
            } );

        $locationProvider.html5Mode( true ).hashPrefix( "!" );

        $sceDelegateProvider.resourceUrlWhitelist(
            [ "self" ]
        );
    }

] );
