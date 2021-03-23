import { FiCamera } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';

const SubmitComplaitPhoto = () => {
	const history = useHistory();
	const onSubmit = () => {
		history.push('/submit-complaint/location', history.location.state);
	};

	return (
		<div className='submitComplaint' data-testid='SubmitComplaintPhoto'>
			<div />
			<FiCamera />
			<Button text='Continuar' onClick={onSubmit} />
		</div>
	);
};

export default SubmitComplaitPhoto;
