import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, Select, DatePicker } from 'antd';
import styles from '../TestForm/index'
import { connect } from 'dva';
import moment from 'moment';

const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
@connect(({ test }) => ({
    data: test.form,
}))

@Form.create()
// eslint-disable-next-line



class TestForm extends React.Component {
    render() {
        const { visible, onCancel, onCreate, form, data } = this.props;
        const { getFieldDecorator } = form;
        const date=data.date
        return (
            <Modal
                visible={visible}
                title="创建新用户"
                okText="Create"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <Form.Item label="姓名">
                        {getFieldDecorator('name', {
                            initialValue: data.name,
                            rules: [{ required: true, message: '请填写姓名' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="年龄">
                        {getFieldDecorator('age', {
                            initialValue: data.age,
                        })(<Input type="textarea" />)}
                    </Form.Item>
                    <Form.Item label="性别" hasFeedback>
                        {getFieldDecorator('sex', {
                            initialValue: data.sex,
                            // rules: [{ required: true, message: '请选择性别' }],
                        })(
                            <Select placeholder="请选择性别">
                                <Select.Option value="男">男</Select.Option>
                                <Select.Option value="女">女</Select.Option>
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="出生日期">

                        {getFieldDecorator('date', {
                            initialValue: moment(date, 'YYYY-MM-DD')
                        })(<DatePicker  format={dateFormat}/>)}
                    </Form.Item>
                    <Form.Item label="家庭住址">
                        {getFieldDecorator('address', {
                            initialValue: data.address,
                        })(<Input type="textarea" />)}
                    </Form.Item>
                    <Form.Item className="collection-create-form_last-form-item">
                        {getFieldDecorator('tags', {
                            initialValue: data.public,
                        })(
                            <Radio.Group>
                                <Radio value="NICE">NICE</Radio>
                                <Radio value="LOSER">LOSER</Radio>
                                <Radio value="DEVELOPER">DEVELOPER</Radio>
                            </Radio.Group>,
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
@connect(({ test }) => ({
    test
}))
class CollectionsPage extends React.Component {
    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };
    handleCreate = () => {
        const { test, dispatch, data } = this.props;
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {

            const values1 = {
                ...values,
                'date': values['date'].format('YYYY-MM-DD'),
            };
            if (!err) {
                const { dispatch } = this.props;
                dispatch({
                    type: 'test/addData',
                    payload: values1,
                });
            }

            console.log('Received values of form: ', values1);
            form.resetFields();
            this.setState({ visible: false });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal} style={{ float: 'right' }}>
                    添加新用户
          </Button>
                <TestForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}
export default CollectionsPage