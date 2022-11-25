import { gsap } from 'gsap/all'
import Pusher from "pusher-js";

export const getWindowSizeInteger = windowWidth => {
    let widthInteger;
    if (windowWidth > 0 && windowWidth < 576) widthInteger = 1; //mobile
    if (windowWidth >= 576 && windowWidth < 1200) widthInteger = 2; //tablet
    if (windowWidth >= 1200 && windowWidth < 2560) widthInteger = 3; //desktop 1080
    if (windowWidth >= 2560 && windowWidth < 3840) widthInteger = 4; //2k
    if (windowWidth >= 3840) widthInteger = 5; //4k
    return widthInteger;
};

const heroSectionButtonBaseStyle = {
    position: 'absolute',
    bottom: 300,
    right: 200,
    background: 'rgb(255,255,255,0.9)',
    padding: 10,
    fontFamily: 'Mulish',
    color: 'rgb(204, 134, 74)',
    borderRadius: '50px',
    border: 'none',
    margin: '0 10px',
    width: 120,
    zIndex: 10,
    height: 50,
    fontSize: '1.1em',
    fontWeight: 'bold',
    pointer: 'cursor',
}

export const getHeroSectionButtonOneStyle = (windowWidth, windowHeight) => {
    let isLargeMobileLandscape = false;
    if (windowWidth === 2 && windowHeight < 420) {
        isLargeMobileLandscape = true
    }
    let isTabletVertical = false;
    if (windowWidth === 2 && windowHeight > 1000) {
        isTabletVertical = true
    }
    let right, bottom, fontSize, height, width;
    if (windowWidth === 1) {
        right = 200;
        bottom = 265;
    }
    if (windowWidth === 2) {
        right = 440;
        bottom = 470;
        width = 150;
        height = 50;
        fontSize = '1.1em';
    }
    if (windowWidth > 2) {
        right = 900;
        bottom = 470;
        fontSize = '1.4em';
        width = 180;
        height = 80;
    }
    if (isLargeMobileLandscape) {
        right = 470;
        bottom = 250;
    }
    if (isTabletVertical) {
        right = 545;
        bottom = 500;
        fontSize = '1.4em';
        width = 180;
        height = 80;
    }
    return { ...heroSectionButtonBaseStyle, fontSize, width, height, bottom, right };
}

export const getHeroSectionButtonTwoStyle = (windowWidth, windowHeight) => {
    let isLargeMobileLandscape = false;
    if (windowWidth === 2 && windowHeight < 420) {
        isLargeMobileLandscape = true
    }
    let isTabletVertical = false;
    if (windowWidth === 2 && windowHeight > 1000) {
        isTabletVertical = true
    }
    let right, bottom, fontSize, height, width;
    if (windowWidth === 1) {
        right = 30;
        bottom = 150;
    }
    if (windowWidth === 2) {
        right = 120;
        bottom = 340;
        width = 150;
        height = 50;
        fontSize = '1.1em';
    }
    if (windowWidth > 2) {
        right = 270;
        bottom = 300;
        fontSize = '1.4em';
        width = 180;
        height = 80;
    }
    if (isLargeMobileLandscape) {
        right = 160;
        bottom = 210;
    }
    if (isLargeMobileLandscape) {
        right = 135;
        bottom = 140;
    }
    if (isTabletVertical) {
        right = 290;
        bottom = 270;
        fontSize = '1.4em';
        width = 180;
        height = 80;
    }
    return { ...heroSectionButtonBaseStyle, fontSize, width, height, bottom, right };
}

export const getMapPosition = (windowWidth, windowHeight) => {
    let isLargeMobileLandscape = false;
    if (windowWidth === 2 && windowHeight < 420) {
        isLargeMobileLandscape = true
    }
    let isTabletVertical = false;
    if (windowWidth === 2 && windowHeight > 1000) {
        isTabletVertical = true
    }
    let width, top;
    if (windowWidth === 1) {
        width = 450;
        top = 0;
    }
    if (windowWidth === 2) {
        width = 220;
        top = 75;
    }
    if (windowWidth === 3) {
        width = 104;
        top = 0;
    }
    if (windowWidth === 4) {
        width = 450;
        top = 0;
    }
    if (windowWidth === 5) {
        width = 450;
        top = 0;
    }
    if (isLargeMobileLandscape) {
        width = 220;
        top = 0;
    }
    if (isTabletVertical) {
        width = 260;
        top = 0;
    }
    return { width, top };
}

export const getSearchInputStyle = (windowWidth) => {
    let top = 20;
    if (windowWidth === 1) {
        top = 20;
    }
    return { top }
}

export const getHeroSectionPicStyle = (windowWidth, windowHeight) => {
    let top, right, height;
    let isLargeMobileLandscape = false;
    let isTabletVertical = false;
    if (windowWidth === 2 && windowHeight < 420) {
        isLargeMobileLandscape = true
    }
    if (windowWidth === 2 && windowHeight > 1000) {
        isTabletVertical = true
    }
    if (windowWidth === 1) {
        top = "calc(100vh - 1010px)";
        right = -645;
        height = 1120;
    }
    if (windowWidth === 2) {
        top = "calc(100vh - 1175px)";
        right = -650;
        height = 1300;
    }
    if (windowWidth === 3) {
        top = "calc(100vh - 1400px)";
        right = -700;
        height = 1600;
    }
    if (windowWidth === 4) {
        top = "calc(100vh - 1959px)";
        right = -200;
        height = "calc(100vh + 700px)";
    }
    if (windowWidth === 5) {
        top = "calc(100vh - 2344px)";
        right = -200;
        height = "calc(100vh + 300px)";
    }
    if (isLargeMobileLandscape) {
        top = "calc(100vh - 630px)";
        right = -110;
        height = 700;
    }
    if (isTabletVertical) {
        top = "calc(100vh - 1530px)";
        right = -1000;
        height = 1800;
    }

    return {
        position: "fixed",
        height,
        right,
        top,
        width: 'auto',
        zIndex: -1,
    };
};

export const getHeroSectionPicPiecesStyle = (windowWidth, windowHeight, piece) => {
    let isLargeMobileLandscape = false;
    if (windowWidth === 2 && windowHeight < 420) {
        isLargeMobileLandscape = true
    }
    let isTabletVertical = false;
    if (windowWidth === 2 && windowHeight > 1000) {
        isTabletVertical = true
    }
    let top, right, height;
    if (windowWidth === 1) {
        top = "calc(100vh - 360px)";
        right = piece === 1 ? 175 : piece === 2 ? 75 : -25;
        height = 200;
    }
    if (windowWidth === 2) {
        top = "calc(100vh - 670px)";
        right = piece === 1 ? 520 : piece === 2 ? 260 : 0;
        height = 500;
    }
    if (windowWidth === 3) {
        top = "calc(100vh - 725px)";
        right = piece === 1 ? 1230 : piece === 2 ? 675 : 380;
        height = 600;
    }
    if (windowWidth === 4) {
        top = "calc(100vh - 1394px)";
        right = piece === 1 ? 1255 : piece === 2 ? 960 : 665;
        height = 1000;
    }
    if (windowWidth === 5) {
        top = "calc(100vh - 1400px)";
        right = piece === 1 ? 1740 : piece === 2 ? 1355 : 970;
        height = 1000;
    }
    if (isLargeMobileLandscape) {
        top = "calc(100vh - 300px)";
        right = piece === 1 ? 415 : piece === 2 ? 315 : 215;
        height = 200;
    }
    if (isTabletVertical) {
        top = "calc(100vh - 685px)";
        right = piece === 1 ? 360 : piece === 2 ? 70 : -220;
        height = 550;
    }

    return {
        position: "fixed",
        top,
        right,
        height,
        width: 'auto',
        zIndex: -1,
    };
};

export const getHeroSectionNameStyle = (windowWidth, windowHeight) => {
    let isLargeMobileLandscape = false;
    if (windowWidth === 2 && windowHeight < 420) {
        isLargeMobileLandscape = true
    }
    let isTabletVertical = false;
    if (windowWidth === 2 && windowHeight > 1000) {
        isTabletVertical = true
    }
    let top, right, height, width;
    if (windowWidth === 1) {
        top = "calc(100vh - 550px)";
        right = -660;
        width = 300;
    }
    if (windowWidth === 2) {
        top = "calc(100vh - 380px)";
        right = -390;
        width = 350;
    }
    if (windowWidth === 3) {
        top = "calc(100vh - 480px)";
        right = -710;
        width = 565;
    }
    if (windowWidth === 4) {
        top = "calc(100vh - 600px)";
        right = -1020;
        width = 1000;
    }
    if (windowWidth === 5) {
        top = "calc(100vh - 1785px)";
        right = -1000;
        width = 1200;
    }
    if (isLargeMobileLandscape) {
        top = "calc(100vh - 260px)";
        right = -390;
        width = 300;
    }
    if (isTabletVertical) {
        top = "calc(100vh - 1000px)";
        right = -390;
        width = 500;
    }

    return {
        position: "fixed",
        strokeDasharray: 180,
        // strokeDashoffset: 180,
        zIndex: -1,
        // fill: "none",
        // stroke: "rgb(0 146 228)",
        strokeDashoffset: 0,
        fill: 'rgba(255,255,255,1)',
        stroke: "white",
        strokeWidth: -1,
        strokeMiterlimit: 10,
        top,
        // right,
        width,
        left: '50%',
        transform: 'translateX(-50%)',
    };
};

export const getHeroSectionTextStyle = (windowWidth, windowHeight) => {
    let isLargeMobileLandscape = false;
    if (windowWidth === 2 && windowHeight < 420) {
        isLargeMobileLandscape = true
    }
    let isTabletVertical = false;
    if (windowWidth === 2 && windowHeight > 1000) {
        isTabletVertical = true
    }
    let top, right, fontSize, width;
    if (windowWidth === 1) {
        top = "calc(100vh - 440px)";
        right = 25;
        fontSize = "1em";
        width = 300;
    }
    if (windowWidth === 2) {
        top = "calc(100vh - 250px)";
        right = 220;
        fontSize = "1.1em";
        width = 380;
    }
    if (windowWidth === 3) {
        top = "calc(100vh - 270px)";
        right = 350;
        fontSize = "1.6em";
        width = 720;
    }
    if (windowWidth === 4) {
        top = "calc(100vh - 300px)";
        right = 700;
        fontSize = "2.8em";
        width = 1050;
    }
    if (windowWidth === 5) {
        top = "calc(100vh - 1370px)";
        right = 715;
        fontSize = "3.8em";
        width = 1150;
    }
    if (isLargeMobileLandscape) {
        top = "calc(100vh - 154px)";
        right = 220;
        fontSize = "1.1em";
        width = 380;
    }
    if (isTabletVertical) {
        top = "calc(100vh - 820px)";
        right = 220;
        fontSize = "1.6em";
        width = 480;
    }
    return {
        fontFamily: "Mulish",
        position: "fixed",
        color: "white",
        minWidth: 309,
        top,
        // right,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize,
        width,
        zIndex: -1,

    };
};

export const getCompassStyle = windowWidth => {
    let top, left, width;
    if (windowWidth === 1) {
        top = "calc(100vh + 80px)";
        left = 40;
        width = 60;
    }
    if (windowWidth === 2) {
        top = "calc(100vh + 170px)";
        left = 220;
        width = 100;
    }
    if (windowWidth === 3) {
        top = "calc(100vh + 150px)";
        left = 615;
        width = 100;
    }
    if (windowWidth === 4) {
        top = "calc(100vh + 100px)";
        left = 715;
        width = 200;
    }
    if (windowWidth === 5) {
        top = "calc(100vh + 80px)";
        left = 2715;
        width = 200;
    }
    return {
        position: "absolute",
        fill: "#840404",
        top,
        left,
        width,
    };
};

export const getFeetStyle = windowWidth => {
    let top, left, width;
    if (windowWidth === 1) {
        top = "calc(100vh + 600px)";
        left = 240;
        width = 60;
    }
    if (windowWidth === 2) {
        top = "calc(100vh + 800px)";
        left = 100;

        width = 100;
    }
    if (windowWidth === 3) {
        top = "calc(100vh + 820px)";
        left = 500;
        width = 100;
    }
    if (windowWidth === 4) {
        top = "calc(100vh + 400px)";
        left = 2000;
        width = 200;
    }
    if (windowWidth === 5) {
        top = "calc(100vh + 370px)";
        left = 1515;
        width = 200;
    }
    return {
        position: "absolute",
        fill: "#840404",
        top,
        left,
        width,
    };
};

export const getPlaneStyle = windowWidth => {
    let top, left, width;
    if (windowWidth === 1) {
        top = "calc(100vh + 980px)";
        left = 50;
        width = 60;
    }
    if (windowWidth === 2) {
        top = "calc(100vh + 720px)";
        left = 520;

        width = 100;
    }
    if (windowWidth === 3) {
        top = "calc(100vh + 500px)";
        left = 1060;
        width = 100;
    }
    if (windowWidth === 4) {
        top = "calc(100vh + 815px)";
        left = 820;

        width = 200;
    }
    if (windowWidth === 5) {
        top = "calc(100vh + 820px)";
        left = 1620;

        width = 200;
    }
    return {
        position: "absolute",
        fill: "#840404",
        top,
        left,
        width,

    };
};

export const animate = (animations) => {

    animations.forEach(ani => {
        gsap.to(ani.target, {
            ...ani.properties,
            ease: "ease-in",
            scrollTrigger: {
                trigger: ani.trigger,
                start: ani.start || 'top top',
                end: ani.end || "center bottom",
                scrub: true,
            }
        });
    })
}

export const getPusher = () => {
    const pusherKey = '540ea742ac9e8d6d5157';
    const pusherCluster = 'us2'

    const pusher = new Pusher(pusherKey, {
        cluster: pusherCluster,
    });
    return pusher;
}

export const validateMessage = (values) => {
    const errors = {}
    const name = values.name;
    const email = values.email;
    const message = values.message;

    const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!emailPattern.test(email)) {
        errors.email = 'Please enter a valid e-mail';
    }
    if (!email) {
        errors.email = 'An e-mail is required';
    }

    if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(name)) {
        errors.name = 'Your name can only contain letters'
    }

    if (!name) {
        errors.name = 'Your name is required';
    }

    if (!message) {
        errors.message = 'A message is required';
    }
    return errors;
}

export const validateSubscription = (values) => {
    const errors = {}
    const name = values.name;
    const email = values.email;

    const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!emailPattern.test(email)) {
        errors.email = 'Please enter a valid e-mail';
    }
    if (!email) {
        errors.email = 'An e-mail is required';
    }

    if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(name)) {
        errors.name = 'Your name can only contain letters'
    }

    if (!name) {
        errors.name = 'Your name is required';
    }

    return errors;
}

export const cameraInfoToBeDisplayed = (photo) => {
    const shouldCameraInfoBeDisplayed = !!photo.camera && !photo.camera.includes('undefined');
    const shouldLensBeDisplayed = !!photo.lens && !photo.lens.includes('undefined') && photo.lens.includes('mm') && !photo.lens.includes(',') && !photo.camera.toLowerCase().includes('gopro') && !photo.lens.includes('000');
    const shouldFocalLengthBeDisplayed = !!photo.focal_length && !photo.focal_length.includes('NaN');
    const shouldApertureBeDisplayed = !!photo.aperture && !photo.aperture.includes('NaN') && !photo.aperture.includes('f0');
    const shutterShutterBeDisplayed = !!photo.shutter_speed && !photo.shutter_speed.includes('undefined');
    const shouldIsoBeDisplayed = !!photo.iso && !photo.iso.includes('undefined');

    return {
        shouldCameraInfoBeDisplayed,
        shouldLensBeDisplayed,
        shouldFocalLengthBeDisplayed,
        shutterShutterBeDisplayed,
        shouldApertureBeDisplayed,
        shouldIsoBeDisplayed,
    }
}

export const primaryColor = 'rgb(229, 170, 112)';

export let AppUrl = process.env.REACT_APP_SERVER_URL;
