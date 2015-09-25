angular.module( "Player" )

.controller( "PlayerDetailCtrl", [ "$routeParams", "PlayerSrvc", "ClassMap",
    function ( $routeParams, PlayerSrvc, ClassMap )
    {
        "use strict";

        var ctrl = this;

        ctrl.player = {};
        ctrl.classMap = ClassMap;
        ctrl.viewAll = {
            weapons: false,
            classes: false
        };

        ctrl.toggleView = function ( key )
        {
            ctrl.viewAll[ key ] = !ctrl.viewAll[ key ];
        };
        ctrl.orderByKills = function ( cls )
        {
            return ctrl.player[ cls.killsAttr ];
        };

        ctrl.isLoading = true;
        PlayerSrvc.getById( $routeParams.id )
            .then( function ( player )
            {
                ctrl.player = player;
            }, function ( message )
            {
                alert( message );
                ctrl.isError = true;
            } )
            .finally( function ()
            {
                ctrl.isLoading = false;
            } );
    }
] );
