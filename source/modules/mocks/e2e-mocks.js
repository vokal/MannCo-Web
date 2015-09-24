/* Mocks module */

angular.module( "e2e-mocks", [ "ngMockE2E", "mocksPlayers" ] )

.run( [ "$httpBackend",
    function ( $httpBackend )
    {
        "use strict";

        $httpBackend.when( "GET" ).passThrough();
    }
] );

angular.module( "App" ).requires.push( "e2e-mocks" );
