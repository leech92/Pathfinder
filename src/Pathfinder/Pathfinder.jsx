import React from "react";
import Node from '../Node/Node'
import { dijkstras } from "../algorithms/dijkstras";
import './Pathfinder.css'

const startRow = 0
const endRow = 0
const startCol = 3
const endCol = 3

const createGrid = () => {
    const grid = []
        for (let row = 0; row < 5; row++) {
            let currRow = []
            for (let col = 0; col < 5; col++) {
                currRow.push(currNode)
            }
            grid.push(currRow)
        }
    return grid
}

const updateGrid = (grid, row, col) => {
    const updatedGrid = grid.slice()
    const node = updatedGrid[row][col]
    const updatedNode = {
        ...node,
        wall: !node.wall
    }
    updatedGrid[row][col] = updatedNode
    return updatedGrid
}

class Pathfinder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            grid: [],
            active: false
        }
    }

    componentDidMount() {
        const grid = createGrid()
        this.setState({grid})
    }

    handlePress(row, col) {
        const updatedGrid = updateGrid(this.state.grid, row, col)
        this.setState({grid: updatedGrid,
                       active: true
        })
    }

    startDijkstras() {
        const { grid } = this.state
        const start = grid[startRow][startCol]
        const end = grid[endRow][endCol]
        const visitedNodesInOrder = dijkstras(grid, start, end)
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(end)
        this.animateDijkstras(visitedNodesInOrder, nodesInShortestPathOrder)
    }

    render() {
        const { grid, active } = this.state

        return (
            <div className="page">
                <button className="pathfinder-button" onClick={() => this.startDijkstras}>Start Dijkstra's Algorithm</button>
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const { start, end } = node
                                return (
                                    <Node key={nodeIdx} start={start} end={end}></Node>
                                )
                            })}
                        </div>
                        )
                    })}
                </div>
            </div>
            
        )
    }
}

export default Pathfinder