'use strict';
import assert from 'assert';

import maze from '../src/generate-maze.js';

describe('maze', () => {
  it('should have correct width and height with single parameter', () => {
    let m = maze(4);
    assert.equal(4, m.length, 'height is incorrect');
    assert.equal(4, m[0].length, 'width is incorrect');
  });
  it('should have correct width and height with two parameters', () => {
    let m = maze(8, 6);
    assert.equal(6, m.length, 'height is incorrect');
    assert.equal(8, m[0].length, 'width is incorrect');
  });

  it('should be closed by default', () => {
    let m = maze(5);
    for (var i = 0; i < 5; i++) {
      assert(m[0][i].top, 'top is not closed')
      assert(m[4][i].bottom, 'bottom is not closed')
      assert(m[i][0].left, 'left is not closed')
      assert(m[i][4].right, 'right is not closed')
    }
  });
  it('should be closed if specified', () => {
    let m = maze(5,5,true);
    for (var i = 0; i < 5; i++) {
      assert(m[0][i].top, 'top is not closed')
      assert(m[4][i].bottom, 'bottom is not closed')
      assert(m[i][0].left, 'left is not closed')
      assert(m[i][4].right, 'right is not closed')
    }
  });
  it('should be open if specified', () => {
    let m = maze(5, 5, false);
    for (var i = 0; i < 5; i++) {
      assert(!m[0][i].top, 'top is closed')
      assert(!m[4][i].bottom, 'bottom is closed')
      assert(!m[i][0].left, 'left is closed')
      assert(!m[i][4].right, 'right is closed')
    }
  });
});
