import { useState, useEffect } from 'react';
import ComplainCard from '../components/complainCard';
import { getVotes, createVote } from '../services/complaint';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import ComplaintDetails from './ComplaintDetails';

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

	const complaintVote = (status: string) => {
		if (status == 'wait') {
			return 'complaintConfirmed';
		}
		return 'complaintUpvote';
	};

	function changePage() {
		history.push('/submit-complaint/infos');
	}

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
						complaint_status,
						complaint_picture,
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
							status={complaint_status}
							onClick={() =>
								confirmComplaint(
									complaint_id,
									complaint_userId,
									complaintVote(complaint_status),
								)
							}
							cardClick={() => {
								const complaints = {
									complaint_name,
									complaint_category,
									complaint_description,
									complaint_status,
									complaint_userId,
									complaint_id,
									complaint_picture,
								};
								history.push({
									pathname: `/complaint/${complaint_id}/details`,
									state: complaints,
								});
							}}
							vote_id={vote_id}
						/>
					);
				},
			)}
		</div>
	);
};

export default Home;
