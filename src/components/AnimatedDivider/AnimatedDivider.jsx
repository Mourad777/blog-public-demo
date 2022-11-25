import React, { Fragment } from 'react'
import { BlogContext } from '../..';
import { dashedLineOne } from '../../pages/svgs';

const AnimatedDivider = ({ isAnimating, imgPath, isBlue, widthFactor = 1, offsetImageVertical = 0 }) => (
    <BlogContext.Consumer>
        {({ isPageLoaded, isLargeMobileLandscape, winSize }) => (
            <Fragment>
                {!isLargeMobileLandscape && (
                    <Fragment>
                        <svg
                            style={{
                                position: 'absolute',
                                bottom: winSize === 1 ? 56 : 0,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 1000,
                                pointerEvents: 'none',
                                zIndex:1,
                            }}
                            viewBox="70 -20 300 50"
                        >
                            <defs>
                                <mask id="line-1-mask">
                                    <path
                                        style={{ stroke: "white", strokeWidth: 3 }}
                                        strokeDasharray={5}
                                        strokeLinecap="round"
                                        d={dashedLineOne}
                                    />
                                </mask>
                            </defs>
                            <g><path
                                style={{
                                    fill: 'transparent',
                                    strokeDasharray: 250,
                                    strokeDashoffset: isAnimating && isPageLoaded ? 0 : -250,
                                    transition: 'all 2s linear',
                                    stroke: isBlue ? "#9b0808" : '#fff',
                                    strokeWidth: -1,
                                    strokeMiterlimit: 10,
                                }}
                                mask="url(#line-1-mask)" d={dashedLineOne} /></g>
                        </svg>
                        <img
                            style={{
                                position: 'absolute',
                                bottom: winSize === 1 ? 56 + offsetImageVertical : 0 + offsetImageVertical,
                                left: '50%',
                                transform: isAnimating && isPageLoaded ? 'translateX(-50%) rotate(700deg)' : 'translateX(-600%) rotate(0deg)',
                                opacity: isAnimating && isPageLoaded ? 1 : 0,
                                transition: 'all 2s linear',
                                width: 80 * widthFactor,
                                pointerEvents: 'none',
                                zIndex:1,
                            }}
                            // className={isAnimating && isPageLoaded ? 'ball-appear' : 'ball-dissappear'}
                            src={imgPath} />
                        <svg
                            style={{
                                position: 'absolute',
                                bottom: winSize === 1 ? 30 : -30,
                                right: '50%',
                                transform: 'translateX(50%)',
                                width: 1000,
                                pointerEvents: 'none',
                                zIndex:1,
                            }}
                            viewBox="-160 -20 300 50"
                        ><g>
                                <defs>
                                    <mask id="line-2-mask">
                                        <path
                                            style={{ stroke: "white", strokeWidth: 3 }}
                                            strokeDasharray={5}
                                            strokeLinecap="round"
                                            d={dashedLineOne}
                                        />
                                    </mask>
                                </defs>
                                <path
                                    mask="url(#line-2-mask)"
                                    d={dashedLineOne}
                                    style={
                                        {
                                            fill: 'transparent',
                                            strokeDasharray: 250,
                                            transition: 'all 2s linear',
                                            // transitionDelay: '3s',
                                            strokeDashoffset: isAnimating && isPageLoaded ? 0 : 250,
                                            stroke: isBlue ? "#9b0808" : '#fff',
                                            strokeWidth: -1,
                                            strokeMiterlimit: 10,
                                        }
                                    } /></g>
                        </svg>
                    </Fragment>
                )}
            </Fragment>
        )}
    </ BlogContext.Consumer >
)

export default AnimatedDivider;