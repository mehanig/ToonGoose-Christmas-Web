import React from "react"

import QueueAnim from 'rc-queue-anim';

export default class PopupFirstHelp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      closed: false
    }
  }

  closePopup() {
    this.setState({closed: true});
  }

  render() {
    return (
      <div style={this.state.closed ? {display: "none"} : {color: "block"}} className="popup__first-help">
            <div key="0">
              <div id="modal__goose_hi" className="modal__goose" onClick={() => this.closePopup()}>
                <div className="modal__goose-content gift-bubble__main">
                  <div className="modal__goose-content-description">
                      Each goose has a present. <br/>Chose two, keep one.
                      <br /> 
                      <div className="pop-up__first-help-button"> 
                        Go! 
                      </div>
                  </div>
                </div>
              </div>
            </div>
      </div>
    )
  }
}