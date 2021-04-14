import { Circle, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect, useMemo, useRef, useState } from 'react';
import { LatLng, Marker as LeafLetMarker } from 'leaflet';

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
		navigator.geolocation.getCurrentPosition((result) => {
			const latlng = new LatLng(
				result.coords.latitude,
				result.coords.longitude,
			);
			setPosition(latlng);
			setCenter(() => {
				map.setView(latlng, 15);
				console.log(latlng);
				return latlng;
			});
		});
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
				console.log('aaaaaaaaaa');
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
			>
				<Popup>Você está aqui</Popup>
			</Marker>
			{center && <Circle center={center} radius={maxRadius} />}
		</>
	);
};

export default LocationMarker;
