import React from "react"
import { connect } from "react-redux"
import * as counterActions from "../actions/counterActions"


@connect(state => ({
  counters: state.counters,
}))

export default class SampleAppContainer extends React.Component {
  handleClick(goose_id) {
    let {dispatch} = this.props;
    dispatch(counterActions.selectGoose(goose_id))
  }

  render() {
    let {counters} = this.props;

    return (
        <div style={{display: "inline"} }>
            <h1 style={(counters.selected.includes(1)) ? {color: "red"} : {color: "gray"}} onClick={() => this.handleClick(1)}> Goose1 </h1>
            <h1 style={(counters.selected.includes(2)) ? {color: "red"} : {color: "gray"}} onClick={() => this.handleClick(2)}> Goose2 </h1>
            <h1 style={(counters.selected.includes(3)) ? {color: "red"} : {color: "gray"}} onClick={() => this.handleClick(3)}> Goose3 </h1>
            <h1 style={(counters.selected.includes(4)) ? {color: "red"} : {color: "gray"}} onClick={() => this.handleClick(4)}> Goose4 </h1>
            <h1 style={(counters.selected.includes(5)) ? {color: "red"} : {color: "gray"}} onClick={() => this.handleClick(5)}> Goose5 </h1>
            <h1 style={(counters.selected.includes(6)) ? {color: "red"} : {color: "gray"}} onClick={() => this.handleClick(6)}> Goose6 </h1>
            <h1 style={(counters.selected.includes(7)) ? {color: "red"} : {color: "gray"}} onClick={() => this.handleClick(7)}> Goose7 </h1>
            <h1 style={(counters.selected.includes(8)) ? {color: "red"} : {color: "gray"}} onClick={() => this.handleClick(8)}> Goose8 </h1>
            <h1 style={(counters.selected.includes(9)) ? {color: "red"} : {color: "gray"}} onClick={() => this.handleClick(9)}> Goose9 </h1>
            <h1 style={(counters.selected.includes(10)) ? {color: "red"} : {color: "gray"}} onClick={() => this.handleClick(10)}> Goose10 </h1>
            <h1 style={(counters.selected.includes(11)) ? {color: "red"} : {color: "gray"}} onClick={() => this.handleClick(11)}> Goose11 </h1>
            <h1 style={(counters.selected.includes(12)) ? {color: "red"} : {color: "gray"}} onClick={() => this.handleClick(12)}> Goose12 </h1>
        </div>
    )
  }
}