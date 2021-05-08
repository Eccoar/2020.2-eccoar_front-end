import { ChangeEvent, useState } from 'react';
import { FiCamera } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';

const SubmitComplaitPhoto = () => {
	const history = useHistory();
	const [photo, setPhoto] = useState<File | undefined>();
	const [showImage, setShowImage] = useState('');

	const onSubmit = () => {
		const addPhotoLocationHistory = history.location.state;
		history.location.state = {
			...(addPhotoLocationHistory as {
				name: string;
				description: string;
				category: string;
			}),
			picture: photo,
		};

		history.push('/submit-complaint/location', history.location.state);
	};

	const onChangePhoto = (event: ChangeEvent) => {
		const target = event.target as HTMLInputElement;
		const file: File = (target.files as FileList)[0];
		const size = file.size / 1000000;

		if (size <= 5) {
			if (file.type === 'image/jpeg' || file.type === 'image/png') {
				setPhoto(file);
				setShowImage(URL.createObjectURL(file));
				console.log(file);
			} else {
				alert('Tipo de arquivo não suportado');
			}
		} else {
			alert('Arquivo muito grande, selecione outra imagem!');
		}
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
							accept='image/png, image/jpeg'
						/>
					</label>
				</div>
			) : (
				<img src={showImage} alt={photo.name} width='60%' />
			)}
			<Button text='Continuar' onClick={onSubmit} />
		</div>
	);
};

export default SubmitComplaitPhoto;
