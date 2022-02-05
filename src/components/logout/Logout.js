import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Logout = () => {
	const history = useHistory();
	const [, dispatch] = useStateValue();

	const handleYes = () => {
		localStorage.clear();
		sessionStorage.clear();
		dispatch({
			type: 'LOGOUT',
			item: null,
		});
		toast.info('Logout performed', {
			position: toast.POSITION.TOP_CENTER,
		});

		history.push('/');
	};

	const handleNo = () => {
		history.goBack();
	};

	return (
		<Container className="d-flex justify-content-center">
			<div className="modal fade mt-5" id="myLogoutModal">
				<div className="modal-dialog my-auto">
					<fieldset className="modal-content  login-fieldset  text-center ">
						<div>
							<h4 className="modal-title">
								Are you really want to logout?
							</h4>
							<div className="modal-body">
								<Button
									onClick={handleYes}
									variant="contained"
									color="secondary"
									className="mr-2"
									data-dismiss="modal"
								>
									YES
								</Button>
								<Button
									onClick={handleNo}
									variant="contained"
									color="primary"
									className="ml-3"
									data-dismiss="modal"
								>
									NO
								</Button>
							</div>
						</div>
					</fieldset>
				</div>
			</div>
		</Container>
	);
};

export default Logout;
