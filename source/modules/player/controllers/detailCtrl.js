angular.module( "Player" )

.controller( "PlayerDetailCtrl", [
    "$routeParams", "PlayerSrvc", "ClassMap", "WeaponMap", "DestructionAttrs", "TauntAttrs",
    function ( $routeParams, PlayerSrvc, ClassMap, WeaponMap, DestructionAttrs, TauntAttrs )
    {
        "use strict";

        var ctrl = this;

        ctrl.player = {};
        ctrl.classMap = ClassMap;
        ctrl.weaponMap = WeaponMap;
        ctrl.viewAll = {
            weapons: false,
            classes: false
        };

        ctrl.toggleView = function ( key )
        {
            ctrl.viewAll[ key ] = !ctrl.viewAll[ key ];
        };
        ctrl.orderByKills = function ( obj )
        {
            return ctrl.player[ obj.killsAttr ];
        };
        ctrl.atLeastOneKill = function ( obj )
        {
            return ctrl.player[ obj.killsAttr ] > 0;
        };
        ctrl.destructionKills = function ()
        {
            return DestructionAttrs.reduce( function ( total, attr )
            {
                return total + ctrl.player[ attr ];
            }, 0 );
        };
        ctrl.tauntKills = function ()
        {
            return TauntAttrs.reduce( function ( total, attr )
            {
                return total + ctrl.player[ attr ];
            }, 0 );
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
