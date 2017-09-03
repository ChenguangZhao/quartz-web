import React from 'react';
import styles from './AddTaskModal.css';
import {Modal, Button, Form, Input} from 'antd'
import {connect} from 'dva';

const FormItem = Form.Item;
const {TextArea} = Input;

class AddTaskModal extends React.Component {
  state = {visible: false}
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    console.log(this.props);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.props.dispatch({
          type: 'task/addJob',
          payload: values
        });
        this.setState({
          visible: false,
        });
      }
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {

    const {getFieldDecorator} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 14},
      },
    };


    return (
      <div>
        <Button onClick={this.showModal}>Add Task</Button>
        <Modal
          title="Confirm"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleOk}>
            <FormItem
              {...formItemLayout}
              label="Job Name"
              hasFeedback
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: 'Please input job name!',
                }],
              })(
                <Input />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="description"
              hasFeedback
            >
              {getFieldDecorator('description', {
                rules: [{
                  required: true, message: 'Please input description!',
                }],
              })(
                <TextArea rows={4}/>
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="cronExpression"
              extra="Like '0/20 * * * * ?' "
              hasFeedback
            >
              {getFieldDecorator('cronExpression', {
                rules: [{
                  required: true, message: 'Please input cron expression!',
                }],
              })(
                <Input />
              )}
            </FormItem>


          </Form>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.task;
}

export default connect(mapStateToProps)(Form.create()(AddTaskModal));
