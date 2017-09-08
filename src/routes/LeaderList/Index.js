
import React from 'react';
import { Table, Input, Select, Button } from 'antd';
import SearchBar from '../../components/SearchBar/Index';

const Option = Select.Option;

const data = [
  {
    id:1,
    name:'佟硕',
    telephone:'18513589199',
    wechat:'412571075',
    trip_num:10,
    specialty:'篮球，游泳，户外',
  },{
    id:2,
    name:'佟硕',
    telephone:'18513589199',
    wechat:'412571075',
    trip_num:10,
    specialty:'篮球，游泳，户外',
  },{
    id:3,
    name:'佟硕',
    telephone:'18513589199',
    wechat:'412571075',
    trip_num:10,
    specialty:'篮球，游泳，户外',
  },{
    id:4,
    name:'佟硕',
    telephone:'18513589199',
    wechat:'412571075',
    trip_num:10,
    specialty:'篮球，游泳，户外',
  },{
    id:5,
    name:'佟硕',
    telephone:'18513589199',
    wechat:'412571075',
    trip_num:10,
    specialty:'篮球，游泳，户外',
  },{
    id:6,
    name:'佟硕',
    telephone:'18513589199',
    wechat:'412571075',
    trip_num:10,
    specialty:'篮球，游泳，户外',
  },{
    id:7,
    name:'佟硕',
    telephone:'18513589199',
    wechat:'412571075',
    trip_num:10,
    specialty:'篮球，游泳，户外',
  }
]



export default class ListView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    }
  }

  handleSearch = (values) => {
    console.log(values);
  }


  buttonClick = () =>{
    window.open('#/leaderDetail');
  }

  render () {
    const columns = [
      {
        title:'领队姓名',
        dataIndex:'name'
      },{
        title:'领队电话',
        dataIndex:'telephone'
      },{
        title:'领队微信',
        dataIndex:'wechat'
      },{
        title:'带队次数',
        dataIndex:'trip_num'
      },{
        title:'特长',
        dataIndex:'specialty'
      },{
        title:'操作',
        dataIndex:'',
        render (text,record) {
          return (
            <div>
              <a href={`#/leaderDetail?id=${record.id}`} target="_blank" >查看详情</a>
            </div>
          )
        }
      }
    ];
    const childrenArr = [
      {
        label:'领队姓名',
        params:'name',
        type:<Input placeholder="ID查询" />
      },{
        label:'领队电话',
        params:'telephone',
        type:<Input placeholder="标题查询" />
      }
    ];
    return (
      <div>
        <div style={{ paddingBottom:15 }}>
          <SearchBar children={childrenArr} clickSearch={this.handleSearch} addButton={<Button style={{ marginLeft:20 }} onClick={this.buttonClick} >添加领队</Button>} />
        </div>
        <Table columns={columns} dataSource={data} rowKey={(record)=>record.id.toString()}  />
      </div>
    )
  }
}
