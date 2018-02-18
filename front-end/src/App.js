import React, { Component } from "react";
import axios from "axios";
import { Layout, Menu, Breadcrumb, Table } from "antd";

const { Header, Content, Footer } = Layout;

const columns = [
	{ title: "Vorname", dataIndex: "firstName", key: "firstName" },
	{ title: "Nachname", dataIndex: "lastName", key: "lastName" },
	{ title: "Beruf", dataIndex: "jobTitle", key: "jobTitle" }
];

class App extends Component {

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
							<Table rowKey="firstName" dataSource={this.state.employees} columns={columns} />
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
