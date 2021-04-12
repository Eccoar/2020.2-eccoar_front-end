import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import { createComplaint } from '../../services/complaint';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
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

const LocationMarker = () => {
	const [position, setPosition] = useState<LatLng | null>(null);

	const map = useMap();

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((result) => {
			const latlng = new LatLng(
				result.coords.latitude,
				result.coords.longitude,
			);
			setPosition(latlng);
			map.setView(latlng, 13);
		});
	}, []);

	return position === null ? null : (
		<Marker position={position}>
			<Popup>Você está aqui</Popup>
		</Marker>
	);
};

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
				<LocationMarker />
			</MapContainer>
			<Button text='Continuar' onClick={onSubmit} />
		</div>
	);
};

export default SubmitComplaintGeolocation;
