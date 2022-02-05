import axios from 'axios';

function getToken() {
	let auth = localStorage.getItem('auth');
	if (auth) {
		auth = JSON.parse(auth);
	}
	return auth ? `Bearer ${auth.token}` : null;
}

const axiosInstance = axios.create({
	headers: {
		// Authorization: getToken(),
		'Content-Type': 'application/json',
	},
});
axiosInstance.interceptors.request.use(function (config) {
	// const token = localStorage.getItem('token');
	config.headers.Authorization = getToken();
	return config;
});

export default axiosInstance;
