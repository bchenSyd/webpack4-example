import React, { Component, createRef } from "react";

const IFrameWrapperInternal = ({ frameSource }) => {
  const iframeRef = createRef();
  const onLoad = () => {
    const frame = iframeRef.current;
    const initHeight = `${
      frame.contentWindow.document.querySelector("#root").scrollHeight
    }px`;
    frame.height = initHeight;
    console.log(" iframe height initial  ", initHeight);
    frame.contentWindow.onResize = height => {
      console.log(" iframe height is now ", height);
      frame.height = "";
      frame.height = `${height}px`;
    };
  };
  return (
    <div>
      <iframe
        title="coral-nested-iframe"
        frameBorder="0"
        src={frameSource}
        scrolling="no"
        width="100%"
        ref={iframeRef}
        onLoad={onLoad}
      />
    </div>
  );
};

export default IFrameWrapperInternal;
