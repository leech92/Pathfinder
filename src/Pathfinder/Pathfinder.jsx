import React from "react";
import Node from './Node/Node'
import './Pathfinder.css'

class Pathfinder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            grid: []
        }
    }

    componentDidMount() {
        const grid = []

        for (let row = 0; row < 5; row++) {
            let currRow = []

            for (let col = 0; col < 5; col++) {
                const currNode = {
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

    render() {
        const {grid} = this.state

        return (
            <div className="page">
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const {start, end} = node
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