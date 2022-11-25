import React from 'react'
import './ScrollDownArrow.css'

const ScrollDownArrow = () => (
    <div className="mouse_scroll">
        <div className="mouse">
            <div className="wheel"></div>
        </div>
        <div>
            <span className="m_scroll_arrows unu"></span>
            <span className="m_scroll_arrows doi"></span>
            <span className="m_scroll_arrows trei"></span>
        </div>
    </div>
    // <div className="field">
    //     <div className="arrow"></div>
    // </div>
)

export default ScrollDownArrow;