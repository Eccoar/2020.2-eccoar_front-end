import React, { useState, useEffect } from 'react';
import ComplainCard from '../components/complainCard';
import { listComplaints } from '../services/complaint';
import '../styles/Home.scss';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

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
			<Link to='/submit-complaint/infos'>
				<Button text='Criar denúncia' />
			</Link>
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
