import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import { createComplaint } from '../../services/complaint';

interface IHistory {
	success?: boolean;
	name?: string;
	description?: string;
	category?: string;
}

const SubmitComplaintGeolocation = () => {
	const history = useHistory<IHistory>();
	const onSubmit = async () => {
		let success;
		try {
			const { category, description, name } = history.location.state as {
				name: string;
				description: string;
				category: string;
			};
			await createComplaint({ category, description, name });
			success = true;
		} catch (err) {
			console.error(err);
			success = false;
		}
		history.push('/submit-complaint/done', { success });
	};
	return (
		<div className='takeLocation'>
			<p>WIP</p>
			<Button text='Continuar' onClick={onSubmit} />
		</div>
	);
};

export default SubmitComplaintGeolocation;
