"use strict";

module.exports = [ "APISrvc",
    function ( APISrvc )
    {
        var dailyKeys = [ "kills", "deaths", "dominations", "dominated", "revenges" ];
        this.getAll = function ( days )
        {
            days = days || "1";
            return APISrvc.$get( "/stats-over-days/" + days )
                .then( function ( res )
                {
                     return Object.keys( res.data ).map( function ( id )
                    {
                        res.data[ id ].STEAMID = id;
                        dailyKeys.forEach( function ( key )
                        {
                            if( !res.data[ id ][ key ] )
                            {
                                res.data[ id ][ key ] = 0;
                            }
                        } );
                        return res.data[ id ];
                    } ).filter( filterNullIds );
                } );
        };

        function filterNullIds( player )
        {
            return !!player.STEAMID;
        }

        return this;
    }
];
