angular.module( "Player" )

.service( "DailySrvc", [ "APISrvc", "$q", "$timeout",
    function ( APISrvc, $q, $timeout )
    {
        "use strict";

        var dailyList = [];
        var dailyPromise = $q.defer();

        function indexBySteamId( id )
        {
            for( var i = 0; i < dailyList.length; i++ )
            {
                if( dailyList[ i ].STEAMID === id )
                {
                    return i;
                }
            }
            return null;
        }

        this.getAll = function ()
        {
            return dailyPromise.promise.then( function ()
            {
                return dailyList;
            } );
        };
        this.getPlayer = function ( steamId )
        {
            var deferred = $q.defer();
            dailyPromise.promise.then( function ()
            {
                for( var i = 0; i < dailyList.length; i++ )
                {
                    if( dailyList[ i ].STEAMID === steamId )
                    {
                        deferred.resolve( dailyList[ i ] );
                        break;
                    }
                }
                deferred.reject( "Cannot find stats by Steam ID: " + steamId );
                return dailyList;
            } );
            return deferred.promise;
        };

        APISrvc.$get( "/stats-over-days/1" )
            .then( function ( res )
            {
                Object.keys( res.data ).map( function ( id )
                {
                    res.data[ id ].STEAMID = id;
                    return res.data[ id ];
                } ).filter( filterNullIds ).forEach( insertDailyStats );

                dailyPromise.resolve( true );
                pollDaily();
            }, function ( err )
            {
                dailyPromise.reject( "Could not retrieve daily stats: " + err.status );
            } );

        function filterNullIds( player )
        {
            return !!player.STEAMID;
        }
        function pollDaily()
        {
            $timeout( function ()
            {
                APISrvc.$get( "/stats-over-days/1" )
                    .then( function ( res )
                    {
                        Object.keys( res.data ).map( function ( id )
                        {
                            res.data[ id ].STEAMID = id;
                            return res.data[ id ];
                        } ).filter( filterNullIds ).forEach( insertDailyStats );
                    } )
                    .finally( function ()
                    {
                        pollDaily();
                    } );

            }, ( 5 * 1000 ) );
        }
        function insertDailyStats( player )
        {
            var index = indexBySteamId( player.STEAMID );
            if( angular.isNumber( index ) )
            {
                angular.merge( dailyList[ index ], player );
            }
            else if( player.STEAMID )
            {
                dailyList.push( player );
            }
        }

        return this;
    }
] );
