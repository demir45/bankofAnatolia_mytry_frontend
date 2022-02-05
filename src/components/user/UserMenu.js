import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router';
import { useStateValue } from '../../StateProvider';
import { toast } from 'react-toastify';

toast.configure();

const UserMenu = () => {
	const history = useHistory();
	const [{ accounts }] = useStateValue();

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleOnClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const showDashboard = () => {
		history.push('/dashboard');
		setAnchorEl(null);
	};
	const handleMyAccounts = () => {
		if (accounts.length === 0) {
			toast.warning('You need to have an account first', {
				position: toast.POSITION.TOP_CENTER,
			});
			setAnchorEl(null);
		} else {
			history.push('/myAccounts');
			setAnchorEl(null);
		}
	};

	const handleCreateAccount = () => {
		history.push('/createAccount');
		setAnchorEl(null);
	};

	const handleUserInfoUpdate = () => {
		history.push('/updateUserInfo');
		setAnchorEl(null);
	};
	const handleUpdatePassword = () => {
		history.push('/updatePassword');
		setAnchorEl(null);
	};

	const handleMoneyTransfer = () => {
		if (accounts.length === 0) {
			toast.warning('You need to have an account first', {
				position: toast.POSITION.TOP_CENTER,
			});
			setAnchorEl(null);
		} else {
			history.push('/moneyTransfer');
			setAnchorEl(null);
		}
	};

	const handleDeposit = () => {
		if (accounts.length === 0) {
			toast.warning('You need to have an account first', {
				position: toast.POSITION.TOP_CENTER,
			});
			setAnchorEl(null);
		} else {
			history.push('/deposit');
			setAnchorEl(null);
		}
	};

	const handleWithdraw = () => {
		if (accounts.length === 0) {
			toast.warning('You need to have an account first', {
				position: toast.POSITION.TOP_CENTER,
			});
			setAnchorEl(null);
		} else {
			history.push('/withdraw');
			setAnchorEl(null);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleTransactions = () => {
		history.push('/userTransactions');
		setAnchorEl(null);
	};

	return (
		<div className="mx-auto">
			<Button
				aria-controls="user-menu"
				aria-haspopup="true"
				className="menu  text-white text-capitalize mx-auto"
				onClick={handleOnClick}
				style={{
					opacity: 1,
					fontSize: '16px',
				}}
			>
				User Menu
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
					Dashboard
				</MenuItem>
				<MenuItem onClick={handleMyAccounts}>
					My Accounts
				</MenuItem>
				<MenuItem onClick={handleCreateAccount}>
					Create Account
				</MenuItem>
				<MenuItem onClick={handleUserInfoUpdate}>
					Update User Info
				</MenuItem>
				<MenuItem onClick={handleUpdatePassword}>
					Update Password
				</MenuItem>
				<MenuItem onClick={handleMoneyTransfer}>
					Money Transfer
				</MenuItem>
				<MenuItem onClick={handleDeposit}>Deposit</MenuItem>
				<MenuItem onClick={handleWithdraw}>
					Withdraw
				</MenuItem>
				<MenuItem onClick={handleTransactions}>
					Transactions
				</MenuItem>
			</Menu>
		</div>
	);
};

export default UserMenu;
