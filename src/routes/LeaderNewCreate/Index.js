import React from 'react';


import { Form, Input, Icon, Select, Row, Col, Button, DatePicker, Upload, Radio } from 'antd';
import './Index.css';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    leaderArr:[],
    fileListHeader:[],
    loading:false,

  };
  componentWillMount () {

  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading:true })
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    setTimeout(()=>{
      this.setState({ loading:false })
    },1000)
  }

  uploadCoverResponse = (info) => {
    if (info.file.status === 'done') {
      info.fileList[info.fileList.length-1].url = info.fileList[info.fileList.length-1].response.file_src;
    }
    this.setState({ fileListHeader:info.fileList })
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
    const formItemLayoutSpecial = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const props = {
      action: 'http://47.93.224.33:8001/op/common/uploadImg',
      listType: 'picture-card',
      fileList: this.state.fileListHeader,
      name: 'uploadFile',
      headers:{
        'X-Requested-With':null
      },
      onChange:this.uploadCoverResponse
    };

    return (
      <Form className="leaderNewCreateForm" layout="inline" onSubmit={this.handleSubmit} >
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
            {...formItemLayout}
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
        </div>

        <div style={{ marginTop:15 }} >
          <FormItem
            {...formItemLayout}
            label="电话"
            hasFeedback
            style={{ width:200 }}
          >
            {getFieldDecorator('tel', {
              rules: [{
                required: true, message: '请输入电话号码!',
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="微信"
            hasFeedback
            style={{ width:200 }}
          >
            {getFieldDecorator('weChat', {
              rules: [{
                required: true, message: '请输入微信号!',
              }],
            })(
              <Input />
            )}
          </FormItem>
        </div>

        <div style={{ marginTop:15 }} >
          <FormItem
            {...formItemLayoutSpecial}
            label="特长"
            hasFeedback
            style={{ width:400 }}
          >
            {getFieldDecorator('special', {
              rules: [{
                required: true, message: '请输入个人特长!',
              }],
            })(
              <TextArea style={{ width:333 }} placeholder="20字左右概括(分配路线会考虑到特长，请如实填写！)" rows={4} />
            )}
          </FormItem>
        </div>

        <div style={{ marginTop:15 }} >
          <FormItem
            {...formItemLayoutSpecial}
            label="简介"
            hasFeedback
            style={{ width:400 }}
          >
            {getFieldDecorator('leader_introduce', {
              rules: [{
                required: true, message: '请输入个人简介!',
              }],
            })(
              <TextArea style={{ width:333 }} placeholder="20字左右概括，展示出你的能力和旅行经历！" rows={4} />
            )}
          </FormItem>
        </div>

        <div style={{ marginTop:15 }} >
          <FormItem
            {...formItemLayout}
            label="上传头像"
            style={{ width:300,height:105 }}
          >
            {getFieldDecorator('header_pic', {
              rules: [{
                required: true, message: '请上传头像!',
              }],
            })(
              <Upload {...props}>
                {
                  this.state.fileListHeader.length >= 1 ? null : <div>
                    <Icon type="plus" />
                    <div className="ant-upload-text">上传</div>
                  </div>
                }
              </Upload>
            )}
          </FormItem>
        </div>
        <FormItem {...tailFormItemLayout} style={{ marginLeft:'15%', marginTop:15 }} >
          <Button loading={this.state.loading} type="primary" htmlType="submit">确认添加</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm
