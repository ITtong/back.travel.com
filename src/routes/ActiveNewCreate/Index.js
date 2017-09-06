import React from 'react';


import { Form, Input, Icon, Select, Row, Col, Button, DatePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const leaderData = [{id:1, name:'佟硕'},{id:2, name:'张三'},{id:3, name:'李四'},{id:4, name:'王二麻子'}];

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    leaderArr:[],

  };
  componentWillMount () {
    this.setState({
      leaderArr:leaderData
    })
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="活动标题"
          hasFeedback
        >
          {getFieldDecorator('title', {
            rules: [{
              type: 'string', message: '请输入活动标题!',
            }, {
              required: true, message: '请输入活动标题!',
            }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="开始时间"
          hasFeedback
        >
          {getFieldDecorator('start_date', {
            rules: [{
              required: true, message: '请选择活动开始时间!',
            }],
          })(
            <DatePicker format={"YYYY-MM-DD"} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="结束时间"
          hasFeedback
        >
          {getFieldDecorator('end_date', {
            rules: [{
              required: true, message: '请选择活动开始时间!',
            }],
          })(
            <DatePicker format={"YYYY-MM-DD"} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="活动标题"
          hasFeedback
        >
          {getFieldDecorator('leader', {
            rules: [{
              required: true, message: '请输入活动领队!',
            }],
          })(
            <Select>
              <Option value="0">全部</Option>
              {
                this.state.leaderArr ? this.state.leaderArr.map((item,index)=>{
                  return (
                    <Option key={index} value={item.id.toString()} >{item.name}</Option>
                  )
                }) : ''
              }
            </Select>
          )}
        </FormItem>



        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">确认添加</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm
