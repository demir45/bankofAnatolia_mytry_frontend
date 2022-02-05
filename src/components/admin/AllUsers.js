import React, { useState } from 'react';
//import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { Container } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import service from '../../service/BankService';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';

const columns = [
	{ id: 1, label: 'SSN Number', winWidth: 200 },
	{ id: 2, label: 'First Name', winWidth: 200 },
	{ id: 3, label: 'Last Name', winWidth: 200 },
	{ id: 4, label: 'Role', winWidth: 200 },
	{ id: 5, label: 'Edit', winWidth: 200 },
	{ id: 6, label: 'Delete', winWidth: 200 },
];

export let rows;
export let currentUser;

const AllUsers = (props) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	rows = props.users; // User class'dan geliyor

	const [searchItem, setSearchItem] = useState('');
	const history = useHistory();

	const handleEdit = (row) => {
		currentUser = row;
		history.push('/edituser');
	};

	const handleDelete = (userId) => {
		service.deleteUser(userId).then((res) => {
			if (res.status === 200) {
				toast.success('User Successfuly deleted', {
					position: toast.POSITION.TOP_CENTER,
				});
				history.push('/deletedUser');
			} else {
				toast.error('User could not be deleted', {
					position: toast.POSITION.TOP_CENTER,
				});
			}
		});
	};

	const roleName = (row) => {
		const roleValue = [];
		for (let index = 0; index < 3; index++) {
			const element = row.role[index];

			if (element) {
				element === 'ROLE_ADMIN'
					? roleValue.push(' Admin')
					: element === 'ROLE_EMPLOYEE'
					? roleValue.push(' Employee')
					: element === 'ROLE_CUSTOMER'
					? roleValue.push(' Customer')
					: roleValue.push('');
			}
		}
		return <div>{roleValue}</div>;
	};
	return (
		<div>
			<Container>
				<input
					className=" d-flex justify-content-center"
					type="text"
					placeholder="Search"
					onChange={(e) => {
						setSearchItem(e.target.value);
					}}
				/>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								{columns.map(({ id, label, minWidth }) => {
									return (
										<TableCell
											className="bg-secondary font-weight-bold "
											key={id}
											style={{ minWidth: minWidth }}
										>
											{label}
										</TableCell>
									);
								})}
							</TableRow>
						</TableHead>
						<TableBody>
							{rows
								.filter((val) => {
									let value;
									if (
										val.firstName
											.toLowerCase()
											.includes(
												searchItem.toLocaleLowerCase()
											)
									) {
										value = val;
									}
									return value;
								})
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map((row) => {
									return (
										<TableRow key={row.userId}>
											<TableCell className="bg-light">
												{row.ssn}
											</TableCell>
											<TableCell className="bg-light">
												{row.firstName}
											</TableCell>
											<TableCell className="bg-light">
												{row.lastName}
											</TableCell>
											<TableCell className="bg-light">
												{roleName(row)}
											</TableCell>

											<TableCell className="bg-light">
												<Button
													className="bg-info"
													onClick={() => {
														handleEdit(row);
													}}
												>
													Edit
												</Button>
											</TableCell>

											<TableCell className="bg-light">
												<Button
													className="bg-danger"
													onClick={() => {
														handleDelete(row.userId);
													}}
												>
													Delete
												</Button>
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Container>
		</div>
	);
};

export default AllUsers;
