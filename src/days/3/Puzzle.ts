const first = (input: string) => {
  return input
    .split('\n')
    .map(line => line.split('').map(Number))
    .reduce((total, bank) => {
      const pairs = []
      for (let x = 0; x < bank.length; x++) {
        for (let y = x + 1; y < bank.length; y++) {
          pairs.push(Number(String(bank[x]) + String(bank[y])))
        }
      }
      pairs.sort((a, b) => a - b)
      return total += pairs.pop() ?? 0
    }, 0)
};

const expectedFirstSolution = 17452;

const second = (input: string) => {
  return input
    .split('\n')
    .map(line => line.split('').map(Number))
    .reduce((total, bank) => {
      return total += find(bank, 0, 12, 0)
    }, 0)
};

const find = (bank: number[], index: number, numbers: number, total: number): number => {
  let max = -1
  let max_index = 0
  let last = bank.length - numbers
  for (index; index <= last; index++) {
    if (last >= bank.length) {
      return total
    }
    if (bank[index] > max) {
      max = bank[index]
      max_index = index
    }
  }

  if (max < 0) return total

  return find(bank, max_index + 1, numbers - 1, Number(String(total) + String(max)))
}

const expectedSecondSolution = 173300819005913;

export { expectedFirstSolution, expectedSecondSolution, first, second };
