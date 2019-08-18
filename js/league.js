/*
 * @author Tatiana Mounitsyna <tanya.mounitsyna@gmail.com>
 */
(function () {
    var leagueModule = angular.module("league", []);
    
    /*
    * league section displays all players ranked by score
    */
    leagueModule.directive('league', function(){
        return{
        templateUrl: './views/league.html',
        controller: leagueController,
        controllerAs: 'leagueCtrl'
        }
    });

    leagueController.$inject = ['$scope', 'PlayersService'];

    function leagueController($scope, PlayersService) {
        var ctrl = this;
        var players = PlayersService.players;
        ctrl.league = [];
        ctrl.ceo=PlayersService.getPlayer(PlayersService.ceo);
        
        updateLeague();
        $scope.$on('playerAdded', updateLeague);
        /*
        * updates league list
        */
        function updateLeague(){
            var league = [];
            angular.forEach(players, function (player, name) {
                league.push(player);
            });
            ctrl.league.length=0;
            [].push.apply(ctrl.league, league);
        }
    }
})()
