import React from "react";

class Node extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="node">
                Hello Node
            </div>
        )
    } 
}

export default Node