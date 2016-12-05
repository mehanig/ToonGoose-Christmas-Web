import React from "react"
import Radium from "radium"

import { connect } from "react-redux"

import * as counterActions from "../actions/counterActions"
import Headline from "../components/Headline"

import GooseSelector from "./GooseSelector"

const styles = {
  button: {
    cursor: "pointer",
  },
  counter: {
    color: "blue",
    fontSize: "20px",
  }
};

@connect(state => ({
  counters: state.counters,
}))
@Radium
export default class SampleAppContainer extends React.Component {
  handleClick() {
    let {dispatch} = this.props;
    dispatch(counterActions.increaseCounter())
  }

  handleEmail() {
    let {dispatch} = this.props;
    dispatch(counterActions.sendEmail())
  }

  render() {
    let {counters} = this.props;


    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Headline>Sample App!</Headline>
            <div style={[styles.button]} onClick={() => this.handleClick()}>INCREASE</div>
            <p style={[styles.counter]}>{counters.clicks}</p>
            <p>{process.env.BASE_API_URL}</p>
            <div style={[styles.button]} onClick={() => this.handleEmail()}>{ counters.verificated ?  'You are' +
            ' logged In' : 'You are not logged In' }</div>
            <p style={[styles.counter]}>{counters.clicks}</p>
            <p>{process.env.BASE_API_URL}</p>
          </div>
        </div>

        { counters.ready ?
          <span>
            <form action="submit">
                Enter email to select gift: <input type="text" name="fname"></input>
            </form>
          </span>
          : <div></div>
        }

        <GooseSelector />
      </div>
    )
  }
}
