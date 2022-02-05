import React from 'react';
import { Field, Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import PasswordStrength from '../shared/PasswordStrength';
import { Container, Row, Col } from 'react-bootstrap';
import { TextField } from 'formik-material-ui';
import { Button, LinearProgress } from '@material-ui/core';
import { useStateValue } from '../../StateProvider';
import service from '../../service/BankService';
import { useState } from 'react';
import { useHistory } from 'react-router';

const validationSchema = Yup.object().shape({
	oldPassword: Yup.string().required(
		'Enter your old password'
	),
	newPassword: Yup.string()
		.min(6, 'Your pass need to be more than 6 char')
		.required('Enter password')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.,;><:$%^&*])(?=.{6,})/,
			'Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character'
		),
	confirmPassword: Yup.string().oneOf(
		[Yup.ref('newPassword'), null],
		'Password should match'
	),
});

const UpdatePasswordForm = (props) => {
	const [{ userInfo }] = useStateValue();
	const [password, setpassword] = useState('');
	return (
		<Container>
			<div className="px-sm-4">
				<fieldset className="col-12 col-md-9 col-lg-6 p-0  m-3 ml-0 mx-md-auto  ">
					<legend className="text-center col-10 col-md-7  ml-4 h2">
						{`User Settings for ${userInfo.firstName} ${userInfo.lastName}`}
					</legend>
					<Form>
						<Col className="justify-content-center pl-5">
							<Row
								xs={6}
								md={4}
								className="text-center p-3"
							>
								<label htmlFor="password">
									Old Password &nbsp; :
								</label>
								<Field
									className="ml-sm-2"
									component={TextField}
									name="oldPassword"
									type="password"
								/>
							</Row>

							<Row
								xs={6}
								md={4}
								className="text-center p-3"
							>
								<label htmlFor="password">
									New Password :
								</label>
								<Field
									className="ml-sm-2"
									component={TextField}
									name="newPassword"
									type="password"
									onKeyUp={(e) =>
										setpassword(e.target.value)
									}
								/>
								<Col className="justify-content-center text-center col-12 pl-4 ml-2">
									<Row className="justify-content-center col-8 col-sm-7 col-lg-8 col-xl-6 ml-5 pl-5">
										<PasswordStrength password={password} />
									</Row>
								</Col>
							</Row>

							<Row
								xs={6}
								md={4}
								className="text-center p-3"
							>
								<label htmlFor="password">
									Confirm Password :
								</label>
								<Field
									className="ml-sm-2"
									component={TextField}
									name="confirmPassword"
									type="password"
								/>
							</Row>
						</Col>
						<Row className="ms-4">
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
							</Col>
							{props.isSubmitting && <LinearProgress />}
						</Row>
					</Form>
				</fieldset>
			</div>
		</Container>
	);
};

const UpdatePassword = () => {
	const history = useHistory();

	return (
		<div>
			<Formik
				initialValues={{ oldPassword: '', newPassword: '' }}
				validationSchema={validationSchema}
				onSubmit={(values, actions) => {
					service.updatePassword(values).then((res) => {
						if (res.status === 200) {
							toast.success('Update Successful', {
								position: toast.POSITION.TOP_CENTER,
							});

							history.push('/');
						}
						if (res.status === 202) {
							toast.error('Password didnt match', {
								position: toast.POSITION.TOP_CENTER,
							});
						}
					});
					actions.resetForm();
					actions.setSubmitting(false);
				}}
				component={UpdatePasswordForm}
			></Formik>
		</div>
	);
};

export default UpdatePassword;
