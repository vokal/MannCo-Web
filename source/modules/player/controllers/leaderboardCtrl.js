angular.module( "Player" )

.controller( "LeaderboardCtrl", [ "PlayerSrvc",
    function ( PlayerSrvc )
    {
        "use strict";

        var ctrl = this;
        ctrl.sortValue = "-POINTS";

        ctrl.isLoading = true;
        PlayerSrvc.getAll()
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
