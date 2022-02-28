import React from "react";
import './Node.css'

class Node extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { start, end, row, col, wall, weight, onMouseDown, onMouseEnter, onMouseUp } = this.props

        const changeTile = start 
            ? 'starting-node'
            : end
            ? 'ending-node'
            : wall
            ? 'wall-node'
            : weight === 2
            ? 'big-weight-node'
            : weight === 1
            ? 'small-weight-node'
            : ''

        return (
            <div 
                className={`node ${changeTile}`}
                id={`node-${row}-${col}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp()}>
            </div>
        )
    } 
}

export default Node