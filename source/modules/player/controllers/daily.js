"use strict";

module.exports = [ "$scope", "PlayerSrvc", "DailySrvc", "$location", "$filter", "$routeParams", "$q", "$timeout",
    function ( $scope, PlayerSrvc, DailySrvc, $location, $filter, $routeParams, $q, $timeout )
    {
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
            for( var i = 0; i < playerList.length; i++ )
            {
                if( playerList[ i ].STEAMID === daily.STEAMID )
                {
                    return playerList[ i ];
                }
            }
            return null;
        };

        ctrl.isLoading = true;
        $q.all( [ PlayerSrvc.getAll(), DailySrvc.getAll( $routeParams.days ) ] )
            .then( function ( responses )
            {
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
                poll = pollDaily();
            } );

        var poll;
        function pollDaily()
        {
            return $timeout( function ()
            {
                DailySrvc.getAll( $routeParams.days )
                    .then( function ( res )
                    {
                        angular.forEach( res, insertDailyStats );
                    }, function ()
                    {
                        //fail silently
                    } )
                    .finally( function ()
                    {
                        poll = pollDaily();
                    } );
            }, ( 5 * 1000 ) );
        }

        function insertDailyStats( player )
        {
            for( var i = 0; i < ctrl.list.length; i++ )
            {
                if( String( ctrl.list[ i ].STEAMID ) === player.STEAMID )
                {
                    angular.merge( ctrl.list[ i ], player );
                    return;
                }
            }
            if( player.STEAMID )
            {
                ctrl.list.push( player );
            }
        }

        $scope.$on( "$destroy", function ()
        {
            $timeout.cancel( poll );
        } );
    }
];
