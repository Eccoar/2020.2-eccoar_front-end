import { useState } from 'react';
import Button from '../components/Button';

export interface ComplaintProps {
	location: any; //Resolver o tipo correto
}

const ComplaintDetails = ({ location }: ComplaintProps) => {
	const [complaint] = useState(location.state);

	return (
		<div>
			<h1>{complaint.complaint_name}</h1>
			<img
				src={complaint.complaint_picture}
				alt={`Foto de ${complaint.complaint_name}`}
			/>
			<p>{complaint.complaint_description}</p>
			<Button text='CONFIRMAR DENÚNCIA' />
		</div>
	);
};

export default ComplaintDetails;
