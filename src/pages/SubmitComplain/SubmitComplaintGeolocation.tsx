import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import { createComplaint } from '../../services/complaint';
import { MapContainer, TileLayer } from 'react-leaflet';
import LocationMarker from '../../components/LocationMarker';
import { useState } from 'react';
import { LatLng } from 'leaflet';
interface IHistory {
	success?: boolean;
	name?: string;
	description?: string;
	category?: string;
}

interface IMapOptions {
	zoom: number;
	scrollWhenZoom: boolean;
}

const SubmitComplaintGeolocation = () => {
	const history = useHistory<IHistory>();

	const [position, setPosition] = useState<LatLng | null>(null);

	const onSubmit = async () => {
		let success;
		try {
			const { category, description, name } = history.location.state as {
				name: string;
				description: string;
				category: string;
			};
			await createComplaint({
				category,
				description,
				name,
				latitude: position?.lat || 0,
				longitude: position?.lng || 0,
			});
			success = true;
		} catch (err) {
			success = false;
		}
		history.push('/submit-complaint/done', { success });
	};

	const mapOptions = {
		scrollWhenZoom: true,
		zoom: 13,
	} as IMapOptions;

	return (
		<div
			className='submitComplaint'
			data-testid='SubmitComplaintGeolocation'
		>
			<MapContainer className='mapContainer' {...mapOptions}>
				<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
				<LocationMarker
					maxRadius={2000}
					position={position}
					setPosition={setPosition}
				/>
			</MapContainer>
			<Button text='Continuar' onClick={onSubmit} />
		</div>
	);
};

export default SubmitComplaintGeolocation;
