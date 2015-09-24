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
            .when( "/player/:id", {
                templateUrl: "modules/player/templates/detail.html",
                controller: "PlayerDetailCtrl",
                controllerAs: "player"
            } );
    }
] );

angular.module( "App" ).requires.push( "Player" );
