import { useState, useEffect } from 'react';
import ComplainCard from '../components/complainCard';
import {
	getUserIdComplaints,
	createVote,
	removeVote,
} from '../services/complaint';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export interface token {
	token: string | undefined;
}

const Historic = () => {
	const [data, setData] = useState([]);
	const history = useHistory();
	const mockedUserId = 1;
	const mockedUserName = 'Name';
	// const token = localStorage.getItem('@eccoar/token');
	// const name = jwt_decode(token);
	// // console.log(name);

	const id = 'J5XePUMKi9XJdrs1L4zbYgB8haUY';

	const confirmComplaint = async (
		complaintId: number,
		userId: number,
		typeVote: string,
	) => {
		await createVote({ userId, complaintId, typeVote });
	};

	const getComplaint = async () => {
		const res = await getUserIdComplaints(id);
		console.log(res);
		setData(res);
	};

	useEffect(() => {
		getComplaint();
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
				<h1>Histórico de</h1>
				{'⠀'}
				<h1 className='historic__name'>{mockedUserName}</h1>
			</div>
			{data.map(
				(
					{
						name,
						category,
						description,
						id,
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
							title={name}
							label={category}
							description={description}
							status={complaint_status}
							photo={complaint_picture}
							my_complaint
							onClick={() =>
								confirmComplaint(
									id,
									complaint_userId,
									complaintVote(complaint_status),
								)
							}
							removeClick={() => {
								removeVote({
									userId: mockedUserId,
									id: id,
									typeVote: complaintVote(complaint_status),
								});
							}}
							cardClick={() => {
								history.push(`/complaint/details/${id}`);
								console.log(complaint_userId);
							}}
							vote_id={vote_id}
						/>
					);
				},
			)}
		</div>
	);
};

export default Historic;
