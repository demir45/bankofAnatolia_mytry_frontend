import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import * as moment from 'moment';
import { useStateValue } from '../../StateProvider';

let rows = [];
const columns = [
	{ id: 1, label: 'Description', winWidth: 200 },
	{ id: 2, label: 'Balance', winWidth: 200 },
	{ id: 3, label: 'Account type', winWidth: 200 },
	{ id: 4, label: 'Account status', winWidth: 200 },
	{ id: 5, label: 'Creation date', winWidth: 200 },
	{ id: 6, label: 'Closing date', winWidth: 200 },
	{ id: 7, label: 'Assigner', winWidth: 200 },
];
const MyAccounts = () => {
	const [{ accounts }] = useStateValue();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	rows = accounts;

	const [searchItem, setSearchItem] = useState('');

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
								if (
									val.description
										.toLowerCase()
										.includes(
											searchItem.toLocaleLowerCase()
										)
								) {
									return val;
								}
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
									<TableRow
										className="bg-light"
										key={row.description}
									>
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

export default MyAccounts;
