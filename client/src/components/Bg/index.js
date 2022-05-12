import React from 'react';

const bg = () => {

    return (
        <div id="bg">
            <video autoplay muted loop id="myVideo.mp4">
                <source src="..\..\..\assets\video\winePour.mp4" type="video/mp4" />
            </video>
        </div>
    );
};

export default bg;
