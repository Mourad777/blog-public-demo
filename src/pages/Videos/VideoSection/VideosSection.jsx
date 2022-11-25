import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ScrollTrigger } from 'gsap/all'
import Loader from "../../../components/Loader/Loader";
import { primaryColor } from "../../utility";
import Paginate from "../../../components/Paginate/Paginate";
import AnimatedDivider from "../../../components/AnimatedDivider/AnimatedDivider";
import { StyledSectionContainer, StyledVideosContainer, StyledVideoWrapper,StyledThumbnail, StyledTitle, StyledTitleWrapper } from "./styles";
import { StyledLoaderWrapper } from "../../StyledComponents";


export default ({
    reference,
    videos,
    winSize,
    height,
    isLargeMobileLandscape,
    scrollWidth,
    isVideosLoading,
    setLastViewedSection,
    setSelectedVideosPage: setOffset,
    selectedVideosPage: offset,
    scrollSection,
}) => {

    const history = useHistory();
    const [data, setData] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    const getWinsizeValues = (winSize) => {
        let perPage = 3;
        let margin = '1.66%'
        let width = '30%'
        if (winSize === 1) {
            width = '80%'
            perPage = 1
            margin = '6.66%'
        }
        if (winSize === 2) {
            perPage = 2
            width = '40%'
            margin = '3.33%'
        }
        return { perPage, margin, width }
    }

    useEffect(() => {
        ScrollTrigger.create({
            trigger: reference.current,
            start: "top top",
            scrub: 0.5,
            snap: true,
            pin: false,

        });
    }, [reference])

    const getData = async () => {
        const perPage = getWinsizeValues(winSize).perPage;
        setPageCount(Math.ceil((videos || []).length / perPage))
        const slice = videos.slice((offset + 1) * perPage - perPage, (offset + 1) * perPage);
        setData(slice)
    }

    useEffect(() => {
        getData()
    }, [offset, videos]);

    useEffect(() => {
        getData()
    }, [winSize])

    const handlePageClick = (e) => {
        setOffset(e.selected)
    };
    const aspectRatio = scrollWidth / height;
    let titleStyle = { fontFamily: 'Mulish, sans-serif', fontSize: '4em', color: primaryColor, textAlign: 'center', marginBottom: 0 }
    if (isLargeMobileLandscape || aspectRatio > 1.9) {
        titleStyle = { ...titleStyle, position: 'absolute', fontSize: '4em', transform: 'translateY(-50%) rotate(-90deg)', top: '50%', left: '-60px' }
    }
    const mobileLandscapePaginateStyle = {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: 10,
        display: 'flex',
    }

    return (
        <StyledSectionContainer ref={reference}>
            {isVideosLoading && <StyledLoaderWrapper><Loader /></StyledLoaderWrapper>}
            <p style={titleStyle}>Videos</p>
            <StyledVideosContainer>
                {data.map((video, i) => (
                    <StyledVideoWrapper
                        key={`video-[${i + 1}]`}
                        onClick={() => {
                            history.push(`/video/${video.id}`);
                            setLastViewedSection('videos');
                        }}
                        width={getWinsizeValues(winSize).width}
                    >
                        <StyledTitleWrapper><StyledTitle>{video.title}</StyledTitle></StyledTitleWrapper>
                        <StyledThumbnail
                            video={video}
                            isLargeMobileLandscape={isLargeMobileLandscape}
                            srcSet={`${video.thumbnail || '/assets/icons/video-icon.jpg'} 400w`}
                            src={video.thumbnail || '/assets/icons/video-icon.jpg'} />
                        {!isLargeMobileLandscape && <div style={{ maxHeight: 200, height: '100%', background: '#fff' }}><p style={{ textAlign: 'center', paddingTop: 10 }}>{video.description}</p></div>}
                    </StyledVideoWrapper>
                ))}
            </StyledVideosContainer>

            {data.length > 0 && <div style={isLargeMobileLandscape ? mobileLandscapePaginateStyle : { display: 'flex' }}>
                <Paginate totalPages={pageCount} page={offset} handlePageClick={handlePageClick} />
            </div>}
            <AnimatedDivider imgPath={"/assets/images/video-film-sketch.webp"} isAnimating={scrollSection === 5} isBlue offsetImageVertical={17} widthFactor={1.25} />
        </StyledSectionContainer>
    )
};
