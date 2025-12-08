type box = { x: number, y: number, z: number }
type distance = { a: box, b: box, distance: number }

const first = (input: string) => {

  const boxes = input.split('\n').map((val) => {
    const dimensions = val.split(',')
    return {
      x: Number(dimensions[0]),
      y: Number(dimensions[1]),
      z: Number(dimensions[2])
    }
  })

  const distances: distance[] = []

  for (let a = 0; a < boxes.length; a++) {
    for (let b = a + 1; b < boxes.length; b++) {
      distances.push({
        a: boxes[a],
        b: boxes[b],
        distance: dist(boxes[a], boxes[b])
      })
    }
  }

  distances.sort((a, b) => a.distance - b.distance)

  const circuits: any[] = []

  for (let index = 0; index < 1000; index++) {
    const distance = distances[index]

    const a = connectedToCircuit(distance.a, circuits)
    const b = connectedToCircuit(distance.b, circuits)

    if (!a.length && !b.length) {
      circuits.push([distance.a, distance.b])
      continue
    }

    if (a.length && b.length) {
      if (a === b) continue // samma circuit redan
      // slå ihop
      const join = circuits[Number(b)]
      for (let index = 0; index < join.length; index++) {
        circuits[Number(a)].push(join[index])
      }
      // delete
      circuits.splice(Number(b), 1)
      continue
    }

    if (a.length) {
      circuits[Number(a)].push(distance.b)
    }

    if (b.length) {
      circuits[Number(b)].push(distance.a)
    }

  }

  circuits.sort((a, b) => b.length - a.length)

  let sum = 1
  circuits.splice(0, 3).forEach((circuit, index) => {
    sum *= circuit.length
  })
  return sum
};

function connectedToCircuit(box: box, circuits: any[]): string {
  for (let index = 0; index < circuits.length; index++) {
    const circuit = circuits[index];
    if (circuit.find((x) => x == box)) return index.toString()
  }
  return ""
}

function dist(a: box, b: box): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

const expectedFirstSolution = 115885;

const second = (input: string) => {
    const boxes = input.split('\n').map((val) => {
    const dimensions = val.split(',')
    return {
      x: Number(dimensions[0]),
      y: Number(dimensions[1]),
      z: Number(dimensions[2])
    }
  })

  const distances: distance[] = []

  for (let a = 0; a < boxes.length; a++) {
    for (let b = a + 1; b < boxes.length; b++) {
      distances.push({
        a: boxes[a],
        b: boxes[b],
        distance: dist(boxes[a], boxes[b])
      })
    }
  }

  distances.sort((a, b) => a.distance - b.distance)

  const circuits: any[] = []

  let last_distance

  for (let index = 0; index < distances.length; index++) {
    const distance = distances[index]

    const a = connectedToCircuit(distance.a, circuits)
    const b = connectedToCircuit(distance.b, circuits)

    if (!a.length && !b.length) {
      circuits.push([distance.a, distance.b])
      continue
    }

    if (a.length && b.length) {
      if (a === b) continue // samma circuit redan
      // slå ihop
      const join = circuits[Number(b)]
      for (let index = 0; index < join.length; index++) {
        circuits[Number(a)].push(join[index])
      }
      // delete
      circuits.splice(Number(b), 1)
      continue
    }

    if (a.length) {
      circuits[Number(a)].push(distance.b)
    }

    if (b.length) {
      circuits[Number(b)].push(distance.a)
    }

    last_distance = distance
    
  }

  return last_distance?.a.x * last_distance?.b.x
};

const expectedSecondSolution = 274150525;

export { expectedFirstSolution, expectedSecondSolution, first, second };
