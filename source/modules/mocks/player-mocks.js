"use strict";

module.exports = [ "$httpBackend", "APIRoot", "PlayerList", "$timeout",
    function ( $httpBackend, APIRoot, PlayerList, $timeout )
    {
        var apiRoot = APIRoot + "/players";

        $httpBackend.whenRoute( "GET", apiRoot ).respond( { results: PlayerList } );

        function delayIncrementKills()
        {
            $timeout( function ()
            {
                PlayerList.forEach( function ( player )
                {
                    var kills = Number( player.KILLS );
                    kills += Math.floor( Math.random() * 12 );
                    player.KILLS = String( kills );
                } );
                delayIncrementKills();
            }, ( 3.5 * 1000 ) );
        }
        delayIncrementKills();
    }
];
