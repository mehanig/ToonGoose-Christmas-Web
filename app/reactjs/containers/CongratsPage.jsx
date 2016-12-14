import React from "react"

import QueueAnim from 'rc-queue-anim';
import ShareButtons from "./ShareButtons"

export default class CongratsPage extends React.Component {

  render() {

    return (
      <div className="congrats">
        <div style={{"font-size": "50px", cursor: "pointer", "text-align": "center"}} className="row">
          <div style={{display: "inline"} }>
            <QueueAnim>
              <div key="0">
                <span> Horray! Good choice! </span>
                <ShareButtons />
              </div>
            </QueueAnim>
          </div>
        </div>
      </div>
    )
  }
}