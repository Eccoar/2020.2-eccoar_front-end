import { useState, useEffect } from 'react';
import ComplainCard from '../components/complainCard';
import { getVotes, createVote } from '../services/complaint';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';

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
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				function (position) {
					getVotes(
						1,
						position.coords.latitude,
						position.coords.longitude,
					).then((result) => {
						if (mounted) setData(result);
					});
				},
				function (error) {
					alert('Não foi possível obter sua localização.');
					getVotes(1).then((result) => {
						if (mounted) setData(result);
					});
					console.log(error);
				},
			);
		}
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
