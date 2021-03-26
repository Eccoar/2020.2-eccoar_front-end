import React, { useState, useEffect } from 'react';
import ComplainCard from '../components/complainCard';
import { listComplaints, addVote } from '../services/complaint';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';

const Home = () => {
	const [data, setData] = useState([]);
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

	const onVote = async (complaintId: number, typeVote: string) => {
		try {
			await addVote({ complaintId, typeVote });
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='home'>
			<div className='home__create'>
				<Button onClick={changePage} text='Criar denúncia' />
			</div>
			{data.map(({ name, category, description, id }, index) => {
				return (
					<ComplainCard
						key={index}
						title={name}
						label={category}
						description={description}
						onClick={onVote}
						id={id}
					/>
				);
			})}
		</div>
	);
};

export default Home;
