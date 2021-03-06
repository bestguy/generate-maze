# generate-maze

Maze generator using a JavaScript implementation of Eller's Algorithm, 
as described here: http://www.neocomputer.org/projects/eller.html

This algorithm creates 'perfect' mazes, which guarantees a single path 
between any two cells, such as:

    +---+---+---+---+---+---+---+
    |           |           |   |
    +---+   +---+   +   +   +   +
    |   |   |       |   |       |
    +   +   +   +   +   +   +   +
    |       |   |   |   |   |   |
    +   +---+   +   +---+---+   +
    |   |   |   |   |   |   |   |
    +   +   +   +   +   +   +   +
    |   |       |   |   |       |
    +   +---+   +---+   +---+---+
    |   |   |   |       |       |
    +   +   +   +   +---+   +   +
    |                       |   |
    +---+---+---+---+---+---+---+
    
Another [Web example](https://svelte.dev/repl/7eb34401ec0c42d3bb47d2cdbc58f926?version=3.38.2)

**Note: This library does not create ASCII-art or other text visualizations.  
That part is up to you.**

This library generates a two-dimensional array of maze cells, each with the following properties:

``` js
    {
      x: 4,          // Horizontal position, integer
      y: 7,          // Vertical position, integer
      top: false,    // Top/Up has a wall/blocked if true, boolean 
      left: false,   // Left has a wall/blocked if true, boolean
      bottom: true,  // Bottom/Down has a wall/blocked if true, boolean
      right: true,   // Right has a wall/blocked if true, boolean
      set: 5         // Set # used to generate maze, can be ignored
    }
```

## Installation

`npm install generate-maze`

## Usage

_Example assumes you are using a module system such as node, Webpack or Browserify._

```javascript
const generator = require('generate-maze');

// Width and height == 4
const maze = generator(4);

// Width == 8, height == 4
const maze = generator(8, 4);

// Width == 8, height == 4, maze edges are open
const maze = generator(8, 4, false);

// Width == 8, height == 4, maze edges are closed, using random seed 
const maze = generator(8, 4, true, 123456);

```



_Note: the maze is an array of rows, so to access individual cells by their x/y
positions, you need to specify the row first.  For example:

    maze[y][x]
