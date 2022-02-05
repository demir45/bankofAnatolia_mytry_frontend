import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, LinearProgress } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { TextField as FormikTextField } from 'formik-material-ui';
import { useStateValue } from '../../StateProvider';
import service from '../../service/BankService';
import { useHistory } from 'react-router';
import Autocomplete from '@material-ui/lab/Autocomplete';

const moneyTransferSchema = Yup.object().shape({
	fromAccount: Yup.string().required('from required'),
	toAccount: Yup.string().required('to required'),

	amount: Yup.number()
		.positive()
		.required('Amount Required'),
	explanation: Yup.string().required(
		'explanation Required'
	),
});
let accountDescription = '';

const MoneyTransferForm = (props) => {
	return (
		<Container>
			<div className="px-sm-4">
				<fieldset className="col-12 col-md-9 col-lg-6 p-0  m-3 ml-0 mx-md-auto  ">
					<legend className="text-center col-10 col-md-7  ml-4 h2">
						Transfer
					</legend>
					<Form className="col-md-12">
						<Row className=" text-center col-12 pl-2">
							<Col className="col-12 pl-5 my-2">
								<Autocomplete
									options={accountDescription}
									getOptionLabel={(option) =>
										option.description
									}
									getOptionSelected={(option, value) =>
										option.description === value.description
									}
									name="fromAccount"
									onChange={(event, value, clear) => {
										props.setFieldValue(
											'fromAccount',
											value?.description || ''
										);
									}}
									onOpen={props.setTouched}
									renderInput={(params) => (
										<TextField
											label="From"
											name="fromAccount"
											{...params}
										/>
									)}
								/>
							</Col>
							<Col className=" col-12 pl-5 my-2">
								<Autocomplete
									options={accountDescription}
									getOptionLabel={(option) =>
										option.description
									}
									name="toAccount"
									getOptionSelected={(option, value) =>
										option.description === value.description
									}
									onChange={(event, value, clear) => {
										props.setFieldValue(
											'toAccount',
											value?.description || ''
										);
									}}
									onOpen={props.setTouched}
									renderInput={(params) => (
										<TextField
											label="To"
											name="toAccount"
											{...params}
										/>
									)}
								/>
							</Col>
							<Col className="col-12 pl-5 my-2">
								<Field
									className="col-12 "
									component={FormikTextField}
									name="amount"
									type="number"
									label="Balance"
								/>
							</Col>
							<Col className="col-12 pl-5 my-2">
								<Field
									className="col-12 "
									component={FormikTextField}
									name="explanation"
									type="text"
									label="Explanation"
								/>
							</Col>
						</Row>
						<Row className="mt-4 ">
							<Col className="d-flex justify-content-center p-3">
								<Button
									type="submit"
									onClick={props.submitForm}
									disabled={props.isSubmitting}
									variant="contained"
									color="secondary"
								>
									Submit
								</Button>
								{props.isSubmitting && <LinearProgress />}
							</Col>
						</Row>
					</Form>
				</fieldset>
			</div>
		</Container>
	);
};

const MoneyTransfer = () => {
	const history = useHistory();

	const [{ accounts }] = useStateValue();

	if (accounts) {
		accountDescription = accounts;
	}

	return (
		<Container>
			<div className="d-flex justify-content-center flex-column">
				<Formik
					initialValues={{
						fromAccount: '',
						toAccount: '',
						amount: '',
						explanation: '',
					}}
					validationSchema={moneyTransferSchema}
					onSubmit={(values, actions) => {
						service
							.moneyTransfer(values)
							.then((res) => {
								if (res.status === 200) {
									toast.success(
										'Amount Successfuly Transfered ',
										{
											position: toast.POSITION.TOP_CENTER,
											toastId: 'unique-random-text-xAu9C9-',
										}
									);
									actions.setSubmitting(false);
									actions.resetForm();

									// history.push('/dashboardpage');
									history.push('/dashboard');
								}
							})
							.catch((err) => {
								// const message = err.response.data.message;

								toast.error('Transfer Denied', {
									position: toast.POSITION.TOP_CENTER,
									// toastId: 'unique-random-text-xAu9C9-',
								});
								actions.setSubmitting(false);
								actions.resetForm();
								
							});
					}}
					component={MoneyTransferForm}
				></Formik>
			</div>
		</Container>
	);
};

export default MoneyTransfer;
