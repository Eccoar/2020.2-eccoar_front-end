import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';

const SubmitComplaitOptionPhoto = () => {
	const history = useHistory();
	const onSubmit = (route: string) => {
		history.push(`/submit-complaint/${route}`, history.location.state);
	};

	return (
		<div
			className='submitComplaint'
			data-testid='SubmitComplaintOptionPhoto'
		>
			<p>
				Será que você pode mandar uma foto para entendermos melhor o seu
				problema?
			</p>
			<div className='submitComplaint__content'>
				<Button
					text='Não'
					fill={false}
					onClick={() => onSubmit('location')}
				/>
				<Button text='Sim' onClick={() => onSubmit('take-photo')} />
			</div>
		</div>
	);
};

export default SubmitComplaitOptionPhoto;
