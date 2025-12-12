import path from "path";

const first = (input: string) => {

  const countPaths = (start: string, end: string, devices: Map<string, string[]>) => {

    const memo = new Map

    const dfs = (node: string) => {
      const paths = devices.get(node)

      if (!paths) return 0

      if (paths[0] === end) return 1

      let total = 0

      for (const next of paths) {
        total += dfs(next)
      }

      memo.set(node, total)
      return total

    }

    return dfs(start)

  }

  const devices = new Map
  input.split('\n').forEach((line) => {
    const [id, next] = line.split(': ')
    const path = next.split(' ')
    devices.set(id, path)
  })

  return countPaths('you', 'out', devices);

};

const expectedFirstSolution = 523;

const second = (input: string) => {

  const DAC = 'dac'
  const FFT = 'fft'

  function countPaths(start: string, end: string, devices: Map<string, string[]>): number {
    const memo = new Map<string, number>()

    function dfs(node: string): number {
      if (node === end) return 1

      if (memo.has(node)) return memo.get(node)!

      const paths = devices.get(node) || []
      let total = 0

      for (const next of paths) {
        total += dfs(next)
      }

      memo.set(node, total)
      return total
    }

    return dfs(start)
  }

  const devices = new Map
  input.split('\n').forEach((line) => {
    const [id, next] = line.split(': ')
    const path = next.split(' ')
    devices.set(id, path)
  })

  // alt. C antalet vägar från SVR -> FFT * FFT -> DAC * DAC -> OUT

  try {
    return countPaths('svr', 'fft', devices) * countPaths('fft', 'dac', devices) * countPaths('dac', 'out', devices)
  } catch (e) {
    console.error(e.message);
  }
};

const expectedSecondSolution = 517315308154944;

export { expectedFirstSolution, expectedSecondSolution, first, second };
