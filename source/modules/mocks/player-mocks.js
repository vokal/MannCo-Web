angular.module( "mocksPlayers", [ "ngMockE2E" ] )

.run( [ "$httpBackend", "APIRoot", "PlayerList",
    function ( $httpBackend, APIRoot, PlayerList )
    {
        "use strict";

        var apiRoot = APIRoot + "/players";

        $httpBackend.whenRoute( "GET", apiRoot ).respond( { results: PlayerList } );
    }
] );
