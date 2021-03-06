import React from 'react';
const PageHeader = (props) => {
	return (
		<div className="breadcrumb_area ">
			<div className="breadcrumb_inner d-flex align-items-center">
				<div className="container ">
					<div className="breadcrumb_content">
						<h2>{props.title}</h2>
					</div>
				</div>
			</div>
		</div>
	);
};
export default PageHeader;
