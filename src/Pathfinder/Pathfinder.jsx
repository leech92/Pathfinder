import React from "react";
import Node from '../Node/Node'
import { dijkstras, getNodesInShortestPathOrder } from "../algorithms/dijkstras";
import './Pathfinder.css'

const startRow = 3
const endRow = 8
const startCol = 3
const endCol = 8

const createGrid = () => {
    const grid = []
        for (let row = 0; row < 15; row++) {
            let currRow = []
            for (let col = 0; col < 15; col++) {
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
        this.startDijkstras = this.startDijkstras.bind(this)
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

    handleDrag(row, col) {
        if (!this.state.active) return;
        const updatedGrid = updateGrid(this.state.grid, row, col)
        this.setState({grid: updatedGrid})
    }

    handleStop() {
        this.setState({active: false})
    }

    startDijkstras() {
        const { grid } = this.state
        const start = grid[startRow][startCol]
        const end = grid[endRow][endCol]
        const visitedNodes = dijkstras(grid, start, end)
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(end)
        this.animateDijkstras(visitedNodes, nodesInShortestPathOrder)
    }

    animateDijkstras(visitedNodes, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodes.length; i++) {
            if (i === visitedNodes.length) {
                setTimeout(() => {
                    for (let j = 0; j < nodesInShortestPathOrder.length; j++) {
                        setTimeout(() => {
                            const node = nodesInShortestPathOrder[j]
                            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path'
                        }, j * 50)
                    }
                }, i * 25)
                return;
            }
            setTimeout(() => {
                const node = visitedNodes[i]
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node visited-node'
            }, i * 25)
        }
    }

    render() {
        const { grid } = this.state

        return (
            <div className="page">
                <button className="pathfinder-button" onClick={() => this.startDijkstras()}>Start Dijkstra's Algorithm</button>
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
                                        onMouseDown={(row, col) => this.handlePress(row, col)}
                                        onMouseEnter={(row, col) => this.handleDrag(row, col)}
                                        onMouseUp={() => this.handleStop()}>
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