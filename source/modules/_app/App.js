/* Application module */

angular.module( "App", [
    "ngRoute",
    "ngTouch",
    "ngSanitize",
    "ngMessages",
    "ngAnimate",
    "vokal.API",
    "vokal.RouteAuth"
] )

.config( [ "$routeProvider", "$locationProvider", "$sceDelegateProvider", "LoginPath", "RouteAuthProvider",

    function ( $routeProvider, $locationProvider, $sceDelegateProvider, LoginPath, RouteAuthProvider )
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

        RouteAuthProvider.setRedirectPath( LoginPath );
    }

] )

.constant( "LoginPath", "/path/to/login/" );
