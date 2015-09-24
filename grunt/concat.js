module.exports = function ()
{
    "use strict";

    return {
        components:
        {
            src: [
                "source/components/humps/humps.js",
                "source/components/vokal-ng-api/dist/vokal-ng-api.min.js",
                "source/components/route-auth/dist/route-auth.min.js",
                "source/components/angular-local-storage/dist/angular-local-storage.min.js",
                "source/components/html5shiv/dist/html5shiv.min.js"
            ],
            dest: "build/components.js"
        }
    };

};
