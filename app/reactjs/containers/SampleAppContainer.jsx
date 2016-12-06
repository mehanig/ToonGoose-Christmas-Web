import React from "react"
import Radium from "radium"
import ReduxThunk from 'redux-thunk'
import * as axios from "axios"

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
    axios.post('/email', {
      email: "user@example.com"
    }).then(function (response) {
      dispatch(counterActions.sendEmail({response}));
    }).catch(function (error) {
      dispatch(counterActions.sendEmail({error}));
    });
  }

  render() {
    let {counters} = this.props;


    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Headline>Sample App!</Headline>
            <p>{process.env.BASE_API_URL}</p>
            <div style={[styles.button]} onClick={() => this.handleEmail()}>{ counters.verificated ?  "email sent" : "email NOT sent" }</div>
            <p style={[styles.counter]}>{counters.clicks}</p>
            <p>{process.env.BASE_API_URL}</p>
          </div>
        </div>

        { counters.ready ?
          <span>
            <form action="submit">
                Enter email to select gift: <input type="text" name="fname"></input>
            </form>
            <button onClick={() => this.handleEmail()}>
                Send Email
            </button>
          </span>
          : <div></div>
        }

        <GooseSelector />
      </div>
    )
  }
}
