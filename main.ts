import { Game } from "./core/Game"
import { Grid } from "./core/Grid"
import { NUM_CHAR_MAP } from "./helpers"

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// constants for the dimensions
const ROWS = 10
const COLUMNS = 10

/**
 * Wrap the node readline to use promise syntax, it will keep code much cleaner with async/await
 */
const promisedReadline = (q: string): Promise<string> => {
    return new Promise(resolve => {
        readline.question(q, (res: string) => {
            resolve(res.toLowerCase())
        });
    })
}

/**
 * Exit the game
 */
const exit = (sayBye: boolean = true): void => {
    sayBye && console.log("\nThanks for playing with Battleship!\n");
    readline.close()
    process.exit(0)
}

/**
 * Log the grid to let the user play in the CLI
 */
const logGrid = (grid: Grid): void => {
    const signMap = [" ", "\x1b[34mo\x1b[0m", " ", "\x1b[31mx\x1b[0m"] // weirds chars are to color the console output

    console.clear()
    let headingRow = "|    " // first empty cell
    for(let i = 0; i < grid.columns; ++i) {
        headingRow += `| ${NUM_CHAR_MAP[i].toUpperCase()} `
    }
    console.log(`\n${headingRow}|`)

    for(let i = 0; i < grid.rows; ++i) {
        // after from 10th row the spaces increases due to 2 characters 
        let row: string = i < 9
            ? `| ${i + 1}  `
            : `| ${i + 1} `
        for(let j = 0; j < grid.columns; ++j) {
            row += `| ${signMap[grid.grid[i][j]]} `
        }
        console.log(`${row}|`)
    }
}
/**
 * This is the main entry point to start the game as a node CLI application
 */
const main = async function() {
    let wannaPlay = await promisedReadline("Hi and welcome in Battleship! Your goal will be to shunk all the ships\n" 
        + "There will be 3 randomly placed ships, one long 5 squares and two long 4.\n"
        + "Missed shots will be signed with 'o' and hit shots with 'x'.\n\n"
        + "Do you want to start the game? (y / n) ")
    if (wannaPlay !== "y") {
        exit(false)
    }

    while(wannaPlay === "y") {
        const game = new Game()
        logGrid(game.grid)
    
        while(!game.isGameEnded) {
            try {
                const where = await promisedReadline('\nSelect where to fire, the input format should be <letter><numer> (case insensitive).\nE.g. B4\n')
                game.fire(where)
                logGrid(game.grid)
            } catch (e) {
                console.log("\nInvalid coordinates");
                // nothing to do, let the user re-ender the coordinates
            }
        }
    
        console.log(`\nCongratulations, you have won the game utilizing ${game.shotsFired} shots!\n`)

        wannaPlay = await promisedReadline('Do you want to play another game? (y / n) ')
    }
    exit()
}

main()