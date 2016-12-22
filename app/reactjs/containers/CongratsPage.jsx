import React from "react"

import QueueAnim from 'rc-queue-anim';
import ShareWithFriends from "./ShareWithFriends"
import { Row, Col, Form } from 'antd';

export default class CongratsPage extends React.Component {

  render() {
    const WrappedDynamicFieldSet = Form.create()(ShareWithFriends);
    return (
      <div className="congrats">
          <Row>
            <Col span={20} offset={2}>
            <QueueAnim>
              <div key="0">
                <Row className="congrats__header-text"><Col span={12}>
                    <span> You choose like a pro! <br />Your gift is on it's way to your inbox!</span>
                    <div className="goose__was-send-image"></div>
                </Col></Row>
                <Row className="congrats__header-text-2"><Col span={12}>
                    <span>Share this site with 3 friends and get a fun extra gift.</span>
                </Col></Row>
                <Row><Col span={14} offset={6}>
                    <WrappedDynamicFieldSet />
                </Col></Row>
              </div>
            </QueueAnim>
            </Col>
          </Row>
      </div>
    )
  }
}