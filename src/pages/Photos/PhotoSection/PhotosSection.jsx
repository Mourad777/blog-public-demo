import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import Paginate from "../../../components/Paginate/Paginate";
import { ScrollTrigger } from 'gsap/all'
import Loader from "../../../components/Loader/Loader";
import { BlogContext } from "../../..";
import AnimatedDivider from "../../../components/AnimatedDivider/AnimatedDivider";
import { StyledLoaderWrapper } from "../../StyledComponents";
import {
    StyledFigure,
    StyledGrid,
    StyledGridWrapper,
    StyledImage,
    StyledImageWrapper,
    StyledSectionContainer
} from './styles';

export default ({
    reference,
    photos,
    winSize,
    scrollWidth,
    height,
    isLargeMobileLandscape,
    isPhotosLoading,
    setSelectedPhotosPage: setSelectedPage,
    selectedPhotosPage: selectedPage,
    scrollSection,
}) => {
    const [data, setData] = useState([]);
    const perPage = winSize > 1 && height < 640 ? 3 : 9;
    const [pageCount, setPageCount] = useState(0);
    const [gridWidth, setGridWidth] = useState(0);
    const history = useHistory();

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
        setPageCount(Math.ceil((photos || []).length / perPage))
        const slice = photos.slice((selectedPage + 1) * perPage - perPage, (selectedPage + 1) * perPage);
        setData(slice)
    }

    useEffect(() => {
        getData()
    }, [selectedPage, photos, height, winSize]);

    const handlePageClick = (e) => {
        setSelectedPage(e.selected);
    };

    const gridContainerReference = useRef(null);
    useEffect(() => {
        if(gridContainerReference.current){
            setGridWidth(gridContainerReference.current.scrollWidth);
        }
    }, [scrollWidth, photos]);
    const aspectRatio = scrollWidth / height;
    let titleStyle = { fontFamily: 'Mulish, sans-serif', fontSize: '4em', color: '#fff', textAlign: 'center', marginBottom: 0 }
    if (isLargeMobileLandscape || aspectRatio > 1.9) {
        titleStyle = { ...titleStyle, position: 'absolute', transform: 'translateY(-50%) rotate(-90deg)', top: '50%', left: '-60px' }
    }
    return (
        <BlogContext.Consumer>
            {({ setLastViewedSection }) => (
                <StyledSectionContainer ref={reference}>
                    {isPhotosLoading && <StyledLoaderWrapper><Loader /></StyledLoaderWrapper>}

                    <p style={titleStyle}>Photos</p>

                    <StyledGridWrapper winSize={winSize}>
                        <StyledGrid ref={gridContainerReference}>
                            {data.map((p, i) => (
                                <StyledImageWrapper
                                    gridWidth={gridWidth}
                                    key={`photo-grid-item[${i + 1}]`}
                                    onClick={() => {
                                        history.push(`/photo/${p.id}`);
                                        setLastViewedSection('photos');
                                    }}>
                                    <StyledFigure>
                                        <StyledImage
                                            loading="lazy"
                                            srcSet={`${p.src} 100w`}
                                            src={p.src} alt="" />
                                    </StyledFigure>
                                </StyledImageWrapper>
                            ))}
                        </StyledGrid>
                    </StyledGridWrapper>
                    {(!isPhotosLoading && data.length > 0) && <div style={{ display: 'flex' }}>
                        <Paginate totalPages={pageCount} page={selectedPage} handlePageClick={handlePageClick} />
                    </div>}
                    <AnimatedDivider imgPath={"/assets/images/camera-sketch.webp"} widthFactor={2.6} isAnimating={scrollSection === 4} />
                </StyledSectionContainer >)}
        </BlogContext.Consumer>
    );
};
