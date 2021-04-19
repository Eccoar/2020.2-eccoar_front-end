import { Circle, Marker, useMap } from 'react-leaflet';
import { useEffect, useMemo, useRef, useState } from 'react';
import { LatLng, Marker as LeafLetMarker } from 'leaflet';
import GeolocationParser from '../utils/geolocation';
interface ILocationMarker {
	maxRadius: number;
	position: LatLng;
	setPosition: React.Dispatch<React.SetStateAction<LatLng | null>>;
}

const LocationMarker: React.FC<ILocationMarker> = ({
	maxRadius,
	position,
	setPosition,
}) => {
	const [center, setCenter] = useState<LatLng>(position);

	const map = useMap();
	const markerRef = useRef<LeafLetMarker | null>(null);

	useEffect(() => {
		const getGeolocation = async () => {
			const pos = await GeolocationParser.getPosition();
			const pos_latlng = new LatLng(pos.latitude, pos.longitude);
			setPosition(pos_latlng);
			setCenter(() => {
				map.setView(pos_latlng, 15);
				return pos_latlng;
			});
		};
		getGeolocation();
	}, []);

	const pickLocation = () => {
		let marker = markerRef.current;
		console.log(
			Math.abs(
				center?.distanceTo(marker?.getLatLng() || new LatLng(0, 0)) ||
					0,
			),
		);
		if (center !== null && position !== null) {
			if (
				marker !== null &&
				Math.abs(center.distanceTo(marker.getLatLng())) <= maxRadius
			) {
				setPosition(marker.getLatLng());
			} else {
				marker = markerRef.current;
				marker?.setLatLng(center);
			}
		}
	};

	const markerEvents = useMemo(
		() => ({
			dragend() {
				pickLocation();
			},
			predrag() {
				pickLocation();
			},
		}),
		[],
	);

	return position === null ? null : (
		<>
			<Marker
				position={position}
				draggable={true}
				eventHandlers={markerEvents}
				ref={markerRef}
			/>
			{center && <Circle center={center} radius={maxRadius} />}
		</>
	);
};

export default LocationMarker;
