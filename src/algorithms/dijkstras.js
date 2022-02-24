export function dijkstras(grid, start, end) {
    if (!start || !end || start === end) {
        return false
    }

    start.distance = 0
    const visitedNodesInOrder = []
    const unvisitedNodes = []
    for (const row of grid) {
        for (const node of row) {
            unvisitedNodes.push(node)
        }
    }
    while (unvisitedNodes.length) {
        sortNodes(unvisitedNodes)
        const closestNode = unvisitedNodes.shift()
        if (closestNode.wall) continue
        if (closestNode.distance === Infinity) return visitedNodesInOrder
        closestNode.visited = true
        visitedNodesInOrder.push(closestNode)
        if (closestNode === end) return visitedNodesInOrder
        updateNeighbors(closestNode, grid)
    }
}

function sortNodes(unvisitedNodes) {
    unvisitedNodes.sort((node1, node2) => {
        return(node1.distance - node2.distance)
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
        return(!neighbor.visited)
    })
}

export function getNodesInShortestPathOrder(end) {
    const nodesInShortestPathOrder = []
    let currNode = end
    while (currNode !== null) {
        nodesInShortestPathOrder.unshift(currNode)
        currNode = currNode.previous
    }
    return nodesInShortestPathOrder
}