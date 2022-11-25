import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import _ from 'lodash';
import { Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/all';
import Photos from './Photos'
import countryCodes from '../Countries/country-codes.json';
import moment from 'moment';
import { getCategoryContent, getCountryThumbnails } from '../../api/util';
import Loader from '../../components/Loader/Loader';
import { getPusher, primaryColor } from '../utility';

function capitalize(str) {
    const capStr = str.charAt(0).toUpperCase() + str.slice(1);
    return capStr
}

const Country = ({ winSize, height }) => {
    const params = useParams();
    const countryIso = params.country;
    const selectedCategory = params.categoryId;
    const history = useHistory();
    const [posts, setPosts] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [countryThumbnails, setCountryThumbnails] = useState([])

    const getInitialData = async () => {
        if (countryIso) {
            await getCountryThumbnails(setCountryThumbnails, setIsLoading);
        }
        await getCategoryContent(countryIso, selectedCategory, setPosts, setPhotos, setVideos);
    }

    useEffect(() => {
        const triggers = ScrollTrigger.getAll();
        triggers.forEach(tr => {
            tr.kill()
        });
        getInitialData()

        const channel = getPusher().subscribe("my-channel");
        channel.bind("BlogUpdated", async (data) => {
            getInitialData()
        });
    }, []);

    let videoContainerWidth;
    if (winSize === 1) {
        videoContainerWidth = 300
    }
    if (winSize === 2) {
        videoContainerWidth = 650
    }
    if (winSize >= 3) {
        videoContainerWidth = 800
    }

    let postColumns, gridWidth;
    if (winSize > 2 && posts.length > 2) {
        postColumns = 'repeat(3, 1fr)';
        gridWidth = 800;
    }
    if (winSize === 2 || posts.length === 2) {
        postColumns = 'repeat(2, 1fr)';
        gridWidth = 650;
    }
    if (winSize === 1 || posts.length === 1) {
        postColumns = 'repeat(1, 1fr)';
        gridWidth = 300;
    }
    const countryThumbnail = (countryThumbnails.find(t => t.country === countryIso) || {}).image

    if (isLoading) {
        return (<div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%)' }}>
            <Loader color={primaryColor} />
        </div>
        )
    }
    return (
        <div style={{ height: '100%', width: '100%', background: '#ece7e2', minHeight: '100vh', paddingBottom: 20 }}>
            <div style={{ position: 'relative', width: '100%', height: 300, overflow: 'hidden' }}>
                <div style={{
                    zIndex: 1, top: 50, left: '50%', transform: 'translateX(-50%)', position: 'absolute',
                    background: 'rgb(0,0,0,0.6)',
                    borderRadius: 2,
                    padding: 20,
                    minWidth: 300,
                }}><h1 style={{ textAlign: 'center', margin: '20px 0', fontSize: winSize === 1 ? '2em' : '2.5em', fontFamily: "Mulish", color: 'white' }}>{capitalize(countryCodes[countryIso] || selectedCategory)}</h1></div>
                {(!!countryThumbnail) && <img src={countryThumbnail} style={{ width: '100%', maxHeight: 400, objectFit: 'cover', position: 'absolute' }} />}
            </div>
            <div style={{ padding: 20 }}>
                <Button content='Home' onClick={() => { history.push('/') }} />
            </div>
            {/* <p style={{ textAlign: 'center', color: primaryColor, fontSize: '4em', fontFamily: 'Mulish', paddingTop: 30 }}>{capitalize(countryCodes[countryIso] || selectedCategory)}</p> */}
            {posts.length > 0 && <div className="posts-category-container" style={{ padding: 10 }}>
                <p style={{ textAlign: 'center', color: primaryColor, fontSize: '3em', fontFamily: 'Mulish' }}>Posts</p>
                <div style={{
                    display: 'grid',
                    maxWidth: gridWidth,
                    margin: '0 auto',
                    gridGap: '3rem',
                    gridTemplateColumns: postColumns,
                }}>
                    {posts.map(p => <div key={p.title} onClick={() => history.push(`/post/${p.id}`)} style={{ borderRadius: 5, background: '#fff', height: '50vh', minHeight: 330, cursor: 'pointer', }}>
                        <div style={{ height: '25%', padding: 10 }}><p style={{
                            fontFamily: 'Mulish',
                            fontWeight: 600,
                            textAlign: 'center',
                            fontSize: '1.5em',
                            maxWidth: '100%'


                        }}
                        >{p.title}</p></div>
                        <div style={{ height: '40%', background: '#e2e2e2' }}>
                            <img src={p.image} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                        </div>
                        <span style={{ fontStyle: 'italic', color: '#8b8b8b', padding: 10, textAlign: 'center' }}>
                            {!!p.date_written ? moment(new Date(p.date_written).getTime()).format("MMMM DD YYYY") :  moment(new Date(p.created_at).getTime()).format("MMMM DD YYYY")}
                            </span>
                        <div style={{ padding: 10 }}>
                            {!!p.summary && <p style={{ fontFamily: 'Mulish' }}> {`${p.summary.substring(0, 100)} ${p.summary.length > 99 ? '...' : ''}`}</p>}
                        </div>
                    </div>)}
                </div>
            </div>}
            {
                photos.length > 0 && <div className="photo-category-container">
                    <Photos winSize={winSize} height={height} photos={photos} />
                </div>
            }
            {
                videos.length > 0 && <div className="video-category-container">
                    <p style={{ textAlign: 'center', color: primaryColor, fontSize: '3em', fontFamily: 'Mulish', paddingTop: 30 }}>Videos</p>
                    <div>
                        {videos.map(v =>
                        (<div key={`video[${v.id}]`} style={
                            {
                                background: '#fff',
                                alignItems: 'center',
                                display: 'flex', flexDirection: winSize === 1 ? 'column' : 'row',
                                borderRadius: 5,
                                maxWidth: videoContainerWidth,
                                margin: 'auto',
                                color: 'rgb(0,0,0)',
                                cursor: 'pointer',
                                marginBottom: 20,
                            }
                        }
                            onClick={() => history.push(`/video/${v.id}`)}>
                            <div style={{ position: 'relative', height: '100%', width: winSize === 1 ? '100%' : '50%' }}>

                                <img src={v.thumbnail || '/public/assets/icons/video-icon.jpg'} style={{ objectFit: 'cover', width: '100%', borderRadius: winSize === 1 ? '5px 5px 0 0' : '5px 0 0 5px' }} />
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexDirection: 'column',
                                padding: 10,
                                height: winSize === 1 ? 200 : '100%',
                                width: winSize === 1 ? '100%' : '50%'
                            }}>
                                <div>
                                    <p style={{ fontSize: '1.5em', textAlign: 'center', margin: 0 }}>{v.title}</p>
                                    <p style={{ fontStyle: 'italic', color: '#8b8b8b', padding: 10, textAlign: 'center' }}>{moment(new Date(v.created_at).getTime()).format("MMMM DD YYYY")}</p>

                                </div>

                                <p style={{ textAlign: 'center' }}>{v.description}</p>

                                <div />
                            </div>
                        </div>)
                        )}
                    </div>
                </div>
            }
        </div >
    )
}

export default Country;