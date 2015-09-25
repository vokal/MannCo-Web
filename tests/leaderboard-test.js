"use strict";

describe( "Leaderboard", function ()
{
    it( "should be accessible", function ()
    {
        browser.get( "/" );

        expect( $( "main" ).isPresent() ).toBe( true );
        expect( $( "main" ).getText() ).toContain( "Leaderboard" );
    } );

    it( "should list all active players", function ()
    {
        expect( $$( ".leaderboard-list li" ).count() ).toBe( 16 );
    } );

    it( "should be sorted by Points by default", function ()
    {
        expect( $$( ".leaderboard-list li" ).get( 0 ).getText() ).toContain( "Points: 513" );
        expect( $$( ".leaderboard-list li" ).get( 1 ).getText() ).toContain( "Points: 338" );
    } );

    it( "should have a select input to change sort", function ()
    {
        expect( $( "#sort-select" ).isDisplayed() ).toBe( true );

        $( "#sort-select" ).sendKeys( "Fewest Deaths" );
        expect( $$( ".leaderboard-list li" ).get( 0 ).getText() ).toContain( "Deaths: 8" );
        expect( $$( ".leaderboard-list li" ).get( 1 ).getText() ).toContain( "Deaths: 8" );

        browser.sleep( 1000 );
        $( "#sort-select" ).sendKeys( "Most Kills" );
        expect( $$( ".leaderboard-list li" ).get( 0 ).getText() ).toContain( "Kills: 103" );
        expect( $$( ".leaderboard-list li" ).get( 1 ).getText() ).toContain( "Kills: 94" );
    } );

    it( "should take you to a player page when clicking on a card", function ()
    {
        $$( ".leaderboard-list li" ).get( 0 ).click();
        expect( browser.getCurrentUrl() ).toContain( "/player/STEAM_0:0:98268274" );
    } );
} );
