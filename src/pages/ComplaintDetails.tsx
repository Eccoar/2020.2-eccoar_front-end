import { useState } from 'react';
import Button from '../components/Button';
import { Location } from 'history';

export interface ComplaintProps {
	location: any; //Resolver o tipo correto
}

const ComplaintDetails = ({ location }: ComplaintProps) => {
	const [complaint] = useState(location.state);

	return (
		<div className='containerDetails'>
			<section>
				<h1 className='containerTitle'> {complaint.complaint_name} </h1>
				<img
					className='containerImage'
					src={complaint.complaint_picture}
					alt={`Foto de ${complaint.complaint_name}`}
				/>
				<p className='containerDescription'>
					{complaint.complaint_description}
				</p>
				<Button text='CONFIRMAR DENÚNCIA' />
			</section>
		</div>
	);
};

export default ComplaintDetails;
