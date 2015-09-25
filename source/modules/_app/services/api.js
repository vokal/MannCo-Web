angular.module( "App" )

.constant( "APIRoot", "{{ APIROOT }}" + "/v1" )

.service( "APISrvc", [ "API", "APIRoot",
    function ( API, APIRoot )
    {
        "use strict";

        return new API( {
            rootPath: APIRoot,
            transformHumps: false
        } );
    }
] );
