import React from "react"
import Radium from "radium"
import ReduxThunk from 'redux-thunk'
import * as axios from "axios"

import { connect } from "react-redux"

import * as counterActions from "../actions/counterActions"
import Headline from "../components/Headline"

import GooseSelector from "./GooseSelector"
import PrizeSelector from "./PrizeSelector"
import EmailModal from "./EmailModal"
import PrizeFeed from "./PrizeFeed"
import PrizePool from "./PrizePool"

import { Button, Row, Col } from 'antd';

import 'antd/dist/antd.css';
import '../app.css';

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
    background: '#AAA'
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

   constructor(props) {
     super(props);
     this.state = {
        loading: false,
        iconLoading: false
     }
   }

  submitPrize() {
    let {counters} = this.props;
    this.setState({loading: true, iconLoading: true});
    alert("Заебись, вы выйграли: " + counters.prizes[counters.selectedPrize]);
  }

  render() {
    let {counters} = this.props;

    return (
      <div className="container_main">
        <div className="row app-header">
            <div className="col-24" style={[styles.centerTextContent]}>
                <h1>Toongoose Christmas</h1>
            </div>
        </div>
        <Row>
        <Col span={4}>
            Prizes:
            <PrizePool />
        </Col>
        <Col span={20}>
        { counters.ready ?
          <span>
            {/*Enter email to select gift: <input type="text" onChange={(val) => this.onEmailChange(val)}></input>*/}
            <EmailModal visible={true}/>
            {/*<button type="button" disabled={!this.state.isEmailInvalid} onClick={() => this.handleEmail()}>*/}
              {/*Send Email*/}
            {/*</button>*/}
          </span>
          : <div></div>
        }

        { counters.gooseRollId ?
            <PrizeSelector />
            :
            <GooseSelector />
        }
        { (counters.selectedPrize !== false) || counters.gooseRollId ?
            <div className="select-prize__button">
              <Button type="primary" icon="rocket" disabled={!(counters.selectedPrize !== false)} loading={this.state.iconLoading} onClick={() => this.submitPrize()}>
                Get Prize!
              </Button>
             </div>
            : (<div></div>)
        }
        <div className="row">
            <div className="col-24" style={[styles.centerTextContent]}>
                <h1>Who's got what already:</h1>
                <PrizeFeed />
            </div>
        </div>
        </Col>
        </Row>
      </div>
    )
  }
}
