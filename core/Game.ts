import { Grid, Ship, Coordinates, Shot } from "./"
import { getRandomNum } from "../helpers"
import { Config } from "../config"


type ShipPlacement = {
    x: number,
    y: number,
    horizontal: boolean
}

/**
 * Returns a random placement for the given ship in the given grid.
 * @param ship 
 * @param gridRows 
 * @param gridColumns 
 */
const getRandomPlacement = (ship: Ship, gridRows: number, gridColumns: number): ShipPlacement => {
    const horizontal = Math.random() < 0.5
    const y = horizontal
        ? getRandomNum(1, gridRows - ship - 1)
        : getRandomNum(1, gridRows - 1)
    const x = horizontal
        ? getRandomNum(1, gridColumns - 1)
        : getRandomNum(1, gridColumns - ship - 1)
    
    return {
        x,
        y,
        horizontal
    }
}

/**
 * Create a game, this is a controller to let the user play and interact with the Grid class.
 * It will take care of creating the grid, placing ships and letting the user fire in the grid
 * without making necessary to "understand" the grid coordinates
 */
class Game {

    grid: Grid

    shotsFired: number

    constructor() {
        // create the grid for the game
        this.grid = new Grid(Config.GRID_ROWS, Config.GRID_COLUMNS)
        this.shotsFired = 0

        // create the ships for the game (3 as requested)
        const ships = [Ship.BattleShip, Ship.Destroyer, Ship.Destroyer]

        // place all the ships avoiding collisions
        ships.forEach(ship => {
            let isShipPlaced = false
            while (!isShipPlaced) {
                const shipPosition = getRandomPlacement(ship, Config.GRID_ROWS, Config.GRID_COLUMNS)
                try {
                    this.grid.placeShip(ship, shipPosition.x, shipPosition.y, shipPosition.horizontal)
                    isShipPlaced = true
                } catch (e) {
                    // nothing to do, we will retry
                    // beware that if we let the user customize the grid dimension or add new ships this logics may not be great
                }
            }
        })
    }

    fire(where: string) {
        // TODO: we should validate coordinates here
        const coords = new Coordinates(where)
        const shot = this.grid.fire(coords)
        this.shotsFired++

        return shot === Shot.Miss
    }

    get isGameEnded() {
        return this.grid.remainedOfShipCells === 0
    }

    get remainedCells() {
        return this.grid.remainedOfShipCells
    }
}

export {
    Game
}