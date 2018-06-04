import React from "react";

const IFrameWrapper = () => {
  return (
    <div>
      <iframe
        title="coral-nested-iframe"
        frameBorder="0"
        src="http://localhost:8081"
        scrolling="no"
        width="100%"
        height="500px"
      />
    </div>
  );
};

export default IFrameWrapper;
