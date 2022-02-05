import React from 'react';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import service from '../../service/BankService';
import { allAccountStatusTypes } from './EditAccount';
import { allAccountTypes } from './EditAccount';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField as FormikTextField } from 'formik-material-ui';
import * as moment from 'moment';

const today = new Date();
today.setHours(new Date().getHours() - 24);

const AccountSchema = Yup.object().shape({
	description: Yup.string().required(
		'Description required'
	),
	accountBalance: Yup.number()
		.positive('Cannot be negative')
		.required('Account balance required'),
	accountType: Yup.string().required('Choose Account Type'),
	accountStatusType: Yup.string().required(
		'Choose Account Status Type'
	),
	createDate: Yup.date(),

	closedDate: Yup.date()
		.min(Yup.ref('createDate'), 'Please enter valid date')
		.required('Please enter date'),
});
const CreateAccountForm = (props) => (
	<Container>
		<div className="px-sm-4">
			<fieldset className="col-12 col-md-9 col-lg-6 p-0  m-3 ml-0 mx-md-auto  ">
				<legend className="text-center col-10 col-md-7  ml-4 h2">
					Create or edit a Account
				</legend>
				<Form className="col-md-12">
					<Row className=" text-center col-12 pl-2">
						<Col className="col-12 pl-5">
							<Field
								className="col-12"
								component={FormikTextField}
								name="description"
								type="text"
								label="Description"
							/>
						</Col>

						<Col className="col-12   pl-5">
							<Field
								className="col-12"
								component={FormikTextField}
								name="accountBalance"
								type="number"
								label="Balance"
							/>
						</Col>
						<Col className=" col-12 pl-5">
							<Autocomplete
								options={allAccountTypes}
								getOptionLabel={(option) => option}
								name="accountType"
								onChange={(event, value, clear) => {
									props.setFieldValue(
										'accountType',
										value ? value : 'SAVING'
									);
								}}
								
								onOpen={props.setTouched}
								renderInput={(params) => (
									<TextField
										label="Account Types"
										name="accountType"
										{...params}
									/>
								)}
							/>
						</Col>
						<Col className=" col-12 pl-5">
							<Autocomplete
								className=""
								options={allAccountStatusTypes}
								getOptionLabel={(option) => option}
								name="accountStatusType"
								onChange={(event, value, clear) => {
									props.setFieldValue(
										'accountStatusType',
										value ? value : 'CLOSED'
									);
								}}
								onOpen={props.setTouched}
								renderInput={(params) => (
									<TextField
										label="Account Status Types"
										name="accountStatusType"
										{...params}
									/>
								)}
							/>
						</Col>

						<Col className=" col-12 pl-5">
							<Field
								className="col-12 mt-2"
								component={FormikTextField}
								name="createDate"
								type="date"
								//type="datetime-local" //! ekranda saati de yazmamızı sağlıyor
								InputLabelProps={{ shrink: true }}
								label="Create Date"
							/>
						</Col>

						<Col className=" col-12 pl-5 ">
							<Field
								className="col-12 mt-2"
								component={FormikTextField}
								name="closedDate"
								type="date"
								// type="datetime-local"
								InputLabelProps={{ shrink: true }}
								label="Closed Date"
							/>
						</Col>
					</Row>

					<Row className="justify-content-center">
						<Col className="text-center p-3">
							<Button
								variant="contained"
								color="secondary"
								disabled={props.isSubmitting}
								onClick={props.submitForm}
							>
								Submit
							</Button>
						</Col>
					</Row>
				</Form>
			</fieldset>
		</div>
	</Container>
);

const CreateAccount = () => {
	const history = useHistory();
	return (
		<Container>
			<div>
				<Formik
					initialValues={{
						description: '',
						accountBalance: '',
						accountType: '',
						accountStatusType: '',
						createDate: '',
						closedDate: '',
						// Employee: '',
					}}
					validationSchema={AccountSchema}
					onSubmit={(values, actions) => {
						const e = new Date('July 21, 1983 04:01:00');
						const data = {
							...values,
							createDate: `${moment(
								values.createDate
							).format(
								'DD/MM/YYYY'
							)} ${new Date().getHours()}:${
								new Date().getMinutes() + e.getMinutes()
							}`,

							closedDate: `${moment(
								values.closedDate
							).format(
								'DD/MM/YYYY'
							)} ${new Date().getHours()}:${new Date().getMinutes()}`,
						};

						service

							.createAccount(data)
							.then((res) => {
								if (res.status === 201) {
									toast.success(
										'Account Created Successfuly',
										{
											position: toast.POSITION.TOP_CENTER,
										}
									);
									history.push('/dashboard');
									actions.resetForm();
									actions.setSubmitting(false);
								}
							})
							.catch(() => {
								toast.error('Account can not be added', {
									position: toast.POSITION.TOP_CENTER,
								});
								actions.resetForm();
								actions.setSubmitting(false);
							});
					}}
					component={CreateAccountForm}
				></Formik>
			</div>
		</Container>
	);
};

export default CreateAccount;
