export function dijkstras(grid, start, end) {
    if (!start || !end || start === end) {
        return false
    }

    start.distance = 0
    const newNodes = []
    for (const row of grid) {
        for (const node of row) {
            newNodes.push(node)
        }
    }
    const visitedNodes = []

    while (newNodes.length) {
        sortNodes(newNodes)
        let currNode = newNodes.shift()
        if (currNode.wall) continue
        if (currNode.distance === Infinity) return visitedNodes
        currNode.visited = true
        visitedNodes.push(currNode)
        if (currNode === end) return visitedNodes
        updateNextNodes(currNode, grid)
    }
}

function sortNodes(newNodes) {
    newNodes.sort((node1, node2) => {
        return(node1.distance - node2.distance)
    })
}

function updateNextNodes(node, grid) {
    const nextNodes = getNextNodes(node, grid)
    for (const nextNode of nextNodes) {
        nextNode.distance = node.distance + 1
        nextNode.previous = node
    }
}

function getNextNodes(node, grid) {
    const nextNodes = []
    const { col, row } = node
    if (row > 0) nextNodes.push(grid[row - 1][col])
    if (row < grid.length - 1) nextNodes.push(grid[row + 1][col])
    if (col > 0) nextNodes.push(grid[row][col - 1])
    if (col < grid[0].length - 1) nextNodes.push(grid[row][col + 1])

    return nextNodes.filter(nextNode => !nextNode.visited)
}

export function shortestPath(end) {
    const shortestPath = []
    let currNode = end
    while (currNode !== null) {
        nodesInShortestPathOrder.unshift(currNode)
        currNode = currNode.previous
    }
    return shortestPath
}