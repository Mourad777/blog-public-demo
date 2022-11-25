import React from "react";
import 'react-alice-carousel/lib/alice-carousel.css';
import Carousel from 'react-alice-carousel';
import { useHistory } from "react-router-dom";
import { primaryColor } from "../utility";
function PhotoGallery({ winSize,height, photos }) {
    const history = useHistory();

    const handleIndexChange = (value) => {
        // setCurrentImage(value.curIndex)
    }
    const handleDragStart = (e) => e.preventDefault();
    let galleryWidth;
    if (winSize === 1) galleryWidth = '100%';
    if (winSize === 2) galleryWidth = '50%';
    if (winSize > 2) galleryWidth = '30%';
    const items = photos.map(p => <div style={{ overflow: 'hidden' }}>
        <img
            src={p.src}
            onClick={() => history.push(`/photo/${p.id}`)}
            style={{ objectFit: 'contain', width: '100%', cursor: 'pointer' }}
            onDragStart={handleDragStart}
        />
    </div>);
    let isLargeMobileLandscape = false;
    if (winSize === 2 && height < 420) {
        isLargeMobileLandscape = true
    }
    return (
        <div style={{ background: primaryColor, padding: 20 }}>
            <div style={{ position: 'relative', margin: 'auto', maxWidth:isLargeMobileLandscape ? 200 : 600 }}>
                <p style={{ textAlign: 'center', color: 'rgb(236, 231, 226)', fontSize: '3em', fontFamily: 'Mulish', paddingTop: 30 }}>Photos</p>
                <Carousel
                    disableDotsControls={items.length > 10 ? true : false}
                    canAutoPlay isAutoPlaying onSlideChanged={handleIndexChange} items={items} />
            </div>
        </div>
    );
}
export default PhotoGallery