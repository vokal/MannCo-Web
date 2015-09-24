angular.module( "Player" )

.controller( "PlayerDetailCtrl", [ "$routeParams",
    function ( $routeParams )
    {
        "use strict";

        var ctrl = this;
        ctrl.id = $routeParams.id;
    }
] );
