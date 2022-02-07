import React from 'react';
import { Field, Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import MaskedInput from 'react-text-mask';
import { Container, Row, Col } from 'react-bootstrap';
import { TextField } from 'formik-material-ui';
import { Button, LinearProgress } from '@material-ui/core';
import './Login.css';
import { useStateValue } from '../../StateProvider';
import service from '../../service/BankService';
import { useHistory } from 'react-router';
import SpinnerUse from '../shared/spinner/SpinnerUse';
// import LoginForm from './LoginForm';

const ssnNumberMask = [
	/[1-9]/,
	/\d/,
	/\d/,
	'-',
	/\d/,
	/\d/,
	'-',
	/\d/,
	/\d/,
	/\d/,
	/\d/,
];

const LoginForm = (props) => {
	const history = useHistory();
	return (
		<Container
			className=" d-flex justify-content-center"
			onClick={(e) => e.stopPropagation()}
		>
			<div className="modal fade" id="mymodal">
				<div className="modal-dialog">
					<fieldset className=" m-1 p-2 ">
						<div className="modal-content ">
							<legend className="modal-title text-center p-3 h2">
								Login
							</legend>
							<Form className="modal-body">
								<Row className="d-flex justify-content-center align-items-center">
									<Col className="text-center p-3 col-12 col-md-6 ">
										<label htmlFor="ssn">SSN:</label>
										<div className="MuiFormControl-root MuiTextField-root">
											<div
												className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl
							MuiInput-formControl ml-2"
											>
												<Field
													id="ssn"
													name="ssn"
													aria-invalid="false"
												>
													{({ field }) => (
														<MaskedInput
															{...field}
															className="MuiInputBase-input MuiInput-input "
															mask={ssnNumberMask}
															placeholder="000-00-0000"
															type="text"
														/>
													)}
												</Field>
											</div>
										</div>
									</Col>

									<Col className="text-center p-0  col-12 col-md-6">
										<label htmlFor="password">
											Password:
										</label>
										<Field
											className=" ml-2"
											component={TextField}
											name="password"
											type="password"
										/>
									</Col>
								</Row>
								<Row className="ms-4">
									<Col className="d-flex justify-content-center p-3">
										<Button
											type="submit"
											onClick={() => history.push('/')}
											disabled={props.isSubmitting}
											variant="contained"
											color="secondary"
											data-dismiss="modal"
										>
											Cancel
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
											data-dismiss="modal"
										>
											Submit
										</Button>
									</Col>

									{props.isSubmitting && <LinearProgress />}
								</Row>
							</Form>
						</div>
					</fieldset>
				</div>
			</div>
		</Container>
	);
};

const Login = () => {
	const history = useHistory();
	const [, dispatch] = useStateValue();

	const [loader, showLoader, hideLoader] = SpinnerUse();

	return (
		<div>
			<Formik
				initialValues={{ ssn: '', password: '' }}
				validationSchema={Yup.object({
					ssn: Yup.string()
						// .max(9,"Must be 9 characters or less")
						.required('username Required'),
					password: Yup.string()
						.max(20, 'Must be 20 characters or less')
						.min(6, 'Must be at least 6 character')
						.required('password Required'),
				})}
				onSubmit={(values, actions) => {
					showLoader();
					service
						.login(values)
						.then((res) => {
							if (res.status === 200) {
								localStorage.setItem(
									'auth',
									JSON.stringify(res.data)
								);
							}
						})
						.then(() => {
							service.getUserBySsn().then((res) => {
								if (res.status === 200) {
									hideLoader();
									dispatch({
										type: 'LOGIN',
										item: res.data,
									});

									toast.success('Login Successful', {
										position: toast.POSITION.TOP_CENTER,
										toastId: 'unique',
									});
									history.push('/dashboard');
								}
							});
						})
						.catch(() => {
							toast.error('Login Unsuccessful', {
								position: toast.POSITION.TOP_CENTER,
							});
							hideLoader();
							actions.resetForm();
							actions.setSubmitting(false);
						});
				}}
				component={LoginForm}
			></Formik>
			{loader}
		</div>
	);
};

export default Login;
