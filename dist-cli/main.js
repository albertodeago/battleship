"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("./core/Game");
var helpers_1 = require("./helpers");
var readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
// constants for the dimensions
var ROWS = 10;
var COLUMNS = 10;
/**
 * Wrap the node readline to use promise syntax, it will keep code much cleaner with async/await
 */
var promisedReadline = function (q) {
    return new Promise(function (resolve) {
        readline.question(q, function (res) {
            resolve(res.toLowerCase());
        });
    });
};
/**
 * Exit the game
 */
var exit = function (sayBye) {
    if (sayBye === void 0) { sayBye = true; }
    sayBye && console.log("\nThanks for playing with Battleship!\n");
    readline.close();
    process.exit(0);
};
/**
 * Log the grid to let the user play in the CLI
 */
var logGrid = function (grid) {
    var signMap = [" ", "\x1b[34mo\x1b[0m", " ", "\x1b[31mx\x1b[0m"]; // weirds chars are to color the console output
    console.clear();
    var headingRow = "|    "; // first empty cell
    for (var i = 0; i < grid.columns; ++i) {
        headingRow += "| " + helpers_1.NUM_CHAR_MAP[i].toUpperCase() + " ";
    }
    console.log("\n" + headingRow + "|");
    for (var i = 0; i < grid.rows; ++i) {
        // after from 10th row the spaces increases due to 2 characters 
        var row = i < 9
            ? "| " + (i + 1) + "  "
            : "| " + (i + 1) + " ";
        for (var j = 0; j < grid.columns; ++j) {
            row += "| " + signMap[grid.grid[i][j]] + " ";
        }
        console.log(row + "|");
    }
};
/**
 * This is the main entry point to start the game as a node CLI application
 */
var main = function () {
    return __awaiter(this, void 0, void 0, function () {
        var wannaPlay, game, where, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, promisedReadline("Hi and welcome in Battleship! Your goal will be to shunk all the ships\n"
                        + "There will be 3 randomly placed ships, one long 5 squares and two long 4.\n"
                        + "Missed shots will be signed with 'o' and hit shots with 'x'.\n\n"
                        + "Do you want to start the game? (y / n) ")];
                case 1:
                    wannaPlay = _a.sent();
                    if (wannaPlay !== "y") {
                        exit(false);
                    }
                    _a.label = 2;
                case 2:
                    if (!(wannaPlay === "y")) return [3 /*break*/, 10];
                    game = new Game_1.Game();
                    logGrid(game.grid);
                    _a.label = 3;
                case 3:
                    if (!!game.isGameEnded) return [3 /*break*/, 8];
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, promisedReadline('\nSelect where to fire, the input format should be <letter><numer> (case insensitive).\nE.g. B4\n')];
                case 5:
                    where = _a.sent();
                    game.fire(where);
                    logGrid(game.grid);
                    return [3 /*break*/, 7];
                case 6:
                    e_1 = _a.sent();
                    console.log("Invalid coordinates\n");
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 3];
                case 8:
                    console.log("\nCongratulations, you have won the game utilizing " + game.shotsFired + " shots!\n");
                    return [4 /*yield*/, promisedReadline('Do you want to play another game? (y / n) ')];
                case 9:
                    wannaPlay = _a.sent();
                    return [3 /*break*/, 2];
                case 10:
                    exit();
                    return [2 /*return*/];
            }
        });
    });
};
main();
