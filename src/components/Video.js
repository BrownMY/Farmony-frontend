import React from "react";

const Video = () => {
  return (
    <div>
      <div className="video-container">
        <p className="welcome-to-farmony"> Welcome to Farmony</p>
        <video className="homepageVideo" loop autoPlay muted>
          <source
            src="https://res.cloudinary.com/doihe1pi6/video/upload/v1621991670/production_ID_5085490_scuccu.mp4"
            type="video/mp4"
          ></source>
        </video>
      </div>
    </div>
  );
};

export default Video;
