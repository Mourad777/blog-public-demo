import React from 'react'
import { mapLine } from "../svgs";
import { getMapPosition } from '../utility';

const MapPath = ({
    winSize,
    winHeight,
    mapPathlineRef,
}) => (
    <svg
        id="mySVG"
        // preserveAspectRatio="xMidYMin meet"
        viewBox="0 0 1000 1000" preserveAspectRatio="none"
        // windowWidth={winSize}
        style={{
            width: `${getMapPosition(winSize, winHeight).width}%`,
            // paddingBottom: '42%',
            height: 'auto',
            overflow: 'visible',
            zIndex: 1,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
            display: 'block',
            margin: 'auto',
        }}
    >
        <defs>
            <mask id="dash-mask">
                <path
                    style={{ stroke: "white", strokeWidth: 6 }}
                    className="st0 mask-style"
                    strokeDasharray="15,9"
                    strokeLinecap="round"
                    d={mapLine}
                />
            </mask>
        </defs>
        <path style={{
            fill: 'none',
            strokeDashoffset: 3255,
            // strokeDashoffset: 0,
            stroke: 'rgb(132, 4, 4, 0.6)',
            strokeWidth: 2,
            strokeMiterlimit: 10,
            strokeDasharray: 3255,
            zIndex: 1,
            transition: 'all 0.3s ease-in'
        }}
            ref={mapPathlineRef}
            strokeLinecap="round"
            className="st0"
            mask="url(#dash-mask)"
            d={mapLine}
        />
    </svg >
)

export default MapPath;