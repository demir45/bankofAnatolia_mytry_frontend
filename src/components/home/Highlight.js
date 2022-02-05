import React from 'react';

const Highlight = (props) => {
	return (
		<div className="single-work mt-5 text-center">
			<div className="work-icon">
				<img className="" src={props.image} alt="icon" />
			</div>
			<h5>
				<a href="/#">{props.title}</a>
			</h5>
			<p>{props.desc}</p>
			<a className="angle-btn" href="/#">
				<img
					src="assets/img/icon/angle-left-round.png"
					alt="icon"
				/>
			</a>
		</div>
	);
};

export default Highlight;
