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
import CongratsPage from "./CongratsPage"
import PopupFirstHelp from "./PopupFirstHelp"

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


  componentDidMount() {
    if (localStorage) {
      const is_firsts_visit = localStorage.getItem('itsmyfirsttime') !== 'false';
      if (is_firsts_visit) {
        localStorage.setItem('itsmyfirsttime', 'true');
        // this.setState({is_first_visit: true});
        window.setTimeout(() => { this.setState({is_first_visit: true})}, 2000);
      }
    }
  }

  submitPrize() {
    let { dispatch, counters } = this.props;
    this.setState({loading: true, iconLoading: true});
    axios.post('/api/v1/selected_prize/', {
      id: counters.gooseRollId,
      selected: counters.selectedPrize
    }).then(function (response) {
      this.setState({
        visible: false,
        confirmLoading: false,
        finalScreen: true,
        finalPrize: response.data.selected
      });
      dispatch(counterActions.selectedPrize({response}));
    }.bind(this)).catch(function (error) {
      dispatch(counterActions.selectedPrize({error}));
      this.setState({
        visible: true,
        confirmLoading: false,
        prize_approved_error: true
      });
    }.bind(this));
  }

  render() {
    let {counters} = this.props;

    return (
      <div className="container_main">
        <div className="row app-header">
            <div className="col-24 app-logo-header">
            </div>
        </div>
        <Row>
        {  this.state.finalPrize ?
          <Col span={24}>
            <CongratsPage />
          </Col>
          :
          <Col span={24}>
            { counters.ready ?
              <span> <EmailModal visible={true}/></span>
              :
              <div></div>
            }
            { counters.gooseRollId ?
              <PrizeSelector />
              :
              <GooseSelector />
            }
            { (counters.selectedPrize !== false) || counters.gooseRollId ?
              <div className="select-prize__button">
                <Button type="primary" icon="rocket" disabled={!(counters.selectedPrize !== false)}
                        loading={this.state.iconLoading} onClick={() => this.submitPrize()}>
                  Get Prize!
                </Button>
              </div>
              :
              <div></div>
            }
          </Col>
        }
        </Row>
        <Row>
          <Col span={16} offset={4}>
            <PrizeFeed />
          </Col>
        </Row>
        { this.state.is_first_visit ? <PopupFirstHelp /> : <span></span> }
      </div>
    )
  }
}
