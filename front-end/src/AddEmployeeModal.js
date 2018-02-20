import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form, Input, Row, Col, DatePicker } from "antd";
import axios from "axios";

const FormItem = Form.Item;

function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AddEmployeeModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			firstName: "",
			lastName: "",
			jobTitle: ""
		};
	}

	static propTypes = {
		visible: PropTypes.bool.isRequired
	};

	handleFieldChange = e => {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name]: value
		});
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields(async (err, values) => {
			let valuesToSubmit = {
				...values,
				entryDate: values["entryDate"].format("YYYY-MM-DD")
			};
			console.log(valuesToSubmit);
			if(!err) {
				let apiResult = await axios.post("http://localhost:8081/employee/add", valuesToSubmit);
				if(apiResult.status === 200) {
					this.props.onCancel();
					this.props.form.resetFields();
					// Refresh form.
					// god damn it, we need Redux
				}
			}
		});
	}

	render() {
		const { getFieldDecorator, getFieldsError } = this.props.form;
		return (
			<Modal
				visible={this.props.visible}
				onCancel={this.props.onCancel}
				onOk={this.handleSubmit}
				okText="Hinzufügen"
				cancelText="Abbrechen"
				title="Mitarbeiter hinzufügen"
			>
				<Form onSubmit={this.handleSubmit}>
					<Row>
						<FormItem>
							{getFieldDecorator("firstName", {
								rules: [{ required: true, message: "Bitte gebe einen Vornamen an." }]
							})(
								<Input placeholder="Max" />
							)}
						</FormItem>
						<FormItem>
							{getFieldDecorator("lastName", {
								rules: [{ required: true, message: "Bitte gebe einen Nachnamen an." }]
							})(
								<Input placeholder="Mustermann" />
							)}
						</FormItem>
						<FormItem>
							{getFieldDecorator("jobTitle", {
								rules: [{ required: true, message: "Bitte gebe einen Beruf an." }]
							})(
								<Input placeholder="Fachinformatiker" />
							)}
						</FormItem>
						<FormItem>
							{getFieldDecorator("entryDate", {
								rules: [{ type: "object", required: true, message: "Bitte gebe ein Eintrittsdatum an." }]
							})(
								<DatePicker />
							)}
						</FormItem>
					</Row>
					<FormItem>
						{/* <Button
							type="primary"
							htmlType="submit"
							disabled={hasErrors(getFieldsError())}
						>
							Hinzufügen
						</Button> */}
					</FormItem>
				</Form>
			</Modal>
		);
	}

}

export default Form.create()(AddEmployeeModal);