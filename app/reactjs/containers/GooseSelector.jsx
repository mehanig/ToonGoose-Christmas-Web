import React from "react"
import { connect } from "react-redux"
import * as counterActions from "../actions/counterActions"

import QueueAnim from 'rc-queue-anim';
import { Button } from 'antd';

@connect(state => ({
  counters: state.counters,
}))

export default class GooseSelector extends React.Component {
  handleClick(goose_id) {
    let {dispatch} = this.props;
    dispatch(counterActions.selectGoose(goose_id))
  }

  askForEmail() {
    let {dispatch} = this.props;
    dispatch(counterActions.askForEmail())
  }

  render() {
    let {counters} = this.props;

    return (
        <div className="gooses">
            <div className="gooses__ribbon"></div>
            <div style={{"font-size": "50px", cursor: "pointer", "text-align": "center"}} className="row">
                <div style={{display: "inline"} }>
                    <QueueAnim delay={300}>
                    <div key="0">
                        <div className="goose-icon goose-icon__num-1" style={(counters.selected.includes(1)) ? {border: "1px" +
                        " solid red"} : {color: "gray"}} onClick={() => this.handleClick(1)}> </div>
                        <div className="goose-icon goose-icon__num-2" style={(counters.selected.includes(2)) ? {border: "1px" +
                        " solid red"} : {color: "gray"}} onClick={() => this.handleClick(2)}> </div>
                        <div className="goose-icon goose-icon__num-3" style={(counters.selected.includes(3)) ? {border: "1px" +
                        " solid red"} : {color: "gray"}} onClick={() => this.handleClick(3)}> </div>
                        <div className="goose-icon goose-icon__num-4" style={(counters.selected.includes(4)) ? {border: "1px" +
                        " solid red"} : {color: "gray"}} onClick={() => this.handleClick(4)}> </div>
                        <div className="goose-icon goose-icon__num-5" style={(counters.selected.includes(5)) ? {border: "1px" +
                        " solid red"} : {color: "gray"}} onClick={() => this.handleClick(5)}> </div>
                        <div className="goose-icon goose-icon__num-6" style={(counters.selected.includes(6)) ? {border: "1px" +
                        " solid red"} : {color: "gray"}} onClick={() => this.handleClick(6)}> </div>
                        <div className="goose-icon goose-icon__num-7" style={(counters.selected.includes(7)) ? {border: "1px" +
                        " solid red"} : {color: "gray"}} onClick={() => this.handleClick(7)}> </div>
                    </div>
                    <div key="1">
                        <div className="goose-icon goose-icon__num-8" style={(counters.selected.includes(8)) ? {border: "1px" +
                        " solid red"} : {color: "gray"}} onClick={() => this.handleClick(8)}> </div>
                        <div className="goose-icon goose-icon__num-9" style={(counters.selected.includes(9)) ? {border: "1px" +
                        " solid red"} : {color: "gray"}} onClick={() => this.handleClick(9)}> </div>
                        <div className="goose-icon goose-icon__num-10" style={(counters.selected.includes(10)) ? {border: "1px" +
                        " solid red"} : {color: "gray"}} onClick={() => this.handleClick(10)}> </div>
                        <div className="goose-icon goose-icon__num-11" style={(counters.selected.includes(11)) ? {border: "1px" +
                        " solid red"} : {color: "gray"}} onClick={() => this.handleClick(11)}> </div>
                        <div className="goose-icon goose-icon__num-12" style={(counters.selected.includes(12)) ? {border: "1px" +
                        " solid red"} : {color: "gray"}} onClick={() => this.handleClick(12)}> </div>
                        <div className="goose-icon goose-icon__num-13" style={(counters.selected.includes(13)) ? {border: "1px" +
                        " solid red"} : {color: "gray"}} onClick={() => this.handleClick(13)}> </div>
                        <div className="goose-icon goose-icon__num-14" style={(counters.selected.includes(14)) ? {border: "1px" +
                        " solid red"} : {color: "gray"}} onClick={() => this.handleClick(14)}> </div>
                    </div>
                    <div key="2">
                        <div className="goose-icon goose-icon__num-15" style={(counters.selected.includes(15)) ? {border: "1px" +
                        " solid red"} : {color: "gray"}} onClick={() => this.handleClick(15)}> </div>
                        <div className="goose-icon goose-icon__num-16" style={(counters.selected.includes(16)) ? {border: "1px" +
                        " solid red"} : {color: "gray"}} onClick={() => this.handleClick(16)}> </div>
                        <div className="goose-icon goose-icon__num-17" style={(counters.selected.includes(17)) ? {border: "1px" +
                        " solid red"} : {color: "gray"}} onClick={() => this.handleClick(17)}> </div>
                        <div className="goose-icon goose-icon__num-18" style={(counters.selected.includes(18)) ? {border: "1px" +
                        " solid red"} : {color: "gray"}} onClick={() => this.handleClick(18)}> </div>
                        <div className="goose-icon goose-icon__num-19" style={(counters.selected.includes(19)) ? {border: "1px" +
                        " solid red"} : {color: "gray"}} onClick={() => this.handleClick(19)}> </div>
                        <div className="goose-icon goose-icon__num-20" style={(counters.selected.includes(20)) ? {border: "1px" +
                        " solid red"} : {color: "gray"}} onClick={() => this.handleClick(20)}> </div>
                        <div className="goose-icon goose-icon__num-21" style={(counters.selected.includes(21)) ? {border: "1px" +
                        " solid red"} : {color: "gray"}} onClick={() => this.handleClick(21)}> </div>
                    </div>
                    <div key="3">
                      <div className="two__gooses-button">
                        <Button type="primary" icon="smile-o" disabled={!(counters.twoGoosesSelected)} onClick={() => this.askForEmail()}>
                          Get Prize!
                        </Button>
                      </div>
                    </div>
                    </QueueAnim>
                </div>
            </div>
        </div>
    )
  }
}