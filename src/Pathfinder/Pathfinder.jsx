import React from "react";
import Node from '../Node/Node'
import { dijkstras } from "../algorithms/dijkstras";
import './Pathfinder.css'

const startRow = 0
const endRow = 0
const startCol = 3
const endCol = 3

class Pathfinder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            grid: []
        }
    }

    const set

    componentDidMount() {
        const grid = []
        for (let row = 0; row < 5; row++) {
            let currRow = []

            for (let col = 0; col < 5; col++) {
                let currNode = {
                    col,
                    row,
                    start: row === 0 && col === 0,
                    end: row === 3 && col === 3
                }
                currRow.push(currNode)
            }
            grid.push(currRow)
        }
        this.setState({grid})
    }

    visualDijkstras() {
        const { grid } = this.state
        const start = grid[]
    }

    render() {
        const { grid } = this.state

        return (
            <div className="page">
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