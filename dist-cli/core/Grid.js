"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shot = exports.Coordinates = exports.Ship = exports.Cell = exports.Grid = void 0;
/**
 * Validator for Grid class, it contains all the needes validations
 */
var validator = {
    /**
     * Return true if the dimensions for the grid are valid
     * @param {number} x
     * @param {number} y
     * @returns {boolean}
     */
    isDimensionValid: function (x, y) {
        if (isNaN(x)
            || isNaN(y)
            || x <= 0
            || y <= 0) {
            return false;
        }
        return true;
    },
    /**
     * Return false if the placement is invalid (wrong coordinates or collides with already placed ships)
     * @param ship
     * @param x
     * @param y
     * @param horizontal
     * @param grid
     * @returns {boolean}
     */
    isPlacementValid: function (ship, x, y, horizontal, grid) {
        if (x <= 0 || y <= 0 || y > grid.length || x > grid[0].length) {
            return false;
        }
        if (horizontal) {
            if (y + ship > grid.length) {
                return false;
            }
        }
        else {
            if (x + ship > grid[0].length) {
                return false;
            }
        }
        // check for collisions with other ships
        var collision = false;
        for (var i = 0; i < ship && !collision; ++i) {
            collision = horizontal
                ? grid[x][y + i] !== Cell.EMPTY
                : grid[x + i][y] !== Cell.EMPTY;
        }
        return !collision;
    },
    isShotValid: function (coords, grid) {
        if (coords.row > grid.length || coords.column > grid[0].length) {
            return false;
        }
        return true;
    }
};
var Cell;
(function (Cell) {
    Cell[Cell["EMPTY"] = 0] = "EMPTY";
    Cell[Cell["FIRED_MISS"] = 1] = "FIRED_MISS";
    Cell[Cell["SHIP"] = 2] = "SHIP";
    Cell[Cell["FIRED_HIT"] = 3] = "FIRED_HIT"; // the user fired on this cell and a ship was there
})(Cell || (Cell = {}));
exports.Cell = Cell;
var Ship;
(function (Ship) {
    Ship[Ship["BattleShip"] = 5] = "BattleShip";
    Ship[Ship["Destroyer"] = 4] = "Destroyer";
})(Ship || (Ship = {}));
exports.Ship = Ship;
var Shot;
(function (Shot) {
    Shot[Shot["Miss"] = 0] = "Miss";
    Shot[Shot["Hit"] = 1] = "Hit";
})(Shot || (Shot = {}));
exports.Shot = Shot;
/**
 * Class aimed to translate human readable coordinates (e.g. A4) to row and column for the grid
 * E.g. A5 => row 4 column 0
 */
var Coordinates = /** @class */ (function () {
    function Coordinates(value) {
        this.value = value;
        // separate chars from digits
        var splitValue = value.split(/(\d+)/);
        this.row = parseInt(splitValue[1]) - 1;
        this.column = this._letterToDigit(splitValue[0]);
    }
    /**
     * Transform a single character into a numeric digit
     * @param {string} char - this must be a single character
     * @returns {number} 0 if char is 'a' or 'A', 1 if char is 'b' or 'B' and so on...
     */
    Coordinates.prototype._letterToDigit = function (char) {
        return char.toLowerCase().charCodeAt(0) - 97;
    };
    return Coordinates;
}());
exports.Coordinates = Coordinates;
var Grid = /** @class */ (function () {
    function Grid(x, y) {
        if (!validator.isDimensionValid(x, y)) {
            throw new Error("Invalid grid dimensions");
        }
        this.rows = x;
        this.columns = y;
        this.remainedOfShipCells = 0;
        // create the empty grid
        this.grid = Array(x).fill(undefined).map(function () { return Array(y).fill(0); });
    }
    /**
     * Place a ship on the grid
     * @param {Ship} ship
     * @param {number} x - starting x position
     * @param {number} y - starting y position
     * @param {boolean} [horizontal] - true if the ship is meant to be placed horizontally
     */
    Grid.prototype.placeShip = function (ship, x, y, horizontal) {
        if (horizontal === void 0) { horizontal = true; }
        if (!validator.isPlacementValid(ship, x, y, horizontal, this.grid)) {
            throw new Error("Invalid ship placement");
        }
        for (var i = 0; i < ship; ++i) {
            if (horizontal) {
                this.grid[x][y + i] = Cell.SHIP;
            }
            else {
                this.grid[x + i][y] = Cell.SHIP;
            }
        }
        this.remainedOfShipCells += ship;
    };
    /**
     * Fire on a specific cell of the grid and returns the result of it
     * @param {Coordinates} coords
     * @returns {Shot}
     */
    Grid.prototype.fire = function (coords) {
        if (!validator.isShotValid(coords, this.grid)) {
            throw new Error("Invalid shot coordinates");
        }
        var shot = Shot.Hit;
        var x = coords.row;
        var y = coords.column;
        if (this.grid[x][y] === Cell.FIRED_HIT) {
            // nothing to do, the user shouldn't even enter this case
        }
        else if (this.grid[x][y] === Cell.SHIP) {
            this.grid[x][y] = Cell.FIRED_HIT;
            this.remainedOfShipCells--;
        }
        else {
            this.grid[x][y] = Cell.FIRED_MISS;
            shot = Shot.Miss;
        }
        return shot;
    };
    /**
     * Just to help debug purposes
     */
    Grid.prototype.log = function () {
        console.log("\n");
        for (var i = 0; i < this.rows; ++i) {
            var row = "";
            for (var j = 0; j < this.columns; ++j) {
                row += "| " + this.grid[i][j] + " ";
            }
            console.log(row + "|\n");
        }
    };
    return Grid;
}());
exports.Grid = Grid;
