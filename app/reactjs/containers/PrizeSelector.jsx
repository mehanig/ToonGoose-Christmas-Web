import React from "react"
import { connect } from "react-redux"
import * as counterActions from "../actions/counterActions"
import * as axios from "axios"


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
      axios.get("/api/v1/goose/" + counters.gooseRollId).then(function (response) {
          dispatch(counterActions.rollReceived({response}));
      }).catch(function (error) {
          dispatch(counterActions.rollReceived({error}));
      });
  }

  render() {
    let {counters} = this.props;

    return (
        <div style={{display: "inline", cursor: 'pointer'} }>
            <h1 style={(counters.selectedPrize === 0) ? {color: "red"} : {color: "gray"}} onClick={() => this.handleClick(0)}> Prize1: {counters.prizes[0]} </h1>
            <h1 style={(counters.selectedPrize === 1) ? {color: "red"} : {color: "gray"}} onClick={() => this.handleClick(1)}> Prize2: {counters.prizes[1]} </h1>
        </div>
    )
  }
}