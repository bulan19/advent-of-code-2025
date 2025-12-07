import { arrayBuffer } from "stream/consumers";

const first = (input: string) => {
  const rows = input.split(('\n'))
  let functions = rows.pop()
  functions = functions?.replaceAll("  ", " ");
  functions = functions.replaceAll("  ", " ")

  const func = functions?.split(' ')

  const problems = new Array
  const result = new Map
  rows.forEach((line) => {
    const pairs = new Array
    line = line.replaceAll("  ", " ")
    line = line.replaceAll("  ", " ")
    line.split(' ').forEach((str) => {
      if (str.length > 0) pairs.push(str)
    })
    problems.push(pairs)
  })

  for (let index = 0; index < problems.length; index++) {
    const pairs = problems[index];
    for (let y = 0; y < pairs.length; y++) {
      const f = func[y]
      const number = Number(pairs[y]);
      if (!result.get(y)) {
        result.set(y, number)
      } else {
        const col = result.get(y)
        if (f == '+') result.set(y, col + number)
        if (f == '*') result.set(y, col * number)
      }
    }
  }

  let sum = 0
  result.forEach((v) => { sum += v })
  return sum;
};

const expectedFirstSolution = 5733696195703;

const second = (input: string) => {
  const rows = input.split(('\n'))
  let last_row = rows.pop()
  const functions = new Array

  for (let index = 0; index < last_row.length; index++) {
    const char = last_row[index];
    if (char != " ") {
      if (functions.length) functions[functions.length - 1].v -= 1
      functions.push({ f: char, v: 1 })
    } else {
      functions[functions.length - 1].v += 1
    }
  }

  let countdown = last_row.length - 1
  let sum = 0
  for (let index = functions.length - 1; index >= 0; index--) {
    const func = functions[index];
    let col = 0
    for (let y = 0; y < func.v; y++) {
      let num_char = ""
      for (let row = 0; row < rows.length; row++) {
        num_char += rows[row][countdown];
      }
      if (func.f == '+') col += Number(num_char)
      if (func.f == '*') {
        if (col == 0) col = 1 
        col *= Number(num_char)
      }
      countdown--
    }
    sum += col
    countdown--
  }

  return sum;
};

const expectedSecondSolution = 10951882745757;

export { expectedFirstSolution, expectedSecondSolution, first, second };
