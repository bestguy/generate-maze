# generate-maze

Maze generator using a JavaScript implementation of Eller's Algorithm, 
as described here: http://www.neocomputer.org/projects/eller.html

This algorithm creates 'perfect' mazes, which have only a single path between any two cells.

This maze library generates a two-dimensional array of cells, each with the following properties:

``` js
    {
      x: 4,          // Horizontal position, integer
      y: 7,          // Vertical position, integer
      top: false,    // Top/Up has a wall/blocked, boolean 
      left: false,   // Left has a wall/blocked, boolean
      bottom: true,  // Bottom/Down has a wall/blocked, boolean
      right: true,   // Right has a wall/blocked, boolean
      set: 5         // Set # used to generate maze, can be ignored
    }
```

## Installation

`npm install generate-maze`

## Usage

_Example assumes you are using a module system such as node, Webpack or Browserify._

```javascript
var generator = require('generate-maze');

// Width and height == 4
var maze = generator(4);

// Width == 8, height == 4
var maze = generator(8, 4);

// Width == 8, height == 4, maze edges are open
var maze = generator(8, 4, false);

```

_Note: the maze is an array of rows, so to access individual cells by their x/y
positions, you need to specify the row first.  For example:

    maze[y][x]