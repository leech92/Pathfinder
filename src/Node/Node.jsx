import React from "react";
import './Node.css'

class Node extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { start, end, row, col, wall, press, continuePress, stopPress } = this.props
        const specialTile = start 
            ? 'starting-node'
            : end
            ? 'ending-node'
            : wall
            ? 'wall-node'
            : ''

        return (
            <div 
                className={`node ${specialTile}`}
                id={`node-${row}-${col}`}
                press={() => press(row, col)}
                continuePress={() => continuePress(row, col)}
                stopPress={() => stopPress()}>
            </div>
        )
    } 
}

export default Node