import { ChangeEvent, useState, useMemo } from 'react';
import { FiCamera } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';

const SubmitComplaitPhoto = () => {
	const history = useHistory();
	const [photo, setPhoto] = useState<File | undefined>();
	const onSubmit = () => {
		history.push('/submit-complaint/location', history.location.state);
	};

	const onChangePhoto = (event: ChangeEvent) => {
		const target = event.target as HTMLInputElement;
		const file: File = (target.files as FileList)[0];
		setPhoto(file);
	};

	return (
		<div className='submitComplaint' data-testid='SubmitComplaintPhoto'>
			<div />
			{!photo ? (
				<div>
					<label className='submitComplaint__sendImageContainer'>
						<FiCamera />
						<input
							type='file'
							onChange={(event) => onChangePhoto(event)}
							className='submitComplaint__sendImage'
							accept='image/*'
						/>
					</label>
				</div>
			) : (
				<div>{photo.name}</div>
			)}
			{/* <label className='submitComplaint__sendImageContainer'>
				<FiCamera />
				<input type="file" onChange={(event) => onChangePhoto(event)} className='submitComplaint__sendImage' />
			</label> */}
			<Button text='Continuar' onClick={onSubmit} />
		</div>
	);
};

export default SubmitComplaitPhoto;
