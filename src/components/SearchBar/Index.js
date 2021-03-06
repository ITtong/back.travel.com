
import React from 'react';

import { Form, Row, Col, Button, Icon } from 'antd';
const FormItem = Form.Item;


class SearchBarComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      childrenData:[],
      defaultObj:{},
      addButton:''
    }
  }

  componentWillMount () {
    this.setState({
      childrenData:this.props.children,
      addButton:this.props.addButton
    })
  }
  componentDidMount () {
    let obj = {};
    this.state.childrenData ? this.state.childrenData.map((item,index)=>{
      if(item.defaultValue) {
        obj[item.params] = item.defaultValue;
      }
    }):''
    this.setState({
      defaultObj:obj
    })
    this.props.form.setFieldsValue (obj)
  }

  componentWillReceiveProps (nextProps) {
    this.setState ({
      childrenData:nextProps.children,
      addButton:nextProps.addButton
    })
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      //console.log('Received values of form: ', values);
      for(let key in values) {
        if(values[key] === undefined) {
          values[key] = ''
        }
      }
      this.props.clickSearch(values);
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
    this.props.form.setFieldsValue (this.state.defaultObj)
  }


  // To generate mock Form.Item
  getFields() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    const children = this.state.childrenData ? this.state.childrenData.map((item, index)=>{
      return (
        <Col span={8} key={index} >
          <FormItem {...formItemLayout} label={item.label}>
            {getFieldDecorator(item.params)(
              item.type
            )}
          </FormItem>
        </Col>
      )
    }):''

    return children;
  }

  render() {
    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <Row gutter={40}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              清除条件
            </Button>
            {
              this.state.addButton
            }
          </Col>
        </Row>
      </Form>
    );
  }
}


const SearchBar = Form.create()(SearchBarComponent);
export default SearchBar;
