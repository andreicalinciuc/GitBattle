import React, { PureComponent } from "react";
import "../components/Home/home.css";

export default class NotReady extends PureComponent {
  render() {
    return (
      <div className="not-ready-container">
        <p className="home-description">Come back after you're ready</p>
        <iframe
          width="60%"
          height="70%"
          src="https://www.youtube.com/embed/wtFPIOV2bWM?&autoplay=1&controls=0" frameborder="0" allowfullscreen
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>
    );
  }
}
