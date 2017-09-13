import React from 'react';


import { Form, Input, Icon, Select, Row, Col, Button, DatePicker, Upload, Radio } from 'antd';
import './Index.css';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;


class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    leaderArr:[],

  };
  componentWillMount () {

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
    const formItemLayoutSex = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType: 'picture',
      defaultFileList: [],
    };


    return (
      <Form layout="inline" onSubmit={this.handleSubmit} style={{ overflow:'hidden' }} >
        <div>
          <FormItem
            {...formItemLayout}
            label="姓名"
            hasFeedback
            style={{ width:200 }}
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请输入姓名!',
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayoutSex}
            label="性别"
            style={{ width:200 }}
          >
            {getFieldDecorator('sex', {
              rules: [{
                required: true, message: '请选择性别!',
              }],
            })(
              <RadioGroup>
                <Radio value='man'><Icon type="man" /></Radio>
                <Radio value='woman'><Icon type="woman" /></Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="电话"
            hasFeedback
            style={{ width:300 }}
          >
            {getFieldDecorator('tel', {
              rules: [{
                required: true, message: '请输入电话号码!',
              }],
            })(
              <Input />
            )}
          </FormItem>
        </div>




        {/*<FormItem*/}
          {/*{...formItemLayout}*/}
          {/*label="上传宣传图片"*/}
        {/*>*/}
          {/*{getFieldDecorator('pictures', {*/}
            {/*rules: [{*/}
              {/*required: true, message: '请上传宣传图片!',*/}
            {/*}],*/}
          {/*})(*/}
            {/*<Upload {...props}>*/}
              {/*<Button>*/}
                {/*<Icon type="upload" />上传*/}
              {/*</Button>*/}
            {/*</Upload>*/}
          {/*)}*/}
        {/*</FormItem>*/}



        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">确认添加</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm
