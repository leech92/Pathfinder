const node = {
    row,
    col,
    visited,
    distance
}

export function dijkstras(grid, start, end) {
    if (!start || !end || start === end) {
        return false
    }

    grid[start].distance = 0
    const unvisitedNodes = grid.slice()
    while (unvisitedNodes.length) {
        sortNodes(unvisitedNodes)
        const closestNode = unvisitedNodes.unshift()
        closestNode.visited = true
        
        if (closestNode === end) {
            return 'success'
        }

        updateNeighbors(closestNode, grid)
    }
}

function sortNodes(unvisitedNodes) {
    unvisitedNodes.sort((node1, node2) => {
        node1.distance - node2.distance
    })
}

function updateNeighbors(node, grid) {
    const neighbors = getNeighbors(node, grid)
    for (const neighbor of neighbors) {
        neighbor.distance = node.distance + 1
    }
}

function getNeighbors(node, grid) {
    const neighbors = []
    const {col, row} = node
    if (row > 0) neighbors.push(grid[row-1][col])
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
    if (col > 0) neighbors.push(grid[row][col + 1])
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])

    return neighbors.filter(neighbor => {
        !neighbor.visited
    })
}