type Cell = {
  x: number,
  y: number,
  top: boolean,
  left: boolean,
  bottom: boolean,
  right: boolean,
  set: number,
}

function compact<T>(array: T[]): T[] {
  return array.filter(Boolean);
}
function difference<T>(c: T[], d: T[]): T[] {
  return [c, d].reduce((a, b) => a.filter(c => !b.includes(c)));
}
function initial<T>(array: T[]): T[] {
  return array.slice(0, -1);
}
function groupBy<T>(list: T[], key: string): { [key: string]: T[] } {
  const keys = list.map(item => item[key]);
  let dict = uniq(keys).reduce((prev, next) => {
    return {
      ...prev,
      [next]: []
    }
  }, {});

  list.forEach(item => dict[item[key]].push(item));

  return dict;
}
function last<T>(array: T[]): T {
  return array[array.length - 1];
}
function range(n: number, end = 0): number[] {
  return end ? Array.from(Array(end - n).keys()).map(k => k + n) : Array.from(Array(n).keys());
}
function uniq<T>(array: T[]): T[] {
  return [...new Set(array)];
}
function sampleSize<T>(array: T[], n: number, random: () => number) {
  n = n == null ? 1 : n;
  const length = array == null ? 0 : array.length;
  if (!length || n < 1) {
    return [];
  }
  n = n > length ? length : n;
  let index = -1;
  const lastIndex = length - 1;
  const result = [...array];
  while (++index < n) {
    const rand = index + Math.floor(random() * (lastIndex - index + 1));
    const value = result[rand];
    result[rand] = result[index];
    result[index] = value;
  }
  return result.slice(0, n);
}

function mulberry32(seed: number) {
  return function () {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

function mergeSetWith(row: Cell[], oldSet: number, newSet: number) {
  row.forEach(box => {
    if (box.set === oldSet) box.set = newSet;
  });
}

function populateMissingSets(row: Cell[], random: () => number) {
  const setsInUse = compact(uniq(row.map(row => row.set)));
  const allSets = range(1, row.length + 1);
  const availableSets = difference(allSets, setsInUse).sort(() => 0.5 - random());
  row.filter(box => !box.set).forEach((box, i) => box.set = availableSets[i]);
}

function mergeRandomSetsIn(row: Cell[], random: () => number, probability = 0.5) {
  // Randomly merge some disjoint sets
  const allBoxesButLast = initial(row);
  allBoxesButLast.forEach((current, x) => {
    const next = row[x + 1];
    const differentSets = current.set !== next.set;
    const shouldMerge = random() <= probability;
    if (differentSets && shouldMerge) {
      mergeSetWith(row, next.set, current.set);
      current.right = false;
      next.left = false;
    }
  });
}

function addSetExits(row: Cell[], nextRow: Cell[], random: () => number) {
  // Randomly add bottom exit for each set
  const setsInRow = Object.values(groupBy(row, 'set'));
  const { ceil } = Math;
  setsInRow.forEach(set => {
    const exits = sampleSize(set, ceil(random() * set.length), random);
    exits.forEach(exit => {
      if (exit) {
        const below = nextRow[exit.x];
        exit.bottom = false;
        below.top = false;
        below.set = exit.set;
      }
    });
  });
}

function generate(width = 8, height = width, closed = true, seed = 1) {
  const random = mulberry32(seed);
  const maze = [];
  const r = range(width);

  // Populate maze with empty cells:
  for (let y = 0; y < height; y += 1) {
    const row = r.map(x => {
      return {
        x,
        y,
        top: closed || y > 0,
        left: closed || x > 0,
        bottom: closed || y < (height - 1),
        right: closed || x < (width - 1)
      };
    });
    maze.push(row);
  }

  // All rows except last:
  initial(maze).forEach((row, y) => { // TODO initial temp?
    populateMissingSets(row, random);
    mergeRandomSetsIn(row, random);
    addSetExits(row, maze[y + 1], random);
  });

  const lastRow = last(maze);
  populateMissingSets(lastRow, random);
  mergeRandomSetsIn(lastRow, random, 1);

  return maze;
}

export default generate;
