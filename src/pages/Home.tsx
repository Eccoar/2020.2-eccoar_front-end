import React, { useState, useEffect } from 'react';
import ComplainCard from '../components/complainCard';
import { listComplaints } from '../services/complaint';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';

const Home = () => {
	const [data, setData] = useState([]);
	const [changeBoolean, setChangeBoolean] = useState(false);
	const history = useHistory();

	const handleComplaint = async () => {
		const result = await listComplaints();
		setData(result);
	};

	useEffect(() => {
		handleComplaint();
	}, []);

	function changePage() {
		history.push('/submit-complaint/infos');
	}

	return (
		<div className='home'>
			<div className='home__create'>
				<Button onClick={changePage} text='Criar denúncia' />
			</div>
			{data.map(({ name, category, description, submitted }, index) => {
				return (
					<ComplainCard
						key={index}
						title={name}
						label={category}
						description={description}
					/>
				);
			})}
		</div>
	);
};

export default Home;
