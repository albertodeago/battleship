"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NUM_CHAR_MAP = exports.numToChar = exports.getRandomNum = void 0;
/**
 * Get a random integer between the given numbers (included)
 */
var getRandomNum = function (min, max) { return Math.floor(Math.random() * (max - min + 1) + min); };
exports.getRandomNum = getRandomNum;
/**
 * Helper array, it will be used as a map to transform numbers to characters, because user coordinates are in the form "<char><num>"
 */
var NUM_CHAR_MAP = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
exports.NUM_CHAR_MAP = NUM_CHAR_MAP;
/**
 * Transform a number into a character, to create coordinates
 */
var numToChar = function (num) { return NUM_CHAR_MAP[num]; };
exports.numToChar = numToChar;
