angular.module( "Player" )

.value( "ClassMap", [
    {
        name: "Demoman",
        imgUrl: "/build/images/classes/Demoman.png",
        killsAttr: "DemoKills",
        deathsAttr: "DemoDeaths"
    },
    {
        name: "Engineer",
        imgUrl: "/build/images/classes/Engineer.png",
        killsAttr: "EngiKills",
        deathsAttr: "EngiDeaths"
    },
    {
        name: "Heavy",
        imgUrl: "/build/images/classes/Heavy.png",
        killsAttr: "HeavyKills",
        deathsAttr: "HeavyDeaths"
    },
    {
        name: "Medic",
        imgUrl: "/build/images/classes/Medic.png",
        killsAttr: "MedicKills",
        deathsAttr: "MedicDeaths"
    },
    {
        name: "Pyro",
        imgUrl: "/build/images/classes/Pyro.png",
        killsAttr: "PyroKills",
        deathsAttr: "PyroDeaths"
    },
    {
        name: "Scout",
        imgUrl: "/build/images/classes/Scout.png",
        killsAttr: "ScoutKills",
        deathsAttr: "ScoutDeaths"
    },
    {
        name: "Sniper",
        imgUrl: "/build/images/classes/Sniper.png",
        killsAttr: "SniperKills",
        deathsAttr: "SniperDeaths"
    },
    {
        name: "Soldier",
        imgUrl: "/build/images/classes/Soldier.png",
        killsAttr: "SoldierKills",
        deathsAttr: "SoldierDeaths"
    },
    {
        name: "Spy",
        imgUrl: "/build/images/classes/Spy.png",
        killsAttr: "SpyKills",
        deathsAttr: "SpyDeaths"
    }
] );
