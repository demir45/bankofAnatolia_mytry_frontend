import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import service from '../../service/BankService';
import { useStateValue } from '../../StateProvider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField as FormikTextField } from 'formik-material-ui';
import { useHistory } from 'react-router';
import Divider from '@material-ui/core/Divider';

const DepositSchema = Yup.object().shape({
	amount: Yup.number()
		.positive('Amount cannot be negative')
		.required('Amount required'),
	comment: Yup.string().required('Comment required'),
	accountDescriptions: Yup.string().required(
		'Please choose an account'
	),
});

let accountDescription = '';

const DepositForm = (props) => (
	<Container>
		<div className="px-sm-4">
			<fieldset className="col-12 col-md-9 col-lg-6 p-0  m-3 ml-0 mx-md-auto  ">
				<legend className="text-center col-10 col-md-7  ml-4 h2">
					Deposit
				</legend>
				<Form className="col-md-12">
					<Row className=" text-center col-12 pl-2">
						<Col className="col-12 pl-5">
							<Field
								className="col-12 "
								component={FormikTextField}
								name="amount"
								type="number"
								label="Amount"
							/>
						</Col>

						<Col className=" col-12 pl-5 py-2">
							<Field
								className="col-12"
								component={FormikTextField}
								name="comment"
								type="text"
								label="Comment"
							/>
						</Col>

						<Col className=" col-12 pl-5">
							<Autocomplete
								options={accountDescription}
								getOptionLabel={(option) =>
									option.description
								}
								getOptionSelected={(option, value) =>
									option.description === value.description
								}
								name="accountDescriptions"
								onChange={(event, value, clear) => {
									props.setFieldValue(
										'accountDescriptions',
										value.description
									);
								}}
								onOpen={props.setTouched}
								renderInput={(params) => (
									<TextField
										label="Account"
										name="accountDescriptions"
										{...params}
									/>
								)}
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

const Deposit = () => {
	const [{ accounts }] = useStateValue();
	const history = useHistory();
	if (accounts) {
		accountDescription = accounts;
	}

	return (
		<>
			<Container>
				<div>
					<Formik
						initialValues={{
							amount: '',
							comment: '',
							accountDescriptions: 0,
						}}
						validationSchema={DepositSchema}
						onSubmit={(values, actions) => {
							if (values.accountDescriptions === 0) {
								toast.error('Please choose an account', {
									position: toast.POSITION.TOP_CENTER,
								});
								actions.setSubmitting(false);
							} else {
								service
									.deposit(values)
									.then((res) => {
										if (res.status === 200) {
											toast.success(
												'Amount Deposited Successfuly',
												{
													position:
														toast.POSITION.TOP_CENTER,
												}
											);
											actions.resetForm();
											actions.setSubmitting(false);
											history.push('/dashboard');
										}
									})
									.catch(() => {
										toast.error(
											'Amount cannot be deposited',
											{
												position: toast.POSITION.TOP_CENTER,
											}
										);
										actions.resetForm();
										actions.setSubmitting(false);
									});
							}
						}}
						component={DepositForm}
					></Formik>
				</div>
				<Divider />
			</Container>
		</>
	);
};

export default Deposit;
