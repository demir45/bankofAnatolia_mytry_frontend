import { Form, Formik, Field } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Container, Row, Col } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import { TextField as FormikTextField } from 'formik-material-ui';
import { Button, LinearProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from 'react-router';
import service from '../../service/BankService';
import { currentAccount } from './DisplayAccounts';
import * as moment from 'moment';

export const allAccountTypes = [
	'SAVING',
	'CHECKING',
	'CREDIT_CARD',
	'INVESTING',
];
export const allAccountStatusTypes = [
	'ACTIVE',
	'CLOSED',
	'SUSPENDED',
];
const today = new Date();
today.setHours(new Date().getHours() - 24);

const validationSchema = Yup.object().shape({
	description: Yup.string().required(
		'Please provide description'
	),
	accountType: Yup.string().required('Provide'),
	accountStatusType: Yup.string().required('Provide'),
	closedDate: Yup.date().min(
		today,
		'Please enter valid date'
	),
});

const EditAccount = () => {
	const [valueType, setValueType] = React.useState(
		currentAccount.accountType
	);
	const [inputValueType, setInputValueType] =
		React.useState('');

	const [valueStatusType, setValueStatusType] =
		React.useState(currentAccount.accountStatusType);
	const [inputValueStatusType, setInputValueStatusType] =
		React.useState('');

	const handleBack = () => {
		history.goBack();
	};
	const history = useHistory();

	return (
		<Container>
			<div>
				<Formik
					initialValues={{
						description: currentAccount.description,
						accountBalance: currentAccount.accountBalance,
						accountType: currentAccount.accountType,
						accountStatusType:
							currentAccount.accountStatusType,
						createDate: currentAccount.createDate,
						closedDate: currentAccount.closedDate,
						employee: currentAccount.employee,
					}}
					validationSchema={validationSchema}
					onSubmit={(values, actions) => {
						const data = {
							...values,
							userId: currentAccount.userId,
							accountId: currentAccount.id,
							closedDate: `${moment(
								values.closedDate
							).format('YYYY-MM-DD HH:mm:ss')} `,
							// ${new Date().getHours()}:${new Date().getMinutes()}`,
						};

						service
							.updateAccount(data)
							.then((res) => {
								if (res.status === 200) {
									toast.success(
										'Account has been successfully updated',
										{
											toastId: 'uniquex',
											position: toast.POSITION.TOP_CENTER,
										}
									);

									actions.resetForm();
									actions.setSubmitting(false);
									history.push('/displayaccounts');
								}
							})
							.catch(() => {
								actions.setSubmitting(false);
								actions.resetForm();
								toast.error('Update denied', {
									position: toast.POSITION.TOP_CENTER,
								});
							});
					}}
					// id, description, balance
					component={(props) => (
						<Container>
							<div>
								<fieldset className="col-12 col-md-9 col-lg-6 p-0  m-3 ml-0 mx-md-auto  ">
									<legend className="text-center col-10 col-md-7  ml-4 h2">
										Create or edit a Account
									</legend>
									<Form className="col-md-12">
										<Row className=" text-center col-12 pl-2">
											<Col className="col-12   pl-5">
												<Field
													className="col-12 my-2"
													component={FormikTextField}
													name="description"
													type="text"
													label="Description"
												/>
											</Col>

											<Col className="col-12   pl-5">
												<Field
													disabled
													className="col-12 my-1"
													component={FormikTextField}
													name="accountBalance"
													type="text"
													label="Balance"
												/>
											</Col>

											{/* Autocomplete */}

											<Col className="col-12  pl-5">
												<Autocomplete
													value={valueType}
													onChange={(event, newValue) => {
														setValueType(newValue);
													}}
													inputValue={inputValueType}
													onInputChange={(
														event,
														newInputValue
													) => {

														setInputValueType(
															newInputValue
														);
													}}
													id="all-AccountTypes"
													options={allAccountTypes}
													renderInput={(params) => (
														<TextField
															{...params}
															label="Account Types"
															name="accountType"
															type="text"
														/>
													)}
												/>
											</Col>

											{/* accountStatusType */}

											<Col className="col-12   pl-5">
												<Autocomplete
													value={valueStatusType}
													onChange={(event, newValue) => {
														setValueStatusType(newValue);
													}}
													inputValue={inputValueStatusType}
													onInputChange={(
														event,
														newInputValue
													) => {
														setInputValueStatusType(
															newInputValue
														);
													}}
													id="all-AccountStatusTypes"
													options={allAccountStatusTypes}
													renderInput={(params) => (
														<TextField
															label="Account Status Types"
															name="accountStatusType"
															type="text"
															{...params}
														/>
													)}
												/>
											</Col>

											<Col className="col-12   pl-5">
												<Field
													disabled
													className="col-12 my-2"
													component={FormikTextField}
													name="createDate"
													type="date"
													InputLabelProps={{ shrink: true }}
													label="Account Creation Date"
												/>
											</Col>

											<Col className="col-12   pl-5">
												<Field
													className="col-12 my-1"
													component={FormikTextField}
													name="closedDate"
													type="date"
													InputLabelProps={{ shrink: true }}
													label="Account Closing Date"
												/>
											</Col>

											<Col className="col-12   pl-5">
												<Field
													className="col-12 my-2"
													component={FormikTextField}
													name="employee"
													type="text"
													label="Assigner"
												/>
											</Col>
										</Row>

										<Row className="ms-4">
											<Col className="d-flex justify-content-center p-3">
												<Button
													// type="submit"
													onClick={handleBack}
													disabled={props.isSubmitting}
													variant="contained"
													color="secondary"
												>
													Back
												</Button>
											</Col>
											<Col className="d-flex justify-content-center p-3">
												<Button
													className="bg-success"
													type="submit"
													onClick={props.submitForm}
													disabled={props.isSubmitting}
													variant="contained"
													color="secondary"
												>
													Submit
												</Button>
											</Col>

											{props.isSubmitting && (
												<LinearProgress />
											)}
										</Row>
									</Form>
								</fieldset>
							</div>
						</Container>
					)}
				></Formik>
			</div>
		</Container>
	);
};

export default EditAccount;
