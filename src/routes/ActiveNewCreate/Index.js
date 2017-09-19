import React from 'react';


import { Form, Input, Icon, Select, Row, Col, Button, DatePicker, Upload } from 'antd';
import moment from 'moment';
import getParams from '../../utils/getParams';
import request from '../../utils/request';
import './Index.css';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;



class ActiveNewCreateComponent extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    leaderArr:[],
    article:{},
    fileList:[],
    fileListCover:[],
    routingArr:[],
    loading:false,
    schedules:[],

  };
  componentDidMount () {
    let id = parseInt(getParams('id'));
    if(id) {
      this.getDetailData(id);
    }

    request('op/leader/group',{},'GET')
      .then(data=>{
        this.setState({leaderArr:data.data})
      })
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
            uuid:data.data.article.schedules.length,
            fileListCover:[{uid:1, url:data.data.article.pic_url, thumbUrl:data.data.article.pic_url}],
            schedules:data.data.article.schedules,
            fileList,
            routingArr
          })
        } else {
          alert(data.data.msg);
        }
      })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading:true
    })
    let params = {};
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if(this.state.fileListCover.length === 0) {
          alert('请上传封面图片！');
          return;
        }
        if(this.state.fileList.length !== 3) {
          alert('请上传三张轮播图图片！');
          return;
        }
        if(this.state.schedules.length === 0) {
          alert('请填写日程安排！');
          return;
        }
        let pics = this.state.fileList.map((item,index)=> {
          return {
            pic_url:item.pic_url
          }
        })

        params = {
          start_time:values.start_time.format('YYYY-MM-DD'),
          end_time:values.end_time.format('YYYY-MM-DD'),
          title:values.title,
          price:values.price,
          leader_id:values.leader_name,
          least_num:values.least_num,
          most_num:values.most_num,
          introduction:values.introduction,
          information:values.information,
          price_explain:values.price_explain,
          notice:values.notice,
          pics:pics,
          schedules:this.state.schedules,
          pic_url:this.state.fileListCover[0].url,
        }
      }
    });
    console.log(this.state.fileList);
    console.log(params);
    let url = 'op/article/add';
    if(getParams('id')) {
      url = 'op/article/edit';
    }
    request(url,params, 'POST')
      .then(data=>{
        if(data.data.code >= 0) {
          this.setState({loading:false});
          location.href = '#/ActiveList'
        } else {
          alert(data.data.msg);
        }
      })
  }

  remove = (k) => {
    let contentArr = this.state.schedules
    contentArr.splice(k,1);
    this.setState({ schedules:contentArr })
  }

  add = () => {
    let contentArr = this.state.schedules;
    let newArr = [...contentArr, {content: '', date: ''}];
    this.setState({ schedules:newArr })
  }

  schedulesChange = (index, e) => {
    let content = this.state.schedules;
    content[index].content = e.target.value;
    this.setState({ schedules:content })
  }

  uploadResponse = (info) => {
    if (info.file.status === 'done') {
      info.fileList[info.fileList.length-1].url = info.fileList[info.fileList.length-1].response.file_src;
    }
    this.setState({ fileList:info.fileList })
  }
  uploadCoverResponse = (info) => {
    if (info.file.status === 'done') {
      info.fileList[info.fileList.length-1].url = info.fileList[info.fileList.length-1].response.file_src;
    }
    this.setState({ fileListCover:info.fileList })
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


    const props = {
      action: 'http://47.93.224.33:8001/op/common/uploadImg',
      listType: 'picture-card',
      fileList: this.state.fileList,
      name: 'uploadFile',
      multiple:true,
      headers:{
        'X-Requested-With':null
      },
      onChange:this.uploadResponse
    };
    const propsCover = {
      action: 'http://47.93.224.33:8001/op/common/uploadImg',
      listType: 'picture-card',
      fileList: this.state.fileListCover,
      name: 'uploadFile',
      headers:{
        'X-Requested-With':null
      },
      onChange:this.uploadCoverResponse
    };
    let initialDateStart = {};
    let initialDateEnd = {};
    if(getParams('id')) {
      initialDateStart = {
        rules: [{
          required: true, message: '请选择活动开始时间!',
        }],
        initialValue:moment(this.state.article.start_time,'YYYY-MM-DD')
      }
      initialDateEnd = {
        rules: [{
          required: true, message: '请选择活动结束时间!',
        }],
        initialValue:moment(this.state.article.end_time,'YYYY-MM-DD')
      }
    } else {
      initialDateStart = {
        rules: [{
          required: true, message: '请选择活动开始时间!',
        }]
      };
      initialDateEnd = {
        rules: [{
          required: true, message: '请选择活动结束时间!',
        }]
      }
    }

    return (
      <Form style={{ width:950, margin:'0 auto' }} onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="开始时间"
          hasFeedback
        >
          {getFieldDecorator('start_time', initialDateStart)(
            <DatePicker style={{ width:260 }} format={"YYYY-MM-DD"} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="结束时间"
          hasFeedback
        >
          {getFieldDecorator('end_time', initialDateEnd)(
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
          label={<sapn><span style={{ color:'#f04134',marginRight:4,fontFamily:'SimSun' }} >*</span>活动封面</sapn>}
        >
          {getFieldDecorator('picturesCover', {})(
            <Upload {...propsCover}>
              {
                this.state.fileListCover.length >= 1 ? null : <div>
                  <Icon type="plus" />
                  <div className="ant-upload-text">上传</div>
                </div>
              }
            </Upload>
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
          label="每人价格"
          hasFeedback
        >
          {getFieldDecorator('price', {
            rules: [{
              required: true, message: '请输入没人价格!',
            }],
            initialValue:this.state.article.price || ''
          })(
            <Input type="number" />
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

        {this.state.schedules ? this.state.schedules.map((item, index) => {
          return (
            <FormItem
              {...formItemLayout}
              label={`行程安排${index+1}`}
              required={true}
              key={index}
              hasFeedback
            >
              <TextArea value={this.state.schedules[index].content} onChange={this.schedulesChange.bind(this, index)} rows={6} placeholder="请输入行程安排" style={{ width: '80%', marginRight: 8 }} />

              {this.state.schedules.length > 1 ? (
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  disabled={this.state.schedules.length === 1}
                  onClick={() => this.remove(index)}
                />
              ) : null}
            </FormItem>
          );
        }) : null}
        <FormItem {...formItemLayout} label={<sapn><span style={{ color:'#f04134',marginRight:4,fontFamily:'SimSun' }} >*</span>行程安排</sapn>}>
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
          label={<sapn><span style={{ color:'#f04134',marginRight:4,fontFamily:'SimSun' }} >*</span>上传宣传图片(轮播)</sapn>}
        >
          {getFieldDecorator('pictures', {})(
            <Upload {...props}>
              {
                this.state.fileList.length >= 3 ? null : <div>
                  <Icon type="plus" />
                  <div className="ant-upload-text">上传</div>
                </div>
              }
            </Upload>
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button loading={this.state.loading} type="primary" htmlType="submit">确认添加</Button>
        </FormItem>
      </Form>
    );
  }
}

const ActiveNewCreate = Form.create()(ActiveNewCreateComponent);

export default ActiveNewCreate
