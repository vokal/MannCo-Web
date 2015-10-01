angular.module( "App" )

.directive( "gearSvg", [
    function ()
    {
        "use strict";

        return {
            templateUrl: "/build/images/gear.svg"
        };
    }
] );
