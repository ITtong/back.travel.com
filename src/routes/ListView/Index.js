import React from 'react';
import { Table, Input, DatePicker, Select, Button } from 'antd';
import SearchBar from '../../components/SearchBar/Index';

const Option = Select.Option;

const data = [
	{
		id:1,
		title:'中秋节西山徒步',
		leader:'佟硕',
		start_date:'2017-12-01',
		end_date:'2017-12-03',
		min_num:30,
		really_num:33,
		max_num:45,
		status:'火热报名中'
	},{
		id:2,
		title:'中秋节西山徒步',
		leader:'佟硕',
		start_date:'2017-12-01',
		end_date:'2017-12-03',
		min_num:30,
		really_num:33,
		max_num:45,
		status:'火热报名中'
	},{
		id:3,
		title:'中秋节西山徒步',
		leader:'佟硕',
		start_date:'2017-12-01',
		end_date:'2017-12-03',
		min_num:30,
		really_num:33,
		max_num:45,
		status:'火热报名中'
	},{
		id:4,
		title:'中秋节西山徒步',
		leader:'佟硕',
		start_date:'2017-12-01',
		end_date:'2017-12-03',
		min_num:30,
		really_num:33,
		max_num:45,
		status:'火热报名中'
	},{
		id:5,
		title:'中秋节西山徒步',
		leader:'佟硕',
		start_date:'2017-12-01',
		end_date:'2017-12-03',
		min_num:30,
		really_num:33,
		max_num:45,
		status:'火热报名中'
	},{
		id:6,
		title:'中秋节西山徒步',
		leader:'佟硕',
		start_date:'2017-12-01',
		end_date:'2017-12-03',
		min_num:30,
		really_num:33,
		max_num:45,
		status:'火热报名中'
	},{
		id:7,
		title:'中秋节西山徒步',
		leader:'佟硕',
		start_date:'2017-12-01',
		end_date:'2017-12-03',
		min_num:30,
		really_num:33,
		max_num:45,
		status:'火热报名中'
	},{
    id:8,
    title:'中秋节西山徒步',
    leader:'佟硕',
    start_date:'2017-12-01',
    end_date:'2017-12-03',
    min_num:30,
    really_num:33,
    max_num:45,
    status:'火热报名中'
  },{
    id:9,
    title:'中秋节西山徒步',
    leader:'佟硕',
    start_date:'2017-12-01',
    end_date:'2017-12-03',
    min_num:30,
    really_num:33,
    max_num:45,
    status:'火热报名中'
  },{
    id:10,
    title:'中秋节西山徒步',
    leader:'佟硕',
    start_date:'2017-12-01',
    end_date:'2017-12-03',
    min_num:30,
    really_num:33,
    max_num:45,
    status:'火热报名中'
  },{
    id:11,
    title:'中秋节西山徒步',
    leader:'佟硕',
    start_date:'2017-12-01',
    end_date:'2017-12-03',
    min_num:30,
    really_num:33,
    max_num:45,
    status:'火热报名中'
  },
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
    window.open('#/ActiveNewCreate');
  }

	render () {
		const columns = [
			{
				title:'ID',
				dataIndex:'id'
			},{
				title:'标题',
				dataIndex:'title'
			},{
				title:'领队',
				dataIndex:'leader'
			},{
				title:'起始时间',
				dataIndex:'',
				render (text,record) {
					return (
						<span>{record.start_date} 至 {record.end_date}</span>
					)
				}
			},{
				title:'成团人数',
				dataIndex:'min_num'
			},{
				title:'已报名人数',
				dataIndex:'really_num'
			},{
				title:'人数上限',
				dataIndex:'max_num'
			},{
				title:'状态',//  活动成型/火热报名中/已结束/
				dataIndex:'status',
			},{
				title:'操作',
				dataIndex:'',
				render (text,record) {
					return (
						<div>
							<a target="_blank" >查看详情</a>
						</div>
					)
				}
			}
		];
    const childrenArr = [
      {
        label:'ID',
        params:'id',
        type:<Input placeholder="ID查询" />
      },{
        label:'标题',
        params:'title',
        type:<Input placeholder="标题查询" />
      },{
        label:'领队',
        params:'leader',
        type:<Input placeholder="领队查询" />
      },{
        label:'开始时间',
        params:'start_date',
        type:<DatePicker />
      },{
        label:'状态',
        params:'status',
        type:<Select>
          <Option value="0" >全部</Option>
          <Option value="1" >报名中</Option>
          <Option value="2" >活动成型</Option>
          <Option value="3" >已结束</Option>
        </Select>,
        defaultValue:'0'
      }
    ];
		return (
			<div>
        <div style={{ paddingBottom:15 }}>
          <SearchBar children={childrenArr} clickSearch={this.handleSearch} addButton={<Button style={{ marginLeft:20 }} onClick={this.buttonClick} >创建新活动</Button>} />
        </div>
				<Table columns={columns} dataSource={data} rowKey={(record)=>record.id.toString()}  />
			</div>
		)
	}
}
