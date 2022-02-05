import React, { useState, useEffect } from 'react';
import service from '../../service/BankService';
import SingleUserDetails from '../admin/SingleUserDetails';

const Accounts = () => {
	const [accounts, setAccounts] = useState([]);
	useEffect(() => {
		service.getAllAccounts().then((res) => {
			setAccounts(res.data);
		});

		return () => {
			setAccounts();
		};
	}, []);

	return (
		<div>
			<SingleUserDetails accounts={accounts} />
		</div>
	);
};

export default Accounts;
