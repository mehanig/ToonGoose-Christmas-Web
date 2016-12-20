import React from "react"
import { connect } from "react-redux"
import * as counterActions from "../actions/counterActions"
import * as axios from "axios"

import { message, Col, Row } from 'antd';
import QueueAnim from 'rc-queue-anim';


@connect(state => ({
  counters: state.counters,
}))

export default class PrizeSelector extends React.Component {

  handleClick(prize_id) {
    let {dispatch} = this.props;
    dispatch(counterActions.selectPrize(prize_id))
  }

  componentWillMount() {
      let {dispatch, counters} = this.props;
      axios.get("/api/v1/goose/" + counters.gooseRollId + '/').then(function (response) {
          dispatch(counterActions.rollReceived({response}));
      }).catch(function (error) {
          dispatch(counterActions.rollReceived({error}));
      });
  }

  componentDidMount() {
      message.success('Congratulations! Now Select one gift!', 4);
  }


  render() {
    let {counters} = this.props;
    let goose1class = `goose-icon goose-icon__num-${counters.selected[0]}`;
    let goose2class = `goose-icon goose-icon__num-${counters.selected[1]}`;

    return (
        <div className="prize-selector__main" style={{display: "inline", cursor: 'pointer'} }>
            <div className="prize-selector__description">
                Here’s what the geese has given you this year!<br />
                Chose a gift you wish to keep.
            </div>
            <QueueAnim>
                <div key="0">
                    <Row>
                        <Col span={8} offset={4}>
                            <div className="prize1">
                                <div className={goose1class} style={(counters.selected.includes(15)) ? {border: "1px" +
                                " solid red"} : {color: "gray"}} onClick={() => this.handleClick(1)}> </div>
                                <div style={(counters.selectedPrize === 1) ? {color: "red"} : {color: "gray"}} onClick={() => this.handleClick(1)}> Prize1: {counters.prizes[0]} </div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="prize2">
                                <div className={goose2class} style={(counters.selected.includes(15)) ? {border: "1px" +
                                " solid red"} : {color: "gray"}} onClick={() => this.handleClick(2)}> </div>
                                <div style={(counters.selectedPrize === 2) ? {color: "red"} : {color: "gray"}} onClick={() => this.handleClick(2)}> Prize2: {counters.prizes[1]} </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </QueueAnim>
        </div>
    )
  }
}