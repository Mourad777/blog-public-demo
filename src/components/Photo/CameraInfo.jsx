import React from 'react'
import { Camera, Aperture, ShutterSpeed, Iso, Lens, FocalLength } from "../../pages/svgs";
import { cameraInfoToBeDisplayed } from '../../pages/utility';

const CameraInfo = ({ photo }) => {
    const {
        shouldCameraInfoBeDisplayed,
        shouldLensBeDisplayed,
        shouldFocalLengthBeDisplayed,
        shouldApertureBeDisplayed,
        shutterShutterBeDisplayed,
        shouldIsoBeDisplayed,
    } = cameraInfoToBeDisplayed(photo);
    return (
        <div style={{
            position: 'absolute',
            top: 10,
            left: 10,
            color: 'rgb(255, 255, 255)',
            background: 'rgb(36,36,36)',
            margin: 10,
            opacity: 0.6,
            borderRadius: 10,
            zIndex: 1,
        }}>
            <div
                style={{ display: "flex", width: 200, padding: 5 }}
            >
                <Camera />
                <p style={{ marginLeft: 10 }}>
                    Camera <span>{shouldCameraInfoBeDisplayed ? photo.camera : ''}</span>
                </p>
            </div>
            <div
                style={{ display: "flex", width: 200, padding: 5 }}
            >
                <Lens />
                <p style={{ marginLeft: 10 }}>
                    Lens <span>{shouldLensBeDisplayed ? (photo.lens || '').substring(0, 18) : ''}</span>
                </p>
            </div>
            <div
                style={{ display: "flex", width: 200, padding: 5 }}
            >
                <FocalLength />
                <p style={{ marginLeft: 10 }}>
                    Focal Length <span>{shouldFocalLengthBeDisplayed ? photo.focal_length : ''}</span>
                </p>
            </div>
            <div
                style={{ display: "flex", width: 200, padding: 5 }}
            >
                <Aperture />
                <p style={{ marginLeft: 10 }}>
                    Aperture <span>{shouldApertureBeDisplayed ? photo.aperture : ''}</span>
                </p>
            </div>
            <div
                style={{ display: "flex", width: 200, padding: 5 }}
            >
                <ShutterSpeed />
                <p style={{ marginLeft: 10 }}>
                    Shutter <span>{shutterShutterBeDisplayed ? photo.shutter_speed : ''}</span>
                </p>
            </div>
            <div
                style={{ display: "flex", width: 200, padding: 5 }}
            >
                <Iso />
                <p style={{ marginLeft: 10 }}>
                    Iso <span>{shouldIsoBeDisplayed ? photo.iso : ''}</span>
                </p>
            </div>
        </div>
    )
}

export default CameraInfo;