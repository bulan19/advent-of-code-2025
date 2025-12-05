
const first = (input: string) => {

  let parts = input
    .split('\n\n')

  const fresh_ranges = parts[0]
    .split('\n')
    .map((str) => {
      let parts = str.split('-')
      return {
        first: Number(parts[0]),
        last: Number(parts[1])
      }
    })

  return parts[1].split('\n').map(Number).reduce((fresh, id) => {
    for (let i = 0; i < fresh_ranges.length; i++) {
      if (fresh_ranges[i].first <= id && fresh_ranges[i].last >= id) return ++fresh
    }
    return fresh
  }, 0)

};

const expectedFirstSolution = 798;

const second = (input: string) => {

  const fresh_ranges = input
    .split('\n\n')[0]
    .split('\n')
    .map((str) => {
      let parts = str.split('-')
      return {
        first: Number(parts[0]),
        last: Number(parts[1])
      }
    })

  fresh_ranges.sort((a, b) => { return a.first - b.first })
  
  const no_overlap = new Array
  fresh_ranges.forEach((current) => {
    for (let i = 0; i < no_overlap.length; i++) {
      if (no_overlap[i].last >= current.first) {
        if(no_overlap[i].last < current.last) no_overlap[i].last = current.last
        return
      }
    }
    no_overlap.push(current)
  }, 0)

  return no_overlap.reduce((total, range) => {
    return total += range.last - range.first + 1
  }, 0)
};

const expectedSecondSolution = 366181852921027;

export { expectedFirstSolution, expectedSecondSolution, first, second };
