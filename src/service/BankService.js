import axiosInstance from './axiosInstance';

const BASE_URL = 'http://localhost:8090';

class BankService {
	login(userInfo) {
		return axiosInstance.post(
			BASE_URL + '/login',
			userInfo
		);
	}

	register(userInfo) {
		return axiosInstance.post(
			BASE_URL + '/register',
			userInfo
		);
	}

	getUserBySsn() {
		return axiosInstance.get(BASE_URL + '/getUserBySsn');
	}

	updateUserInfo(userInfo) {
		return axiosInstance.patch(
			BASE_URL + '/user/updateUserInfo',
			userInfo
		);
	}

	updateSingleUserInfo(userInfo) {
		return axiosInstance.patch(
			BASE_URL + '/updateSingleUserInfo',
			userInfo
		);
	}
	updateAccount(data) {
		return axiosInstance.patch(
			BASE_URL + '/accounts/updateAccount',
			data
		);
	}

	updatePassword(userInfo) {
		return axiosInstance.patch(
			BASE_URL + '/user/updatePassword',
			userInfo
		);
	}

	getUserTransactions() {
		return axiosInstance.get(
			BASE_URL + '/accounts/userTransactions'
		);
	}
	getAllTransactions() {
		return axiosInstance.get(
			BASE_URL + '/accounts/allTransactions'
		);
	}

	getAllUsers() {
		return axiosInstance.get(BASE_URL + '/allusers');
	}

	getAllAccounts() {
		return axiosInstance.get(BASE_URL + '/allAccounts');
	}
	getUserAccounts() {
		return axiosInstance.get(
			BASE_URL + '/accounts/getUserAccounts'
		);
	}

	getSingleUser(userId) {
		return axiosInstance.get(
			BASE_URL + '/singleUserDetails/' + userId
		);
	}

	deleteUser(userId) {
		return axiosInstance.delete(
			BASE_URL + '/delete/' + userId
		);
	}

	deleteAccount(accountId) {
		return axiosInstance.delete(
			BASE_URL + '/accounts/delete/' + accountId
		);
	}
	moneyTransfer(accountInfo) {
		return axiosInstance.post(
			BASE_URL + '/accounts/moneyTransfer',
			accountInfo
		);
	}
	createAccount(accountInfo) {
		return axiosInstance.post(
			BASE_URL + '/accounts/createAccount',
			accountInfo
		);
	}

	deposit(transactionInfo) {
		return axiosInstance.patch(
			BASE_URL + '/accounts/deposit',
			transactionInfo
		);
	}

	withdraw(transactionInfo) {
		return axiosInstance.post(
			BASE_URL + '/accounts/withdraw',
			transactionInfo
		);
	}
}

export default new BankService();
