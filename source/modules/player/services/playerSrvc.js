angular.module( "Player" )

.service( "PlayerSrvc", [ "APISrvc",
    function ( APISrvc )
    {
        "use strict";

        this.getAll = function ( params )
        {
            return APISrvc.$get( "/players", params )
                .then( function ( res )
                {
                    [ "POINTS", "KILLS", "Death" ].forEach( function ( key )
                    {
                        res.data.forEach( function ( player )
                        {
                            player[ key ] = Number( player[ key ] );
                        } );
                    } );
                    return res.data;
                } );
        };

        return this;
    }
] );
