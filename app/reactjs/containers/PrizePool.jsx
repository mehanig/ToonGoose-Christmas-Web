import React from "react"
import { connect } from "react-redux"
import * as counterActions from "../actions/counterActions"
import * as axios from "axios"

import { message } from 'antd';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';


@connect(state => ({
  counters: state.counters,
}))

export default class PrizePool extends React.Component {

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
      axios.get("/api/v1/prize-pool/").then(function (response) {
        //   console.log(response.data);
          this.setState({feed: response.data})
      }.bind(this)).catch(function (error) {
          dispatch(counterActions.rollReceived({error}));
      }.bind(this));
  }


  render() {
    let {counters} = this.props;

    return (
        <div className="prize-feed__main" style={{display: "inline", cursor: 'pointer'}}>
            <QueueAnim>
                {this.state.feed.map(function(prize){
                    return <div onClick={() => this.handleClick(0)}> {prize[0]}: {prize[1]} </div>
                })}
            </QueueAnim>
        </div>
    )
  }
}