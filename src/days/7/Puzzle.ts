const rows = (input: string) => {
  const inputs = input.split('\n')
  const rows = new Array
  for (let x = 0; x < inputs.length; x++) {
    let row = new Array
    const char = inputs[x];
    for (let y = 0; y < char.length; y++) {
      row.push(char[y])
    }
    rows.push(row)
  }
  return rows
}

const first = (input: string) => {

  return rows(input).reduce((splits, row, x, rows) => {

    if (x == 0) return splits

    for (let y = 0; y < row.length; y++) {
      const pos_above = rows[x - 1][y]
      if (pos_above == 'S' || pos_above == '|') {
        const pos = row[y];
        if (pos == '.') row[y] = '|'
        if (pos == '^') {
          splits++
          if (row[y - 1]) row[y - 1] = '|'
          if (row[y + 1]) row[y + 1] = '|'
        }
      }
    }

    return splits

  }, 0)

};

const expectedFirstSolution = 1537;

const second = (input: string) => {

  const grid = rows(input)

  let beams = new Map([[grid[0].indexOf('S'), 1]]);

  for (let row = 1; row < grid.length; row++) {
    let new_beams: Map<number, number> = new Map();
    beams.forEach((value, beam) => {
      if (grid[row][beam] == '^') {
        new_beams.set(beam - 1, (new_beams.get(beam - 1) ?? 0) + value);
        new_beams.set(beam + 1, (new_beams.get(beam + 1) ?? 0) + value);
      } else {
        new_beams.set(beam, (new_beams.get(beam) ?? 0) + value);
      }
    })
    beams = new_beams
  }

  return beams.values().reduce((total, value) => total + value)

};

const expectedSecondSolution = 18818811755665;

export { expectedFirstSolution, expectedSecondSolution, first, second };
