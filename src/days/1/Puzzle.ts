const LEFT = 'L'

const first = (input: string) => {

  let dial = 50
  let count = 0

  input.split('\n').forEach((line) => {
    const direction = line.substring(0, 1)
    let distance = Number(line.substring(1))

    //console.log(direction, distance)

    while (distance > 0) {
      if (direction == LEFT) {
        dial -= 1
      } else {
        dial += 1
      }

      if (dial < 0) {
        dial = 99
      }

      if (dial > 99) {
        dial = 0
      }

      distance -= 1
    }

    if (dial == 0) {
      count += 1
    }

    //console.log(dial)

  })

  return count;

};

const expectedFirstSolution = 1055;

const second = (input: string) => {

  let dial = 50
  let count = 0

  input.split('\n').forEach((line) => {
    const direction = line.substring(0, 1)
    let distance = Number(line.substring(1))

    while (distance > 0) {
      if (direction == LEFT) {
        dial -= 1
      } else {
        dial += 1
      }

      if (dial < 0) {
        dial = 99
      }

      if (dial > 99) {
        dial = 0
      }

      if (dial == 0) {
        count += 1
      }

      distance -= 1
    }

  })

  return count;

};

const expectedSecondSolution = 6386;

export { expectedFirstSolution, expectedSecondSolution, first, second };
