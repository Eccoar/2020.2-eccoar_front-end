import { useState, useEffect } from 'react';
import ComplainCard from '../components/complainCard';
import { getVotes, createVote } from '../services/complaint';
import { useHistory } from 'react-router-dom';

const Historic = () => {
	const [data, setData] = useState([]);
	const history = useHistory();

	const id = 44;

	const array = [44, 12, 10];

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

	return (
		<div className='historic'>
			<div className='historic__title'>
				<h1>Histórico de Sabanai</h1>
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
					return id == complaint_userId || vote_id === id ? (
						<ComplainCard
							key={index}
							title={complaint_name}
							label={complaint_category}
							description={complaint_description}
							status={complaint_status}
							photo={complaint_picture}
							onClick={() =>
								confirmComplaint(
									complaint_id,
									complaint_userId,
									complaintVote(complaint_status),
								)
							}
							cardClick={() => {
								history.push(
									`/complaint/details/${complaint_id}`,
								);
								console.log(complaint_userId);
							}}
							vote_id={vote_id}
						/>
					) : (
						<></>
					);
				},
			)}
		</div>
	);
};

export default Historic;
