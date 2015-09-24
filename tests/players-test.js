"use strict";

describe( "Player Detail Page", function ()
{
    it( "should be accessible", function ()
    {
        browser.get( "/player/SteamBasedID" );

        expect( $( "main" ).isPresent() ).toBe( true );
        expect( $( "main" ).getText() ).toContain( "SteamBasedID" );
    } );
} );
