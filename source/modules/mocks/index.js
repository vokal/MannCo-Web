"use strict";

require( "angular-mocks" );

angular.module( "e2e-mocks", [ "ngMockE2E" ] )

.run( require( "./player-mocks" ) )

.value( "PlayerList", require( "./values/playerList" ) )

.run( [ "$httpBackend",
    function ( $httpBackend )
    {
        // Fallback for all other routes, just in case.
        $httpBackend.when( "GET" ).passThrough();
    }
] );

angular.module( "App" ).requires.push( "e2e-mocks" );
