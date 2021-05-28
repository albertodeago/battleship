
/**
 * Validator for Grid class, it contains all the needes validations
 */
const validator = {

    /**
     * Return true if the dimensions for the grid are valid
     * @param {number} x
     * @param {number} y 
     * @returns {boolean}
     */
    isDimensionValid(x: number, y:number) {
        if (isNaN(x)
            || isNaN(y)
            || x <= 0
            || y <= 0
        ) {
            return false
        }

        return true
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
    isPlacementValid(ship: Ship, x: number, y: number, horizontal: boolean, grid: Array<Array<Cell>>) {
        if (x <= 0 || y <= 0 || y > grid.length || x > grid[0].length) {
            return false
        }
        if (horizontal) {
            if (y + ship > grid.length) {
                return false
            }
        } else {
            if (x + ship > grid[0].length) {
                return false
            }
        }

        // check for collisions with other ships
        let collision = false
        for(let i = 0; i < ship && !collision; ++i) {
            collision = horizontal
                ? grid[x][y + i] !== Cell.EMPTY
                : grid[x + i][y] !== Cell.EMPTY
        }

        return !collision
    },

    isShotValid(coords: Coordinates, grid: Array<Array<Cell>>) {
        if (coords.row > grid.length || coords.column > grid[0].length) {
            return false
        }

        return true
    }
}

enum Cell {
    EMPTY,      // the user didn't fired on this cell and there are no ships
    FIRED_MISS, // the user fired on this cell but nothing was there
    SHIP,       // the user didn't fired on this cell but a ship is there
    FIRED_HIT   // the user fired on this cell and a ship was there
}

enum Ship {
    BattleShip = 5,
    Destroyer = 4
}

enum Shot {
    Miss,
    Hit
}

/**
 * Class aimed to translate human readable coordinates (e.g. A4) to row and column for the grid
 * E.g. A5 => row 4 column 0
 */
class Coordinates {

    /**
     * Raw value. E.g. "B4"
     */
    value: string

    row: number

    column: number

    constructor(value: string) {
        this.value = value
        // separate chars from digits
        const splitValue = value.split(/(\d+)/)
        
        this.row = parseInt(splitValue[1]) - 1
        this.column = this._letterToDigit(splitValue[0])
    }

    /**
     * Transform a single character into a numeric digit
     * @param {string} char - this must be a single character 
     * @returns {number} 0 if char is 'a' or 'A', 1 if char is 'b' or 'B' and so on...
     */
    _letterToDigit(char: string) {
        return char.toLowerCase().charCodeAt(0) - 97
    }
}

class Grid {

    /**
     * Amount of rows
     */
    rows: number

    /**
     * Amount of columns
     */
    columns: number

    /**
     * Actual grid
     */
    grid: Array<Array<Cell>>

    /**
     * Keep track the total amount of cells occupied by ships not hit yet.
     * This is useful to avoid multiple loops to check if everything is destroyed (end of the game)
     */
    remainedOfShipCells: number


    constructor(x: number, y: number) {
        if (!validator.isDimensionValid(x, y)) {
            throw new Error("Invalid grid dimensions")
        }

        this.rows = x
        this.columns = y

        this.remainedOfShipCells = 0

        // create the empty grid
        this.grid = Array(x).fill(undefined).map(() => Array(y).fill(Cell.EMPTY))
    }

    /**
     * Place a ship on the grid
     * @param {Ship} ship
     * @param {number} x - starting x position
     * @param {number} y - starting y position
     * @param {boolean} [horizontal] - true if the ship is meant to be placed horizontally
     */
    placeShip(ship: Ship, x: number, y: number, horizontal: boolean = true) {
        if (!validator.isPlacementValid(ship, x, y, horizontal, this.grid)) {
            throw new Error("Invalid ship placement")
        }

        for(let i = 0; i < ship; ++i) {
            if (horizontal) {
                this.grid[x][y + i] = Cell.SHIP
            } else {
                this.grid[x + i][y] = Cell.SHIP
            }
        }

        this.remainedOfShipCells += ship
    }

    /**
     * Fire on a specific cell of the grid and returns the result of it
     * @param {Coordinates} coords
     * @returns {Shot}
     */
    fire(coords: Coordinates) {
        if (!validator.isShotValid(coords, this.grid)) {
            throw new Error("Invalid shot coordinates")
        }

        let shot = Shot.Hit
        const x = coords.row
        const y = coords.column

        if (this.grid[x][y] === Cell.FIRED_HIT) {
            // nothing to do, the user shouldn't even enter this case
        } else if (this.grid[x][y] === Cell.SHIP) {
            this.grid[x][y] = Cell.FIRED_HIT
            this.remainedOfShipCells--
        } else {
            this.grid[x][y] = Cell.FIRED_MISS
            shot = Shot.Miss
        }

        return shot
    }

    /**
     * Just to help debug purposes
     */
    private log() {
        console.log("\n")
        for(let i = 0; i < this.rows; ++i) {
            let row: string = ""
            for(let j = 0; j < this.columns; ++j) {
                row += `| ${this.grid[i][j]} `
            }
            console.log(`${row}|\n`)
        }
    }
}

export { Grid, Cell, Ship, Coordinates, Shot }