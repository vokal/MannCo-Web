module.exports = function ( grunt )
{
    "use strict";

    grunt.registerTask( "envLocal", "Set environment variables for local development", function ()
    {
        grunt.config( "APIRoot", "https://tf2stats.vokal.io" );
    } );

    grunt.registerTask( "envProd", "Set environment variables for production deployment", function ()
    {
        grunt.config( "aws.s3Bucket", "vokalmannco" );
        grunt.config( "aws.cloudfrontDistributionId", "EQAYA4KH9OFQU" );

        grunt.config( "APIRoot", "https://tf2stats.vokal.io" );
        grunt.config( "Host", "https://mannco.vokal.io/" );
    } );
};
