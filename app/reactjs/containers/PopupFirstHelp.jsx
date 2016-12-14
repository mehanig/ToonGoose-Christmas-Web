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
              <div id="modal__goose_hi" className="modal__goose">
                <div className="modal__goose-content">
                  <span onClick={() => this.closePopup()}>x</span>
                  This is Modal Goose
                </div>
              </div>
            </div>
      </div>
    )
  }
}