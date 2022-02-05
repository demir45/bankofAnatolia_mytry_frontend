import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router';

const AdminMenu = () => {
	const history = useHistory();

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleOnClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const showDashboard = () => {
		history.push('/dashboard');
		setAnchorEl(null);
	};

	const handleManageUsers = () => {
		history.push('/allusers');
		setAnchorEl(null);
	};
	const handleCreateAccount = () => {
		history.push('/createAccount');
		setAnchorEl(null);
	};
	const handleDisplayAccounts = () => {
		history.push('/displayaccounts');
		setAnchorEl(null);
	};
	const handleDisplayTransactions = () => {
		history.push('/transactions');
		setAnchorEl(null);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div className="mx-auto ">
			<Button
				aria-controls="user-menu"
				aria-haspopup="true"
				className="menu text-white text-capitalize mx-auto "
				onClick={handleOnClick}
				style={{
					opacity: 1,
					fontSize: '16px',
				}}
			>
				Admin Menu
			</Button>
			<Menu
				style={{ zIndex: 3 }}
				id="user-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={showDashboard}>
					Dashoard
				</MenuItem>
				<MenuItem onClick={handleManageUsers}>
					Manage Users
				</MenuItem>
				<MenuItem onClick={handleCreateAccount}>
					Create Account
				</MenuItem>
				<MenuItem onClick={handleDisplayAccounts}>
					Display Accounts
				</MenuItem>
				<MenuItem onClick={handleDisplayTransactions}>
					Display Transactions
				</MenuItem>
			</Menu>
		</div>
	);
};

export default AdminMenu;
