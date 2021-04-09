import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import { createVote, getComplaintWithVote } from '../services/complaint';
import { useState, useEffect } from 'react';

interface urlParams {
	id: string | undefined;
}

interface complaintWithVote {
	complaint_id: number;
	complaint_name: string;
	complaint_description: string;
	complaint_latitude: string;
	complaint_longitude: string;
	complaint_userId: number;
	complaint_category: string;
	complaint_creationDate: string;
	complaint_closeDate: string;
	complaint_picture: string;
	complaint_status: string;
	vote_id: number;
	vote_userId: number;
	vote_complaintId: number;
	vote_typeVote: string;
}

const complaintVote = (status: string) => {
	if (status == 'wait') {
		return 'complaintConfirmed';
	}
	return 'complaintUpvote';
};

const ComplaintDetails = () => {
	const [complaint, setComplaint] = useState<complaintWithVote | null>(null);

	const [isVoted, setIsVoted] = useState<boolean | null>(null);

	const params = useParams<urlParams>();
	useEffect(() => {
		async function setUpPage() {
			const response = await getComplaintWithVote(1, Number(params.id));
			setComplaint(response);
			setIsVoted(response.vote_id);
		}
		setUpPage();
	}, []);

	const choseButtonText = () => {
		if (complaint?.complaint_status == 'wait') {
			if (isVoted) {
				return 'PROBLEMA RESOLVIDO';
			}
			return 'CONFIRMAR RESOLUÇÃO';
		} else {
			if (isVoted) {
				return 'DENÚNCIA REPORTADA';
			}
			return 'REPORTAR DENÚNCIA';
		}
	};

	const createComplaint = (
		userId: number,
		complaintId: number,
		status: string,
	) => {
		try {
			createVote({
				userId: userId,
				complaintId: complaintId,
				typeVote: complaintVote(status),
			});
			setIsVoted(!isVoted);
		} catch (err) {
			alert('Houve um erro e a denúncia não foi confirmada!');
		}
	};

	return (
		<div className='containerDetails' data-testid='ComplainDetails'>
			{complaint && (
				<>
					<h1 className='containerDetails__title'>
						{' '}
						{complaint.complaint_name}{' '}
					</h1>
					<div>
						{complaint.complaint_picture == null ? (
							''
						) : (
							<span className='containerDetails__imageBox'>
								<img
									className='containerDetails__imageBox-image'
									src={complaint.complaint_picture}
									alt={`Foto de ${complaint.complaint_name}`}
								/>
							</span>
						)}
						<p className='containerDetails__description'>
							{complaint.complaint_description}
						</p>
					</div>

					<Button
						text={choseButtonText()}
						icon={
							complaint.complaint_status == 'wait'
								? 'check'
								: 'echo'
						}
						fill={isVoted as boolean}
						bigger
						pattern={
							complaint.complaint_status == 'wait'
								? 'secondary'
								: 'primary'
						}
						onClick={() => {
							!isVoted
								? createComplaint(
										1,
										complaint.complaint_id,
										complaint.complaint_status,
								  )
								: alert('Denuncia já votada');
						}}
					/>
				</>
			)}
		</div>
	);
};

export default ComplaintDetails;
