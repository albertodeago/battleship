
/**
 * Get a random integer between the given numbers (included)
 */
const getRandomNum = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)


/**
 * Helper array, it will be used as a map to transform numbers to characters, because user coordinates are in the form "<char><num>"
 */
const NUM_CHAR_MAP = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

/**
 * Transform a number into a character, to create coordinates
 */
const numToChar = (num: number) => NUM_CHAR_MAP[num]

export {
    getRandomNum,
    numToChar,
    NUM_CHAR_MAP
}