import React from 'react';
import './SpinnerX.css';

const SpinnerX = () => {
	return (
		<div className="fp-container">
			<img
			style={{zIndex:100}}
				src="assets/img/spinner/spinnerx.gif"
				className="fp-loader"
				alt="loading"
			></img>
		</div>

	);
};

export default SpinnerX;
