angular.module( "Player" )

.controller( "PlayerDetailCtrl", [ "$routeParams", "PlayerSrvc",
    function ( $routeParams, PlayerSrvc )
    {
        "use strict";

        var ctrl = this;
        ctrl.id = $routeParams.id;
        ctrl.sortValue = "-POINTS";

        ctrl.isLoading = true;
        PlayerSrvc.getAll( $routeParams )
            .then( function ( data )
            {
                ctrl.list = data;
            },
            function ( err )
            {
                toastr.error( "Error while loading players", "Error " + err.status );
                ctrl.isError = true;
            } )
            .finally( function ()
            {
                ctrl.isLoading = false;
            } );
    }
] );
