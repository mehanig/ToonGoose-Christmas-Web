import React from "react"


import { Form, Input, Icon, Button } from 'antd';
const FormItem = Form.Item;

let uuid = 2;
export default class ShareWithFriends extends React.Component {

  componentWillMount() {
    this.props.form.setFieldsValue({
      keys: [0,1,2],
    });
  }

  remove = (k) => {
    const { form } = this.props;
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
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: { span: 20, offset: 4 },
    };

    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayoutWithOutLabel : formItemLayoutWithOutLabel)}
          label={index === 0 ? '' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`names-${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "Please input valid email",
            }],
          })(
            <Input placeholder="Friend's email" style={{ width: '60%', marginRight: 8 }} />
          )}
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        </FormItem>
      );
    });
    return (
      <Form horizontal>
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' , 'margin-bottom': '15px'}}>
            <Icon type="plus" /> Add email
          </Button>
          <Button type="solid" onClick={this.add} style={{ width: '60%', 'font-size': '14px' }}>
            <Icon type="rocket" /> Get an extra gift!
          </Button>
        </FormItem>
      </Form>
    );
  }
}