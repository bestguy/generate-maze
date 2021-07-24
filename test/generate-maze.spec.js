'use strict';
import assert from 'assert';

import maze from '../src/generate-maze.ts';

describe('maze', () => {
  it('should have correct width and height with single parameter', () => {
    let m = maze(4);
    assert.strictEqual(4, m.length, 'height is incorrect');
    assert.strictEqual(4, m[0].length, 'width is incorrect');
  });
  it('should have correct width and height with two parameters', () => {
    let m = maze(8, 6);
    assert.strictEqual(6, m.length, 'height is incorrect');
    assert.strictEqual(8, m[0].length, 'width is incorrect');
  });

  it('should output same maze for same seed', () => {
    let m = maze(14, 14, true, 123456);
    let m2 = maze(14, 14, true, 123456);
    assert.deepStrictEqual(m, m2, 'Mazes do not match');
  });

  it('should output different maze for different seed', () => {
    let m = maze(4, 4, true, 222222);
    let m2 = maze(4, 4, true, 123456);
    assert.notDeepStrictEqual(m, m2, 'Mazes match');
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
