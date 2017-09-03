import React from 'react';
import  './EditTaskModal.css';
import {Icon, Modal, Form, Input} from 'antd';
import {connect} from 'dva'

const FormItem = Form.Item;
const {TextArea} = Input;

class EditTaskModal extends React.Component {

  state = {
    visible: false,
    job: this.props.job
  };

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
          type: 'task/rescheduleJob',
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
      <span>
        <a onClick={this.showModal}><Icon type="edit"/>编辑</a>
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
                initialValue:this.state.job.name,
                rules: [{
                  required: true, message: 'Please input job name!',
                }],
              })(
                <Input disabled={true}/>
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="description"
              hasFeedback
            >
              {getFieldDecorator('description', {
                initialValue:this.state.job.description,
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
                initialValue:this.state.job.cronExpression,
                rules: [{
                  required: true, message: 'Please input cron expression!',
                }],
              })(
                <Input />
              )}
            </FormItem>


          </Form>
        </Modal>
      </span>
    );
  }
}

function mapStateToProps(state) {
  return state.task;
}

export default connect(mapStateToProps)(Form.create()(EditTaskModal));
