# battleships
This is a simple Battleship game.  
The particularity is that following the principles of clean architecture this game is playable both in browser (via nuxt static generated site) and in the CLI via node.js


## Setup project

To play locally but in the CLI type
```bash
$ npm run play:cli
```
This will start the game in your terminal

To install all the dependencies type 
```bash
$ npm install
```

To play locally (in development mode, an url will be provided in the console)
```bash
$ npm run dev
```

To build for production (it buils a prerendered app, fully static generated site)
```bash
$ npm run generate
```
You can then just host it somewhere (any static hosting will do the job, like vercel or netlify)


## Test
To run unit test type
```bash
$ npm run test
```

To run unit test in watch mode type
```bash
$ npm run test:unit
```

## Environment
The projects is developed and tested in a windows 10 machine, using node 14.16.0 and always run in Chrome browser.  
It should work properly in all the major browsers but it may not be working (or having some issues) in Internet Explorer.
