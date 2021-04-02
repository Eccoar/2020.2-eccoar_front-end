import { useHistory } from 'react-router-dom';
import ConfimComplaintButton from '../components/confimComplaintButton';
import { createVote } from '../services/complaint';

interface IHistory {
	name: string;
	description: string;
	picture: string;
	userId: number;
	complaintId: number;
	status: string;
}

const complaintVote = (status: string) => {
	if (status == 'wait') {
		return 'complaintConfirmed';
	}
	return 'complaintUpvote';
};

const ComplaintDetails = () => {
	const history = useHistory<IHistory>();

	const { name, description, picture, userId, complaintId, status } = history
		.location.state as {
		name: string;
		description: string;
		picture: string;
		userId: number;
		complaintId: number;
		status: string;
	};

	return (
		<div className='containerDetails'>
			<h1 className='containerDetails__title'> {name} </h1>
			<div>
				<span className='containerDetails__imageBox'>
					<img
						className='containerDetails__imageBox-image'
						src={picture}
						alt={`Foto de ${name}`}
					/>
				</span>
				<p className='containerDetails__description'>{description}</p>
			</div>

			<ConfimComplaintButton
				text='CONFIRMAR DENÚNCIA'
				icon='echo'
				onClick={() => {
					createVote({
						userId: userId,
						complaintId: complaintId,
						typeVote: complaintVote(status),
					});
				}}
			/>
		</div>
	);
};

export default ComplaintDetails;
