angular.module( "Player" )

.service( "PlayerSrvc", [ "APISrvc", "$q", "ClassMap", "WeaponMap", "DestructionAttrs", "TauntAttrs",
    function ( APISrvc, $q, ClassMap, WeaponMap, DestructionAttrs, TauntAttrs )
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
                res.data.results.forEach( function ( player )
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
                } );

                playerList.resolve( res.data.results );
            }, function ( err )
            {
                playerList.reject( "Could not retrieve list: " + err.status );
            } );

        return this;
    }
] );
