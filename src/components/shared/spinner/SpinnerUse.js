import React, { useState } from 'react';
import SpinnerX from './SpinnerX';

const SpinnerUse = () => {
	const [loading, setLoading] = useState(false);
	return [
		loading ? <SpinnerX /> : null,
		() => setLoading(true),
		() => setLoading(false),
	];
};

export default SpinnerUse;
