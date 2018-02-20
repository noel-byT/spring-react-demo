import React, { Component } from "react";
import axios from "axios";
import { Layout, Menu, Breadcrumb, Table, Input, Popconfirm, Row, Col, Icon, Button } from "antd";

import AddEmployeeModal from "./AddEmployeeModal";

const { Header, Content, Footer } = Layout;

const EditableCell = ({ editable, value, onChange }) => (
	<div>
		{editable
		? <Input style={{ margin: "-5px 0" }} value={value} onChange={e => onChange(e.target.value)} />
		: value}
	</div>
);

const sortByAlphabet = (a, b, fieldName) => {
	let nameA = a[fieldName].toLowerCase();
	let nameB = b[fieldName].toLowerCase();

	if(nameA < nameB) {
		return -1;
	}

	if(nameA > nameB) {
		return 1;
	}

	return 0;
}

const getSortType = (sort) => {
	if(sort === "descend") {
		return "desc";
	}

	if(sort === "ascend") {
		return "asc";
	}
}

class App extends Component {

	constructor(props) {
		super(props);
		/*
			TODO: Bei einer Sort Änderung, sollten die Parameter abgespeichert werden und die
			Sortierung serverseitig ablaufen oder soll alles im Client gemacht werden?
		*/
		this.columns = [
			{
				title: "Vorname",
				dataIndex: "firstName",
				key: "firstName",
				render: (text, record) => this.renderColumns(text, record, "firstName"),
				// sorter: (a, b) => sortByAlphabet(a, b, "firstName")
				sorter: true
			},
			{
				title: "Nachname",
				dataIndex: "lastName",
				key: "lastName",
				render: (text, record) => this.renderColumns(text, record, "lastName"),
				// sorter: (a, b) => sortByAlphabet(a, b, "lastName")
				sorter: true
			},
			{
				title: "Beruf",
				dataIndex: "jobTitle",
				key: "jobTitle",
				render: (text, record) => this.renderColumns(text, record, "jobTitle"),
				// sorter: (a, b) => sortByAlphabet(a, b, "jobTitle")
				sorter: true
			},
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
		isLoading: true,
		pagination: {
			pageSize: 8,
			page: 1
		},

		employeeModalVisible: false
	}

	toggleEmployeeModal = () => {
		this.setState({ employeeModalVisible: !this.state.employeeModalVisible });
	}

	async componentDidMount() {
		/*  let apiResult = await axios.get("http://localhost:8081/employee");
		this.setState({
			isLoading: false,
			employees: apiResult.data,
			pagination: {
				...this.state.pagination,
				total: apiResult.data.content.length
			}
		}); */
		this.fetchData({ page: this.state.pagination.page, results: this.state.pagination.pageSize });
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

	/*
		TODO: edit, cancel, save an neues Paging anpassen.
	*/

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

	handleTableChange = (pagination, filters, sorter) => {
		console.log("handleTableChange", pagination, filters, sorter);
		const pager = { ...this.state.pagination };
		pager.current = pagination.current;
		this.setState({
			pagination: pager
		});

		// fetch new
		this.fetchData({
			results: pagination.pageSize,
			page: pagination.current,
			// sortField: sorter.field,
			// sortOrder: sorter.order,
			sorter: {
				order: getSortType(sorter.order),
				field: sorter.field
			}
		});
	}

	fetchData = async (params = {}) => {
		console.log("params: ", params);
		let sorting = params.sorter != null && params.sorter.order != null && params.sorter.field != null ? `&sort=${params.sorter.field},${params.sorter.order}` : ``;
		let apiResult = await axios.get(`http://localhost:8081/employee?page=${params.page - 1}&size=${params.results}${sorting}`);
		this.setState({
			isLoading: false,
			employees: apiResult.data,
			pagination: {
				...this.state.pagination,
				total: apiResult.data.totalElements
			}
		});
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
						<Breadcrumb.Item>Mitarbeiter</Breadcrumb.Item>
					</Breadcrumb>
					<div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
						<AddEmployeeModal visible={this.state.employeeModalVisible} onCancel={this.toggleEmployeeModal} />
						{this.state.isLoading ? (
							<div>loading...</div>
						) : (
							<Row>
								<Col lg={12} md={24}>
									<h2>Mitarbeiter</h2>
									<Table
										footer={() => <Button type="primary" onClick={this.toggleEmployeeModal}>Mitarbeiter hinzufügen</Button>}
										bordered
										rowKey="id"
										dataSource={this.state.employees.content}
										columns={this.columns}
										pagination={this.state.pagination}
										onChange={this.handleTableChange}
									/>
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
