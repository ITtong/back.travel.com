
import React from 'react';
import { Table, Input, Select, Button, Pagination, Radio, Icon } from 'antd';
import SearchBar from '../../components/SearchBar/Index';
import request from "../../utils/request";

const Option = Select.Option;
const RadioGroup = Radio.Group;


export default class ListView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data:[],
      count:0,
      loading:false,
      page:1,
      params:{},

    }
  }
  componentDidMount () {
    this.getData({page:1, page_size:20});
  }

  getData = (params={}) => {
    this.setState({loading:true})
    request('op/leader/list',params,'POST')
      .then(data=>{
        if(data.data.code >= 0) {
          this.setState({
            data:data.data.lists,
            count:data.data.count,
            loading:false,
          })
        } else {
          alert(data.data.msg);
          this.setState({loading:false,})
        }
      })
  }

  pageChange = (page) => {
    this.setState({page});
    let options = this.state.params
    options.page = page;
    this.getData(options);
  }

  handleSearch = (values) => {
    let options = {...values, page:1, page_size:20};
    this.setState({params:options});
    this.getData(options);
  }


  buttonClick = () =>{
    window.open('#/leaderNewCreate');
  }

  render () {
    const columns = [
      {
        title:'ID',
        dataIndex:'id',
      },{
        title:'领队姓名',
        dataIndex:'name'
      },{
        title:'性别',
        dataIndex:'gender'
      },{
        title:'领队电话',
        dataIndex:'mobile'
      },{
        title:'领队微信',
        dataIndex:'weixin'
      },{
        title:'带队次数',
        dataIndex:'times'
      },{
        title:'特长',
        dataIndex:'skill'
      },{
        title:'操作',
        dataIndex:'',
        render (text,record) {
          return (
            <div>
              <a href={`#/leaderNewCreate?id=${record.id}`} target="_blank" >查看详情</a>
            </div>
          )
        }
      }
    ];
    const childrenArr = [
      {
        label:'ID查询',
        params:'id',
        type:<Input placeholder="领队ID查询" />
      },{
        label:'领队姓名',
        params:'name',
        type:<Input placeholder="领队姓名查询" />
      },{
        label:'性别',
        params:'gender',
        type:<RadioGroup>
          <Radio value='0'>全部</Radio>
          <Radio value='1'><Icon type="man" /></Radio>
          <Radio value='2'><Icon type="woman" /></Radio>
        </RadioGroup>
      },{
        label:'领队电话',
        params:'mobile',
        type:<Input placeholder="领队电话查询" />
      }
    ];
    return (
      <div>
        <div style={{ paddingBottom:15 }}>
          <SearchBar children={childrenArr} clickSearch={this.handleSearch} addButton={<Button style={{ marginLeft:20 }} onClick={this.buttonClick} >添加领队</Button>} />
        </div>
        <Table columns={columns} loading={this.state.loading} pagination={false} dataSource={this.state.data} rowKey={(record)=>record.id.toString()}  />
        <Pagination style={{ marginTop:20 }} showTotal={total => `共 ${total} 条`} onChange={this.pageChange} current={this.state.page} total={this.state.count} defaultPageSize={20} />
      </div>
    )
  }
}
