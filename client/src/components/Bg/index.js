import React from 'react';

const bg = () => {

    return (
        <div id="bg">
            <div id="bgOverlay"></div>
                <video autoPlay muted loop id="bgVideo">
                    <source src="../../assets/video/winePourSlow.mp4" type="video/mp4" />
                </video>

        </div>
    );
};

export default bg;
