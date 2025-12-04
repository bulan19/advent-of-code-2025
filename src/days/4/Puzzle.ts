import { KeyObject } from "crypto";

const ROLL = '@'

type position = {
  value: string;
  x: number;
  y: number;
}

const check = (position: position, grid: Map<string, position>) => {

  const positions = [
    `y${position.y + 1}x${position.x + 1}`,
    `y${position.y + 1}x${position.x + 0}`,
    `y${position.y + 1}x${position.x - 1}`,
    `y${position.y + 0}x${position.x + 1}`,
    `y${position.y + 0}x${position.x - 1}`,
    `y${position.y - 1}x${position.x + 1}`,
    `y${position.y - 1}x${position.x - 1}`,
    `y${position.y - 1}x${position.x + 0}`
  ]

  return positions.reduce((rolls, key) => {
    const position = grid.get(key)
    if (position) {
      if (position.value == ROLL) ++rolls
    }
    return rolls
  }, 0)
}

const grid = (input: string): Map<string, position> => {
  const map: Map<string, position> = new Map<string, position>();
  input.split('\n').forEach((line, y) => {
    line.split('').forEach((c, x) => {
      map.set(`y${y}x${x}`, { value: c, y: y, x: x });
    });
  });
  return map;
};

const first = (input: string) => {
  let count = 0
  grid(input).forEach((position, key, grid) => {
    if (position.value == ROLL) {
      if (check(position, grid) < 4) ++count
    }
  })
  return count
};

const expectedFirstSolution = 1435;

const second = (input: string) => {
  const map = grid(input)
  let count = 0
  let run = true

  do {
    let sub_count = 0
    let remove = ['']

    map.forEach((position, key) => {
      if (position.value == ROLL) {
        if (check(position, map) < 4) {
          ++sub_count
          remove.push(key)
        }
      }
    })

    remove.forEach((key) => {
      let position = map.get(key)
      if (position) {
        position.value = '.'
        map.set(key, position)
      }
    })

    if (sub_count == 0) run = false
    count += sub_count

  } while (run);
  return count;
};

const expectedSecondSolution = 'solution 2';

export { expectedFirstSolution, expectedSecondSolution, first, second };
