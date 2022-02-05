import React from 'react';
import { Redirect } from 'react-router';
import service from '../../service/BankService';
import { useStateValue } from '../../StateProvider';

const GetAccountAndTransaction = () => {
	const [, dispatch] = useStateValue();

	service.getUserAccounts().then((res) => {
		if (res.status === 200) {
			dispatch({
				type: 'USER_ACCOUNTS',
				item: res.data,
			});
		}
	});
	service.getUserTransactions().then((res) => {
		dispatch({
			type: 'USER_TRANSACTIONS',
			item: res.data,
		});
	});

	return <Redirect to="/dashboardpage" />;
	
};

export default GetAccountAndTransaction;
