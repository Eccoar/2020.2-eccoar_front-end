import { useHistory, useParams } from 'react-router-dom';
import Button from '../components/Button';
import {
	createVote,
	removeVote,
	deleteComplaint,
	getComplaintWithVote,
} from '../services/complaint';
import { useState, useEffect } from 'react';
import DisplayMap from '../components/DisplayMap';
import { LatLng } from 'leaflet';
import { useAuth } from '../context/auth';

interface urlParams {
	id: string | undefined;
}

interface ComplaintWithVote {
	complaint_id: number;
	complaint_name: string;
	complaint_description: string;
	complaint_latitude: number;
	complaint_longitude: number;
	complaint_userId: string;
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
	const [complaint, setComplaint] = useState<ComplaintWithVote | null>(null);

	const [isVoted, setIsVoted] = useState<boolean | null>(null);

	const params = useParams<urlParams>();

	const { userId } = useAuth();
	const history = useHistory();

	function goToHomescreen() {
		history.push('/home');
	}

	useEffect(() => {
		async function setUpPage() {
			const response = await getComplaintWithVote(
				Number(params.id),
				userId,
			);
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

	const handleDelete = async (complaint: ComplaintWithVote) => {
		await deleteComplaint({
			userId: userId,
			id: complaint.complaint_id,
		});
		goToHomescreen();
	};

	const createComplaint = (complaintId: number, status: string) => {
		try {
			createVote({
				complaintId: complaintId,
				typeVote: complaintVote(status),
				userId,
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
						{complaint.complaint_picture == null ? null : (
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

					{complaint.complaint_latitude && (
						<DisplayMap
							center={
								new LatLng(
									complaint.complaint_latitude,
									complaint.complaint_longitude,
								)
							}
						/>
					)}

					{complaint.complaint_status == 'open' &&
					userId == complaint.complaint_userId ? (
						<p
							className='containerDetails__deleteText'
							onClick={() => handleDelete(complaint)}
						>
							Deletar Denúncia
						</p>
					) : null}
					<Button
						data-testid='confirmbutton'
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
										complaint.complaint_id,
										complaint.complaint_status,
								  )
								: removeVote({
										userId,
										id: complaint.complaint_id,
										typeVote: complaintVote(
											complaint.complaint_status,
										),
								  });
							setIsVoted(!isVoted);
						}}
					/>
				</>
			)}
		</div>
	);
};

export default ComplaintDetails;
