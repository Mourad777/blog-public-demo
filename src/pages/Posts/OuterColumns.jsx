import React from "react"
import { primaryColor } from "../utility";

export default ({ isLeft,isLargeMobileLandscape }) => (
    <div
        style={{
            flexGrow: 3
            // border: "1px solid green"
        }}
    >
        <div className="row" style={{ height: 330 }}>
            <div
                className="col-1"
                style={{
                    background: primaryColor,
                    height: "100%",
                    padding: 0
                }}
            />
            <div
                className="col-8"
                style={{
                    // background: primaryColor,
                    padding: 0,
                    height: "100%"
                }}
            >
                <div
                    style={{
                        height: 100,
                        backgroundColor: primaryColor
                    }}
                ></div>
                <div
                    style={{
                        height:isLeft ? 120 : 220 ,
                        backgroundColor: `rgb(229, 170, 112,${isLargeMobileLandscape ? 1 : 0.8})`
                    }}
                ></div>
                <div
                    style={{
                        height:isLeft ? 111 : 11,
                        backgroundColor: primaryColor
                    }}
                ></div>
            </div>

            <div
                className="col-3"
                style={{
                    background: primaryColor,
                    height: "100%",
                    padding: 0
                }}
            />
        </div>
        <div className="row" style={{ 
            // height: 730 
            height: '100%'
            }}>
            <div
                className={isLeft ?"col-2" : "col-4"}
                style={{
                    background: primaryColor,
                    height: "100%",
                    padding: 0
                }}
            />
            <div
                className={isLeft ?"col-8" : "col-7"}
                style={{
                    // background: primaryColor,

                    height: "100%",
                    padding: 0
                }}
            >
                <div
                    style={{
                        height:isLeft ?  100 : 200,
                        backgroundColor: primaryColor
                    }}
                ></div>
                <div
                    style={{
                        height:isLeft ? 200 : 100,
                        backgroundColor: `rgb(229, 170, 112,${isLargeMobileLandscape ? 1 : 0.8})`
                    }}
                ></div>
                <div
                    style={{
                        // height: 430,
                        height: '100%',
                        backgroundColor: primaryColor
                    }}
                ></div>
            </div>

            <div
                className={isLeft ?"col-2" : "col-1"}
                style={{
                    background: primaryColor,
                    height: "100%",
                    padding: 0
                }}
            />
        </div>
    </div>
);
