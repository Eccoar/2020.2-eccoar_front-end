import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import { createComplaint } from '../../services/complaint';
import { MapContainer, TileLayer } from 'react-leaflet';
import LocationMarker from '../../components/LocationMarker';
import { useEffect, useState } from 'react';
import { LatLng } from 'leaflet';
import GeolocationParser from '../../utils/geolocation';
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
			const { category, description, name, picture } = history.location
				.state as {
				name: string;
				description: string;
				category: string;
				picture: File;
			};
			if (position == null) {
				throw new Error('Position not found');
			}
			await createComplaint({
				category,
				description,
				name,
				picture,
				latitude: position.lat,
				longitude: position.lng,
			});
			success = true;
		} catch (err) {
			success = false;
		}
		history.push('/submit-complaint/done', { success });
	};

	useEffect(() => {
		const getGeolocation = async () => {
			try {
				const pos = await GeolocationParser.getPosition();
				const pos_latlng = new LatLng(pos.latitude, pos.longitude);
				setPosition(pos_latlng);
			} catch (error) {
				alert(error.message);
				history.replace('/');
			}
		};
		getGeolocation();
	}, []);

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
				{position !== null && (
					<LocationMarker
						maxRadius={2000}
						position={position}
						setPosition={setPosition}
					/>
				)}
			</MapContainer>
			<Button text='Continuar' onClick={onSubmit} />
		</div>
	);
};

export default SubmitComplaintGeolocation;
