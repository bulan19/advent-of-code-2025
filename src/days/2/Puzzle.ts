const first = (input: string) => {

  return input
    .split(',')
    .map(line => line.split('-').map(Number))
    .reduce((total, [first, last]) => {
      for (let x = first; x <= last; x++) {
        const current = String(x)
        let split = current.length / 2
        if (current.substring(0, split) == current.substring(split)) {
          total += x
        }
      }
      return total
    }, 0)

};

const expectedFirstSolution = 37314786486;

const second = (input: string) => {

  const re = /^(\d+)\1+$/

  return input
    .split(',')
    .map(line => line.split('-').map(Number))
    .reduce((total, [first, last]) => {
      for (let x = first; x <= last; x++) {
        const current = String(x)
        const max = current.length / 2
        for (let length = 1; length <= max; length++) {
          const pattern = current.slice(0, length);
          const repeatCount = current.length / length;
          const built = pattern.repeat(repeatCount);
          if (built == current) {
            total += x
            break
          }
        }
      }
      return total
    }, 0)

};

const expectedSecondSolution = 47477053982;

export { expectedFirstSolution, expectedSecondSolution, first, second };
