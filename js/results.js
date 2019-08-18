/*
 * @author Tatiana Mounitsyna <tanya.mounitsyna@gmail.com>
 */
(function () {
    var resultsModule = angular.module("results", ['players']);

    resultsModule.factory('ResultsService', ResultsService);
    ResultsService.$inject = ['$rootScope', 'PlayersService'];

    function ResultsService($rootScope, PlayersService) {
        var results = [];

        /*
         * Result of a match
         * @param {number} id - unique id
         * @param {String} player1 - reference to player 1
         * @param {number} score1 - points of first player
         * @param {String} player2 - reference to player 2
         * @param {number} score2 - points of second player
         */
        function Result(id, player1, score1, player2, score2) {
            this.id = id;
            this.player_1 = {
                player: player1,
                score: score1
            }
            this.player_2 = {
                player: player2,
                score: score2
            }
            this.winner = this.calculateWinner();
        }
        /*
         * finds out which player won
         * @returns {Object}
         */
        Result.prototype.calculateWinner = function () {
            var winner, loser;
            if (this.player_1.score > this.player_2.score) {
                winner = this.player_1;
                loser = this.player_2;
            } else {
                winner = this.player_2;
                loser = this.player_1;
            }

            //no winner in a tie
            if (winner.score == loser.score) {
                this.tie = true;
                return;
            }
            //no winner if high score is under 11
            if (winner.score < 11) {
                return;
            }
            //no winner if high score didn't win by 2 points
            if (winner.score - loser.score < 2) {
                return;
            }
            return winner;
        }

        /*
         * adds a result to the list
         * @params {Object} entry - information about match
         * @params {Object} entry.id - match id
         * @params {Object} entry.player_1 - name of first player
         * @params {Object} entry.score_1 - score of first player
         * @params {Object} entry.player_2 - name of second player
         * @params {Object} entry.score_2 - score of second player
         */
        function addResult(entry) {
            var id = entry.id || results.length + 1;
            var player1 = PlayersService.getPlayer(entry.player_1);
            var score1 = entry.score_1;
            var player2 = PlayersService.getPlayer(entry.player_2);
            var score2 = entry.score_2;

            var resultRef = new Result(id, player1, score1, player2, score2);

            if (resultRef.winner) {
                resultRef.winner.player.addWin();
            }
            if (resultRef.tie || resultRef.winner) {
                results.push(resultRef);
                $rootScope.$broadcast('resultAdded', resultRef);
                return resultRef;
            }
        }
        return {
            results: results,
            addResult: addResult
        }
    }


    /*
     * view of the results table and new results entry
     */
    resultsModule.directive('results', function () {
        return {
            templateUrl: './views/results.html',
            controller: resultsController,
            controllerAs: 'resultsCtrl'
        }
    });
    resultsController.$inject = ['$scope', 'ResultsService', 'PlayersService'];

    function resultsController($scope, ResultsService, PlayersService) {
        var ctrl = this;
        ctrl.results = ResultsService.results;
        ctrl.players = PlayersService.players;

        ctrl.addResult = ResultsService.addResult;
    }

    /*
     * validates score 1 and score 2, making sure at least one is over 11 points,
     * and they have a difference of 2 points
     */
    resultsModule.directive('score', function () {
        return {
            require: ['^form', 'ngModel'],
            link: function (scope, elem, attrs, ctrls) {
                var form = ctrls[0];
                var ngModel = ctrls[1];

                function validate() {
                    var score1 = Number(form.score_1.$viewValue);
                    var score2 = Number(form.score_2.$viewValue);
                    var scoreDiff = score1 - score2;
                    var valid = ((score1 >= 11 || score2 >= 11) && (scoreDiff >= 2 || scoreDiff <= -2));
                    ngModel.$setValidity('score', valid);
                }
                scope.$on('score', validate);
                ngModel.$parsers.unshift(function (value) {
                    scope.$emit('score')
                    validate();
                    return value;
                });
            }
        }
    });


})()
