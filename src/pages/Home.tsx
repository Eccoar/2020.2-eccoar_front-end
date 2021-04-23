import { useState, useEffect } from 'react';
import ComplainCard from '../components/complainCard';
import { getVotes, createVote, removeVote } from '../services/complaint';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import GeolocationParser from '../utils/geolocation';
import { useAuth } from '../context/auth';

const Home: React.FC = () => {
	const [data, setData] = useState([]);
	const history = useHistory();
	const { userId } = useAuth();

	useEffect(() => {
		let mounted = true;

		async function setUpPage() {
			try {
				const position = await GeolocationParser.getPosition();
				const result = await getVotes(
					userId,
					position.latitude,
					position.longitude,
				);
				if (mounted) setData(result);
			} catch (error) {
				alert('Não foi possível obter sua localização!');
				getVotes(userId).then((result) => {
					if (mounted) setData(result);
				});
			}
		}
		setUpPage();
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
				<Button
					onClick={changePage}
					text='CRIAR DENÚNCIA'
					icon='megaphone'
					pattern='secondary'
				/>
			</div>
			{data.map(
				(
					{
						complaint_name,
						complaint_category,
						complaint_description,
						complaint_id,
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
							photo={complaint_picture}
							onClick={() => {
								createVote({
									complaintId: complaint_id,
									userId,
									typeVote: complaintVote(complaint_status),
								});
							}}
							removeClick={() => {
								removeVote({
									userId,
									id: complaint_id,
									typeVote: complaintVote(complaint_status),
								});
							}}
							cardClick={() => {
								history.push(
									`/complaint/details/${complaint_id}`,
								);
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
