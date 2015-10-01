angular.module( "Player" )

.filter( "playerMins", [
    function ()
    {
        "use strict";

        return function ( playerList )
        {
            if( !angular.isArray( playerList ) )
            {
                return;
            }

            var players = [];
            playerList.forEach( function ( player )
            {
                if( player.PLAYTIME > 9 && player.KILLS > 4 )
                {
                    players.push( player );
                }
            } );
            return players;
        };
    }
] );
