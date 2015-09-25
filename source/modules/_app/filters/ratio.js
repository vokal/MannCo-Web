angular.module( "App" )

.filter( "ratio", [
    function ()
    {
        "use strict";

        return function ( arr )
        {
            if( !angular.isArray( arr ) || arr.length < 2 )
            {
                return "";
            }

            var numerator = Number( arr[ 0 ] );
            var denominator = Number( arr[ 1 ] );
            if( denominator === 0 )
            {
                denominator = 1;
            }

            return ( numerator / denominator ).toFixed( 2 );
        };
    }
] );
