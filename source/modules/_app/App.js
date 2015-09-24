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
                templateUrl: "modules/_app/templates/home.html"
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
