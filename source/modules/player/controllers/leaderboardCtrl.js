angular.module( "Player" )

.controller( "LeaderboardCtrl", [ "PlayerSrvc", "$location",
    function ( PlayerSrvc, $location )
    {
        "use strict";

        var ctrl = this;
        ctrl.sortValue = "-POINTS";

        ctrl.viewPlayerDetail = function ( user )
        {
            $location.url( "/player/" + user.STEAMID );
        };
        ctrl.filterTimePlayed = function ( player )
        {
            return player.PLAYTIME > 9 && player.KILLS > 4;
        };

        ctrl.isLoading = true;
        PlayerSrvc.getAll()
            .then( function ( data )
            {
                ctrl.list = data;
            },
            function ( message )
            {
                alert( message );
                ctrl.isError = true;
            } )
            .finally( function ()
            {
                ctrl.isLoading = false;
            } );
    }
] );
