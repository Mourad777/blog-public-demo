import React, { useEffect, useState } from 'react'
import { Location } from "../../svgs";
import { useParams } from 'react-router';
import { countries } from '../../Countries/countries-iso';
import { ScrollTrigger } from 'gsap/all';
import { Button, Checkbox } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom';
import CameraInfo from '../../../components/Photo/CameraInfo';
import Loader from '../../../components/Loader/Loader';
import { getPhoto } from '../../../api/util';
import { cameraInfoToBeDisplayed, getPusher, primaryColor } from '../../utility';
import {
    StyledButtonWrapper,
    StyledCameraSwitchContainer,
    StyledCameraSwitchContainerMain,
    StyledCameraSwitchLabel,
    StyledCameraSwitchWrapper,
    StyledImage,
    StyledLabel,
    StyledLabelContainer,
    StyledLabelWrapper,
    StyledLocationLabel,
    StyledPhotoSectionContainer,
    StyledPhotoSectionContainerQuarternary,
    StyledPhotoSectionContainerSecondary,
    StyledPhotoSectionContainerTertiary,
    StyledPhotoWrapperPrimary,
    StyledPhotoWrapperSecondary
} from './styles';
import { StyledLoaderWrapper } from '../../StyledComponents';

const Photo = ({ winSize }) => {
    const params = useParams();
    const history = useHistory();
    const [photo, setPhoto] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isHideCameraInfo, setisHideCameraInfo] = useState(false);
    useEffect(() => {

        getPhoto(params.photoId, setPhoto, setIsLoading);

        const channel = getPusher().subscribe("my-channel");
        channel.bind("BlogUpdated", async (data) => {
            await getPhoto(params.photoId, setPhoto, setIsLoading);
        });

        const triggers = ScrollTrigger.getAll();
        triggers.forEach(tr => {
            tr.kill()
        });
    }, [])

    const handleCameraInfo = (e) => {
        setisHideCameraInfo(!isHideCameraInfo)
    }

    if (isLoading || !photo) {
        return (<StyledLoaderWrapper><Loader color={primaryColor} /></StyledLoaderWrapper>)
    }

    const {
        shouldCameraInfoBeDisplayed,
        shouldLensBeDisplayed,
        shouldFocalLengthBeDisplayed,
        shouldApertureBeDisplayed,
        shutterShutterBeDisplayed,
        shouldIsoBeDisplayed,
    } = cameraInfoToBeDisplayed(photo);
    const shouldDisplay =
        shouldCameraInfoBeDisplayed ||
        shouldLensBeDisplayed ||
        shouldFocalLengthBeDisplayed ||
        shutterShutterBeDisplayed ||
        shouldApertureBeDisplayed ||
        shouldIsoBeDisplayed;

    return (
        <StyledPhotoSectionContainer>
            <StyledPhotoSectionContainerSecondary photo={!!photo}>
                <StyledButtonWrapper>
                    <Button content='Home' onClick={() => { history.push('/') }} />
                </StyledButtonWrapper>
                <StyledPhotoSectionContainerTertiary winSize={winSize}>
                    <StyledPhotoSectionContainerQuarternary>

                        <StyledPhotoWrapperPrimary>
                            <StyledPhotoWrapperSecondary>
                                {(!isHideCameraInfo && shouldDisplay) && (
                                    <CameraInfo photo={photo} />
                                )}
                                <StyledImage winSize={winSize} src={photo.src} alt="" />
                                <StyledLabelContainer>
                                    {(photo.photographer && photo.date_taken) && (
                                        <StyledLabelWrapper>
                                            <StyledLabel >Taken by {photo.photographer} {photo.date_taken ? ' on ' + new Date(photo.date_taken).toDateString() : ''}</StyledLabel>
                                        </StyledLabelWrapper>
                                    )}
                                    {(!photo.photographer && photo.date_taken) && (
                                        <StyledLabelWrapper>
                                            <StyledLabel >Taken on {new Date(photo.date_taken).toDateString()}</StyledLabel>
                                        </StyledLabelWrapper>
                                    )}
                                    {(photo.photographer && !photo.date_taken) && (
                                        <StyledLabelWrapper>
                                            <StyledLabel >Taken by {photo.photographer} </StyledLabel>
                                        </StyledLabelWrapper>
                                    )}
                                    {photo.country && (
                                        <StyledLocationLabel onClick={() => history.push(`/destination/${photo.country}`)}>
                                            <Location />
                                            <p >{countries.find(c => c.value === photo.country).text}</p>
                                        </StyledLocationLabel>
                                    )}
                                    {photo.title && (<div><p >{photo.title}</p></div>)}
                                    <div><p >{photo.description}</p></div>
                                </StyledLabelContainer>
                            </StyledPhotoWrapperSecondary>
                        </StyledPhotoWrapperPrimary>

                        <StyledCameraSwitchContainerMain>
                            <StyledCameraSwitchContainer>
                                <StyledCameraSwitchWrapper>
                                    <Checkbox disabled={!shouldDisplay} checked={isHideCameraInfo} onChange={handleCameraInfo} toggle />
                                    <StyledCameraSwitchLabel >Hide camera info</StyledCameraSwitchLabel>
                                </StyledCameraSwitchWrapper>
                            </StyledCameraSwitchContainer>
                        </StyledCameraSwitchContainerMain>

                    </StyledPhotoSectionContainerQuarternary>
                </StyledPhotoSectionContainerTertiary>
            </StyledPhotoSectionContainerSecondary>
        </StyledPhotoSectionContainer >)
}

export default Photo