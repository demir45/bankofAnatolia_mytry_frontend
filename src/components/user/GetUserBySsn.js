import React from 'react';
import service from '../../service/BankService';
import { useStateValue } from '../../StateProvider';
import DashboardPage from '../../pages/DashboardPage';

const GetUserBySsn = () => {
	const [, dispatch] = useStateValue();
	const getUserBySsn = () => {
		service.getUserBySsn().then((res) => {
			if (res.status === 200) {
				dispatch({
					type: 'LOGIN',
					item: res.data,
				});
			}
		});
	};

	return (
		<div>
			<DashboardPage />
			{getUserBySsn}
		</div>
	);
};

export default GetUserBySsn;
