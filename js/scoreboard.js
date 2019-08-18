(function () {
    var app = angular.module("scoreboard", ['players', 'results', 'league']);

    app.run(App);
    App.$inject = ['PlayersService', 'ResultsService']

    function App(PlayersService, ResultsService) {

        var players = [
            { id: 1, name: "Justin" },
            { id: 2, name: "Liam" },
            { id: 3, name: "Steve (CEO)" },
            { id: 4, name: "Dan" },
            { id: 5, name: "Lee" },
            { id: 6, name: "Gavin" },
            { id: 7, name: "Tracey" },
            { id: 8, name: "David" },
            { id: 9, name: "Sam" },
            { id: 10, name: "Chris" },
            { id: 11, name: "Joe" },
            { id: 12, name: "Emma" }
        ];
        var results = [
            {
                id: 1,
                player_1: "Justin",
                score_1: 11,
                player_2: "Steve (CEO)",
                score_2: 6
            },
            {
                id: 2,
                player_1: "Steve (CEO)",
                score_1: 13,
                player_2: "Dan",
                score_2: 11
            },
            {
                id: 3,
                player_1: "Liam",
                score_1: 6,
                player_2: "Lee",
                score_2: 11
            },
            {
                id: 4,
                player_1: "Liam",
                score_1: 11,
                player_2: "Steve (CEO)",
                score_2: 9
            },
            {
                id: 5,
                player_1: "Justin",
                score_1: 14,
                player_2: "Lee",
                score_2: 12
            },
            {
                id: 6,
                player_1: "Justin",
                score_1: 10,
                player_2: "Dan",
                score_2: 12
            },
            {
                id: 7,
                player_1: "Dan",
                score_1: 11,
                player_2: "Lee",
                score_2: 9
            },
            {
                id: 8,
                player_1: "Justin",
                score_1: 11,
                player_2: "Liam",
                score_2: 3
            },
            {
                id: 9,
                player_1: "Tracey",
                score_1: 11,
                player_2: "Emma",
                score_2: 8
            },
            {
                id: 10,
                player_1: "Emma",
                score_1: 11,
                player_2: "Dan",
                score_2: 9
            }
        ];
        angular.forEach(players, PlayersService.addPlayer);
        PlayersService.getPlayer(PlayersService.ceo).makeCEO();
        angular.forEach(results, ResultsService.addResult);

    }

})()
