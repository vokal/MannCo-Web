angular.module( "Player" )

.service( "PlayerSrvc", [ "APISrvc", "$q", "$timeout", "ClassMap", "WeaponMap", "DestructionAttrs", "TauntAttrs",
    function ( APISrvc, $q, $timeout, ClassMap, WeaponMap, DestructionAttrs, TauntAttrs )
    {
        "use strict";

        var playerList = [];
        var playerPromise = $q.defer();

        function indexBySteamId( id )
        {
            for( var i = 0; i < playerList.length; i++ )
            {
                if( String( playerList[ i ].STEAMID ) === id )
                {
                    return i;
                }
            }
            return null;
        }

        this.getAll = function ()
        {
            return playerPromise.promise.then( function ()
            {
                return playerList;
            } );
        };
        this.getById = function ( steamId )
        {
            var deferred = $q.defer();
            playerPromise.promise.then( function ()
            {
                for( var i = 0; i < playerList.length; i++ )
                {
                    if( playerList[ i ].STEAMID === steamId )
                    {
                        deferred.resolve( playerList[ i ] );
                        break;
                    }
                }
                deferred.reject( "Cannot find Player by Steam ID: " + steamId );
                return playerList;
            } );
            return deferred.promise;
        };

        APISrvc.$get( "/players" )
            .then( function ( res )
            {
                res.data.results.forEach( convertPlayerStats );
                playerList = res.data.results;
                playerPromise.resolve( true );
                pollPlayers();
            }, function ( err )
            {
                playerPromise.reject( "Could not retrieve list: " + err.status );
            } );

        function pollPlayers()
        {
            $timeout( function ()
            {
                APISrvc.$get( "/players" )
                    .then( function ( res )
                    {
                        res.data.results.forEach( insertPlayerStats );
                    } )
                    .finally( function ()
                    {
                        pollPlayers();
                    } );

            }, ( 15 * 1000 ) );
        }
        function insertPlayerStats( player )
        {
            convertPlayerStats( player );
            var index = indexBySteamId( player.STEAMID );
            if( !isNaN( index ) )
            {
                angular.merge( playerList[ index ], player );
            }
            else
            {
                playerList.push( player );
            }
        }

        function convertPlayerStats( player )
        {
            [
                "POINTS",
                "KILLS",
                "Death",
                "KillAssist",
                "HeadshotKill",
                "K_backstab",
                "Domination",
                "Revenge",
                "PLAYTIME"
            ].forEach( function ( key )
            {
                player[ key ] = Number( player[ key ] );
            } );
            ClassMap.forEach( function ( cls )
            {
                player[ cls.killsAttr ] = Number( player[ cls.killsAttr ] );
                player[ cls.deathsAttr ] = Number( player[ cls.deathsAttr ] );
            } );
            WeaponMap.forEach( function ( weapon )
            {
                player[ weapon.killsAttr ] = Number( player[ weapon.killsAttr ] );
            } );
            DestructionAttrs.forEach( function ( building )
            {
                player[ building ] = Number( player[ building ] );
            } );
            TauntAttrs.forEach( function ( taunt )
            {
                player[ taunt ] = Number( player[ taunt ] );
            } );
            return player;
        }

        return this;
    }
] );
