import React, { Component } from 'react';
import { Table, Divider, Tag ,Card} from 'antd';
import { connect } from 'dva';

@connect(({ test, loading }) => ({
  test,
  loading: loading.models.test,
}))
export default class Test extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'test/fetch',
    });
    // console.log(this.props)
  }
  render() {
    // console.log(this.props.test.data)
    const {
      test: { data },
      loading,
    } = this.props;
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
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
        render: (text, record) => (
          <span>
            <a href="javascript:;">Invite {record.name}</a>
            <Divider type="vertical" />
            <a href="javascript:;">Delete</a>
          </span>
        ),
      },
    ];

    return (
      <div>
         <Card style={{ width: 700 }}>
        <Table columns={columns} dataSource={data} />
        </Card>
      </div>
    );
  }
}
