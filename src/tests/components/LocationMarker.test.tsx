import { render, screen } from '@testing-library/react';
import { LatLng } from 'leaflet';
import { MapContainer } from 'react-leaflet';
import LocationMarker from '../../components/LocationMarker';

jest.mock('../../utils/geolocation', () => ({
	getPosition: async () => Promise.resolve({ latitude: 0, longitude: 0 }),
}));

jest.mock('leaflet');

jest.mock('react-leaflet', () => ({
	...(jest.requireActual('react-leaflet') as Record<string, unknown>),
	useMap: jest.fn(),
	useLeafletContext: jest.fn(),
}));

describe('Tests LocationMarker component', () => {
	test('Renders LocationMarker successfully', () => {
		const setPosition = jest.fn();
		render(
			<MapContainer>
				<LocationMarker
					maxRadius={2000}
					position={new LatLng(0, 0)}
					setPosition={setPosition}
				/>
			</MapContainer>,
		);
	});
});
