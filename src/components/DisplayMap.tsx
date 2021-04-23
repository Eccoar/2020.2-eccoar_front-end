import { LatLng } from 'leaflet';
import React from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

interface IDisplayMap {
	center: LatLng;
}

const DisplayMap: React.FC<IDisplayMap> = ({ center }) => {
	return (
		<MapContainer
			className='containerDetails__map'
			zoom={13}
			scrollWheelZoom={true}
			center={center}
		>
			<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
			<Marker position={center} draggable={false} />
		</MapContainer>
	);
};

export default DisplayMap;
