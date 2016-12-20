import React from "react"
import { connect } from "react-redux"
import * as counterActions from "../actions/counterActions"
import * as axios from "axios"

import { message, Row, Col } from 'antd';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';


@connect(state => ({
  counters: state.counters,
}))

export default class PrizeFeed extends React.Component {

  constructor(props) {
     super(props);
     this.state = {
         feed: []
     }
  }

  handleClick(prize_id) {
    let {dispatch} = this.props;
    dispatch(counterActions.selectPrize(prize_id))
  }

  componentWillMount() {
      let {dispatch, counters} = this.props;
      axios.get("/api/v1/goose/").then(function (response) {
          console.log(response.data);
          this.setState({feed: response.data})
      }.bind(this)).catch(function (error) {
          dispatch(counterActions.rollReceived({error}));
      }.bind(this));
  }


  render() {
    let {counters} = this.props;

    return (
        <div className="prize-feed__main">
            <Row type="flex" justify="center">
                <div className="logo__Image"></div>
            </Row>
            <Row>
                <Col span={6} offset={3}>
                    <QueueAnim delay={300}>
                        {this.state.feed.filter((el, index) => {if (!(index % 2)) return el;}).map(function(prize, index){
                            return <div className="prize-feed__item" key={index} onClick={() => this.handleClick(0)}> {prize.email_hidden}: {prize.selected_descr} </div>
                        })}
                    </QueueAnim>
                </Col>
                <Col span={6} offset={6}>
                    <QueueAnim delay={300}>
                        {this.state.feed.filter((el, index) => {if (index % 2) return el;}).map(function(prize, index){
                            return <div className="prize-feed__item" key={index} onClick={() => this.handleClick(0)}> {prize.email_hidden}: {prize.selected_descr} </div>
                        })}
                    </QueueAnim>
                </Col>
            </Row>
            <Row type="flex" justify="center">
                <div className="prize-feed__logo-image"></div>
            </Row>
        </div>
    )
  }
}