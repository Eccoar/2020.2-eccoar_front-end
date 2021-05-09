import { useState, useEffect } from 'react';
import ComplainCard from '../components/complainCard';
import { getVotes, createVote, removeVote } from '../services/complaint';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import GeolocationParser from '../utils/geolocation';

const Home = () => {
	const [data, setData] = useState([]);
	const history = useHistory();
	const mockedUserId = 1;

	useEffect(() => {
		let mounted = true;

		async function setUpPage() {
			try {
				const position = await GeolocationParser.getPosition();
				const result = await getVotes(
					1,
					position.latitude,
					position.longitude,
				);
				if (mounted) setData(result);
			} catch (error) {
				alert('Não foi possível obter sua localização!');
				getVotes(1).then((result) => {
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
							photo={complaint_picture}
							onClick={() => {
								createVote({
									complaintId: complaint_id,
									userId: complaint_userId,
									typeVote: complaintVote(complaint_status),
								});
							}}
							removeClick={() => {
								removeVote({
									userId: mockedUserId,
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
