import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom';
import TopBar from './components/shared/TopBar';
import Header from './components/shared/Header';
import NavBar from './components/shared/NavBar';
import Footer from './components/shared/Footer';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import MyAccountsPage from './pages/MyAccountsPage';
import UserInfoPage from './pages/UserInfoPage';
import MoneyTransferPage from './pages/MoneyTransferPage';
import CreateAccountPage from './pages/CreateAccountPage';
import UserTransactionsPage from './pages/UserTransactionsPage';
import SingleUserDetails from './components/admin/SingleUserDetails';
import DisplayAllAccounts from './components/account/DisplayAllAccounts';
import EditAccount from './components/account/EditAccount';
import Logout from './components/logout/Logout';
import Services from './components/shared/Services';
import PricingPlan from './components/shared/PricingPlan';
import HowItWorks from './components/shared/HowItWorks';
import NewsLetter from './components/shared/NewsLetter';
import GetTransactionsList from './components/transaction/GetTransactionsList';
import DashboardPage from './pages/DashboardPage';
import DeletedAccountPage from './pages/DeletedAccountPage';
import DeletedUserPage from './pages/DeletedUserPage';
import GetUserBySsn from './components/user/GetUserBySsn';
import GetAccountAndTransaction from './components/user/GetAccountAndTransaction';
import DepositPage from './pages/DepositPage';
import WithdrawPage from './pages/WithdrawPage';
import AllUsersPage from './pages/AllUsersPage';
import SingleUserDetailsPage from './pages/SingleUserDetailsPage';
import DisplayAllAccountsPage from './pages/DisplayAllAccountsPage';
import EditAccountPage from './pages/EditAccountPage';
import GetTransactionsListPage from './pages/GetTransactionsListPage';

const App = () => {
	return (
		<Router>
			<TopBar />
			<Header />
			<NavBar />
			<Switch>
				<Route
					path="/updatePassword"
					component={UpdatePasswordPage}
				/>
				<Route
					path="/deletedUser"
					component={DeletedUserPage}
				/>
				<Route
					path="/deletedAccount"
					component={DeletedAccountPage}
				/>
				<Route path="/register" component={RegisterPage} />
				<Route path="/login" component={LoginPage} />
				<Route path="/logout" component={Logout} />
				<Route path="/about" component={AboutUsPage} />
				<Route
					path="/singleUserDetails"
					component={SingleUserDetails}
				/>
				<Route
					path="/edituser"
					component={SingleUserDetailsPage}
				/>
				<Route
					path="/myaccounts"
					component={MyAccountsPage}
				/>
				<Route
					path="/updateUserInfo"
					component={UserInfoPage}
				/>
				<Route path="/allusers" component={AllUsersPage} />
				<Route
					path="/displayaccounts"
					component={DisplayAllAccountsPage}
				/>
				<Route
					path="/editaccounts"
					component={EditAccountPage}
				/>
				<Route
					path="/myAccounts"
					component={MyAccountsPage}
				/>

				<Route
					path="/createAccount"
					component={CreateAccountPage}
				/>
				<Route
					path="/moneyTransfer"
					component={MoneyTransferPage}
				/>
				<Route path="/deposit" component={DepositPage} />
				<Route path="/withdraw" component={WithdrawPage} />

				<Route
					path="/transactions"
					component={GetTransactionsListPage}
				/>
				<Route
					path="/userTransactions"
					component={UserTransactionsPage}
				/>
				<Route
					path="/dashboardpage"
					component={DashboardPage}
				/>
				<Route
					path="/dashboard"
					component={GetAccountAndTransaction}
				/>
				<Route
					path="/getUserBySsn"
					component={GetUserBySsn}
				/>
				<Route path="/services" component={Services} />
				<Route path="/loans" component={PricingPlan} />
				<Route path="/learnMore" component={HowItWorks} />
				<Route path="/contact" component={NewsLetter} />

				{/* //! exact yaptığımızda bu route'u istediğimiz yere koyabiliriz. 
				   //!  yapmazsak en alta koymalıyız. */}
				<Route exact path="/" component={HomePage} />
			</Switch>
			<Footer />
		</Router>
	);
};

export default App;
