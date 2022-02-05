import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { Button } from '@material-ui/core';
import service from '../../service/BankService';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import * as moment from 'moment';

let rows = [];
let users = [];
const columns = [
	// { id: 1, label: 'Account id', winWidth: 200 },
	{ id: 1, label: 'Customer', winWidth: 200 },
	{ id: 2, label: 'Description', winWidth: 200 },
	{ id: 3, label: 'Balance', winWidth: 200 },
	{ id: 4, label: 'Account type', winWidth: 200 },
	{ id: 5, label: 'Account status', winWidth: 200 },
	{ id: 6, label: 'Creation date', winWidth: 200 },
	{ id: 7, label: 'Closing date', winWidth: 200 },
	{ id: 8, label: 'Assigner', winWidth: 200 },
	{ id: 9, label: 'Edit', winWidth: 200 },
	{ id: 10, label: 'Delete', winWidth: 200 },
];

export let currentAccount;

const DisplayAccounts = (props) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	rows = props.allAccounts;
	users = props.allUsers;

	const history = useHistory();
	const [searchItem, setSearchItem] = useState('');

	const handleEdit = (accountId, row) => {
		currentAccount = row;
		history.push('/editaccounts');
	};

	const handleDelete = (accountId) => {
		service.deleteAccount(accountId).then((res) => {
			if (res.status === 200) {
				toast.success('Account Successfuly deleted', {
					toastId: 'uniquex',
					position: toast.POSITION.TOP_CENTER,
				});
				history.push('/deletedAccount');
			} else {
				toast.error('User could not be deleted', {
					position: toast.POSITION.TOP_CENTER,
				});
			}
		});
	};

	return (
		<div className=" px-5">
			{/* <Container> */}
			<input
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
								return (
									val.description &&
									val.description
										.toLowerCase()
										.includes(
											searchItem.toLocaleLowerCase()
										) &&
									val
								);
							})
							.slice(
								page * rowsPerPage,
								page * rowsPerPage + rowsPerPage
							)
							.map((row) => {
								const data = {
									closedDate: moment(row.closedDate).format(
										'DD/MM/YYYY'
									),
									createDate: moment(row.createDate).format(
										'DD/MM/YYYY'
									),
								};

								return (
									<TableRow className="bg-light">
										{/* <TableCell>{row.id}</TableCell> */}
										<TableCell>
											{users.map((x) =>
												x.userId === row.userId
													? x.firstName + ' ' + x.lastName
													: x.userId === -1
													? 'not assigned'
													: null
											)}
										</TableCell>
										<TableCell className="bg-light">
											{row.description}
										</TableCell>
										<TableCell className="bg-light">
											{row.accountBalance}
										</TableCell>
										<TableCell>{row.accountType}</TableCell>
										<TableCell>
											{row.accountStatusType}
										</TableCell>
										<TableCell>{data.createDate}</TableCell>
										<TableCell>{data.closedDate}</TableCell>

										<TableCell>{row.employee}</TableCell>

										<TableCell>
											<Button
												className="bg-info"
												onClick={() => {
													handleEdit(row.id, row);
												}}
											>
												Edit
											</Button>
										</TableCell>
										<TableCell>
											<Button
												className="bg-danger"
												onClick={() => {
													handleDelete(row.id);
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
				<TablePagination
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
					page={page}
					rowsPerPageOptions={[10, 25, 100]}
				/>
			</TableContainer>
			{/* </Container> */}
		</div>
	);
};

export default DisplayAccounts;
