import React from 'react';


import { Form, Input, Icon, Select, Row, Col, Button, DatePicker, Upload } from 'antd';
import moment from 'moment';
import getParams from '../../utils/getParams';
import request from '../../utils/request';
import './Index.css';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const leaderData = [{id:1, name:'佟硕'},{id:2, name:'张三'},{id:3, name:'李四'},{id:4, name:'王二麻子'}];

let uuid = 0;

class ActiveNewCreateComponent extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    leaderArr:[],
    article:{},
    fileList:[],
    routingArr:[],

  };
  componentDidMount () {
    this.setState({
      leaderArr:leaderData
    })
    let id = parseInt(getParams('id'));
    if(id) {
      this.getDetailData(id);
    }
  }
  getDetailData = (id) => {
    request('op/article/data',{id},'GET')
      .then(data=>{
        if(data.data.code >= 0) {
          let fileList = data.data.article.pics.map((item, index)=> {
            return {...item, uid:index, url:item.pic_url, thumbUrl:item.pic_url}
          })
          let routingArr = data.data.article.schedules.map((item,index)=>{
            return item.content
          })
          this.setState({
            article:data.data.article,
            fileList,
            routingArr
          })
        }
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

  uploadResponse = (info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.fileList);
    }
    this.setState({ fileList:info.fileList })
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

    getFieldDecorator('keys', { initialValue: this.state.routingArr});
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
            initialValue:k
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
      action: 'http://47.93.224.33:8001/op/common/uploadImg',
      listType: 'picture',
      fileList: this.state.fileList,
      name: 'uploadFile',
      multiple:true,
      headers:{
        'X-Requested-With':null
      },
      onChange:this.uploadResponse
    };



    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="开始时间"
          hasFeedback
        >
          {getFieldDecorator('start_time', {
            rules: [{
              required: true, message: '请选择活动开始时间!',
            }],
            initialValue:moment(this.state.article.start_time,'YYYY-MM-DD') || ''
          })(
            <DatePicker style={{ width:260 }} format={"YYYY-MM-DD"} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="结束时间"
          hasFeedback
        >
          {getFieldDecorator('end_time', {
            rules: [{
              required: true, message: '请选择活动开始时间!',
            }],
            initialValue:moment(this.state.article.end_time,'YYYY-MM-DD') || ''
          })(
            <DatePicker style={{ width:260 }} format={"YYYY-MM-DD"} />
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
            initialValue:this.state.article.title || ''
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="领队"
          hasFeedback
        >
          {getFieldDecorator('leader_name', {
            rules: [{
              required: true, message: '请输入活动领队!',
            }],
            initialValue:this.state.article.leader_name || ''
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
          {getFieldDecorator('least_num', {
            rules: [{
              required: true, message: '请输入成团人数!',
            }],
            initialValue:this.state.article.least_num || ''
          })(
            <Input type="number" />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="人数上限"
          hasFeedback
        >
          {getFieldDecorator('most_num', {
            rules: [{
              required: true, message: '请输入人数上限!',
            }],
            initialValue:this.state.article.most_num || ''
          })(
            <Input type="number" />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="活动概述"
          hasFeedback
        >
          {getFieldDecorator('introduction', {
            rules: [{
              required: true, message: '请输入活动概述!',
            }],
            initialValue:this.state.article.introduction || ''
          })(
            <TextArea rows={6} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="基本信息"
          hasFeedback
        >
          {getFieldDecorator('information', {
            rules: [{
              required: true, message: '请输入基本信息!',
            }],
            initialValue:this.state.article.information || ''
          })(
            <TextArea rows={6} />
          )}
        </FormItem>

        {formItems}
        <FormItem {...formItemLayout} label="行程安排">
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> 添加行程安排
          </Button>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="费用说明"
          hasFeedback
        >
          {getFieldDecorator('price_explain', {
            rules: [{
              required: true, message: '请输入费用说明!',
            }],
            initialValue:this.state.article.price_explain || ''
          })(
            <TextArea rows={6} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="报名须知"
          hasFeedback
        >
          {getFieldDecorator('notice', {
            rules: [{
              required: true, message: '请输入报名须知!',
            }],
            initialValue:this.state.article.notice || ''
          })(
            <TextArea rows={6} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="上传宣传图片"
        >
          {getFieldDecorator('pictures', {})(
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

const ActiveNewCreate = Form.create()(ActiveNewCreateComponent);

export default ActiveNewCreate
