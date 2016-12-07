import React from "react"
import Radium from "radium"
import ReduxThunk from 'redux-thunk'
import * as axios from "axios"

import { connect } from "react-redux"

import * as counterActions from "../actions/counterActions"
import Headline from "../components/Headline"

import GooseSelector from "./GooseSelector"
import PrizeSelector from "./PrizeSelector"

const styles = {
  button: {
    cursor: "pointer",
  },
  counter: {
    color: "blue",
    fontSize: "20px",
  },
  centerTextContent: {
    textAlign: 'center',
  }
};

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

@connect(state => ({
  counters: state.counters,

}))
@Radium
export default class SampleAppContainer extends React.Component {

  handleEmail() {
    let {dispatch} = this.props;
    axios.post('/api/v1/email/', {
      email: this.state.email
    }).then(function (response) {
      dispatch(counterActions.sendEmail({response}));
    }).catch(function (error) {
      dispatch(counterActions.sendEmail({error}));
      alert("Ты че псина, второй приз захотел?")
    });
  }

  submitPrize() {
    let {counters} = this.props;
    alert("Заебись, вы выйграли: " + counters.prizes[counters.selectedPrize]);
  }


  onEmailChange(email) {
      this.setState({email: email.target.value});
      this.setState({isEmailInvalid: validateEmail(this.state.email)});
      console.log(this.state.email);
      console.log(this.state.isEmailInvalid);
  }

  render() {
    let {counters} = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12" style={[styles.centerTextContent]}>
            <h1>Toongoose Christmas</h1>
            <p>{process.env.BASE_API_URL}</p>
            <div style={[styles.button]} onClick={() => this.handleEmail()}>{ counters.verificated ?  "email sent" : "email NOT sent" }</div>
          </div>
        </div>

        { counters.ready ?
          <span>
            Enter email to select gift: <input type="text" onChange={(val) => this.onEmailChange(val)}></input>
            <button type="button" disabled={!this.state.isEmailInvalid} onClick={() => this.handleEmail()}>
              Send Email
            </button>
          </span>
          : <div></div>
        }

        { counters.gooseRollId ? <PrizeSelector /> : <GooseSelector /> }
        { counters.selectedPrize !== false ?
            (<button onClick={() => this.submitPrize()}>Get Prize</button>)
            : (<div></div>)
        }
      </div>
    )
  }
}
