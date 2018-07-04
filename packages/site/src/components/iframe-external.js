import React, { Component, createRef } from "react";

class IFrameWrapper extends Component {
  iframeRef = createRef();

  onIFrameLoaded = () => {
    console.log("iframe is now loaded...");
  };

  componentDidMount() {
    window.addEventListener("message", this.onPostMessage);
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.onPostMessage);
  }

  onPostMessage = e => {
    const frame = this.iframeRef.current;
    const {
      data: { message, value }
    } = e;
    switch (message) {
      case "setHeight":
        frame.height = `${value}px`;
        break;
      case "complete": {
        const { history } = this.props;
        history.push("/");
        break;
      }
    }
  };

  render() {
    const { frameSource } = this.props;
    return (
      <div>
        <iframe
          title="coral-nested-iframe"
          frameBorder="0"
          src={frameSource}
          scrolling="no"
          width="100%"
          ref={this.iframeRef}
          onLoad={this.onIFrameLoaded}
        />
      </div>
    );
  }
}

export default IFrameWrapper;
