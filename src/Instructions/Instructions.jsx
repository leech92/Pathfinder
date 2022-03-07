import React from "react";
import './Instructions.css'

const Instructions = ({ show, handleClose}) => {
    const showHide = show ? "modal show" : "modal hide"

    return (
        <div className={showHide}>
            <div className="instructions">
                <div>HELLO I AM A MODAL</div>
                <button onClick={handleClose}>Close Modal</button>
            </div>
        </div>
    )
}

export default Instructions