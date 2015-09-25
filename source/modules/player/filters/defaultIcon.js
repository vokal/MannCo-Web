angular.module( "Player" )

.filter( "defaultIcon", [ "ClassMap", "$filter",
    function ( ClassMap, $filter )
    {
        "use strict";

        return function ( player, size )
        {
            if( player.profile_image_url )
            {
                return player.profile_image_url + "?c=true&s=" + ( size || "100" );
            }

            return $filter( "orderBy" )( ClassMap.map( function ( cls )
            {
                return {
                    imgUrl: cls.imgUrl,
                    kills: player[ cls.killsAttr ]
                };
            } ), "kills", true )[ 0 ].imgUrl;
        };
    }
] );
