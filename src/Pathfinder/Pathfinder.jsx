import React from "react";
import Node from './Node/Node'

class Pathfinder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                Hello Pathfinder
                <Node></Node>
            </div>
        )
    }
}

export default Pathfinder