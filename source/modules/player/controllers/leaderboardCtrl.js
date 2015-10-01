angular.module( "Player" )

.controller( "LeaderboardCtrl", [ "PlayerSrvc", "$location", "$filter", "$routeParams",
    function ( PlayerSrvc, $location, $filter, $routeParams )
    {
        "use strict";

        var ctrl = this;
        var sortSets = [
            {
                title: "Points",
                sort:  "-POINTS",
                kpi:   function ( player ) { return player.POINTS; }
            },
            {
                title: "Kills",
                sort:  "-KILLS",
                kpi:   function ( player ) { return player.KILLS; }
            },
            {
                title: "PPM",
                sort:  function ( player )
                {
                    return Number( $filter( "ratio" )( [ player.POINTS, player.PLAYTIME ] ) );
                },
                descending: true,
                kpi:   function ( player ) { return $filter( "ratio" )( [ player.POINTS, player.PLAYTIME ] ); }
            },
            {
                title: "KPM",
                sort:  function ( player )
                {
                    return Number( $filter( "ratio" )( [ player.KILLS, player.PLAYTIME ] ) );
                },
                descending: true,
                kpi:   function ( player ) { return $filter( "ratio" )( [ player.KILLS, player.PLAYTIME ] ); }
            },
            {
                title: "K/D",
                sort:  function ( player )
                {
                    return Number( $filter( "ratio" )( [ player.KILLS, player.Death ] ) );
                },
                descending: true,
                kpi:   function ( player ) { return $filter( "ratio" )( [ player.KILLS, player.Death ] ); }
            },
            {
                title: "Deaths",
                sort: "Death",
                kpi:  function ( player ) { return player.Death; }
            },
            {
                title: "Assists",
                sort: "-KillAssist",
                kpi:  function ( player ) { return player.KillAssist; }
            },
            {
                title: "DPM",
                sort:  function ( player )
                {
                    return Number( $filter( "ratio" )( [ player.Death, player.PLAYTIME ] ) );
                },
                descending: true,
                kpi:   function ( player ) { return $filter( "ratio" )( [ player.Death, player.PLAYTIME ] ); }
            }
        ];

        var startingSort = [ 0, 1 ];
        if( $routeParams.sort )
        {
            $routeParams.sort.split( "," ).forEach( function ( sortSet, index )
            {
                sortSet = Number( sortSet );
                if( !isNaN( sortSet ) && sortSet >= 0 && sortSet < sortSets.length )
                {
                    startingSort[ index ] = Math.floor( sortSet );
                }
            } );
        }
        ctrl.leftSort = sortSets[ startingSort[ 0 ] ];
        ctrl.rightSort = sortSets[ startingSort[ 1 ] ];

        ctrl.setSort = function ( col1, col2 )
        {
            ctrl.leftSort = sortSets[ col1 ];
            ctrl.rightSort = sortSets[ col2 ];
        };

        ctrl.viewPlayerDetail = function ( user )
        {
            $location.url( "/player/" + user.STEAMID );
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
