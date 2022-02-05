import { Form, Formik, Field } from 'formik';
import React from 'react';
import { useStateValue } from '../../StateProvider';
import * as Yup from 'yup';
import service from '../../service/BankService';
import { toast } from 'react-toastify';
import { Container, Row, Col } from 'react-bootstrap';
import { TextField } from 'formik-material-ui';
import { Button, LinearProgress } from '@material-ui/core';
import { useHistory } from 'react-router';

const validationSchema = Yup.object().shape({
	firstName: Yup.string().required(
		'Please provide first name'
	),
	lastName: Yup.string().required(
		'Please provide last name'
	),
	email: Yup.string()
		.email('Please provide valid email address')
		.required('Please provide the email address'),
});

const UpdateUserInfo = () => {
	const [{ userInfo }, dispatch] = useStateValue();

	const history = useHistory();
	return (
		<Container>
			<div>
				<Formik
					initialValues={{
						firstName: userInfo.firstName,
						lastName: userInfo.lastName,
						email: userInfo.email,
					}}
					validationSchema={validationSchema}
					onSubmit={(values, actions) => {
						service
							.updateUserInfo(values)
							.then((res) => {
								if (res.status === 200) {
									toast.success(
										'User Info has been successfully updated',
										{
											toastId: 'uniquex',
											position: toast.POSITION.TOP_CENTER,
										}
									);
									service.getUserBySsn().then((res) => {
										if (res.status === 200) {
											dispatch({
												type: 'UPDATE',
												item: res.data,
											});
										}
									});
									// .catch(() => {
									// 	toast.error('Login Unsuccessful', {
									// 		position: toast.POSITION.TOP_CENTER,
									// 	});
									// });

									// dispatch({
									// 	type: 'UPDATE',
									// 	item: newValue,
									// });
									actions.resetForm();
									actions.setSubmitting(false);
									history.push('/dashboard');
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
									<legend className="text-center col-10 col-md-7  ml-4 h2">
										{' '}
										{`User Settings for ${userInfo.firstName} ${userInfo.lastName}`}{' '}
									</legend>
									<Form>
										<Row className="justify-content-center  ">
											<Col className="col-5 col-sm-10 col-md-9 p-3">
												<label htmlFor="firstName ">
													First Name :
												</label>
												<Field
													className="ml-sm-2 "
													component={TextField}
													name="firstName"
													type="text"
													placeholder="Enter your first name"
												/>
											</Col>
										</Row>

										<Row className="justify-content-center">
											<Col className="col-5 col-sm-10 col-md-9 p-3">
												<label htmlFor="lastName">
													Last Name :
												</label>
												<Field
													className="ml-sm-2 "
													component={TextField}
													name="lastName"
													type="text"
													placeholder="Enter your last name"
												/>
											</Col>
										</Row>

										<Row className="justify-content-center">
											<Col className="col-5 col-sm-10 col-md-9 p-3">
												<label htmlFor="firstName">
													Email &nbsp; &nbsp; &nbsp; &nbsp;
													:
												</label>
												<Field
													className="ml-sm-2"
													component={TextField}
													name="email"
													type="email"
													placeholder="Enter your email"
												/>
											</Col>
										</Row>
										<Row className="ms-4">
											<Col className="d-flex justify-content-center p-3">
												<Button
													type="submit"
													onClick={props.submitForm}
													disabled={props.isSubmitting}
													variant="contained"
													color="secondary"
												>
													update
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

export default UpdateUserInfo;
