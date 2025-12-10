type Point = { x: number; y: number }

const first = (input: string) => {

  const red_tiles = input.split('\n').map((line) => {
    const [x, y] = line.split(',')
    return {
      x: Number(x),
      y: Number(y)
    }
  })

  const pairs = new Array
  red_tiles.forEach((tile, index, tiles) => {
    for (let j = index + 1; j < tiles.length; j++) {
      const other = tiles[j]
      const length = Math.abs(tile.x - other.x)
      const height = Math.abs(tile.y - other.y)
      pairs.push({
        a: tile,
        b: other,
        size: (height + 1) * (length + 1),
      })
    }

  })

  pairs.sort((a, b) => b.size - a.size)
  return pairs[0].size;
};

const expectedFirstSolution = 4781546175;

const second = (input: string) => {

  const valid = (a1: number, a2: number, b1: number, b2: number) =>
    !(a1 <= b1 && a1 <= b2 && a2 <= b1 && a2 <= b2) &&
    !(a1 >= b1 && a1 >= b2 && a2 >= b1 && a2 >= b2);

  const overlap = (a: Point, b: Point) =>
    borders.some(
      (border) =>
        valid(border.from.y, border.to.y, a.y, b.y) && valid(border.from.x, border.to.x, a.x, b.x)
    );

  const red_tiles = input.split('\n').map((line) => {
    const [x, y] = line.split(',')
    return {
      x: Number(x),
      y: Number(y)
    }
  })

  const pairs = new Array
  const borders = new Array

  red_tiles.forEach((current, index, tiles) => {

    for (let j = index + 1; j < tiles.length; j++) {
      const other = tiles[j]
      const length = Math.abs(current.x - other.x)
      const height = Math.abs(current.y - other.y)
      pairs.push({
        a: current,
        b: other,
        size: (height + 1) * (length + 1),
      })
    }

    // skapa linjer/gränser
    const next = tiles[index + 1]
    if (!next) {
      // TODO special för första -> sista tile
      borders.push({
        from: current,
        to: red_tiles[0]
      })
      return
    }

    borders.push({
      from: current,
      to: next
    })

  })

  pairs.sort((a, b) => b.size - a.size)

  return pairs.find((pair) => {
    // störst->minst rektangel som inte har några överlapp
    return !overlap(pair.a, pair.b)
  }).size

};

const expectedSecondSolution = 1573359081;

export { expectedFirstSolution, expectedSecondSolution, first, second };
