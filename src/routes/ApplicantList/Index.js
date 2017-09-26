import React from 'react';
import { Table, Input, DatePicker, Select, Button } from 'antd';
import SearchBar from '../../components/SearchBar/Index';
import request from '../../utils/request';
import getParams from '../../utils/getParams';

const Option = Select.Option;


export default class ApplicantList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      id:'',
      data:[{id:1, name:'佟硕', mobile:'18513589199', weixin:'412571075',location:'防灾科技学院南门',content:'我要改变上车地点' },{id:2, name:'佟硕', mobile:'18513589199', weixin:'412571075',location:'防灾科技学院南门',content:'请问我可以带小孩子么？' },{id:3, name:'佟硕', mobile:'18513589199', weixin:'412571075',location:'防灾科技学院南门',content:'你说是不是很好玩啊？' },{id:4, name:'佟硕', mobile:'18513589199', weixin:'412571075',location:'防灾科技学院南门',content:'爬山累么？我体力不太好，能不能坚持下来？' }],
      loading:false,
      params:{},

    }
  }
  componentWillMount () {

  }
  componentDidMount () {
    let id = getParams('id');
    this.setState({ id })
    this.getData({ id })
  }
  getData = (params) => {
    // request('',params,'get')
    //   .then(data=>{
    //     if(data.data.code >= 0 ) {
    //       this.setState({
    //         data:data.data.lists,
    //         count:data.data.count
    //       })
    //     }
    //   })
  }
  handleSearch = (values) => {
    this.setState({
      params:{...values,id:this.state.id}
    })
    this.getData({...values, id:this.state.id})
  }
  render () {
    const {data, loading} = this.state;
    const columns = [
      {
        title:'序号',
        dataIndex:'id'
      },{
        title:'姓名',
        dataIndex:'name'
      },{
        title:'电话号',
        dataIndex:'mobile'
      },{
        title:'微信号',
        dataIndex:'weixin'
      },{
        title:'上车地点',
        dataIndex:'location'
      },{
        title:'付款状态',
        dataIndex:'pay_status'
      },{
        title:'备注',
        dataIndex:'content'
      },{
        title:'操作',
        dataIndex:'',
        render:(text,record)=>{
          const refunds = () => {
            request('',{},'POST')
              .then(data=>{
                this.getData(params);
              })
          }
          return (
            <div>
              <Button onClick={ refunds } style={{ background:'#ff173f',color:'#fff' }} >退款</Button>
            </div>
          )
        }
      }
    ];
    const childrenArr = [
      {
        label:'姓名',
        params:'name',
        type:<Input placeholder="姓名查询" />
      },{
        label:'电话号',
        params:'mobile',
        type:<Input type="number" placeholder="电话号查询" />
      },{
        label:'微信号',
        params:'weixin',
        type:<Input placeholder="微信号查询" />
      }
    ]
    return (
      <div>
        <SearchBar children={childrenArr} clickSearch={this.handleSearch} />
        <Table style={{ marginTop:15 }} columns={columns} loading={loading} dataSource={data} pagination={false} rowKey={(record)=>record.id.toString()}  />
      </div>
    )
  }
}
