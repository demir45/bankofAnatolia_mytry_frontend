import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useStateValue } from '../../StateProvider';
import service from '../../service/BankService';
import AllUsers from './AllUsers';

const Users = () => {
	const [{ userInfo }] = useStateValue();
	const history = useHistory();
	const [users, setUsers] = useState([]);
	useEffect(() => {
		service.getAllUsers().then((res) => {
			setUsers(res.data);
		});

		return () => {
			setUsers();
		};
	}, []);

	return (
		<div>
			{userInfo.role.some(
				(roles) =>
					roles === 'ROLE_ADMIN' ||
					roles === 'ROLE_EMPLOYEE'
			) ? (
				<AllUsers users={users}></AllUsers>
			) : (
				history.push('/')
			)}
		</div>
	);
};

export default Users;
