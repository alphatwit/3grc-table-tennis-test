/*
 * @author Tatiana Mounitsyna <tanya.mounitsyna@gmail.com>
 */
(function () {
    var playersModule = angular.module("players", []);

    playersModule.factory('PlayersService', PlayersService);
    PlayersService.$inject = ['$rootScope'];


    function PlayersService($rootScope) {
        var CEO_NAME = 'Steve (CEO)';
        var nextId = 1;
        var playerStore = {};

        /*
         * Player
         * @param {number} id - unique id
         * @param {String} name - unique name
         * @param {Boolean} ceo - whether or not the player is the CEO
         */
        function Player(id, name, ceo) {
            this.id = id;
            this.name = name;
            this.ceo = ceo || false;
            this.points = 0;
        }
        /*
         * add 2 points for each victory
         */
        Player.prototype.addWin = function () {
            this.points += 2;
        }
        /*
         * mark the player as the CEO
         */
        Player.prototype.makeCEO = function () {
            this.ceo = true;
        }
        /*
         * get player by name
         */
        function getPlayerByName(name) {
            return playerStore[name];
        }

        /*
         * add new player to roster
         * names must be unique because the results table references player by name, not by ID
         */
        function addPlayer(player) {
            var name = player.name;
            var id = player.id;
            var playerRef;
            if (name && !playerStore[name]) {
                var newId = id || nextId;
                playerRef = playerStore[name] = new Player(newId, name);

                nextId++;
            }
            $rootScope.$broadcast('playerAdded', playerRef);
            return playerRef;
        }

        return {
            ceo: CEO_NAME,
            players: playerStore,
            getPlayer: getPlayerByName,
            addPlayer: addPlayer
        }
    }

    /*
     * players section allows for entry of new players
     */
    playersModule.directive('players', function () {
        return {
            templateUrl: './views/players.html',
            controller: playersController,
            controllerAs: 'playersCtrl'
        }
    });

    playersController.$inject = ['$scope', 'PlayersService'];

    function playersController($scope, PlayersService) {
        var ctrl = this;
        ctrl.addPlayer = PlayersService.addPlayer;
    }
})()
