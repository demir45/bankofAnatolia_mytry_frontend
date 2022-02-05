import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress } from '@material-ui/core';
import { Container, Col, Row } from 'react-bootstrap';
import { TextField } from 'formik-material-ui';
import MaskedInput from 'react-text-mask';
import service from '../../service/BankService';
import PasswordStrength from '../shared/PasswordStrength';
import * as moment from 'moment';
import { useState } from 'react';

toast.configure();

const eighteenyears = new Date();
eighteenyears.setFullYear(new Date().getFullYear() - 18);
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

const initialValues = {
	ssn: '',
	firstName: '',
	lastName: '',
	dob: '',
	email: '',
	username: '',
	password: '',
	confirmPassword: '',
};
const validationSchema = Yup.object().shape({
	ssn: Yup.string().min(11).required('Enter SSN'),
	firstName: Yup.string().required('Enter First Name'),
	lastName: Yup.string().required('Enter Last Name'),
	dob: Yup.date()
		.max(
			eighteenyears,
			'You need to be more than 18 years old'
		)
		.required('Enter Date of Birth Name'),
	email: Yup.string()
		.email('Enter e-Mail Name')
		.required('Please enter valid email address'),
	username: Yup.string().required('Enter User Name'),
	password: Yup.string()
		.min(6, 'Your pass need to be more than 8 char')
		.required('Enter password')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.,;><:$%^&*])(?=.{6,})/,
			'Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character'
		),
	confirmPassword: Yup.string().oneOf(
		[Yup.ref('password'), null],
		'Password should match'
	),
});

const RegistrationForm = (props) => {
	const [password, setPassword] = useState('');
	const [control, setControl] = useState(['']);
	const [a, setA] = useState(0);
	const handlea = (e) => {
		let inp = e.target.name;
		if (!control.includes(inp)) {
			setA(a + 1);
			setControl((control) => [...control, inp]);
		}
	};

	return (
		<Container>
			<div className="px-sm-4">
				<fieldset className=" col-11 col-sm-11 col-md-8 col-lg-6 col-xl-5 p-0  m-3 ml-0 mx-md-auto  ">
					<legend className="text-center col-10 col-md-7  ml-4 h2">
						Register
					</legend>
					<Form className="col-md-12">
						<Row className=" col-12 pl-2 justify-content-center">
							<Col className=" col-11 pl-5 my-1 mt-4">
								<Field name="ssn" variant="outlined">
									{({ field }) => (
										<MaskedInput
											{...field}
											className="col-12 pl-2"
											id="ssn"
											onFocus={handlea}
											mask={ssnNumberMask}
											placeholder="ssn: 000-00-0000"
										/>
									)}
								</Field>
							</Col>
						</Row>

						{a > 0 && (
							<Row className=" col-12 pl-2 justify-content-center">
								<Col className=" col-11 pl-5 my-1">
									<Field
										className="col-12"
										component={TextField}
										name="firstName"
										label="First Name"
										type="text"
										onFocus={handlea}
									></Field>
								</Col>
							</Row>
						)}
						{a > 1 && (
							<Row className=" col-12 pl-2 justify-content-center">
								<Col className=" col-11 pl-5 my-1">
									<Field
										className="col-12"
										component={TextField}
										name="lastName"
										label="Last Name"
										type="text"
										onFocus={handlea}
									></Field>
								</Col>
							</Row>
						)}
						{a > 2 && (
							<Row className=" col-12 pl-2 justify-content-center">
								<Col className=" col-11 pl-5 my-1">
									<Field
										className="col-12"
										component={TextField}
										onFocus={handlea}
										name="dob"
										label=""
										type="date"
										InputLabelProps={{ shrink: true }}
									></Field>
								</Col>
							</Row>
						)}
						{a > 3 && (
							<Row className=" col-12 pl-2 justify-content-center">
								<Col className=" col-11 pl-5 my-1">
									<Field
										className="col-12"
										component={TextField}
										name="email"
										label="E-Mail"
										type="email"
										onFocus={handlea}
									></Field>
								</Col>
							</Row>
						)}
						{a > 4 && (
							<Row className=" col-12 pl-2 justify-content-center">
								<Col className=" col-11 pl-5 my-1">
									<Field
										className="col-12"
										component={TextField}
										name="username"
										label="User Name"
										type="text"
										onFocus={handlea}
									></Field>
								</Col>
							</Row>
						)}
						{a > 5 && (
							<Row className=" col-12 pl-2 justify-content-center">
								<Col className=" col-11 pl-5 my-1 justify-content-center">
									<Field
										className="col-12"
										component={TextField}
										name="password"
										label="Password"
										type="password"
										onFocus={handlea}
										onKeyUp={(e) =>
											setPassword(e.target.value)
										}
									></Field>
									<Row className="justify-content-center col-12 ml-1 pl-1">
										<PasswordStrength password={password} />
									</Row>
								</Col>
							</Row>
						)}

						{a > 6 && (
							<Row className=" col-12 pl-2 justify-content-center">
								<Col className=" col-11 pl-5 my-1">
									<Field
										className="col-12"
										component={TextField}
										name="confirmPassword"
										label="Confirm Password"
										type="password"
										onFocus={handlea}
									></Field>
								</Col>
							</Row>
						)}
						{a > 7 && (
							<Row className="justify-content-center">
								<Col
									sm={12}
									md={6}
									className="text-center p-3"
								>
									<Button
										className="bg-success"
										variant="contained"
										color="primary"
										disabled={props.isSubmitting}
										onClick={props.submitForm}
									>
										{' '}
										Submit
									</Button>
								</Col>
							</Row>
						)}
					</Form>
					{props.isSubmitting && <LinearProgress />}
				</fieldset>
			</div>
		</Container>
	);
};

const Register = () => {
	return (
		<div>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values, actions) => {
					if (values.ssn.includes('_')) {
						toast.error('Invalid SSN');
						actions.setSubmitting(false);
					} else {
						// dob'u manipule ettim.
						const data = {
							...values,
							dob: moment(values.dob).format('DD/MM/YYYY'),
						};
						service
							.register(data)
							.then((res) => {
								if (res.status === 200) {
									toast.success('Register Successful', {
										position: toast.POSITION.TOP_CENTER,
									});
									actions.resetForm();
									actions.setSubmitting(false);
								}
							})
							.catch(() => {
								toast.error('Register Denied', {
									position: toast.POSITION.TOP_CENTER,
								});
								actions.resetForm();
								actions.setSubmitting(false);
							});
					}
				}}
				component={RegistrationForm}
			></Formik>
		</div>
	);
};

export default Register;
