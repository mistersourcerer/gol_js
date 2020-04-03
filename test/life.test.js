import life from 'life'

describe('grid', () => {
  test('creates an empty grid of width(param) by height(param)', () => {
    expect(life.grid(5, 5)).toEqual([
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false]
    ])
  })
})

describe('spawn', () => {
  test('spawns a new cell on a given coordinate on a grid', () => {
    let grid = life.grid(5, 2)
    grid = life.spawn(grid, 2, 0)
    grid = life.spawn(grid, 2, 1)

    expect(grid).toEqual([
      [false, false, true, false, false],
      [false, false, true, false, false]
    ])
  })
})

describe('neighbors', () => {
  test('recognizes alive neighbors for a coordinate on the grid', () => {
    const grid = life.spawn(life.grid(5, 5), 2, 2)
    expect(life.neighbors(grid, 2, 2)).toBe(0)

    // all possible neighboring positions
    expect(life.neighbors(life.spawn(grid, 1, 1), 2, 2)).toBe(1)
    expect(life.neighbors(life.spawn(grid, 1, 2), 2, 2)).toBe(1)
    expect(life.neighbors(life.spawn(grid, 1, 3), 2, 2)).toBe(1)
    expect(life.neighbors(life.spawn(grid, 2, 1), 2, 2)).toBe(1)
    expect(life.neighbors(life.spawn(grid, 2, 3), 2, 2)).toBe(1)
    expect(life.neighbors(life.spawn(grid, 3, 1), 2, 2)).toBe(1)
    expect(life.neighbors(life.spawn(grid, 3, 2), 2, 2)).toBe(1)
    expect(life.neighbors(life.spawn(grid, 3, 3), 2, 2)).toBe(1)
  })

  test('recognizes multiple neighbors for a coordinate on the grid', () => {
    let grid = life.spawn(life.grid(5, 5), 2, 2)
    grid = life.spawn(grid, 1, 1)
    grid = life.spawn(grid, 1, 2)
    grid = life.spawn(grid, 1, 3)

    expect(life.neighbors(grid, 2, 2)).toBe(3)
  })

  test('does not consider the cell itself a neighbor', () => {
    let grid = life.spawn(life.grid(3, 3), 1, 0)
    grid = life.spawn(grid, 1, 1)

    expect(life.neighbors(grid, 1, 0)).toBe(1)
  })

  describe('grid edge', () => {
    test('does not go bananas if neighbors would be on a negative coord', () => {
      let grid = life.spawn(life.grid(3, 3), 1, 1)
      grid = life.spawn(grid, 1, 2)

      expect(life.neighbors(grid, 1, 1)).toBe(1)
    })

    test('does not go bananas if neighbors would be "out of bounds"', () => {
      let grid = life.spawn(life.grid(3, 3), 2, 2)
      grid = life.spawn(grid, 1, 2)

      expect(life.neighbors(grid, 2, 2)).toBe(1)
    })
  })
})

describe('nextGen', () => {
  test('cell dies when has fewer than two neighbors', () => {
    // X O X
    // X O X
    // X X X
    let grid = life.spawn(life.grid(3, 3), 1, 0)
    grid = life.spawn(grid, 1, 1)

    // X X X
    // X X X
    // X X X
    expect(life.nextGen(grid)).toEqual([
      [false, false, false],
      [false, false, false],
      [false, false, false]
    ])
  })

  test('cell survives when two neighbors exist', () => {
    // two neighbors
    // O O X X
    // X X O X
    let grid = life.spawn(life.grid(4, 2), 0, 0)
    grid = life.spawn(grid, 1, 0)
    grid = life.spawn(grid, 2, 1)

    // X O X X
    // X O X X -> given birth for having 3 neighbors
    expect(life.nextGen(grid)).toEqual([
      [false, true, false, false],
      [false, true, false, false]
    ])
  })

  test('cell survives when three neighbors exist', () => {
    let grid = life.spawn(life.grid(4, 2), 1, 0)
    grid = life.spawn(grid, 2, 0)
    grid = life.spawn(grid, 1, 1)
    grid = life.spawn(grid, 2, 1)

    // X O O X
    // X O O X
    expect(life.nextGen(grid)).toEqual([
      [false, true, true, false],
      [false, true, true, false]
    ])
  })

  test('generates the blinker', () => {
    // Let's use the blinker for this test
    // X O X
    // X O X
    // X O X
    let grid = life.spawn(life.grid(3, 3), 1, 0)
    grid = life.spawn(grid, 1, 1)
    grid = life.spawn(grid, 1, 2)

    // X X X
    // O O O
    // X X X
    expect(life.nextGen(grid)).toEqual([
      [false, false, false],
      [true, true, true],
      [false, false, false]
    ])
  })
})

describe('population', () => {
  test('counts how many live cells exist on a given grid', () => {
    const grid = [
      [false, false, false],
      [true, true, true],
      [false, false, false]
    ]

    expect(life.population(grid)).toBe(3)
  })
})
