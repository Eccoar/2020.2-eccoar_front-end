import React, { useState, useEffect } from 'react';
import ComplainCard from '../components/complainCard';
import { listComplaints } from '../services/complaint';
import '../styles/Home.scss';

const Home = () => {
	const [data, setData] = useState([]);

	const handleComplaint = async () => {
		const result = await listComplaints();
		setData(result);
	};
	useEffect(() => {
		handleComplaint();
	}, []);
	return (
		<div className='home'>
			<div className='scrollHome'>
				{' '}
				{data.map(({ name, category, description }) => {
					return (
						<ComplainCard
							title={name}
							label={category}
							description={description}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Home;
