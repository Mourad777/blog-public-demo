import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/all';
import ReactPlayer from 'react-player'
import { getPusher, primaryColor } from '../../utility';
import { Button } from 'semantic-ui-react'
import { getComments, getVideo, getVideos } from '../../../api/util';
import Loader from '../../../components/Loader/Loader';
import moment from 'moment';
import { StyledHeader, StyledHomeButtonWrapper, StyledPlayerWrapper, StyledSectionContainer, StyledTitle, StyledTitleWrapper, StyledVideoDescription, StyledVideoDescriptionWrapper } from './styles';
import Comments from '../../../components/Comments/Comments';

const getRelatedVideos = (currentVideo, videos) => {
    const allVideosExceptCurrent = (videos || []).filter(item => item.id !== currentVideo.id);
    const currentVideoTags = !!currentVideo.tags ? JSON.parse(currentVideo.tags) : [];
    const currentVideoCategoriesIds = (currentVideo.categories || []).map(item => {
        return item.id
    });
    const relatedVideoIds = [];
    allVideosExceptCurrent.forEach(video => {
        if (!!video.tags) {
            JSON.parse(video.tags).forEach(tag => {
                const lowerCasedTags = currentVideoTags.map(t => t.toLowerCase())
                if (lowerCasedTags.includes(tag.toLowerCase())) {
                    relatedVideoIds.push(video.id)
                }
            })

        };
        video.categories.forEach(cat => {
            if (currentVideoCategoriesIds.includes(cat.id)) {
                relatedVideoIds.push(video.id)

            }
        });

        if ((video.country === currentVideo.country) && !!video.country) {
            relatedVideoIds.push(video.id)

        }
    });

    return videos.filter((v, i) => relatedVideoIds.includes(v.id)).splice(0, 2)
}

const Video = ({ winSize }) => {
    const params = useParams();
    const history = useHistory();
    const selectedVideo = params.videoId;

    const [video, setVideo] = useState({});
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState([]);


    const getInitialData = async () => {
        await getComments(selectedVideo, 'video', setComments, setIsLoading);
        await getVideos(setVideos, setIsLoading);
        await getVideo(selectedVideo, setVideo, setIsLoading);
        }

    useEffect(() => {
        getInitialData()
        const triggers = ScrollTrigger.getAll();
        triggers.forEach(tr => {
            tr.kill()
        });

        const channel = getPusher().subscribe("my-channel");
        channel.bind("BlogUpdated", async (data) => {
            await getVideo(selectedVideo, setVideo, setIsLoading);
            await getVideos(setVideos, setIsLoading);
        });
        channel.bind("CommentsUpdated", async (data) => {
            await getComments(selectedVideo, 'video', setComments, setIsLoading);
        });
    }, [])

    if (isLoading || !video) {
        return (<div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%)' }}>
            <Loader color={primaryColor} />
        </div>
        )
    }

    return (
        <StyledSectionContainer>
            {(!!video.title) && (
                <StyledHeader>
                    <StyledTitleWrapper>
                        <StyledTitle>
                            {video.title}
                        </StyledTitle>
                    </StyledTitleWrapper>

                    {!!video.thumbnail && <img src={video.thumbnail} style={{ width: '100%', maxHeight: 400, objectFit: 'cover', position: 'absolute' }} />}
                </StyledHeader>
            )}
            <StyledHomeButtonWrapper>
                <Button content='Home' onClick={() => { history.push('/') }} />
            </StyledHomeButtonWrapper>
            <StyledPlayerWrapper>
                <ReactPlayer
                    controls
                    width="100%"
                    height="100%"
                    url={video.src}
                />
                {!!video.description && (
                    <StyledVideoDescriptionWrapper>
                        <StyledVideoDescription>
                            {video.description}
                        </StyledVideoDescription>
                    </StyledVideoDescriptionWrapper>
                )}
            </StyledPlayerWrapper>


            <Comments comments={comments} setComments={setComments} doc={video} docId={selectedVideo} isVideo={true} setIsLoading={setIsLoading} />

            <div style={{ background: '#fff', padding: 10, maxWidth: 800, margin: 'auto' }}>
                {(getRelatedVideos(video, videos).length > 1) && <h1 style={{ fontFamily: 'Mulish', textAlign: 'center' }}>Related Videos</h1>}
                {getRelatedVideos(video, videos).map(v => (
                    <div style={{ width: '100%', height: '100%', background: '#fff', maxWidth: 400, margin: 'auto' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                            padding: 10,
                            height: 400,
                            width: '100%',
                        }}>
                            <div style={{ position: 'relative', height: 200, width: '100%' }}>
                                <img onClick={() => history.push(`/video/${v.id}`)} src={v.thumbnail} style={{ objectFit: 'cover', width: '100%', height: 200, cursor: 'pointer' }} />
                            </div>
                            <div>
                                <p onClick={() => history.push(`/video/${v.id}`)} style={{ fontSize: '1.5em', textAlign: 'center', fontFamily: 'Mulish', fontWeight: 'bold', margin: 0, cursor: 'pointer' }}>
                                    {v.title}
                                </p>
                                <p style={{ fontStyle: 'italic', color: '#8b8b8b', padding: 10, textAlign: 'center' }}>
                                    {moment(new Date(v.created_at).getTime()).format("MMMM DD YYYY")}
                                </p>
                            </div>

                            <p style={{ textAlign: 'center' }}>{v.description}</p>

                            <div />
                        </div>
                    </div>
                ))}
            </div>
        </StyledSectionContainer>
    )
}

export default Video