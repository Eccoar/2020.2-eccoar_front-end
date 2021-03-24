import { useState, useEffect } from 'react';
import ComplainCard from '../components/complainCard';
import { getVotes, createVote } from '../services/complaint';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';

const Home = () => {
	const [data, setData] = useState([]);
	const history = useHistory();

	const confirmComplaint = async (
		complaintId: number,
		userId: number,
		typeVote: string,
	) => {
		await createVote({ userId, complaintId, typeVote });
	};

	useEffect(() => {
		let mounted = true;
		getVotes(1).then((result) => {
			if (mounted) setData(result);
		});

		return () => {
			mounted = false;
		};
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
			{data.map(
				(
					{
						complaint_name,
						complaint_category,
						complaint_description,
						complaint_id,
						complaint_userId,
						vote_id,
					},
					index,
				) => {
					return (
						<ComplainCard
							key={index}
							title={complaint_name}
							label={complaint_category}
							description={complaint_description}
							onClick={() =>
								confirmComplaint(
									complaint_id,
									complaint_userId,
									'complaintConfirmed',
								)
							}
							vote_id={vote_id}
						/>
					);
				},
			)}
		</div>
	);
};

export default Home;
