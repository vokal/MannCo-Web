"use strict";

module.exports = [
    function ()
    {
        return {
            replace: true,
            templateUrl: "modules/player/templates/leaderboardCard.html",
            scope: {
                user: "=leaderboardCard",
                kpi:  "&kpi"
            }
        };
    }
];
