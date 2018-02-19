import React, { Component } from "react";
import axios from "axios";
import { Layout, Menu, Breadcrumb, Table, Input, Popconfirm, Row, Col, Icon } from "antd";

const { Header, Content, Footer } = Layout;

const EditableCell = ({ editable, value, onChange }) => (
	<div>
		{editable
		? <Input style={{ margin: "-5px 0" }} value={value} onChange={e => onChange(e.target.value)} />
		: value}
	</div>
);

class App extends Component {

	constructor(props) {
		super(props);
		this.columns = [
			{ title: "Vorname", dataIndex: "firstName", key: "firstName", render: (text, record) => this.renderColumns(text, record, "firstName") },
			{ title: "Nachname", dataIndex: "lastName", key: "lastName", render: (text, record) => this.renderColumns(text, record, "lastName") },
			{ title: "Beruf", dataIndex: "jobTitle", key: "jobTitle", render: (text, record) => this.renderColumns(text, record, "jobTitle") },
			{
				title: "Aktionen",
				dataIndex: "operation",
				width: "20%",
				render: (text, record) => {
					const { editable } = record;
					return (
						<div className="editable-row-operations">
							{
								editable ? (
									<span>
										<a onClick={() => this.save(record.id)}><Icon style={{ fontSize: 18 }} type="save" /></a>
										<Popconfirm title="Sicher?" onConfirm={() => this.cancel(record.id)}>
											<a><Icon style={{ fontSize: 16 }} type="close-circle-o" /></a>
										</Popconfirm>
									</span>
								) : (
									<a onClick={() => this.edit(record.id)}><Icon style={{ fontSize: 16 }} type="edit" /></a>
								)
							}
						</div>
					);
				}
			}
		];
	}

	state = {
		employees: [],
		isLoading: true
	}

	async componentDidMount() {
		let apiResult = await axios.get("http://localhost:8081/employee");
		this.setState({
			isLoading: false,
			employees: apiResult.data
		});
	}

	renderColumns(text, record, column) {
		return (
			<EditableCell
				editable={record.editable}
				value={text}
				onChange={value => this.handleChange(value, record.id, column)}
			/>
		);
	}

	edit(key) {
		const newData = [...this.state.employees];
		const target = newData.filter(item => item.id === key)[0];

		this.targetDataBeforeEdit = Object.assign({}, target);

		if(target) {
			target.editable = true;
			this.setState({ employees: newData });
		}
	}

	cancel(key) {
		const newData = Object.assign([], this.state.employees);

		const updated = newData.map(employee => {
			if(employee.id === key) {
				employee = this.targetDataBeforeEdit;
			}
			return employee;
		});
			
		this.setState({ employees: updated })
	}

	async save(key) {
		const newData = [...this.state.employees];
		const target = newData.filter(item => item.id === key)[0];
		if(target) {
			delete target.editable;
			let apiResult = await axios.patch("http://localhost:8081/employee/" + target.id, target);
			if(apiResult.status === 200) {
				let fetchEmployees = await axios.get("http://localhost:8081/employee");
				this.setState({
					employees: fetchEmployees.data
				});
			}
		}
	}

	handleChange(value, key, column) {
		const newData = [...this.state.employees];
		const target = newData.filter(item => item.id === key)[0];

		if(target) {
			target[column] = value;
			this.setState({ employees: newData });
		}
	}

	render() {
		return (
			<Layout className="layout">
				<Header>
					<div className="logo" />
					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={['2']}
						style={{ lineHeight: '64px' }}
					>
						<Menu.Item key="1">nav 1</Menu.Item>
						<Menu.Item key="2">nav 2</Menu.Item>
						<Menu.Item key="3">nav 3</Menu.Item>
					</Menu>
				</Header>
				<Content style={{ padding: '0 50px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>List</Breadcrumb.Item>
						<Breadcrumb.Item>App</Breadcrumb.Item>
					</Breadcrumb>
					<div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
						{this.state.isLoading ? (
							<div>loading...</div>
						) : (
							<Row>
								<Col lg={12} md={24}>
									<h2>Mitarbeiter</h2>
									<Table bordered rowKey="id" dataSource={this.state.employees} columns={this.columns} pagination={{ pageSize: 5 }} />
								</Col>
							</Row>
						)}
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					Ant Design ©2016 Created by Ant UED
				</Footer>
			</Layout>
		);
	}

}

export default App;
