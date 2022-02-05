import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useStateValue } from '../../StateProvider';
import service from '../../service/BankService';
import AllTransactionsList from './AllTransactionsList';

const GetTransactionsList = () => {
	const [{ userInfo }] = useStateValue();
	const history = useHistory();
	const [GetTransactions, setGetTransactions] = useState(
		[]
	);
	useEffect(() => {
		service.getAllTransactions().then((res) => {
			setGetTransactions(res.data);
		});

		return () => {
			setGetTransactions();
		};
	}, []);

	return (
		<div>
			{userInfo.role.some(
				(roles) =>
					roles === 'ROLE_ADMIN' ||
					roles === 'ROLE_EMPLOYEE'
			) ? (
				<AllTransactionsList
					alltransactions={GetTransactions}
				></AllTransactionsList>
			) : (
				history.push('/')
			)}
		</div>
	);
};

export default GetTransactionsList;
