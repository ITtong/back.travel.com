import React from 'react';


import { Form, Input, Icon, Select, Row, Col, Button, DatePicker, Upload } from 'antd';
import './Index.css';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const leaderData = [{id:1, name:'佟硕'},{id:2, name:'张三'},{id:3, name:'李四'},{id:4, name:'王二麻子'}];

let uuid = 0;

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

  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
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

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...formItemLayout}
          label={`行程安排${index+1}`}
          required={true}
          key={k}
          hasFeedback
        >
          {getFieldDecorator(`${k}`, {
            //validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "请输入行程安排！",
            }],
          })(
            <TextArea rows={6} placeholder="请输入行程安排" style={{ width: '80%', marginRight: 8 }} />
          )}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </FormItem>
      );
    });
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType: 'picture',
      defaultFileList: [],
    };

    return (
      <Form onSubmit={this.handleSubmit}>
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
          {getFieldDecorator('title', {
            rules: [{
              required: true, message: '请输入活动标题!',
            }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="领队"
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

        <FormItem
          {...formItemLayout}
          label="成团人数"
          hasFeedback
        >
          {getFieldDecorator('min_num', {
            rules: [{
              required: true, message: '请输入成团人数!',
            }],
          })(
            <Input type="number" />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="人数上限"
          hasFeedback
        >
          {getFieldDecorator('max_num', {
            rules: [{
              required: true, message: '请输入人数上限!',
            }],
          })(
            <Input type="number" />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="活动概述"
          hasFeedback
        >
          {getFieldDecorator('descript', {
            rules: [{
              required: true, message: '请输入活动概述!',
            }],
          })(
            <TextArea rows={6} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="基本信息"
          hasFeedback
        >
          {getFieldDecorator('message', {
            rules: [{
              required: true, message: '请输入基本信息!',
            }],
          })(
            <TextArea rows={6} />
          )}
        </FormItem>

        {formItems}
        <FormItem {...formItemLayout} label="行程安排">
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add field
          </Button>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="上传宣传图片"
        >
          {getFieldDecorator('pictures', {
            rules: [{
              required: true, message: '请上传宣传图片!',
            }],
          })(
            <Upload {...props}>
              <Button>
                <Icon type="upload" />上传
              </Button>
            </Upload>
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
