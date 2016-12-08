import React from "react"
import Headline from "../components/Headline"

var TweenOne = require('rc-tween-one');
var TweenOneGroup = TweenOne.TweenOneGroup;

export default class SampleApp2Container extends React.Component {
  render() {
    return (
      <div className="container">
        <TweenOneGroup>
            <div key="1">demo</div>
            <div key="2">demo</div>
        </TweenOneGroup>
      </div>
    )
  }
}
