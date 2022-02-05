import React from 'react';
import Highlight from './Highlight';

const data = [
	{
		image: 'assets/img/icon/arrow-down.png',
		title: 'Withdraw',
		desc: 'Lorem ipsum dolor sit amet, consectetur',
	},
	{
		image: 'assets/img/icon/arrow-right.png',
		title: 'Send Money',
		desc: 'Lorem ipsum dolor sit amet, consectetur',
	},
	{
		image: 'assets/img/icon/card.png',
		title: 'Cards',
		desc: 'Lorem ipsum dolor sit amet, consectetur',
	},
	{
		image: 'assets/img/icon/exchange.png',
		title: 'Exchange',
		desc: 'Lorem ipsum dolor sit amet, consectetur',
	},
];

const Highlights = () => {
	return (
		<div className="money-option-area mt-5">
			<div className="container">
				<div className="row justify-content-center">
					{data.map((item, index) => {
						return (
							<div
								className="col-lg-3 col-md-6"
								key={index}
							>
								<Highlight
									image={item.image}
									title={item.title}
									desc={item.desc}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Highlights;
