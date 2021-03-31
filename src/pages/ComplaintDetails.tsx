import { useState } from 'react';

const ComplaintDetails = (props: any) => {
	const [complaint] = useState(props.location.state);

	return (
		<div>
			<h1>{complaint.name}</h1>
			<img src={complaint.picture} alt={`Foto de ${complaint.name}`} />
			<p>{complaint.description}</p>
		</div>
	);
};

export default ComplaintDetails;
