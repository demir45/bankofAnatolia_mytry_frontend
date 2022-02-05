import React from 'react';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import service from '../../service/BankService';
import { toast } from 'react-toastify';
import { Container, Row, Col } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import { TextField as FormikTextField } from 'formik-material-ui';
import { Button, LinearProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from 'react-router';
import { currentUser } from './AllUsers';

const validationSchema = Yup.object().shape({
	firstName: Yup.string().required(
		'Please provide first name'
	),
	lastName: Yup.string().required(
		'Please provide last name'
	),
	dob: Yup.string().required('Provide'),
	email: Yup.string()
		.email('Please provide valid email address')
		.required('Please provide the email address'),
});

const SingleUserDetails = (props) => {

	const handleBack = () => {
		history.goBack();
	};

	let role = [];

	if (currentUser.role === 'ROLE_ADMIN') role.push('ADMIN');
	if (currentUser.role === 'ROLE_EMPLOYEE')
		role.push('EMPLOYEE');
	if (currentUser.role === 'ROLE_CUSTOMER')
		role.push('CUSTOMER');

	const myArray = props.accounts.filter(
		(acc) => acc.userId === -1
	);

	const history = useHistory();
	return (
		<Container>
			<div>
				<Formik
					initialValues={{
						ssn: currentUser.ssn,
						firstName: currentUser.firstName,
						lastName: currentUser.lastName,
						dob: currentUser.dob,
						email: currentUser.email,
						username: currentUser.username,
						role: role,
					}}
					validationSchema={validationSchema}
					onSubmit={(values, actions) => {
						service
							.updateSingleUserInfo(values)
							.then((res) => {
								if (res.status === 200) {
									toast.success(
										'User Info has been successfully updated',
										{
											toastId: 'uniqe-y',
											position: toast.POSITION.TOP_CENTER,
										}
									);

									actions.resetForm();
									actions.setSubmitting(false);
									history.push('/allusers');
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
					component={(props) => (
						<Container>
							<div className="px-sm-4">
								<fieldset className="col-12 col-md-9 col-lg-6 p-0  m-3 ml-0 mx-md-auto  ">
									<legend className="text-center col-10 col-md-8  ml-4 h2 font-weight-bold">
										{' '}
										{`User Settings for ${currentUser.firstName} ${currentUser.lastName}`}{' '}
									</legend>
									<Form className="col-md-11 pl-4">
										<Col className="col-12 pl-5 py-2">
											<Field
												disabled
												className="col-12"
												component={FormikTextField}
												name="ssn"
												type="text"
												label="SSN"
											/>
										</Col>
										<Col className="col-12   pl-5 py-2">
											<Field
												className="col-12"
												component={FormikTextField}
												name="firstName"
												type="text"
												label="First Name"
											/>
										</Col>
										<Col className="col-12   pl-5 py-2">
											<Field
												className="col-12"
												component={FormikTextField}
												name="lastName"
												type="text"
												label="Last Name"
											/>
										</Col>
										<Col className="col-12   pl-5 py-2">
											<Field
												className="col-12 mt-2"
												component={FormikTextField}
												name="dob"
												type="date"
												label="Date of Birth"
												InputLabelProps={{ shrink: true }}
											/>
										</Col>
										<Col className="col-12   pl-5 py-2">
											<Field
												className="col-12 "
												component={FormikTextField}
												name="email"
												type="email"
												placeholder="Enter email"
												label="Email"
											/>
										</Col>
										<Col className="col-12   pl-5 py-2">
											<Field
												className="col-12"
												component={FormikTextField}
												name="username"
												type="text"
												label="Username"
												placeholder="Enter username"
											/>
										</Col>
										<Col className=" text-center col-12 pl-5 mt-2">
											<label className="p-2 ml-4">
												<Field
													type="checkbox"
													name="role"
													value="ROLE_CUSTOMER"
												/>
												Customer
											</label>
											<label className="p-2 ">
												<Field
													type="checkbox"
													name="role"
													value="ROLE_ADMIN"
												/>
												Admin
											</label>
											<label className="p-3 ">
												<Field
													type="checkbox"
													name="role"
													value="ROLE_EMPLOYEE"
												/>
												Employee
											</label>
										</Col>
										<Col className=" col-12 pl-5 py-0">
											<Autocomplete
												options={myArray}
												getOptionLabel={(option) =>
													option.description
												}
												name="accountsDayi"
												getOptionSelected={(
													option,
													value
												) =>
													option.description ===
													value.description
												}
												// style={{ width: 200 }}
												onChange={(event, value, clear) => {
													props.setFieldValue(
														// 'accounts',
														'description',
														// value?.id || 0
														value.description
													);
												}}
												onOpen={props.setTouched}
												renderInput={(params) => (
													<TextField
														label="Descriptions"
														name="accounts"
														{...params}
													/>
												)}
											/>
										</Col>

										<Row className="mt-3">
											<Col className="d-flex justify-content-center p-3">
												<Button
													className="bg-primary font-weight-bold"
													// type="submit"
													onClick={handleBack}
													disabled={props.isSubmitting}
													variant="contained"
												>
													Back
												</Button>
											</Col>
											<Col className="d-flex justify-content-center p-3">
												<Button
													className="bg-danger font-weight-bold"
													type="submit"
													onClick={props.submitForm}
													disabled={props.isSubmitting}
													variant="contained"
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

export default SingleUserDetails;
