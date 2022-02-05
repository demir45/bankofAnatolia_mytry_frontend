import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router';

const EmployeeMenu = () => {
	const history = useHistory();

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleOnClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const showDashboard = () => {
		history.push('/dashboard');
		setAnchorEl(null);
	};

	const handleUserInfoUpdate = () => {
		history.push('/updateUserInfo/');
		setAnchorEl(null);
	};
	const handleUpdatePassword = () => {
		history.push('/updatePassword/');
		setAnchorEl(null);
	};
	const handleManageUsers = () => {
		history.push('/allusers');
		setAnchorEl(null);
	};
	const handleDisplayAccounts = () => {
		history.push('/displayaccounts');
		setAnchorEl(null);
	};

	const handleTransactions = () => {
		history.push('/transactions');
		setAnchorEl(null);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div class="mx-auto">
			<Button
				aria-controls="user-menu"
				aria-haspopup="true"
				className="menu text-white text-capitalize  "
				onClick={handleOnClick}
				style={{
					opacity: 1,
					fontSize: '16px',
					padding: 0,
				}}
			>
				Employee Menu
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
				<MenuItem onClick={handleUserInfoUpdate}>
					Update User Info
				</MenuItem>
				<MenuItem onClick={handleUpdatePassword}>
					Update Password
				</MenuItem>
				<MenuItem onClick={handleManageUsers}>
					Manage Users
				</MenuItem>
				<MenuItem onClick={handleDisplayAccounts}>
					Display Accounts
				</MenuItem>
				<MenuItem onClick={handleTransactions}>
					Display Transactions
				</MenuItem>
			</Menu>
		</div>
	);
};

export default EmployeeMenu;
