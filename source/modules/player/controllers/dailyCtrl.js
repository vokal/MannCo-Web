angular.module( "Player" )

.controller( "DailyCtrl", [ "PlayerSrvc", "DailySrvc", "$location", "$filter", "$routeParams", "$q",
    function ( PlayerSrvc, DailySrvc, $location, $filter, $routeParams, $q )
    {
        "use strict";

        var ctrl = this;
        var playerList = [];
        var sortSets = [
            {
                title: "Kills",
                sort:  "-kills",
                kpi:   function ( player ) { return player.kills; }
            },
            {
                title: "K/D",
                sort:  function ( player )
                {
                    return Number( $filter( "ratio" )( [ player.kills, player.deaths ] ) );
                },
                descending: true,
                kpi:   function ( player ) { return $filter( "ratio" )( [ player.kills, player.deaths ] ); }
            },
            {
                title: "Dominations",
                sort: "-dominations",
                kpi:  function ( player ) { return player.dominations; }
            },
            {
                title: "Was Dominated",
                sort: "-dominated",
                kpi:  function ( player ) { return player.dominated; }
            },
            {
                title: "Revenges",
                sort: "-revenges",
                kpi:  function ( player ) { return player.revenges; }
            },
            {
                title: "Deaths",
                sort: "-deaths",
                kpi:  function ( player ) { return player.deaths; }
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

        ctrl.byDaily = function ( daily )
        {
            return playerList[ indexBySteamId( daily.STEAMID ) ];
        };

        function indexBySteamId( id )
        {
            for( var i = 0; i < playerList.length; i++ )
            {

                if( playerList[ i ].STEAMID === id )
                {
                    return i;
                }
            }
            return null;
        }

        ctrl.isLoading = true;
        $q.all( [ PlayerSrvc.getAll(), DailySrvc.getAll() ] )
            .then( function ( responses )
            {
                console.log( responses );
                playerList = responses[ 0 ];
                ctrl.list = responses[ 1 ];
            }, function ( message )
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
