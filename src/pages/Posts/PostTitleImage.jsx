import React from "react";
import { useHistory } from 'react-router-dom';
import { primaryColor } from "../utility";

const PostTitleImage = ({ post, index, isLargeMobileLandscape, setLastViewedSection }) => {
    const history = useHistory();
    return (
        <div style={{ padding: 0, zIndex: 1 }} className="col-12 col-sm-6">

            <div className={`post-image-${index + 1}`}
                style={{ background: "#cc9764" }}>
                {/* <div
                    onClick={() => {
                        if (!post.content) return
                        history.push(`/post/${post.id}`)
                    }}
                    style={{
                        height:isLargeMobileLandscape ? 100 : 250,
                        background: `url('${post.image}') center center / cover no-repeat`,
                        cursor: 'pointer',
                    }}
                /> */}
                {!!post.image ? <img
                    src={post.image}
                    onClick={() => {
                        if (!post.content) return
                        setLastViewedSection('posts')
                        history.push(`/post/${post.id}`)
                    }}
                    style={{
                        height: isLargeMobileLandscape ? 100 : 250,
                        cursor: 'pointer',
                        width: '100%',
                        objectFit: 'cover'
                    }}
                /> : <div style={{cursor:'pointer', background: 'rgb(195 132 71)', height: isLargeMobileLandscape ? 100 : 250, width: '100%' }} onClick={() => {
                    if (!post.content) return
                    setLastViewedSection('posts')
                    history.push(`/post/${post.id}`)
                }} />}
            </div>

        </div>
    );
};

export default PostTitleImage;
