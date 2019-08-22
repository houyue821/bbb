import React, { Component } from 'react';
import { Table, Divider, Tag ,Card,Popconfirm,Button,Icon,message,Input,Drawer,Modal} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TestForm from '@/components/TestForm'
@connect(({ test, loading }) => ({
  test,
  loading: loading.models.test,
}))
export default class Test extends Component {
  
    state = {
      isLoading:true,
      count: 2,
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'test/fetch',
    });
    console.log("componentDidMount")
  }
  handleDelete = key => {
    const { dispatch } = this.props;
    dispatch({
      type: 'test/remove',
      payload: {key},
    })
    console.log(this.props.test.data)
  };

  state = { visible: false ,detail_name:'',detail:[]};
  showDrawer = (item) => {
      this.setState({
      visible: true,
    });
    this.state.detail=[item]
    this.state.detail_name=item.name
    console.log(this.state.detail)
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
searchList=(value)=>{
  console.log(value)
  const { dispatch } = this.props;
  dispatch({
    type: 'test/fetch',
    payload: {desc:value},
  })
}


  render() {
    console.log('render')
    const {
      test: { data },
      loading,
    } = this.props;
    const pagination1={
      pageSize:3
    }
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        // render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '出生日期',
        dataIndex: 'date',
        key: 'date',
        render: text => moment(text).format('YYYY-MM-DD'),
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <span>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) =>
          this.props.test.data.length >= 1 ? (
            <span>
           <a onClick={()=>this.showDrawer(record)}>
          Open
          </a>
        <Divider type="vertical" />
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
            </span>
          ) : null,
      },
    ];
    
    const { Search } = Input;
    return (
      <div>
        <PageHeaderWrapper>
         <Card style={{ width: '100%' }}>
        <Drawer
          title="信息详情"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          mask={false}
          closable={true}
          getContainer={false}
          style={{ position: 'absolute'}}
          width={500}
        >
          <div>
        {
          this.state.detail?(
          this.state.detail.map(function(value,key) {
            return(
              <div key={key}>
              <p>姓名：{value.name}</p>
              <p>出生日期：{value.address}</p>
              <p>年龄：{value.age}</p>
              </div>
            )
            })
            ):''
        }
        </div>
        </Drawer>
         <Search style={{width:300,float:'left'}} placeholder="input search text" onSearch={this.searchList.bind(this) } enterButton />
         <TestForm />
         </Card>
         <Card style={{ width: '100%' }}>
        <Table columns={columns} dataSource={this.props.test.data} loading={loading} pagination={pagination1}/>
        </Card>
        </PageHeaderWrapper>
      </div>
    );
  }
}
 