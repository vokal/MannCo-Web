"use strict";

angular.module( "App", [
    "ngAnimate",
    "ngRoute",
    "ngSanitize",
    "ngTouch",
    "vokal.API"
] )

.config( [ "$routeProvider", "$locationProvider", "$sceDelegateProvider",
    function ( $routeProvider, $locationProvider, $sceDelegateProvider )
    {
        $routeProvider.otherwise( { redirectTo: "/" } );
        $locationProvider.html5Mode( true ).hashPrefix( "!" );
        $sceDelegateProvider.resourceUrlWhitelist( [ "self" ] );
    }
] )

.constant( "APIRoot", "<< apiroot >>" + "/v1" )
.controller( "Site", require( "./controllers/site.js" ) )
.directive( "gearSvg", require( "./directives/gearSvg" ) )
.filter( "ratio", require( "./filters/ratio" ) )
.service( "APISrvc", require( "./services/api" ) );
