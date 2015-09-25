angular.module( "Player" )

.service( "PlayerSrvc", [ "APISrvc", "$q", "ClassMap",
    function ( APISrvc, $q, ClassMap )
    {
        "use strict";

        var playerList = $q.defer();

        this.getAll = function ()
        {
            return playerList.promise;
        };
        this.getById = function ( steamId )
        {
            var deferred = $q.defer();
            playerList.promise.then( function ( list )
            {
                for( var i = 0; i < list.length; i++ )
                {
                    if( list[ i ].STEAMID === steamId )
                    {
                        deferred.resolve( list[ i ] );
                        break;
                    }
                }
                deferred.reject( "Cannot find Player by Steam ID: " + steamId );
                return list;
            } );
            return deferred.promise;
        };

        APISrvc.$get( "/players" )
            .then( function ( res )
            {
                console.log( "data", res.data );
                [ "POINTS", "KILLS", "Death" ].forEach( function ( key )
                {
                    res.data.results.forEach( function ( player )
                    {
                        player[ key ] = Number( player[ key ] );
                    } );
                } );

                ClassMap.forEach( function ( cls )
                {
                    res.data.results.forEach( function ( player )
                    {
                        player[ cls.killsAttr ] = Number( player[ cls.killsAttr ] );
                        player[ cls.deathsAttr ] = Number( player[ cls.deathsAttr ] );
                    } );
                } );

                playerList.resolve( res.data.results );
            }, function ( err )
            {
                playerList.reject( "Could not retrieve list: " + err.status );
            } );

        return this;
    }
] );
