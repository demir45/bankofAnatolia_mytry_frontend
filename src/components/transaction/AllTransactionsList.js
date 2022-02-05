import React, { useState } from 'react';
import {
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Table,
	Paper,
} from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import { Container } from 'react-bootstrap';

const columns = [
	{ id: 1, label: 'Type', winWidth: 200 },
	{ id: 2, label: 'Description', winWidth: 200 },
	{ id: 3, label: 'Date', winWidth: 200 },
	{ id: 4, label: 'Amount', winWidth: 200 },
	{ id: 5, label: 'New Balance', winWidth: 200 },
];

export let currentTransaction;

const AllTransactionsList = (props) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const rows = props.alltransactions;
	
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const [searchItem, setSearchItem] = useState('');

	return (
		<div>
			<Container>
				<Paper>
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
									{columns.map(
										({ id, label, minWidth }) => {
											return (
												<TableCell
													className="bg-secondary font-weight-bold "
													key={id}
													style={{ minWidth: minWidth }}
												>
													{label}
												</TableCell>
											);
										}
									)}
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
										return (
											<TableRow
												key={row.id}
												className="bg-light"
											>
												<TableCell>{row.type}</TableCell>
												<TableCell>
													{row.description}
												</TableCell>
												<TableCell>{row.date}</TableCell>
												<TableCell>{row.amount}</TableCell>
												<TableCell>
													{row.availableBalance}
												</TableCell>
											</TableRow>
										);
									})}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						component="div"
						count={rows.length}
						page={page}
						onChangePage={handleChangePage}
						rowsPerPage={rowsPerPage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
						rowsPerPageOptions={[10, 25, 100]}
					/>
				</Paper>
			</Container>
		</div>
	);
};

export default AllTransactionsList;
