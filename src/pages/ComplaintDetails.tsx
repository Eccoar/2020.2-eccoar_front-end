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

interface urlParams {
	id: string | undefined;
}

interface ComplaintWithVote {
	complaint_id: number;
	complaint_name: string;
	complaint_description: string;
	complaint_latitude: number;
	complaint_longitude: number;
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

const mockedUserId = 1;

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

	const history = useHistory();

	function goToHomescreen() {
		history.push('/');
	}

	useEffect(() => {
		let ismounted = false;
		async function setUpPage() {
			const response = await getComplaintWithVote(1, Number(params.id));
			if (!ismounted) {
				setComplaint(response);
				setIsVoted(response.vote_id);
			}
		}
		setUpPage();
		return () => {
			ismounted = true;
		};
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

	const handleDelete = async (complaint: complaintWithVote) => {
		await deleteComplaint({
			userId: mockedUserId,
			id: complaint.complaint_id,
		});
		goToHomescreen();
	};

	const createComplaint = (
		userId: number,
		complaintId: number,
		status: string,
	) => {
		createVote({
			userId: userId,
			complaintId: complaintId,
			typeVote: complaintVote(status),
		});
		setIsVoted(!isVoted);
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
					mockedUserId == complaint.complaint_userId ? (
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
									mockedUserId,
									complaint.complaint_id,
									complaint.complaint_status,
								)
								: removeVote({
									userId: mockedUserId,
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
