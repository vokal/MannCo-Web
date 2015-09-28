/* Site controller */

angular.module( "App" )

.controller( "Site", [
    function ()
    {
        "use strict";

        var ctrl = this;
        ctrl.world = "World";
        ctrl.theme = "light";

        ctrl.toggleTheme = function ( selectedTheme )
        {
            ctrl.theme = selectedTheme;
        };
    }
] );
