import React from "react";
import moment from "moment";
import { primaryColor } from "../utility";
const PostText = ({ post, isMobile, index, isLargeMobileLandscape }) => {

    return (
        <div
            className="col-12 col-sm-6"
            style={{ display: "flex", padding: 0 }}
        >
            <div
                className={`post-text-${index + 1}`}
                style={{
                    width: "100%",
                    // background: "rgba(218, 173, 134,0.8)",
                    background: primaryColor,
                    opacity: 0.8,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: isLargeMobileLandscape ? 100 : isMobile ? 'calc(100vh - 461px)' : 200,
                    minWidth: isMobile ? '' : 478,
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        color: "white",
                        // width: "80%",
                        padding: 5,
                        textAlign: isMobile ? 'center' : '',
                        zIndex: 2,
                        fontSize: 16,
                        background: 'transparent !important',
                        position: 'absolute',
                        top: isLargeMobileLandscape ? 5 : 30,
                        left: isLargeMobileLandscape ? '5%' : !isMobile ? '20%' : '',
                        transform: isLargeMobileLandscape ? 'translateX(-5%)' : !isMobile ? 'translateX(-20%)' : '',
                        textAlign: 'center',
                        maxWidth: 170,
                    }}

                >
                    <div >
                        {!!post.title && <p style={{ fontWeight: 'bold', fontSize: isLargeMobileLandscape ? '1em' : '1.2em', fontFamily: 'Mulish' }}>{post.title}</p>}
                        {!!post.created_at && (
                            <p style={{ fontStyle: 'italic', fontFamily: 'Mulish', fontSize: '0.7em', color: 'rgb(251,251,251)', }}>
                                {!!post.date_written ? moment(new Date(post.date_written).getTime()).format("MMMM DD YYYY") :  moment(new Date(post.created_at).getTime()).format("MMMM DD YYYY")}
                            </p>
                        )}
                        {(!isLargeMobileLandscape && !!post.summary) && (
                            <p style={{ fontSize: '0.8em', fontFamily: 'Mulish' }}>
                                {`${post.summary.substring(0, 100)} ${post.summary.length > 99 ? '...' : ''}`}
                            </p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PostText;
