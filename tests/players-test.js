"use strict";

describe( "Player Detail Page", function ()
{
    it( "should be accessible", function ()
    {
        browser.get( "/player/STEAM_0:1:58410023" );

        expect( $( "main" ).isPresent() ).toBe( true );
        expect( $( "main" ).getText() ).toContain( "Dr Yan" );
    } );
} );
