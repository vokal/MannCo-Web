/* Site controller */

angular.module( "App" )

.controller( "Site", [ "$location",
    function ( $location )
    {
        "use strict";

        var ctrl = this;
        var themes = [ "light", "dark" ];

        ctrl.theme = themes.indexOf( $location.search().theme ) >= 0 ?
            $location.search().theme : themes[ 0 ];

        ctrl.toggleTheme = function ( selectedTheme )
        {
            ctrl.theme = selectedTheme;
        };
    }
] );
