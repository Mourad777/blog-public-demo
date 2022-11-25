export const mapsContainerAnimations = ({ mainContainerRef, mapsPicsContainerRef }) => {

    return [
        {
            target: mapsPicsContainerRef.current,
            trigger: mainContainerRef.current,
            start: 'top top',
            end: '40% bottom',
            properties: {
                zIndex: 0,
            }
        },
    ]
}


export const heroSectionAnimations = ({
    mainContainerRef,
    heroPicMainRef,
    heroPicPieceOneRef,
    heroPicPieceTwoRef,
    heroPicPieceThreeRef,
    heroPrimaryTextRef,
    heroSecondaryTextRef,
    buttonOneRef,
    buttonTwoRef,
    scrollIconsWrapperRef,
}) => {

    const animations = [
        {
            target: scrollIconsWrapperRef.current,
            trigger: mainContainerRef.current,
           
            properties: {
                opacity: -30,
                
            }
        },
        {
            target: buttonOneRef.current,
            trigger: mainContainerRef.current,
            properties: {
                opacity: -30,
            }
        },
        {
            target: buttonTwoRef.current,
            trigger: mainContainerRef.current,
            properties: {
                opacity: -30,
            }
        },
        {
            target: heroPicMainRef.current,
            trigger: mainContainerRef.current,
            end: '30% bottom',
            properties: {
                duration: 3,
                opacity: -1,
            }
        },

        {
            target: heroPicPieceTwoRef.current,
            trigger: mainContainerRef.current,
            properties: {
                yPercent: -100,
                opacity: -2,
            }
        },
        {
            target: heroPicPieceOneRef.current,
            trigger: mainContainerRef.current,
            properties: {
                yPercent: 100,
                opacity: -2,
            }
        },
        {
            target: heroPicPieceThreeRef.current,
            trigger: mainContainerRef.current,
            properties: {
                yPercent: 100,
                opacity: -2,
            }
        },
        {
            target: (heroPrimaryTextRef||{}).current,
            trigger: mainContainerRef.current,
            properties: {
                opacity: -30,
            }
        },
        {
            target: heroSecondaryTextRef.current,
            trigger: mainContainerRef.current,
            properties: {
                opacity: -10,
                fill: 'rgba(0, 146, 228,0)',
            }
        },
    ].filter(item=>item.target);

    return animations;
}