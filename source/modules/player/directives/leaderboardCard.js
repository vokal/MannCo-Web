angular.module( "Player" )

.directive( "leaderboardCard", [
    function ()
    {
        "use strict";

        return {
            replace: true,
            templateUrl: "modules/player/templates/leaderboardCard.html",
            scope: {
                user: "=leaderboardCard",
                kpi:  "&kpi"
            }
        };
    }
] );
