import React from "react"
import { connect } from "react-redux"
import * as counterActions from "../actions/counterActions"
import * as axios from "axios"

import { Modal, Button, Input, Alert } from 'antd';

@connect(state => ({
  counters: state.counters,
}))


export default class EmailModal extends React.Component {

   constructor(props) {
     super(props);
     this.state = {
         ModalText: 'Введитъе свои Email для выйграт прИз!',
         visible: this.props.visible || false,
         email: ""
     }
   }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  handleOk() {
    let {dispatch} = this.props;
    if (this.state.isEmailValid) {
        this.setState({confirmLoading: true});
        axios.post('/api/v1/email/', {
            email: this.state.email
        }).then(function (response) {
            this.setState({
                visible: true,
                confirmLoading: false,
            });
            // To close modal (update css propzerties)
            dispatch(counterActions.emailCancelClicked());
            dispatch(counterActions.sendEmail({response}));
        }.bind(this)).catch(function (error) {
            dispatch(counterActions.sendEmail({error}));
            this.setState({
                visible: true,
                confirmLoading: false,
                email_duplicate: true
            });
        }.bind(this));
    } else {
      this.setState({displayEmailInvalidMsg: true});
    }
  }

  handleEmailInput(e) {
      this.setState({email: e.target.value, email_duplicate: false, displayEmailInvalidMsg: false});
      this.setState({isEmailValid: this.validateEmail(e.target.value)});
  }

  handleCancel() {
    let {dispatch} = this.props;
    this.setState({
      visible: false,
    });
    dispatch(counterActions.emailCancelClicked());
  }
  render() {
    return (
      <div>
        {/*<Button type="primary" onClick={() => this.showModal()}>Open a modal dialog</Button>*/}
        <Modal title="You selected 2 gifts!"
          visible={this.state.visible}
          onOk={() => this.handleOk()}
          confirmLoading={this.state.confirmLoading}
          onCancel={() => this.handleCancel()}
          width={380}
          okText="OK"
          cancelText="Cancel"
        >
        {this.state.displayEmailInvalidMsg ?
            <Alert
                message="Please, type correct email address"
                type="error"
            /> :
            <div></div>
        }
        {this.state.email_duplicate ?
            <Alert
                message="Error"
                description="Sorry, only one gift for one person."
                type="error"
                showIcon
                closable
            /> :
            <div></div>
        }
          {/*<p>{this.state.ModalText}</p>*/}
            <div>But you only can keep one of them.</div>
            <div>Type in your email so we could send your awesome gift</div>
            <div className="example-input">
                <Input size="large" placeholder="Your email goes here" onChange={(e) => this.handleEmailInput(e)} />
            </div>
        </Modal>
      </div>
    );
  }
}