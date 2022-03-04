import React from "react";
import Node from '../Node/Node'
import { dijkstras, getShortestPath } from "../algorithms/dijkstras";
import './Pathfinder.css'

let startRow = 8
let endRow = 16
let startCol = 8
let endCol = 16

const createGrid = () => {
    const grid = []
        for (let row = 0; row < 25; row++) {
            let currRow = []
            for (let col = 0; col < 25; col++) {
                currRow.push({
                    col,
                    row,
                    start: row === startRow && col === startCol,
                    end: row === endRow && col === endCol,
                    distance: Infinity,
                    visited: false,
                    wall: false,
                    weight: 0,
                    previous: null
                })
            }
            grid.push(currRow)
        }
    return grid
}

const updateGrid = (grid, row, col, type) => {
    const updatedGrid = grid
    const node = updatedGrid[row][col]
    if (!node.start && !node.end && !node.wall) {
        if (type === "wall" && node.weight === 0) {
            const updatedNode = updateWall(node)
            updatedGrid[row][col] = updatedNode
            return updatedGrid
        }else if (type === "weight") {
            const updatedNode = updateWeight(node)
            updatedGrid[row][col] = updatedNode
            return updatedGrid
        }else if (type === "start") {
            updatedGrid[startRow][startCol].start = false
            startRow = row
            startCol = col
            const updatedNode = updateStart(node)
            updatedGrid[row][col] = updatedNode
            return updatedGrid
        }else if (type === "end") {
            updatedGrid[endRow][endCol].end = false
            endRow = row
            endCol = col
            const updatedNode = updateEnd(node)
            updatedGrid[row][col] = updatedNode
            return updatedGrid
        }else {
            return updatedGrid
        }
    }else {
        return updatedGrid
    }
}

const updateWall = node => {
    return {
        ...node,
        wall: !node.wall
    } 
}

const updateWeight = node => {
    if (node.weight === 2) {
        return {
            ...node,
            weight: 0
        }
    }else {
        return {
            ...node,
            weight: node.weight + 1
        }
    }
}

const updateStart = node => {
    return {
        ...node,
        start: true
    }
}

const updateEnd = node => {
    return {
        ...node,
        end: true
    }
} 

class Pathfinder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            grid: [],
            mouseActive: false,
            wallActive: true,
            weightActive: false,
            startActive: false,
            endActive: false
        }
    }

    componentDidMount() {
        const grid = createGrid()
        this.setState({grid})
        document.body.addEventListener('keydown', (e) => {
            if (e.key === 'w' || e.key === 'h' || e.key === 's' || e.key === 'e') {
                this.setState({wallActive: false})
                this.setState({weightActive: false})
                this.setState({startActive: false})
                this.setState({endActive: false})
            }
            if (e.key === 'w') this.setState({wallActive: true})
            if (e.key === 'h') this.setState({weightActive: true})
            if (e.key === 's') this.setState({startActive: true})
            if (e.key === 'e') this.setState({endActive: true})
        })
    }

    mouseStart(row, col) {
        let type = ""
        if (this.state.wallActive) type = "wall"
        if (this.state.weightActive) type = "weight"
        if (this.state.startActive) type = "start"
        if (this.state.endActive) type = "end"

        const updatedGrid = updateGrid(this.state.grid, row, col, type)
        this.setState({grid: updatedGrid,
                       mouseActive: true
        })
    }

    mouseDrag(row, col) {
        if (!this.state.mouseActive) return;

        let type = ""
        if (this.state.wallActive) type = "wall"
        if (this.state.weightActive) type = "weight"
        if (this.state.startActive) type = "start"
        if (this.state.endActive) type = "end"

        const updatedGrid = updateGrid(this.state.grid, row, col, type)
        this.setState({grid: updatedGrid})
    }

    mouseStop() {
        this.setState({mouseActive: false})
    }

    startDijkstras() {
        const { grid } = this.state
        const start = grid[startRow][startCol]
        const end = grid[endRow][endCol]
        const visitedNodes = dijkstras(grid, start, end)
        const shortestPath = getShortestPath(end)
        this.showDijkstras(visitedNodes, shortestPath)
    }

    showDijkstras(visitedNodes, shortestPath) {
        for (let i = 0; i <= visitedNodes.length; i++) {
            if (i === visitedNodes.length) {
                setTimeout(() => {
                    for (let j = 0; j < shortestPath.length; j++) {
                        setTimeout(() => {
                            const node = shortestPath[j]
                            if (!node.start && !node.end) {
                                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path'
                            }
                        }, j * 50)
                    }
                }, i * 25)
                return;
            }
            setTimeout(() => {
                const node = visitedNodes[i]
                if (!node.start && !node.end) {
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node visited-node'
                }
            }, i * 25)
        }
    }

    showActive() {
        if (this.state.wallActive) return "Wall"
        if (this.state.weightActive) return "Weight"
        if (this.state.startActive) return "Start"
        if (this.state.endActive) return "End"
    }

    render() {
        const { grid } = this.state

        return (
            <div className="page">
                <div className="header">
                    <button className="dij-button" onClick={() => this.startDijkstras()}>Start Dijkstra's Algorithm</button>
                    <div className="node-info">
                        <div>
                            <p>Start Node</p>
                            <div className="start-box"></div>
                        </div>
                        <div>
                            <p>End Node</p>
                            <div className="end-box"></div>
                        </div>
                        <div>
                            <p>Wall Node</p>
                            <div className="black-box"></div>
                        </div>
                        <div>
                            <p>Weight One Node</p>
                            <div className="grey-box"></div>
                        </div>
                        <div>
                            <p>Weight Two Node</p>
                            <div className="dark-grey-box"></div>
                        </div>
                    </div>
                    <p className="active">{this.showActive()} Active</p>
                    <button className="reset-button" onClick={() => window.location.reload()}>Reset</button>
                </div>
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                        <div key={rowIdx} className="row">
                            {row.map((node, nodeIdx) => {
                                const { start, end, row, col, wall, weight } = node
                                return (
                                    <Node 
                                        key={nodeIdx} 
                                        start={start} 
                                        end={end}
                                        row={row}
                                        col={col}
                                        wall={wall}
                                        weight={weight}
                                        onMouseDown={(row, col) => this.mouseStart(row, col)}
                                        onMouseEnter={(row, col) => this.mouseDrag(row, col)}
                                        onMouseUp={() => this.mouseStop()}>
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