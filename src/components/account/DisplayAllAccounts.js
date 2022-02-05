import React, { useEffect, useState } from 'react';
import DisplayAccounts from './DisplayAccounts';
import service from '../../service/BankService';

const DisplayAllAccounts = () => {
	const [allAccounts, setAllAccounts] = useState([]);
	const [allUsers, setAllUsers] = useState([]);

	useEffect(() => {
		service.getAllAccounts().then((res) => {
			setAllAccounts(res.data);
		});
		service.getAllUsers().then((response) => {
			setAllUsers(response.data);
		});

		return () => {
			setAllAccounts();
			setAllUsers();
		};
	}, []);

	return (
		<div>
			<DisplayAccounts
				allAccounts={allAccounts}
				allUsers={allUsers}
			/>
		</div>
	);
};

export default DisplayAllAccounts;
