
import React from 'react';
import {Table, Input, DatePicker, Select, Button, Tag, Pagination, Modal} from 'antd';
import SearchBar from '../../components/SearchBar/Index';
import request from '../../utils/request';

export default class ShoppingMsgList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      dataList:[],
      count:0,
      page:1,
      loading:false,
      options:{},


    }
  }
  componentWillMount () {

  }
  componentDidMount () {
    this.getData({page:1, page_size:50});
  }
  getData = (params) => {
    this.setState({loading:true});
    request('op/collection/list', params, 'GET')
      .then(data=> {
        if(data.data.code>=0) {
          this.setState({
            dataList:data.data.lists,
            count:data.data.count,
            loading:false
          })
        } else {
          alert(data.msg);
          this.setState({loading:false})
        }

      })
  }

  handleSearch = (values) => {
    console.log(values);
    let options = values;
    options.tour_time_start = options.tour_time_start ? options.tour_time_start.format('YYYY-MM-DD') : '';
    options.tour_time_end = options.tour_time_end ? options.tour_time_end.format('YYYY-MM-DD') : '';
    options.page = this.state.page;
    options.page_size = 50
    this.getData(options)
    this.setState({ options });
  }

  pageChange = (page) => {
    let options = {...this.state.options, page};
    this.setState({options});
    this.getData(options);
  }
  render () {
    const columns = [
      {
        width:151,
        key:'1',
        title:"操作",
        render:(text,record)=> {
          const exportThis = () => {
            window.open(`http://47.93.224.33:8001/op/collection/excel?id=${record.id}`)
          }
          const deleteThis = () => {
            if(confirm('确定删除吗？')) {
              request('/op/collection/del', {ids:[record.id]}, 'POST')
                .then(data=>{
                  if(data.data.code >=0) {
                    this.getData(this.state.options);
                  } else {
                    alert(data.data.msg);
                  }
                })
            }
          }
          return <div>
            <Button onClick={exportThis} >导出</Button>
            <Button style={{ marginLeft:15 }} onClick={deleteThis} >删除</Button>
          </div>
        }
      },
      {
        width:30,
        key:'2',
        title:'ID',
        dataIndex:'id'
      },
      {
        key:'3',
        title:"Outlet名称",
        dataIndex:"outlet_name"
      },
      {
        key:'4',
        title:"日期",
        dataIndex:"tour_time"
      },
      {
        key:'5',
        title:"客人人数",
        dataIndex:"tourist_num"
      },
      {
        key:'6',
        title:"司机+导游人数",
        dataIndex:"guide_num"
      },
      {
        key:'7',
        title:"导游姓名",
        dataIndex:"guide_name"
      },
      {
        key:'8',
        title:"导游姓名拼音",
        dataIndex:"guide_name_py"
      },
      {
        key:'9',
        title:"导游性别",
        render: (text,record)=> record === 1 ? <span>男</span> : <span>女</span>
      },
      {
        key:'10',
        title:"导游电话",
        dataIndex:"guide_mobile"
      },
      {
        key:'11',
        title:"导游微信",
        dataIndex:"guide_weixin"
      },
      {
        key:'12',
        title:"导游E-mail",
        dataIndex:"guide_email"
      },
      {
        key:'13',
        title:"付款方式",
        dataIndex:"pay_method"
      }
    ];
    const childrenArr = [
      {
        label:'ID',
        params:'id',
        type:<Input type="number" placeholder="ID查询" />
      },
      {
        label:'日期',
        params:'tour_time_start',
        type:<DatePicker style={{ width:'100%' }} />
      },
      {
        label:'至',
        params:'tour_time_end',
        type:<DatePicker style={{ width:'100%' }} />
      },
      {
        label:'导游中文',
        params:'guide_name',
        type:<Input placeholder="导游姓名查询" />
      },
      {
        label:'导游拼音',
        params:'guide_name_py',
        type:<Input placeholder="导游姓名拼音查询" />
      },
      {
        label:'导游电话',
        params:'guide_mobile',
        type:<Input placeholder="导游电话查询" />
      },
    ]
    return (
      <div>
        <SearchBar children={childrenArr} clickSearch={this.handleSearch} />
        <Table style={{ marginTop:20 }} columns={columns} loading={this.state.loading} dataSource={this.state.dataList} pagination={false} rowKey={(record)=>record.id}  />
        <Pagination style={{ marginTop:20 }} showTotal={total => `共 ${total} 条`} onChange={this.pageChange} current={this.state.page} total={this.state.count} defaultPageSize={50} />
      </div>
    )
  }
}

