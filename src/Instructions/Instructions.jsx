import React from "react";
import './Instructions.css'

const Instructions = ({ show, handleClose}) => {
    const showHide = show ? "modal show" : "modal hide"

    return (
        <div className={showHide}>
            <div className="instructions">
                <h1 className="instructions-title">Pathfinding Visualizer Instructions</h1>
                <p className="instructions-body">
                    This Pathfinding Visualizer uses Dijkstras algorithm to find the quickest path from the start tile to the end tile.
                    Each movement has a cost of one and the only moves are up, down, left, and right. You are able to move the start
                    and end tiles by clicking and dragging the markers. You can also place walls and weights on tiles by clicking and dragging. Each
                    click of a weight tile will add one to the weight and can go up to a max of two. If you add a weight at two it will reset back to one.
                    The clicking functionality is toggled by pressing a certain key. The "Currently Seleted Node" on the header will let
                    you know what is currently active. The node descriptions show which key will toggle which node to be active.
                </p>
                <button className="close-button" onClick={handleClose}>Close Instructions</button>
            </div>
        </div>
    )
}

export default Instructions