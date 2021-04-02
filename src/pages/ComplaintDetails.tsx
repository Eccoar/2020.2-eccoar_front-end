import { useState } from 'react';
import ConfimComplaintButton from '../components/confimComplaintButton';
import { createVote } from '../services/complaint';

export interface ComplaintProps {
	location: any; //Resolver o tipo correto
}

const complaintVote = (status: string) => {
	if (status == 'wait') {
		return 'complaintConfirmed';
	}
	return 'complaintUpvote';
};

const ComplaintDetails = ({ location }: ComplaintProps) => {
	const [complaint] = useState(location.state);

	return (
		<div className='containerDetails'>
			<h1 className='containerDetails__title'>
				{' '}
				{complaint.complaint_name}{' '}
			</h1>
			<div>
				<span className='containerDetails__imageBox'>
					<img
						className='containerDetails__imageBox-image'
						src={complaint.complaint_picture}
						alt={`Foto de ${complaint.complaint_name}`}
					/>
				</span>
				<p className='containerDetails__description'>
					{complaint.complaint_description}
				</p>
			</div>

			<ConfimComplaintButton
				text='CONFIRMAR DENÚNCIA'
				icon='echo'
				onClick={() => {
					createVote({
						userId: complaint.complaint_userId,
						complaintId: complaint.complaint_id,
						typeVote: complaintVote(complaint.complaint_status),
					});
				}}
			/>
		</div>
	);
};

export default ComplaintDetails;
