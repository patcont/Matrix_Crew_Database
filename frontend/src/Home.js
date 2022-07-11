import React, { Component } from "react";
import Fade from 'react-reveal/Fade';

export class Home extends Component {
  render() {
    return (
      <div class="neo">
      <Fade top >
    <img src={require("./images/neo.jpg")} height="500rem" width="800rem"/>
      </Fade>
      </div>
    );
  }
}
