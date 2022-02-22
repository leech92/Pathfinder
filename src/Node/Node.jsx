import React from "react";
import './Node.css'

class Node extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { start, end } = this.props
        const specialTile = start 
            ? 'starting-node'
            : end
            ? 'ending-node' 
            : ''

        return (
            <div className={`node ${specialTile}`}></div>
        )
    } 
}

export default Node