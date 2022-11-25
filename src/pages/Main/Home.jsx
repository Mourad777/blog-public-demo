import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navbar/Navbar";
import 'semantic-ui-css/semantic.min.css'
import "./Home.module.css";
import Loader from "./Loader";
import { gsap, ScrollTrigger, ScrollToPlugin } from 'gsap/all'
import { AppUrl, getPusher, validateMessage, validateSubscription } from '../utility'
import { getMapPosition } from "../utility";
import {
    StyledContactFormSubmitButton,
    StyledInputError,
    StyledInputGroup,
    StyledInputLabel,
    StyledMap,
    StyledTextInput,
} from '../StyledComponents'
import MapPath from "./MapPath";
import { useRef } from "react";
import { Fragment } from "react";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { getConfiguration, getCountryThumbnails, getPhotos, getPosts, getVideos } from "../../api/util";
import { BlogContext } from "../..";
import axios from "axios";

const HeroSection = React.lazy(() => import('./HeroSectionContent'));
const PostsSection = React.lazy(() => import('../Posts/Posts'));
const DestinationsSection = React.lazy(() => import('../Countries/WorldMap'));
const PhotosSection = React.lazy(() => import('../Photos/PhotoSection/PhotosSection'));
const VideosSection = React.lazy(() => import('../Videos/VideoSection/VideosSection'));
const ContactSection = React.lazy(() => import('../Contact/ContactSection'));


//innerhe
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const Home = (({
    scrollWidth,
    winSize,
    height,
    isPageLoaded,
    setInitialDataPercentage,
    initialDataPercentage,
    setLastViewedSection,
    lastViewedSection,
}) => {
    // const refSection1 = useRef(null)
    const refSection2 = useRef(null)
    const refSection3 = useRef(null)
    const refSection4 = useRef(null)
    const refSection5 = useRef(null)
    const refSection6 = useRef(null)
    const refSectionX = useRef(null)
    const notePadMapRef = useRef(null)
    const mainContainerRef = useRef(null)
    const mapsPicsContainerRef = useRef(null)
    const initialLoaderRef = useRef(null)
    const mapPathlineRef = useRef(null)

    const [isInitialLoader, setIsInitialLoader] = useState(true);
    const [postsFromDB, setPostsFromDB] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [videos, setVideos] = useState([]);
    const [configuration, setConfiguration] = useState([]);
    const [scrollPosition, setScrollPostion] = useState(0);
    const [scrollSection, setScrollSection] = useState(-1);
    const [isPostsLoading, setIsPostsLoading] = useState(false);
    const [isPhotosLoading, setIsPhotosLoading] = useState(false);
    const [isVideosLoading, setIsVideosLoading] = useState(false);
    const [isSubscribingLoading, setIsSubscribingLoading] = useState(false);
    const [isCountryThumbnailsLoading, setIsCountryThumbnailsLoading] = useState(false);
    const [isConfigurationIsLoading, setIsConfigurationIsLoading] = useState(false);
    const [countryThumbnails, setCountryThumbnails] = useState([])
    const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [isFormTouched, setIsFormTouched] = useState(false);
    const [isNewsletterFormOpen, setIsNewsletterFormOpen] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');

    const handleScrollPosition = (value) => {
        setScrollPostion(value);
    }


    const history = useHistory();

    useEffect(() => {
        setErrors(validateMessage({ name, email }))
    }, [name, email])

    useEffect(() => {
        if (lastViewedSection === 'posts') {
            gsap.to(window, { duration: 2, scrollTo: refSection2.current });
        }
        if (lastViewedSection === 'destinations') {
            gsap.to(window, { duration: 2, scrollTo: refSection3.current });
        }
        if (lastViewedSection === 'photos') {
            gsap.to(window, { duration: 2, scrollTo: refSection4.current });
        }
        if (lastViewedSection === 'videos') {
            gsap.to(window, { duration: 2, scrollTo: refSection5.current });
        }

    }, [])

    useEffect(() => {
        if (isInitialDataLoaded) {
            if (localStorage.getItem('isNewsletterShowed') !== 'true') {
                setTimeout(() => {
                    handleOpenNewsletterForm(true);
                }, 30000)
            }
        }

    }, [isInitialDataLoaded]);

    useEffect(() => {
        setScrollSection(0)
        if (window.scrollY > window.innerHeight / 4) {
            setScrollSection(winSize > 2 ? 2 : 1)
        }
        if (window.scrollY > window.innerHeight * 1 + window.innerHeight / 2) {
            setScrollSection(2)
        }
        if (window.scrollY > window.innerHeight * 2 + window.innerHeight / 2) {
            setScrollSection(3)
        }
        if (window.scrollY > window.innerHeight * 3 + window.innerHeight / 2) {
            setScrollSection(4)
        }
        if (window.scrollY > window.innerHeight * 4 + window.innerHeight / 2) {
            setScrollSection(5)
        }
        if (window.scrollY > window.innerHeight * 5 + window.innerHeight / 2) {
            setScrollSection(6)
        }
    }, [scrollPosition, scrollWidth, winSize])

    useEffect(() => {
        // window.addEventListener('load',()=>setIsPageLoaded(true))
        getInitialData();

        const channel = getPusher().subscribe("my-channel");
        channel.bind("BlogUpdated", (data) => {
            getInitialData();
        });
    }, []);

    useEffect(() => {
        if (initialDataPercentage !== 100) {
            gsap.to(window, { duration: 1, scrollTo: mainContainerRef.current });
        }
    }, [])


    const getInitialData = async () => {
        setIsPostsLoading(true)
        setIsPhotosLoading(true)
        setIsVideosLoading(true)
        setIsCountryThumbnailsLoading(true)

        await getPosts(setPostsFromDB, setIsPostsLoading);
        setInitialDataPercentage(33)
        await getPhotos(setPhotos, setIsPhotosLoading);
        setInitialDataPercentage(50)
        await getVideos(setVideos, setIsVideosLoading);
        setInitialDataPercentage(66)
        await getCountryThumbnails(setCountryThumbnails, setIsCountryThumbnailsLoading);
        setInitialDataPercentage(83)
        const config = await getConfiguration(setIsConfigurationIsLoading);
        setConfiguration(config);
        setInitialDataPercentage(100)
        setIsInitialDataLoaded(true)
    }

    useEffect(() => {
        const scrollAnimation = () => {
            if (!requestId) {
                requestId = requestAnimationFrame(update);
            }
        }
        // the animation to use
        const tlPath = gsap.timeline({ paused: true });
        tlPath.to(mapPathlineRef.current, { strokeDashoffset: 2850 });
        let requestId;
        const startY = 0;
        const finishDistancePath = window.innerHeight * 2;
        document.addEventListener("scroll", _.throttle(scrollAnimation, 200, {}));
        update();
        function update() {
            tlPath.progress((window.scrollY - startY) / finishDistancePath);
            handleScrollPosition(window.scrollY)
            requestId = null;
        }

        // animate(mapsContainerAnimations({ mainContainerRef, mapsPicsContainerRef }))

        return () => {
            window.removeEventListener("scroll", scrollAnimation)

        };
    }, [
        refSection2, refSection3, refSection4, refSection5,
        refSectionX])

    const handleOpenNewsletterForm = (value) => {
        if (!value) {
            setIsNewsletterFormOpen(false)
            localStorage.setItem('isNewsletterShowed', 'true')
        }
        if (!!value) {
            setIsNewsletterFormOpen(true)
        }
    }

    const setNameHandler = (value) => {
        setName(value)
    }

    const setEmailHandler = (value) => {
        setEmail(value)
    }

    const subscribeHandler = async (e) => {
        e.preventDefault();
        setIsFormTouched(true);
        const errors = validateSubscription({ name, email });
        setErrors(errors);
        if (errors.name || errors.email) {
            return;
        }

        const formData = new FormData();
        formData.append('email', email);
        formData.append('first_name', name);
        setIsSubscribingLoading(true);
        let messageResponse = {};
        try {
            messageResponse = await axios.post(`${AppUrl}api/subscribe`, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
        } catch (e) {
            setIsSubscribingLoading(false);
            console.log('message error response', e.response);
        }
        setIsSubscribingLoading(false);
        setName('');
        setEmail('');
        setIsFormTouched(false)

        if (messageResponse.status === 200 || messageResponse.status === 201) {
            setConfirmationMessage('You have successfully subscribed!');
            localStorage.setItem('isNewsletterShowed', 'true')
        } else {
            setConfirmationMessage('Something went wrong');
        }
        setTimeout(() => {
            setConfirmationMessage('')
            setIsNewsletterFormOpen(false)
        }, 3000)


    }

    const transformStyles1 = scrollPosition >= 100 && scrollPosition < 1000 ? {
        opacity: 1,
        scale: 1,
        transform: 'rotate(-15deg) scale(1)',
    } : {};


    const transformStyles2 = scrollPosition >= 200 && scrollPosition < 1000 ? {
        opacity: 1,
        scale: 1,
        transform: 'rotate(20deg) scale(1)',
    } : {};


    const transformStyles3 = scrollPosition >= 300 && scrollPosition < 1000 ? {
        opacity: 1,
        scale: 1,
        transform: 'rotate(-10deg) scale(1)',
    } : {};



    return (
        <BlogContext.Consumer>
            {({
                isLargeMobileLandscape,
                setSelectedVideosPage,
                selectedVideosPage,
                setSelectedPhotosPage,
                selectedPhotosPage,
                setSelectedPostsPage,
                selectedPostsPage
            }) => (
                <Fragment>

                    {isNewsletterFormOpen && <div style={{
                        zIndex: 1000,
                        background: '#d28e4a',
                        position: 'fixed',
                        top: '5%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        maxHeight: '95vh',
                        minHeight: 320,
                        width: isLargeMobileLandscape ? 600 : winSize === 1 ? 320 : 400,
                        padding: 20,
                        overflow: 'hidden'

                    }}>
                        <img style={{ cursor: 'pointer', position: 'absolute', top: 8, right: 8, width: 30 }} src="/assets/icons/x-icon.png" onClick={() => handleOpenNewsletterForm(false)} />
                        {!confirmationMessage && <Fragment>
                            <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Mulish', color: '#fff', margin: '0 0 10px 0' }}>Join my Newsletter!</h1>

                            <div style={{ display: 'flex', flexDirection: isLargeMobileLandscape ? 'row' : 'column' }}>
                                <div style={{ padding: 5 }}>
                                    <p style={{ fontFamily: 'Mulish', fontSize: '1.2em', color: '#fff' }}>Get news, updates, and great stories.</p>
                                    <img src='/assets/images/me-portrait.jpg' style={{ height: isLargeMobileLandscape || winSize === 1 ? 200 : 200, width: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: 5 }}>
                                    <StyledInputGroup style={{ paddingTop: 0 }}>
                                        <StyledInputLabel>First name</StyledInputLabel>
                                        <StyledTextInput disabled={isSubscribingLoading} value={name} onChange={(e) => setNameHandler(e.target.value)} type="text" />
                                        {!!(isFormTouched && !!errors.name) && <StyledInputError style={{ paddingTop: 2 }}>{errors.name}</StyledInputError>}
                                    </StyledInputGroup>

                                    <StyledInputGroup style={{ paddingTop: 10 }}>
                                        <StyledInputLabel>E-mail</StyledInputLabel>
                                        <StyledTextInput disabled={isSubscribingLoading} value={email} onChange={(e) => setEmailHandler(e.target.value)} type="text" />
                                        {!!(isFormTouched && !!errors.email) && <StyledInputError style={{ paddingTop: 2 }}>{errors.email}</StyledInputError>}
                                    </StyledInputGroup>
                                    <StyledContactFormSubmitButton disabled={isSubscribingLoading} onClick={subscribeHandler}>
                                        Submit
                                    </StyledContactFormSubmitButton>
                                </div>
                            </div>

                        </Fragment>}
                        <p
                            style={{
                                textAlign: 'center',
                                fontFamily: 'Mulish',
                                color: 'white',
                                opacity: !!confirmationMessage ? 1 : 0,
                                transition: 'opacity 1s ease-in',
                                fontSize: '1.5em',
                                marginTop: 15,
                            }}
                        >{confirmationMessage}</p>
                    </div>}
                    <div style={{ overflow: 'hidden' }}>
                        <Loader
                            initialDataPercentage={initialDataPercentage}
                            isInitialDataLoaded={isInitialDataLoaded} reference={initialLoaderRef} isPageLoaded={isPageLoaded}
                            isLargeMobileLandscape={isLargeMobileLandscape}
                            winSize={winSize}
                        />
                        {(winSize > 1 && !isLargeMobileLandscape) && (
                            <Navigation
                                // getInitialData={getInitialData}
                                scrollSection={scrollSection}
                                componentReferences={
                                    {
                                        welcome: mainContainerRef,
                                        posts: refSection2,
                                        destinations: refSection3,
                                        photos: refSection4,
                                        videos: refSection5,
                                        contact: refSection6
                                    }
                                }
                            />
                        )}

                        {/* must use a lower resolution map for mobile devices */}
                        <div ref={mapsPicsContainerRef} style={{ zIndex: 1, position: 'fixed', height: '100vh', width: '100%' }}>

                            {(photos[0] || {}).src && <div id="hero-pic-1" style={{
                                position: 'absolute',
                                top: isLargeMobileLandscape ? '20%' : '42%',
                                left: isLargeMobileLandscape ? '40%' : '32%',
                                transform: 'translateX(-50%) translateY(-50%)',
                                // top: winSize === 1 ? 270 : 300,
                                // left: winSize === 1 ? 15 : 100,
                                height: 100,
                                width: 100,
                                cursor: 'pointer',
                                border: '5px solid #e7c5a2',
                                zIndex: 4,
                                transition: '0.3s all ease-in',
                                opacity: 0,
                                scale: 0,
                                transform: 'rotate(0) scale(0)',
                                ...transformStyles1,

                            }}
                                onClick={() => {
                                    history.push(`/photo/${(photos[0] || {}).id}`)
                                    setLastViewedSection(null);
                                }}
                            >
                                <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={(photos[0] || {}).src} />
                            </div>}
                            {(photos[1] || {}).src && <div id="hero-pic-2" style={{
                                position: 'absolute',
                                top: isLargeMobileLandscape ? '50%' : '62%',
                                left: isLargeMobileLandscape ? '20%' : winSize <= 2 ? '7%' : '35%',
                                height: 100,
                                width: 100,
                                cursor: 'pointer',
                                border: '5px solid #e7c5a2',
                                zIndex: 4,
                                transition: '0.3s all ease-in',
                                opacity: 0,
                                scale: 0,
                                transform: 'rotate(0) scale(0)',
                                ...transformStyles2,
                            }}
                                onClick={() => {
                                    history.push(`/photo/${(photos[1] || {}).id}`)
                                    setLastViewedSection(null);
                                }}

                            >
                                <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={(photos[1] || {}).src} />
                            </div>}
                            {(photos[2] || {}).src && <div id="hero-pic-3" style={{
                                position: 'absolute',
                                top: '58%',
                                left: '50%',
                                height: 100,
                                width: 100,
                                cursor: 'pointer',
                                border: '5px solid #e7c5a2',
                                zIndex: 4,
                                transition: '0.3s all ease-in',
                                opacity: 0,
                                scale: 0,
                                transform: 'rotate(0) scale(0)',
                                ...transformStyles3,
                            }}
                                onClick={() => {
                                    history.push(`/photo/${(photos[2] || {}).id}`)
                                    setLastViewedSection(null);
                                }}
                            >
                                <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={(photos[2] || {}).src} />
                            </div>}
                        </div>

                        <div ref={mainContainerRef} id="container" style={{ position: "relative", }}>
                            <div id="map-container" style={{ position: 'fixed', height: '100%', width: '100%', top: getMapPosition(winSize, height).top, zIndex: -1 }}>
                                <div style={{ position: 'relative', height: '100vh' }}>
                                    < StyledMap className={isPageLoaded ? "" : "fade-in"} ref={notePadMapRef} windowWidth={winSize} width={getMapPosition(winSize, height).width} lowRes src='/assets/images/notepad.webp' />
                                    <MapPath mapPathlineRef={mapPathlineRef} winSize={winSize} />
                                </div>
                            </div>
                            <HeroSection
                                height={height}
                                posts={postsFromDB}
                                photos={photos}
                                videos={videos}
                                countryThumbnails={countryThumbnails}
                                tags={[]}
                                categories={[]}
                                winSize={winSize}
                                refPosts={refSection2}
                                refVideos={refSection5}
                                isLargeMobileLandscape={isLargeMobileLandscape}
                                isInitialLoader={isInitialLoader}
                                mainContainerRef={mainContainerRef}
                                isPageLoaded={isPageLoaded}
                                scrollSection={scrollSection}
                                initialDataPercentage={initialDataPercentage}
                                setLastViewedSection={setLastViewedSection}
                            />

                            {/* the spacer section is so that gsap will snap to latest post section if the top part of that section is in view port */}
                            <div id="spacer" style={{ overflow: 'hidden', width: '100%', height: '100vh', minHeight: 'calc(100vh - 56px)', zIndex: -10 }} ref={refSectionX} />
                            <PostsSection
                                setLastViewedSection={setLastViewedSection}
                                isPostsLoading={isPostsLoading}
                                scrollWidth={scrollWidth}
                                height={height}
                                isLargeMobileLandscape={isLargeMobileLandscape}
                                reference={refSection2}
                                postsFromDB={postsFromDB}
                                winSize={winSize}
                                selectedPostsPage={selectedPostsPage}
                                setSelectedPostsPage={setSelectedPostsPage}
                                scrollSection={scrollSection}
                            />
                            <DestinationsSection
                                setLastViewedSection={setLastViewedSection}
                                reference={refSection3}
                                isLargeMobileLandscape={isLargeMobileLandscape}
                                postsFromDB={postsFromDB}
                                videos={videos}
                                scrollWidth={scrollWidth}
                                photos={photos}
                                height={height}
                                winSize={winSize}
                                scrollSection={scrollSection}
                            />
                            {/* <Country reference={refSectionDestination} postsFromDB={postsFromDB} /> */}
                            <PhotosSection
                                setLastViewedSection={setLastViewedSection}
                                isPhotosLoading={isPhotosLoading}
                                photos={photos}
                                isLargeMobileLandscape={isLargeMobileLandscape}
                                reference={refSection4}
                                winSize={winSize}
                                height={height}
                                scrollWidth={scrollWidth}
                                selectedPhotosPage={selectedPhotosPage}
                                setSelectedPhotosPage={setSelectedPhotosPage}
                                scrollSection={scrollSection}
                            />

                            {/* <PhotosSectionDetail reference={refSectionPhotos}/> */}
                            <VideosSection
                                setLastViewedSection={setLastViewedSection}
                                isVideosLoading={isVideosLoading}
                                videos={videos}
                                isLargeMobileLandscape={isLargeMobileLandscape}
                                height={height}
                                reference={refSection5}
                                scrollWidth={scrollWidth}
                                winSize={winSize}
                                setSelectedVideosPage={setSelectedVideosPage}
                                selectedVideosPage={selectedVideosPage}
                                scrollSection={scrollSection}
                            />

                            {/* <VideosSectionDetail reference={refSectionVideos}/> */}

                            <ContactSection
                                handleOpenNewsletterForm={handleOpenNewsletterForm}
                                isPageLoaded={isPageLoaded}
                                configuration={configuration}
                                reference={refSection6}
                                isLargeMobileLandscape={isLargeMobileLandscape}
                                height={height}
                                scrollWidth={scrollWidth}
                                scrollSection={scrollSection}
                            />
                        </div>
                    </div>
                </Fragment>)}
        </BlogContext.Consumer>


    );
});

export default Home;
