import React from "react";
import Node from '../Node/Node'
import { dijkstras, getNodesInShortestPathOrder } from "../algorithms/dijkstras";
import './Pathfinder.css'

const startRow = 0
const endRow = 3
const startCol = 0
const endCol = 3

const createGrid = () => {
    const grid = []
        for (let row = 0; row < 5; row++) {
            let currRow = []
            for (let col = 0; col < 5; col++) {
                currRow.push({
                    col,
                    row,
                    start: row === startRow && col === startCol,
                    end: row === endRow && col === endCol,
                    distance: Infinity,
                    visited: false,
                    wall: false,
                    previous: null
                })
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

    handleContinuePress(row, col) {
        if (!this.state.active) return;
        const updatedGrid = updateGrid(this.state.grid, row, col)
        this.setState({grid: updatedGrid})
    }

    handleStopPress() {
        this.setState({active: false})
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
                                const { start, end, row, col, wall } = node
                                return (
                                    <Node 
                                        key={nodeIdx} 
                                        start={start} 
                                        end={end}
                                        row={row}
                                        col={col}
                                        wall={wall}
                                        active={active}
                                        press={(row, col) => this.handlePress(row, col)}
                                        continuePress={(row, col) => this.handleContinuePress(row, col)}
                                        stopPress={() => this.stopPress()}>
                                    </Node>
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