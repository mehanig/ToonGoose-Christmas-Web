import React from "react"
import * as axios from "axios"
import {connect} from "react-redux"
import * as counterActions from "../actions/counterActions"

import {Form, Input, Icon, Button, message} from 'antd';
const FormItem = Form.Item;

let uuid = 2;

@connect(state => ({
    counters: state.counters,
}))

export default class ShareWithFriends extends React.Component {

    componentWillMount() {
        this.props.form.setFieldsValue({
            keys: [0, 1, 2],
        });
    }

    remove = (k) => {
        const {form} = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length <= 3) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        uuid++;
        const {form} = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    submit = () => {
        const {getFieldsValue} = this.props.form;
        const {counters, dispatch} = this.props;
        if (this.isReadyToSubmit()) {
            axios.post("/api/v1/goose/" + counters.gooseRollId + '/', getFieldsValue()).then(function (response) {
                dispatch(counterActions.sharedEmailsSuccess());
            }).catch(function (error) {
                dispatch(counterActions.sharedEmailsFailed());
            });
        } else {
            message.error("Oops. Please, enter at least 3 different emails.");
        }
    }

    isReadyToSubmit = () => {
        const {getFieldsValue, getFieldError} = this.props.form;
        const values = getFieldsValue();
        let emails = [];
        for (let v of Object.keys(values)) {
            if (values[v]) {
                emails.push(values[v]);
            }
            if (getFieldError(v)) {
                return false;
            }
        }
        let unique = [...new Set(emails)];
        return emails.length === unique.length && unique.length > uuid;
    }

    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;
        const pattern = {
            email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        };
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20},
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {span: 20, offset: 4},
        };

        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <FormItem
                    {...(index === 0 ? formItemLayoutWithOutLabel : formItemLayoutWithOutLabel)}
                    label={index === 0 ? '' : ''}
                    required={true}
                    key={k}
                >
                    {getFieldDecorator(`email-${k}`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            pattern: pattern.email,
                            message: "Please input valid email",
                        }],
                    })(
                        <Input placeholder="Friend's email" style={{width: '60%', marginRight: 8}}/>
                    )}
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        disabled={keys.length <= 3}
                        onClick={() => this.remove(k)}
                    />
                </FormItem>
            );
        });
        return (
            <Form horizontal>
                {formItems}
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add} style={{width: '60%', 'margin-bottom': '15px'}}>
                        <Icon type="plus"/> Add email
                    </Button>
                    <Button type="solid" className="ant-btn-primary" onClick={this.submit} style={{width: '60%', 'font-size': '14px'}}>
                        <Icon type="rocket"/> Get an extra gift!
                    </Button>
                </FormItem>
            </Form>
        );
    }
}