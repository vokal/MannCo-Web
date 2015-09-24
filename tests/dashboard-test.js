"use strict";

describe( "Dashboard", function ()
{
    it( "should be accessible", function ()
    {
        browser.get( "/" );

        expect( $( "main" ).isPresent() ).toBe( true );
        expect( $( "main" ).getText() ).toContain( "Hello World" );
    } );
} );
