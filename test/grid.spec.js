import { Grid, Coordinates, Cell, Ship, Shot } from "@/core"

const ROWS = 10
const COLUMNS = 10

describe("Grid", () => {
    it("should create a grid (of empty cells) of the given dimensions", () => {
        const columns = 5
        const grid = new Grid(ROWS, columns)
        expect(grid.grid.length).toEqual(10)
        expect(grid.grid[0].length).toEqual(columns)
        const notEmptyCell = grid.grid.find(row => row.find(cell => cell !== Cell.EMPTY))

        expect(notEmptyCell).toEqual(undefined)
    })

    it("should allow to place a ship on the grid", () => {
        const grid = new Grid(ROWS, COLUMNS)
        grid.placeShip(Ship.BattleShip, 1, 1)

        expect(grid.remainedOfShipCells).toEqual(Ship.BattleShip)
    })

    it("should throw when a ship is placed in invalid coordinates", () => {
        const grid = new Grid(ROWS, COLUMNS)
        expect(() => grid.placeShip(Ship.Destroyer, 0, 0)).toThrow()
    })

    it("should throw when a ship is placed in a spot that doesn't have enough space", () => {
        const grid2 = new Grid(ROWS, COLUMNS)
        expect(() => grid2.placeShip(Ship.Destroyer, 7, 8, false)).toThrow()
    })

    it("should let the user fire in the grid and return the result of the shot", () => {
        const grid = new Grid(ROWS, COLUMNS)
        let coords = new Coordinates("B4")
        let shot = grid.fire(coords)
        expect(shot).toEqual(Shot.Miss)

        grid.placeShip(Ship.Destroyer, 3, 3)
        coords = new Coordinates("e4")
        shot = grid.fire(coords)
        expect(shot).toEqual(Shot.Hit)
    })
})

describe("Coordinates", () => {
    it("should correctly transform string to grid coordinates", () => {
        const c1 = new Coordinates("a1")
        const c2 = new Coordinates("c5")
        const c3 = new Coordinates("Z15")

        expect(c1.row).toEqual(0)
        expect(c1.column).toEqual(0)
        expect(c2.row).toEqual(4)
        expect(c2.column).toEqual(2)
        expect(c3.row).toEqual(14)
        expect(c3.column).toEqual(25)
    })
})