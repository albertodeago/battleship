"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var _1 = require("./");
var helpers_1 = require("../helpers");
var config_1 = require("../config");
/**
 * Returns a random placement for the given ship in the given grid.
 * @param ship
 * @param gridRows
 * @param gridColumns
 */
var getRandomPlacement = function (ship, gridRows, gridColumns) {
    var horizontal = Math.random() < 0.5;
    var y = horizontal
        ? helpers_1.getRandomNum(1, gridRows - ship - 1)
        : helpers_1.getRandomNum(1, gridRows - 1);
    var x = horizontal
        ? helpers_1.getRandomNum(1, gridColumns - 1)
        : helpers_1.getRandomNum(1, gridColumns - ship - 1);
    return {
        x: x,
        y: y,
        horizontal: horizontal
    };
};
/**
 * Create a game, this is a controller to let the user play and interact with the Grid class.
 * It will take care of creating the grid, placing ships and letting the user fire in the grid
 * without making necessary to "understand" the grid coordinates
 */
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        // create the grid for the game
        this.grid = new _1.Grid(config_1.Config.GRID_ROWS, config_1.Config.GRID_COLUMNS);
        this.shotsFired = 0;
        // create the ships for the game (3 as requested)
        var ships = [_1.Ship.BattleShip, _1.Ship.Destroyer, _1.Ship.Destroyer];
        // place all the ships avoiding collisions
        ships.forEach(function (ship) {
            var isShipPlaced = false;
            while (!isShipPlaced) {
                var shipPosition = getRandomPlacement(ship, config_1.Config.GRID_ROWS, config_1.Config.GRID_COLUMNS);
                try {
                    _this.grid.placeShip(ship, shipPosition.x, shipPosition.y, shipPosition.horizontal);
                    isShipPlaced = true;
                }
                catch (e) {
                    // nothing to do, we will retry
                    // beware that if we let the user customize the grid dimension or add new ships this logics may not be great
                }
            }
        });
    }
    Game.prototype.fire = function (where) {
        // TODO: we should validate coordinates here
        var coords = new _1.Coordinates(where);
        var shot = this.grid.fire(coords);
        this.shotsFired++;
        return shot === _1.Shot.Miss;
    };
    Object.defineProperty(Game.prototype, "isGameEnded", {
        get: function () {
            return this.grid.remainedOfShipCells === 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "remainedCells", {
        get: function () {
            return this.grid.remainedOfShipCells;
        },
        enumerable: false,
        configurable: true
    });
    return Game;
}());
exports.Game = Game;
